"""Database layer — backed by Supabase (Postgres).

Drop-in replacement for the old SQLite version.  Every public function
keeps the same signature so the rest of the app doesn't need changes.
"""
from __future__ import annotations

import json
import os
from datetime import datetime, timedelta, timezone

import pandas as pd
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

# --------------- connection ------------------------------------------------ #

_client: Client | None = None


def _sb() -> Client:
    """Lazy singleton — checks env vars then Streamlit secrets."""
    global _client
    if _client is None:
        url = os.environ.get("SUPABASE_URL", "")
        key = os.environ.get("SUPABASE_KEY", "")
        if not url or not key:
            try:
                import streamlit as st
                url = url or st.secrets.get("SUPABASE_URL", "")
                key = key or st.secrets.get("SUPABASE_KEY", "")
            except Exception:
                pass
        _client = create_client(url, key)
    return _client


# --------------- helpers --------------------------------------------------- #

def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# --------------- public API (same signatures as before) -------------------- #

def init_db() -> None:
    """No-op — tables are created via Supabase SQL editor."""
    pass


def upsert_leads(classified: list) -> int:
    """Insert new leads, refresh metadata on existing — preserve status/notes."""
    if not classified:
        return 0
    now = _now()
    rows = []
    for place, lead_type in classified:
        rows.append({
            "place_id":        place.id,
            "name":            place.name,
            "address":         place.address,
            "phone":           place.phone,
            "category":        place.category,
            "search_term":     place.search_term,
            "website_uri":     place.website,
            "google_maps_uri": place.google_maps_uri,
            "rating":          place.rating,
            "review_count":    place.review_count,
            "lat":             place.lat,
            "lng":             place.lng,
            "lead_type":       lead_type,
            "first_seen":      now,
            "last_seen":       now,
        })
    # Upsert in batches of 500 (Supabase limit)
    for i in range(0, len(rows), 500):
        batch = rows[i:i + 500]
        _sb().table("leads").upsert(
            batch,
            on_conflict="place_id",
        ).execute()
    return len(rows)


def record_scan(location: str, radius_km: float,
                categories: list[str], result_count: int) -> None:
    _sb().table("scans").insert({
        "location":     location,
        "radius_km":    radius_km,
        "categories":   json.dumps(sorted(categories)),
        "scanned_at":   _now(),
        "result_count": result_count,
    }).execute()


def recent_scan(location: str, radius_km: float,
                categories: list[str], within_days: int = 7) -> bool:
    cutoff = (datetime.now(timezone.utc) - timedelta(days=within_days)).isoformat(timespec="seconds")
    cats_json = json.dumps(sorted(categories))
    resp = (
        _sb().table("scans")
        .select("id")
        .eq("location", location)
        .eq("radius_km", radius_km)
        .eq("categories", cats_json)
        .gte("scanned_at", cutoff)
        .limit(1)
        .execute()
    )
    return len(resp.data) > 0


def load_leads(
    location: str | None = None,
    lead_types: list[str] | None = None,
    statuses: list[str] | None = None,
) -> pd.DataFrame:
    q = _sb().table("leads").select("*")
    if location:
        q = q.ilike("address", f"%{location}%")
    if lead_types:
        q = q.in_("lead_type", lead_types)
    if statuses:
        q = q.in_("status", statuses)
    q = q.order("rating", desc=True, nullsfirst=False)
    q = q.order("review_count", desc=True, nullsfirst=False)
    q = q.order("name")
    # Paginate to get all results
    all_rows: list[dict] = []
    page_size = 1000
    offset = 0
    while True:
        resp = q.limit(page_size).offset(offset).execute()
        all_rows.extend(resp.data)
        if len(resp.data) < page_size:
            break
        offset += page_size
    if not all_rows:
        return pd.DataFrame()
    return pd.DataFrame(all_rows)


def update_lead(
    place_id: str,
    status: str | None = None,
    notes: str | None = None,
    last_contacted_at: str | None = None,
    website_status: str | None = None,
    website_status_checked_at: str | None = None,
    lead_type: str | None = None,
    outreach_script: str | None = None,
    outreach_script_at: str | None = None,
    email_subject: str | None = None,
    email_body: str | None = None,
    email_generated_at: str | None = None,
    mockup_html: str | None = None,
    mockup_generated_at: str | None = None,
) -> None:
    updates = {}
    for col, val in [
        ("status", status), ("notes", notes),
        ("last_contacted_at", last_contacted_at),
        ("website_status", website_status),
        ("website_status_checked_at", website_status_checked_at),
        ("lead_type", lead_type),
        ("outreach_script", outreach_script),
        ("outreach_script_at", outreach_script_at),
        ("email_subject", email_subject),
        ("email_body", email_body),
        ("email_generated_at", email_generated_at),
        ("mockup_html", mockup_html),
        ("mockup_generated_at", mockup_generated_at),
    ]:
        if val is not None:
            updates[col] = val
    if not updates:
        return
    _sb().table("leads").update(updates).eq("place_id", place_id).execute()


def leads_needing_verify(limit: int | None = None) -> list[tuple[str, str]]:
    q = (_sb().table("leads")
         .select("place_id, website_uri")
         .neq("website_uri", "")
         .not_.is_("website_uri", "null")
         .is_("website_status", "null"))
    q = q.limit(limit if limit else 10000)
    resp = q.execute()
    return [(r["place_id"], r["website_uri"]) for r in resp.data]


def leads_needing_geocode(limit: int | None = None) -> list[tuple[str, str]]:
    q = (_sb().table("leads")
         .select("place_id, address")
         .is_("lat", "null")
         .not_.is_("address", "null"))
    q = q.limit(limit if limit else 10000)
    resp = q.execute()
    return [(r["place_id"], r["address"]) for r in resp.data]


def set_coords(place_id: str, lat: float, lng: float) -> None:
    _sb().table("leads").update({"lat": lat, "lng": lng}).eq("place_id", place_id).execute()


def monthly_api_call_count() -> int:
    start = datetime.now(timezone.utc).replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    resp = (_sb().table("scans")
            .select("categories")
            .gte("scanned_at", start.isoformat(timespec="seconds"))
            .limit(1000)
            .execute())
    return sum(len(json.loads(r["categories"])) * 3 + 1 for r in resp.data)


def _fetch_all(table: str, columns: str = "*", **filters) -> list[dict]:
    """Paginate through all rows (Supabase caps at 1000 per request)."""
    all_rows: list[dict] = []
    page_size = 1000
    offset = 0
    while True:
        q = _sb().table(table).select(columns).limit(page_size).offset(offset)
        for col, val in filters.items():
            q = q.eq(col, val)
        resp = q.execute()
        all_rows.extend(resp.data)
        if len(resp.data) < page_size:
            break
        offset += page_size
    return all_rows


def total_lead_counts() -> dict[str, int]:
    rows = _fetch_all("leads", "lead_type")
    counts: dict[str, int] = {}
    for row in rows:
        lt = row["lead_type"]
        counts[lt] = counts.get(lt, 0) + 1
    return counts
