"""Google Places API (New) client + Geocoding helper.

Text Search caps at 60 results per query, so we fan out by category to
surface every business in an area. Use Geocoding API to resolve the user's
location to lat/lng so we can constrain results to a strict radius.
"""
from __future__ import annotations

import math
import os
import time
from dataclasses import dataclass

import requests
from dotenv import load_dotenv

load_dotenv()


def _get_env(key: str) -> str:
    val = os.environ.get(key, "")
    if not val:
        try:
            import streamlit as st
            val = st.secrets.get(key, "")
        except Exception:
            pass
    if not val:
        raise RuntimeError(f"Missing env var: {key}")
    return val


API_KEY = _get_env("GOOGLE_PLACES_API_KEY")
PLACES_ENDPOINT  = "https://places.googleapis.com/v1/places:searchText"
GEOCODE_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json"

FIELD_MASK = ",".join([
    "places.id",
    "places.displayName",
    "places.formattedAddress",
    "places.websiteUri",
    "places.googleMapsUri",
    "places.businessStatus",
    "places.internationalPhoneNumber",
    "places.primaryType",
    "places.primaryTypeDisplayName",
    "places.rating",
    "places.userRatingCount",
    "places.location",
    "nextPageToken",
])

CATEGORIES = [
    "barber", "hair salon", "nail salon", "spa", "massage therapist",
    "dentist", "optometrist", "chiropractor", "physiotherapist", "veterinarian",
    "plumber", "electrician", "HVAC", "roofer", "landscaper", "general contractor",
    "restaurant", "cafe", "bakery", "pizza restaurant",
    "lawyer", "accountant", "real estate agent",
    "gym", "yoga studio",
    "auto repair shop", "car detailer",
    "pet groomer", "florist", "jeweler", "dry cleaner",
]

PAGE_SIZE = 20
MAX_PAGES = 3


@dataclass(frozen=True)
class Place:
    id: str
    name: str
    address: str
    phone: str | None
    website: str | None
    google_maps_uri: str | None
    category: str
    rating: float | None
    review_count: int | None
    lat: float | None
    lng: float | None
    business_status: str
    search_term: str

    @classmethod
    def from_api(cls, raw: dict, search_term: str) -> "Place":
        loc = raw.get("location") or {}
        return cls(
            id=raw["id"],
            name=raw.get("displayName", {}).get("text", ""),
            address=raw.get("formattedAddress", ""),
            phone=raw.get("internationalPhoneNumber"),
            website=raw.get("websiteUri"),
            google_maps_uri=raw.get("googleMapsUri"),
            category=raw.get("primaryTypeDisplayName", {}).get("text", "")
                     or raw.get("primaryType", ""),
            rating=raw.get("rating"),
            review_count=raw.get("userRatingCount"),
            lat=loc.get("latitude"),
            lng=loc.get("longitude"),
            business_status=raw.get("businessStatus", "UNKNOWN"),
            search_term=search_term,
        )


def haversine_km(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Great-circle distance in km."""
    r = 6371.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lng2 - lng1)
    a = math.sin(dp/2)**2 + math.cos(p1) * math.cos(p2) * math.sin(dl/2)**2
    return 2 * r * math.asin(math.sqrt(a))


def geocode(location: str) -> tuple[float, float, str]:
    """Resolve a postal code / city / address to (lat, lng, formatted)."""
    resp = requests.get(
        GEOCODE_ENDPOINT,
        params={"address": location, "key": API_KEY},
        timeout=15,
    )
    resp.raise_for_status()
    data = resp.json()
    if data.get("status") != "OK" or not data.get("results"):
        raise ValueError(f"Could not geocode '{location}': {data.get('status')}")
    top = data["results"][0]
    loc = top["geometry"]["location"]
    return loc["lat"], loc["lng"], top.get("formatted_address", location)


def search_text(
    query: str,
    page_token: str | None = None,
    *,
    center: tuple[float, float] | None = None,
    radius_m: int | None = None,
) -> dict:
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": FIELD_MASK,
    }
    body: dict = {"textQuery": query, "pageSize": PAGE_SIZE}
    if center and radius_m:
        # locationBias is the only circle-supporting option for searchText.
        # We post-filter for hard radius enforcement.
        body["locationBias"] = {
            "circle": {
                "center": {"latitude": center[0], "longitude": center[1]},
                "radius": float(radius_m),
            }
        }
    if page_token:
        body["pageToken"] = page_token
    resp = requests.post(PLACES_ENDPOINT, headers=headers, json=body, timeout=30)
    resp.raise_for_status()
    return resp.json()


def fetch_all_pages(query: str, **kwargs) -> list[dict]:
    """Up to 60 raw place dicts for a query (Google's hard cap)."""
    out: list[dict] = []
    token: str | None = None
    for _ in range(MAX_PAGES):
        data = search_text(query, page_token=token, **kwargs)
        out.extend(data.get("places", []))
        token = data.get("nextPageToken")
        if not token:
            break
        time.sleep(2)
    return out


def scan_area(
    location: str,
    categories: list[str],
    radius_km: float = 5.0,
    on_progress=None,
) -> tuple[list[Place], str]:
    """Run one query per category around `location` within `radius_km`.
    Dedupes, drops closed listings, hard-filters by radius (post-fetch by lat/lng).
    `on_progress(done, total, current_label, found_so_far)` fires after each category.
    Returns (places, formatted_location)."""
    if on_progress:
        on_progress(0, len(categories) + 1, "Geocoding location…", 0)
    lat, lng, formatted = geocode(location)
    radius_m = int(radius_km * 1000)
    seen: dict[str, Place] = {}
    for i, cat in enumerate(categories, start=1):
        if on_progress:
            on_progress(i, len(categories) + 1, f"Searching: {cat}", len(seen))
        for raw in fetch_all_pages(f"{cat} in {location}",
                                   center=(lat, lng), radius_m=radius_m):
            place = Place.from_api(raw, search_term=cat)
            if place.business_status != "OPERATIONAL":
                continue
            if place.lat is not None and place.lng is not None:
                if haversine_km(lat, lng, place.lat, place.lng) > radius_km:
                    continue
            if place.id not in seen:
                seen[place.id] = place
    if on_progress:
        on_progress(len(categories) + 1, len(categories) + 1,
                    "Done", len(seen))
    return list(seen.values()), formatted


def estimate_seconds(num_categories: int) -> int:
    """Rough time estimate. Each category = 1-3 pages × ~1.5s + 2s sleep between pages.
    Plus 0.5s geocode."""
    return int(0.5 + num_categories * 4.5)


def estimate_cost(num_categories: int) -> float:
    """USD estimate. Text Search Enterprise SKU = $28 per 1000 calls."""
    calls = num_categories * MAX_PAGES + 1  # +1 for the geocode call
    return round(calls * 0.028, 2)
