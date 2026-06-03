"""website_find dashboard.

Find local businesses without real websites — verify each lead, view them
on a map, and generate cold-call scripts. Three tabs:
  📋 Leads   — sortable list + per-lead detail panel with action buttons
  🗺️  Map    — every visible lead pinned, color-coded by lead type
  🔧 Tools  — bulk verify websites, backfill missing coordinates
"""
from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import quote_plus

import folium
import streamlit as st
import streamlit_authenticator as stauth
import yaml
from streamlit_folium import st_folium
from yaml.loader import SafeLoader

import db
import dm_gen
import email_gen
import mockup
import outreach
import verify
from classify import classify_all
from places import (CATEGORIES, estimate_cost, estimate_seconds, geocode,
                    scan_area)

st.set_page_config(page_title="website_find", layout="wide", page_icon="🔎")

# ---------------- auth gate ---------------- #
AUTH_CONFIG = Path(__file__).parent / "auth_config.yaml"
_has_auth = AUTH_CONFIG.exists()
if not _has_auth:
    # Streamlit Cloud: try loading auth config from secrets
    try:
        import json as _json
        # Deep-convert st.secrets (immutable) to plain dicts
        _cfg = _json.loads(_json.dumps(dict(st.secrets["auth"]),
                                        default=lambda o: dict(o) if hasattr(o, "items") else o))
        _has_auth = True
    except Exception:
        pass

if _has_auth:
    from streamlit_authenticator.utilities.validator import Validator

    class _NoRulesValidator(Validator):
        def validate_password(self, password):
            return bool(password)  # accept anything non-empty

    if AUTH_CONFIG.exists():
        with open(AUTH_CONFIG) as _f:
            _cfg = yaml.load(_f, Loader=SafeLoader)
    authenticator = stauth.Authenticate(
        _cfg["credentials"], _cfg["cookie"]["name"],
        _cfg["cookie"]["key"], _cfg["cookie"]["expiry_days"],
        validator=_NoRulesValidator(),
    )
    try:
        authenticator.login(location="main")
    except Exception as e:
        st.error(f"Login error: {e}")
        st.stop()
    auth_status = st.session_state.get("authentication_status")
    if auth_status is False:
        st.error("Username or password is incorrect.")
        st.stop()
    if auth_status is None:
        st.info("🔒 Please log in to continue.")
        st.stop()
    # Log this session's authentication (once per browser session)
    if not st.session_state.get("_logged_login"):
        from datetime import datetime
        with open(Path(__file__).parent / "login_events.log", "a") as _lf:
            _lf.write(f"{datetime.utcnow().isoformat(timespec='seconds')}Z "
                      f"login user={st.session_state.get('username','?')}\n")
        st.session_state["_logged_login"] = True

    # Authenticated — show logout + password change in sidebar
    with st.sidebar:
        authenticator.logout(location="sidebar")
        st.caption(f"Signed in as **{st.session_state.get('name','?')}**")
        with st.expander("🔑 Change password"):
            try:
                if authenticator.reset_password(
                    st.session_state["username"], location="main"
                ):
                    with open(AUTH_CONFIG, "w") as _wf:
                        yaml.dump(_cfg, _wf, default_flow_style=False)
                    st.success("Password updated. Use the new one next time you log in.")
            except Exception as _e:
                st.error(str(_e))
        st.divider()

db.init_db()

LEAD_TYPE_LABELS = {
    "dead_website":  "💥 Dead website",
    "template_only": "🧩 Template only (Booksy/Wix/etc)",
    "no_website":    "❌ No website",
    "social_only":   "📷 Social URL only",
    "has_website":   "🌐 Has real website",
    "chain":         "🔗 Chain (skip)",
}
LEAD_TYPE_COLOR = {
    "dead_website":  "#e74c3c",
    "template_only": "#f39c12",
    "no_website":    "#3498db",
    "social_only":   "#9b59b6",
    "has_website":   "#7f8c8d",
    "chain":         "#34495e",
}
SELLABLE = ["dead_website", "template_only", "no_website", "social_only"]
STATUS_OPTIONS = {
    "new":       "🆕 new — haven't reached out yet",
    "contacted": "📞 contacted — already called or emailed",
    "callback":  "🔁 callback — they said try again later",
    "won":       "🏆 won — signed up as customer",
    "dead":      "❌ dead — not interested or unreachable",
}
RADIUS_OPTIONS = [1, 3, 5, 10, 25]

