# Lessons Learned — website_find

## L1 — Don't ship MVP UIs as dense tables for end-user workflows
**What happened:** I shipped Phase 4 as a `st.data_editor` table with 9 columns and called it done. User feedback: "everything is small and hard to read", "no direction to the next step", "shouldn't I open it in google with a link and see what its about?"

**Rule:** When the user's job-to-be-done involves *acting on* each row (calling, verifying, marking status), a dense table is the wrong primitive. The UI must:
- Make the next physical action obvious (`tel:` button to call, link buttons to verify)
- Surface the "why is this a lead" reason inline, not implicit in a column value
- Be scannable with clear visual hierarchy (cards, headers, colored badges)
- Give a clickable path to *verify* the lead before acting (Google Maps + Google Search links)

**For Streamlit specifically:** `st.dataframe(..., on_select="rerun", selection_mode="single-row")` + a detail panel below the table is the right pattern. Use `st.link_button` for tel:/maps links — they look like real CTAs.

**Apply to:** anything user-facing where the user takes an action per row.

---

## L2 — When using a geo API, ASK whether the user wants strict radius or fuzzy area
**What happened:** I used Places API Text Search with free-form queries like "barber in L6E 1H7", which Google interprets loosely (returned results across all of Markham, not within the postal code). User asked "is this a 5km radius or 10km?" — meaning the spread was confusing.

**Rule:** Geographic searches need an explicit radius parameter from the user, not a guess. Default to 5km but make it adjustable. Use `locationRestriction: { circle: { center, radius_meters } }` for hard enforcement. Geocode the user's input first to get a center.

**Apply to:** any local-business / map-based query.

---

## L3 — Free trial credits != trial mode
**What happened:** User saw "upgraded from free trial" in the billing UI and panicked thinking they would now be charged. In reality, $410 of trial credit was still listed as Available; "paid account" just refers to the account *type*, not whether real money is being spent.

**Rule:** When the user mentions billing fears, distinguish between (a) account type, (b) credits remaining, (c) actual spend. Always check the Credits page (`https://console.cloud.google.com/billing/<ID>/credits`) for the precise remaining-credit number before reassuring.

---

## L6 — When adding DB columns, update update_lead() signature in the SAME commit
**What happened:** Added 5 new columns to `leads` table (email_subject, email_body, email_generated_at, mockup_html, mockup_generated_at) and updated `app.py` to write them via `db.update_lead(...email_subject=...)`. But I forgot to widen the `update_lead()` function signature in `db.py`. Result: `TypeError: update_lead() got an unexpected keyword argument 'email_subject'` — crashed on every click, and broke the rendering of every UI element that came AFTER the offending button (because Python aborted mid-render).

**Rule:** Schema changes and function-signature changes are ONE atomic unit. When I add a column with `ALTER TABLE`, the SAME edit must:
1. Add the column to the SCHEMA constant in db.py
2. Add the kwarg to `update_lead()`
3. Add the kwarg to the `pairs` list in `update_lead()`

If any of those three are missing, the write path is broken.

**Apply to:** every new field I add anywhere — Pydantic models, dataclasses, function signatures, SQL schemas, ORM models. Treat schema + read + write + accessor as one transaction.

---

## L8 — Never name a custom Caddy path the same as a framework's reserved path
**What happened:** Added `handle_path /static/* { ... }` to Caddy to serve our photos. Streamlit ALSO serves its JS/CSS bundles at `/static/*`. Caddy hijacked all `/static/*` requests, so every Streamlit JS file 404'd. Result: dashboard rendered as a blank white page for every user. Took down the live site for ~2 hours before user reported it.

**Rule:** Before mounting a path on a reverse proxy, grep the upstream app for what paths IT serves. If unsure, namespace your custom paths under something obviously distinct: `/assets/`, `/files/`, `/uploads/`, `/cdn/`. NEVER `/static/`, `/api/`, `/_/`, `/auth/` — these are reserved by countless frameworks.

**Verification rule (also from CLAUDE.md #4 again):** Any change to the reverse proxy or routing layer requires a smoke test of the MAIN app, not just the new path. After the Caddyfile change, I should have curled `/` and `/static/js/...` to confirm Streamlit still served, BEFORE declaring the work complete.

---

## L7 — Never deploy a change in two pieces (file A now, file B later)
**What happened:** I synced `app.py` (calling `db.update_lead(email_subject=...)`) to EC2 before updating `db.py` to accept that kwarg. Then declared Phase 9d "complete." User clicked the new button and the dashboard crashed. Both Eeman and I saw the error.

**Rule:** A deploy is one atomic unit. If a change touches 2 files, both files go to the server in the SAME scp call (or none do). And the "verify it works" step happens BEFORE marking the task complete — not "I deployed it, must be working."

**Connects to CLAUDE.md rule #4** ("Verify Before Done") which I violated. Bug shipped to a real user (Eeman could have hit this first).

---

## L5 — Pandas NaN values from SQLite are silent killers in Streamlit
**What happened (twice):** `if row.outreach_script:` and `if row.website_uri:` — both evaluated NaN as truthy, then crashed when calling `.replace()` / `link_button(url=NaN)`. User saw cryptic `'float' has no attribute 'replace'` and `bad argument type for built-in operation`. Affected EVERY lead clicked, not just edge cases.

**Rule:** When reading from a pandas DataFrame backed by SQLite, NEVER write `if row.col:` for a column that may be NULL. NaN is truthy in Python (`bool(float('nan')) == True`) AND not a string AND not None — three traps. Pattern to use at the top of any detail panel:

```python
def _s(v):  # NaN/None -> empty string, anything else -> str(v) if str
    return v if isinstance(v, str) and v else ""
phone = _s(row.phone); website = _s(row.website_uri); ...
# then use phone/website everywhere — never row.phone / row.website_uri directly
```

**Why this rule:** isinstance check is the only one that simultaneously rejects NaN, None, empty string, and non-string types. `pd.notna()` rejects NaN but accepts empty string. `if row.col:` accepts NaN. Truth: only `isinstance(v, str) and v` is safe.

**Apply to:** any Streamlit code that reads from a DataFrame and uses values in conditionals or string operations.

---

## L4 — Don't trust Python 3.14 venvs yet
**What happened:** `python3.14 -m venv venv` failed at `ensurepip` step. Fell back to 3.13 cleanly.

**Rule:** For any new project on this Mac, prefer `python3.13 -m venv venv`. 3.14 is too new (Apr 2026) and ensurepip has issues.