CSS = """
<style>
  .reason-box { padding: 0.75rem 1rem; border-radius: 8px; margin: 0.5rem 0 1rem;
                background: rgba(255, 200, 0, 0.08); border-left: 4px solid #ffc107; }
  .reason-box.good     { background: rgba(0, 200, 100, 0.08); border-left-color: #00c864; }
  .reason-box.warning  { background: rgba(231, 76, 60, 0.10); border-left-color: #e74c3c; }
  div[data-testid="stMetric"] { background: rgba(255,255,255,0.03);
                                padding: 0.75rem; border-radius: 8px; }
  .script-box { padding: 1rem; background: rgba(0, 200, 100, 0.06);
                border-radius: 8px; border: 1px solid rgba(0, 200, 100, 0.25);
                font-size: 0.95rem; line-height: 1.5; }
</style>
"""
st.markdown(CSS, unsafe_allow_html=True)


# ---------------- sidebar ---------------- #

with st.sidebar:
    st.header("🎯 Scan an area")
    location = st.text_input(
        "Postal code, city, or address",
        placeholder="e.g. L6E 1H7  •  M5V Toronto  •  90210",
        help="Free-form. Works for Canadian postal codes, US ZIPs, and full addresses.",
    )
    radius_km = st.select_slider(
        "Radius (km)", options=RADIUS_OPTIONS, value=5,
        help="Strict circle around the geocoded center.",
    )
    selected_cats = st.multiselect(
        "Business categories", CATEGORIES,
        default=["barber", "hair salon", "nail salon"],
        help="One query per category.",
    )
    cost = estimate_cost(len(selected_cats))
    calls = len(selected_cats) * 3 + 1
    secs = estimate_seconds(len(selected_cats))
    mins, rem = divmod(secs, 60)
    time_str = f"~{mins}m {rem}s" if mins else f"~{secs}s"
    st.markdown(
        f"⏱️ **{time_str}** • {calls} API calls • est. cost **\\${cost}**  \n"
        f"_Your \\$410 free credit covers ~{int(410/max(cost, 0.01))} of these scans._"
    )
    scan_clicked = st.button("🔍 Scan area", type="primary",
                             disabled=not (location and selected_cats),
                             use_container_width=True)
    st.caption("💾 Results save to disk — close your laptop, leads stay. "
               "Re-scanning the same area within 7 days uses cache (no API call).")

    st.divider()
    st.subheader("Filter the lead list")
    lead_type_filter = st.multiselect(
        "Lead type", list(LEAD_TYPE_LABELS), default=SELLABLE,
        format_func=lambda x: LEAD_TYPE_LABELS[x],
    )
    status_filter = st.multiselect(
        "Status", list(STATUS_OPTIONS), default=["new", "contacted"],
        format_func=lambda x: STATUS_OPTIONS[x],
    )
    location_filter = st.text_input(
        "Filter by address text (optional)",
        placeholder="e.g. Markham, M5V, Yonge",
    )


# ---------------- header + stats ---------------- #

st.title("🔎 website_find")
st.caption("Find local businesses without real websites — verify, call, and convert.")

counts = db.total_lead_counts()
total_leads = sum(counts.values())
sellable = sum(counts.get(t, 0) for t in SELLABLE)
calls_used = db.monthly_api_call_count()
free_remaining = max(0, 1000 - calls_used)
overage = round(max(0, calls_used - 1000) * 0.028, 2)

c1, c2, c3, c4 = st.columns(4)
c1.metric("Total in DB",      total_leads)
c2.metric("Sellable leads",   sellable, help="Dead + template + no website + social only.")
c3.metric("API calls / month", calls_used, f"{free_remaining} free remaining", delta_color="off")
c4.metric("Spend this month", f"${overage}", "covered by $410 credit", delta_color="off")


# ---------------- scan execution ---------------- #

if scan_clicked:
    if db.recent_scan(location, float(radius_km), selected_cats):
        st.info(f"✅ Cache hit: this exact `{location}` ({radius_km}km, {len(selected_cats)} cats) "
                "was scanned in the last 7 days.")
    else:
        progress = st.progress(0.0, text="Starting scan…")
        def update(done, total, label, found):
            progress.progress(done / total, text=f"{label} • {done}/{total} • {found} found")
        try:
            places, formatted = scan_area(location, selected_cats,
                                          radius_km=radius_km, on_progress=update)
        except ValueError as e:
            progress.empty(); st.error(f"❌ {e}"); st.stop()
        classified = classify_all(places)
        db.upsert_leads(classified)
        db.record_scan(location, float(radius_km), selected_cats, len(classified))
        progress.empty()
        new_sellable = sum(1 for _, t in classified if t in SELLABLE)
        st.success(f"✅ Scanned **{formatted}** ({radius_km}km). "
                   f"Found **{len(classified)} businesses**, **{new_sellable} sellable leads**.")


# ---------------- load filtered leads ---------------- #

df = db.load_leads(
    location=location_filter or None,
    lead_types=lead_type_filter or None,
    statuses=status_filter or None,
)

tab_leads, tab_map, tab_tools = st.tabs(["📋 Leads", "🗺️ Map", "🔧 Tools"])


# ============== TAB 1: LEADS ============== #

with tab_leads:
    st.subheader(f"Leads ({len(df)} matching)")

    if df.empty:
        st.info("👈 Run a scan to find leads, or widen your filters.")
    else:
        view = df.copy()
        view["★"]       = view["rating"].apply(lambda x: f"{x:.1f}" if x == x else "—")
        view["Reviews"] = view["review_count"].apply(lambda x: int(x) if x == x else 0)
        view["Type"]    = view["lead_type"].map(LEAD_TYPE_LABELS).fillna(view["lead_type"])
        view["📞 Call"] = view["phone"].apply(
            lambda p: f"tel:{p.replace(' ', '')}" if isinstance(p, str) and p else None)
        view["📍 Maps"] = view.apply(lambda r: r["google_maps_uri"] or
            f"https://www.google.com/maps/search/?api=1&query={quote_plus(str(r['name'])+' '+str(r['address']))}",
            axis=1)
        view["🔍 Verify"] = view.apply(lambda r:
            f"https://www.google.com/search?q={quote_plus(str(r['name'])+' '+str(r['address'])+' website')}",
            axis=1)
        view["🌐 Site"] = view["website_uri"]
        cols = ["name", "★", "Reviews", "📞 Call", "📍 Maps", "🔍 Verify",
                "🌐 Site", "address", "Type", "status"]
        view = view[cols].rename(columns={"name": "Business", "address": "Address", "status": "Status"})

        event = st.dataframe(
            view, hide_index=True, use_container_width=True,
            on_select="rerun", selection_mode="single-row",
            column_config={
                "Business":   st.column_config.TextColumn(width="medium", pinned=True),
                "★":          st.column_config.TextColumn(width="small"),
                "Reviews":    st.column_config.NumberColumn(width="small"),
                "📞 Call":    st.column_config.LinkColumn(width="small", display_text="Call"),
                "📍 Maps":    st.column_config.LinkColumn(width="small", display_text="Open"),
                "🔍 Verify":  st.column_config.LinkColumn(width="small", display_text="Search"),
                "🌐 Site":    st.column_config.LinkColumn(width="small", display_text="Visit"),
                "Address":    st.column_config.TextColumn(width="large"),
                "Type":       st.column_config.TextColumn(width="medium"),
                "Status":     st.column_config.TextColumn(width="small"),
            },
            height=520,
        )

        st.divider()
        selected_rows = event.selection.rows if event.selection else []
        if not selected_rows:
            st.info("⬆️ Click a row above to see the detail panel.")
        else:
            row = df.iloc[selected_rows[0]]
            with st.container(border=True):
                # Header
                head_l, head_r = st.columns([3, 1])
                with head_l:
                    rating_str = (f" • ★ {row.rating:.1f} ({int(row.review_count)} reviews)"
                                  if row.rating == row.rating else "")
                    st.markdown(f"## {row['name']}{rating_str}")
                    st.caption(f"📍 {row['address']}  •  🏷️ {row['category']}")
                with head_r:
                    st.markdown(f"**{LEAD_TYPE_LABELS.get(row.lead_type, row.lead_type)}**")
                    if row.website_status:
                        st.caption(f"Website check: **{row.website_status}** "
                                   f"({row.website_status_checked_at or 'unknown'})")

                # Reason callout — varies by lead type
                if row.lead_type == "dead_website":
                    st.markdown('<div class="reason-box warning">💥 <b>Their website is down or broken.</b> '
                                'High-urgency lead — they\'re losing customers right now.</div>',
                                unsafe_allow_html=True)
                elif row.lead_type == "template_only":
                    st.markdown(f'<div class="reason-box">🧩 <b>Vendor-template page only:</b> {row.website_uri}<br>'
                                'They use a booking platform but don\'t have a real branded site.</div>',
                                unsafe_allow_html=True)
                elif row.lead_type == "no_website":
                    st.markdown('<div class="reason-box good">✅ <b>No website found on Google.</b> '
                                'Strong lead — they have a Google listing but nowhere to send customers.</div>',
                                unsafe_allow_html=True)
                elif row.lead_type == "social_only":
                    st.markdown(f'<div class="reason-box">📷 <b>Only has a social link:</b> {row.website_uri}<br>'
                                'They care about presence but never built a real site.</div>',
                                unsafe_allow_html=True)
                elif row.lead_type == "has_website":
                    st.markdown(f'<div class="reason-box">ℹ️ Has a website: {row.website_uri}</div>',
                                unsafe_allow_html=True)

                # NaN-safe accessors (pandas turns SQL NULL into NaN/None)
                def _s(v):
                    return v if isinstance(v, str) and v else ""
                _phone   = _s(row.phone)
                _website = _s(row.website_uri)
                _maps    = _s(row.google_maps_uri)
                _name    = _s(row["name"])
                _address = _s(row["address"])

                # Action buttons
                a1, a2, a3, a4 = st.columns(4)
                if _phone:
                    a1.link_button(f"📞 {_phone}", url=f"tel:{_phone.replace(' ', '')}",
                                   use_container_width=True, type="primary")
                else:
                    a1.button("📞 No phone", disabled=True, use_container_width=True)

                maps_url = _maps or \
                    f"https://www.google.com/maps/search/?api=1&query={quote_plus(_name + ' ' + _address)}"
                a2.link_button("📍 Maps", url=maps_url, use_container_width=True)
                search_url = f"https://www.google.com/search?q={quote_plus(_name + ' ' + _address + ' website')}"
                a3.link_button("🔍 Verify", url=search_url, use_container_width=True)
                if _website:
                    a4.link_button("🌐 Open site", url=_website, use_container_width=True)
                else:
                    a4.button("🌐 No site", disabled=True, use_container_width=True)

                # Verify website + outreach script (NEW Phase 7)
                v1, v2 = st.columns(2)
                if _website:
                    if v1.button("✅ Verify this website now", use_container_width=True,
                                 key=f"vbtn_{row.place_id}"):
                        with st.spinner("Checking..."):
                            status = verify.check(_website)
                            new_type = verify.refine_lead_type(row.lead_type, status)
                            db.update_lead(row.place_id,
                                           website_status=status,
                                           website_status_checked_at=verify.now_iso(),
                                           lead_type=new_type)
                        st.toast(f"Status: {status}. Reclassified as: {new_type}", icon="✅")
                        st.rerun()
                else:
                    v1.button("✅ Nothing to verify (no URL)", disabled=True, use_container_width=True)

                if v2.button("✍️ Generate outreach script", use_container_width=True,
                             key=f"sbtn_{row.place_id}"):
                    info = outreach.LeadInfo(
                        name=_name, category=_s(row["category"]),
                        rating=float(row.rating) if row.rating == row.rating else None,
                        review_count=int(row.review_count) if row.review_count == row.review_count else None,
                        address=_address, lead_type=row.lead_type,
                        website_uri=_website or None,
                    )
                    script = outreach.generate_script(info)
                    db.update_lead(row.place_id,
                                   outreach_script=script,
                                   outreach_script_at=verify.now_iso())
                    st.rerun()

                # NEW Phase 9: Email body + AI mockup
                e1, e2 = st.columns(2)
                if e1.button("✉️ Generate email body", use_container_width=True,
                             key=f"ebtn_{row.place_id}"):
                    info = email_gen.LeadInfo(
                        name=_name, category=_s(row["category"]),
                        rating=float(row.rating) if row.rating == row.rating else None,
                        review_count=int(row.review_count) if row.review_count == row.review_count else None,
                        address=_address, lead_type=row.lead_type,
                        website_uri=_website or None,
                    )
                    result = email_gen.generate(info)
                    db.update_lead(row.place_id,
                                   email_subject=result["subject"],
                                   email_body=result["body"],
                                   email_generated_at=verify.now_iso())
                    st.rerun()

                if e2.button("🖼️ Generate website mockup (AI, ~60 sec)",
                             use_container_width=True, key=f"mbtn_{row.place_id}"):
                    info = mockup.LeadInfo(
                        name=_name, category=_s(row["category"]),
                        rating=float(row.rating) if row.rating == row.rating else None,
                        review_count=int(row.review_count) if row.review_count == row.review_count else None,
                        address=_address, lead_type=row.lead_type,
                        website_uri=_website or None,
                    )
                    with st.spinner("Fetching the business's own photos + calling Gemini Pro to design their site..."):
                        try:
                            html = mockup.generate_html(info, place_id=row.place_id)
                            db.update_lead(row.place_id,
                                           mockup_html=html,
                                           mockup_generated_at=verify.now_iso())
                            st.toast("Mockup ready — scroll down to preview.", icon="🖼️")
                        except Exception as err:
                            import traceback
                            st.error(f"Mockup generation failed: {err}")
                            st.code(traceback.format_exc())
                    st.rerun()

                _script = row.outreach_script if isinstance(row.outreach_script, str) else ""
                if _script:
                    st.markdown("##### 📞 Cold-call script")
                    st.markdown(f'<div class="script-box">{_script.replace(chr(10), "<br>")}</div>',
                                unsafe_allow_html=True)

                _email_subject = row.email_subject if isinstance(row.email_subject, str) else ""
                _email_body    = row.email_body    if isinstance(row.email_body, str) else ""
                if _email_subject or _email_body:
                    st.markdown("##### ✉️ Email")
                    st.text_input("Subject (click in box, Cmd+A, Cmd+C)", value=_email_subject,
                                  key=f"esub_{row.place_id}")
                    st.text_area("Body (click in box, Cmd+A, Cmd+C)", value=_email_body, height=280,
                                 key=f"ebody_{row.place_id}")

                _mockup_html = row.mockup_html if isinstance(row.mockup_html, str) else ""
                if _mockup_html:
                    st.markdown("##### 🖼️ AI mockup preview")
                    _public_mockup = mockup.public_mockup_url(row.place_id)
                    st.caption(f"Public URL (share in DMs / emails): {_public_mockup}")
                    st.components.v1.html(_mockup_html, height=900, scrolling=True)
                    st.download_button(
                        "⬇️ Download mockup HTML",
                        data=_mockup_html.encode("utf-8"),
                        file_name=f"{_name.replace(' ', '_')}_mockup.html",
                        mime="text/html",
                        key=f"mdl_{row.place_id}",
                    )

                # Instagram DM helper — only for leads with a parseable IG handle
                _ig_handle = dm_gen.extract_handle(_website)
                if _ig_handle:
                    st.markdown("##### 📷 Instagram DM")
                    _dm_message = dm_gen.generate_dm(
                        business_name=_name,
                        category=_s(row["category"]),
                        rating=float(row.rating) if row.rating == row.rating else None,
                        review_count=int(row.review_count) if row.review_count == row.review_count else None,
                        mockup_url=_public_mockup if _mockup_html else None,
                    )
                    st.text_area(
                        f"DM to send to @{_ig_handle} (click in box, Cmd+A, Cmd+C to copy)",
                        value=_dm_message, height=160, key=f"dm_{row.place_id}",
                    )
                    if not _mockup_html:
                        st.caption("⚠️ Generate a mockup first — the DM will then include the link.")
                    d1, d2 = st.columns(2)
                    d1.link_button(
                        f"🔗 Open @{_ig_handle} on Instagram",
                        url=dm_gen.profile_url(_ig_handle),
                        use_container_width=True,
                        type="primary",
                    )
                    d2.caption("On IG, click 'Message' on their profile, paste the DM (Cmd+V), hit send.")

                # Status + notes
                st.markdown("##### Update status & notes")
                s1, s2 = st.columns([1, 3])
                with s1:
                    new_status = st.selectbox(
                        "Status", list(STATUS_OPTIONS),
                        index=list(STATUS_OPTIONS).index(row.status),
                        format_func=lambda x: STATUS_OPTIONS[x],
                        key=f"status_{row.place_id}",
                    )
                with s2:
                    _notes = row.notes if isinstance(row.notes, str) else ""
                    new_notes = st.text_area(
                        "Notes (call notes, decision-maker name, follow-up date)",
                        value=_notes, key=f"notes_{row.place_id}", height=80,
                    )
                save_l, save_r = st.columns([1, 4])
                if save_l.button("💾 Save", type="primary", use_container_width=True,
                                 key=f"save_{row.place_id}"):
                    update_kwargs = {"status": new_status, "notes": new_notes}
                    if new_status == "contacted" and row.status != "contacted":
                        update_kwargs["last_contacted_at"] = verify.now_iso()
                    db.update_lead(row.place_id, **update_kwargs)
                    st.toast(f"Saved: {row['name']}", icon="💾")
                    st.rerun()
                contacted_str = (f" • Last contacted {row.last_contacted_at}"
                                 if isinstance(row.last_contacted_at, str) and row.last_contacted_at else "")
                save_r.caption(f"`{row.place_id}` • last seen {row.last_seen}{contacted_str}")

        st.divider()
        st.download_button(
            "⬇️ Download filtered CSV",
            data=df.to_csv(index=False).encode("utf-8"),
            file_name="website_find_leads.csv", mime="text/csv",
        )


# ============== TAB 2: MAP ============== #

with tab_map:
    st.subheader("🗺️ Lead map")
    mapped = df[df["lat"].notna() & df["lng"].notna()].copy()
    missing = len(df) - len(mapped)
    if missing > 0:
        st.warning(f"{missing} of {len(df)} leads are missing coordinates "
                   "(scanned before lat/lng was tracked). Use the **🔧 Tools** tab to backfill.")
    if mapped.empty:
        st.info("No mappable leads yet. Scan an area or backfill coordinates from the Tools tab.")
    else:
        center_lat = mapped["lat"].mean()
        center_lng = mapped["lng"].mean()
        m = folium.Map(location=[center_lat, center_lng], zoom_start=12, tiles="cartodbpositron")
        for _, r in mapped.iterrows():
            color = LEAD_TYPE_COLOR.get(r["lead_type"], "#666")
            popup_html = (
                f"<b>{r['name']}</b><br>"
                f"{LEAD_TYPE_LABELS.get(r['lead_type'], r['lead_type'])}<br>"
                f"★ {r['rating'] if r['rating']==r['rating'] else '-'} "
                f"({int(r['review_count']) if r['review_count']==r['review_count'] else 0} reviews)<br>"
                f"📍 {r['address']}<br>"
                f"📞 {r['phone'] or '—'}"
            )
            folium.CircleMarker(
                location=[r["lat"], r["lng"]],
                radius=7, color=color, fill=True, fill_color=color, fill_opacity=0.85,
                popup=folium.Popup(popup_html, max_width=300),
                tooltip=r["name"],
            ).add_to(m)
        st_folium(m, width=None, height=600, returned_objects=[])
        # Legend
        legend_html = " &nbsp;&nbsp; ".join(
            f'<span style="color:{LEAD_TYPE_COLOR[t]};font-size:1.4em">●</span> {LEAD_TYPE_LABELS[t]}'
            for t in SELLABLE + ["has_website"]
        )
        st.markdown(legend_html, unsafe_allow_html=True)


# ============== TAB 3: TOOLS ============== #

with tab_tools:
    st.subheader("🔧 Bulk actions")

    # Verify all websites
    needing_verify = db.leads_needing_verify()
    st.markdown(f"### 1. Verify websites — {len(needing_verify)} leads need it")
    st.caption("Visits each website URL, detects dead links / template-only pages / "
               "redirects to social. Reclassifies leads accordingly. Free, ~5–15 min for hundreds.")
    if needing_verify and st.button(f"✅ Verify all {len(needing_verify)} websites",
                                     type="primary"):
        progress = st.progress(0.0, text="Starting...")
        results = {}
        with ThreadPoolExecutor(max_workers=16) as pool:
            futs = {pool.submit(verify.check, url): (pid, url) for pid, url in needing_verify}
            done = 0
            for fut in as_completed(futs):
                pid, url = futs[fut]
                status = fut.result()
                results.setdefault(status, 0)
                results[status] += 1
                cur = db.load_leads().query("place_id == @pid").iloc[0]
                new_type = verify.refine_lead_type(cur["lead_type"], status)
                db.update_lead(pid, website_status=status,
                               website_status_checked_at=verify.now_iso(),
                               lead_type=new_type)
                done += 1
                progress.progress(done / len(needing_verify),
                                  text=f"Checked {done}/{len(needing_verify)}: {url[:60]}")
        progress.empty()
        st.success(f"Done. Results: {results}")
        st.rerun()

    st.divider()

    # Backfill coords
    needing_geo = db.leads_needing_geocode()
    st.markdown(f"### 2. Backfill coordinates — {len(needing_geo)} leads need it")
    st.caption("Geocodes the address of each lead missing lat/lng so they show on the map. "
               "Uses Geocoding API (separate 10k/month free tier — should cost $0).")
    if needing_geo and st.button(f"📍 Backfill {len(needing_geo)} coordinates",
                                  type="primary"):
        progress = st.progress(0.0, text="Geocoding...")
        done = 0
        with ThreadPoolExecutor(max_workers=8) as pool:
            futs = {pool.submit(geocode, addr): pid for pid, addr in needing_geo}
            for fut in as_completed(futs):
                pid = futs[fut]
                try:
                    lat, lng, _ = fut.result()
                    db.set_coords(pid, lat, lng)
                except Exception:
                    pass
                done += 1
                progress.progress(done / len(needing_geo),
                                  text=f"Geocoded {done}/{len(needing_geo)}")
        progress.empty()
        st.success(f"Backfilled coordinates for {done} leads. Switch to Map tab.")
        st.rerun()

    st.divider()
    st.markdown("### Lead-type breakdown")
    counts_df = {LEAD_TYPE_LABELS.get(k, k): v for k, v in counts.items()}
    st.bar_chart(counts_df)
