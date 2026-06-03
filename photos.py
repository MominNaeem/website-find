"""Fetch and cache real business photos from Google Places.

Each lead has photos already taken (by customers/owners) and visible on its
Google Maps profile. We pull up to 6 of them, download to local cache on
disk, serve them via Caddy at /static/photos/, and pass their URLs + sizes
into the mockup prompt so the AI can use the BUSINESS'S OWN photos in the
right sections (landscape for hero, varied for services, etc).
"""
from __future__ import annotations

import json
import os
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv()


def _get_env(key: str, default: str = "") -> str:
    val = os.environ.get(key, "")
    if not val:
        try:
            import streamlit as st
            val = st.secrets.get(key, "")
        except Exception:
            pass
    return val or default


API_KEY = _get_env("GOOGLE_PLACES_API_KEY")
# Public base URL for serving photos. Must be absolute so downloaded HTML
# files still load images correctly from EC2 (paths starting with /static/
# break when the HTML is opened locally).
PUBLIC_BASE = os.environ.get("PUBLIC_BASE", "https://15-156-6-65.sslip.io")
PHOTO_CACHE = Path(__file__).parent / "static" / "photos"
PHOTO_CACHE.mkdir(parents=True, exist_ok=True)

PLACE_DETAILS = "https://places.googleapis.com/v1/places/{place_id}"
PHOTO_MEDIA   = "https://places.googleapis.com/v1/{photo_name}/media"
TIMEOUT = 20


def _safe_id(place_id: str) -> str:
    """Filename-safe place_id (Google IDs already are, but just in case)."""
    return place_id.replace("/", "_").replace(":", "_")


def fetch_photo_metadata(place_id: str) -> list[dict]:
    """Get up to ~10 photo metadata entries for a Place via Place Details."""
    headers = {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "photos",
    }
    r = requests.get(PLACE_DETAILS.format(place_id=place_id),
                     headers=headers, timeout=TIMEOUT)
    if r.status_code != 200:
        return []
    return r.json().get("photos", [])


def download_photo(photo_name: str, max_width: int = 1600) -> bytes | None:
    """Resolve a photo name to actual JPEG bytes via Places Photo API."""
    headers = {"X-Goog-Api-Key": API_KEY}
    r = requests.get(PHOTO_MEDIA.format(photo_name=photo_name),
                     headers=headers, params={"maxWidthPx": max_width},
                     timeout=TIMEOUT, allow_redirects=True)
    if r.status_code != 200 or not r.content:
        return None
    return r.content


def fetch_and_cache(place_id: str, max_photos: int = 6) -> list[dict]:
    """Fetch + cache up to N photos for a business.

    Returns a list of {url, width, height, orientation, attribution} where
    `url` is a path under our own server (/static/photos/...) — stable, no
    API key exposure, served by Caddy.
    """
    metadata = fetch_photo_metadata(place_id)[:max_photos]
    if not metadata:
        return []

    out: list[dict] = []
    safe = _safe_id(place_id)
    for i, p in enumerate(metadata):
        photo_name = p.get("name")
        if not photo_name:
            continue
        path = PHOTO_CACHE / f"{safe}_{i}.jpg"
        if not path.exists() or path.stat().st_size == 0:
            data = download_photo(photo_name)
            if not data:
                continue
            path.write_bytes(data)
        w = p.get("widthPx", 1600)
        h = p.get("heightPx", 900)
        attribs = p.get("authorAttributions", [])
        attribution = ", ".join(a.get("displayName", "") for a in attribs[:1])
        out.append({
            "url": f"{PUBLIC_BASE}/assets/photos/{safe}_{i}.jpg",
            "width": w,
            "height": h,
            "orientation": "landscape" if w >= h else "portrait",
            "attribution": attribution,
        })
    return out


def fetch_with_ai_fallback(
    place_id: str, category: str, target_count: int = 4
) -> list[dict]:
    """Get real Google Maps photos; if fewer than `target_count`, fill the gap
    with AI-generated images via Imagen 3. Always returns up to `target_count`
    photo dicts.
    """
    real = fetch_and_cache(place_id, max_photos=target_count)
    if len(real) >= target_count:
        return real[:target_count]

    import ai_images
    needed = target_count - len(real)
    if not real:
        slots = ["hero", "about", "service", "service"][:needed]
    else:
        slots = ["service"] * needed
    ai = ai_images.generate_for_slots(place_id, category, slots)
    return real + ai


def to_prompt_block(photos: list[dict]) -> str:
    """Format photo list for inclusion in the AI prompt with placement guidance."""
    if not photos:
        return ("NO PHOTOS AVAILABLE for this business. Use abstract CSS gradients/shapes "
                "(Stripe/Linear style) instead of broken image tags. Do NOT invent any image URLs.")

    lines = [
        "═══ AVAILABLE IMAGES — USE EVERY SINGLE ONE ═══",
        "These are the ONLY image URLs you may use. Each one MUST appear in the final HTML.",
        "Do not invent Unsplash URLs or any other image source.",
        "",
    ]
    for i, p in enumerate(photos):
        lines.append(f"  Image {i+1}: src=\"{p['url']}\"  ({p['width']}x{p['height']}, {p['orientation']})")

    landscape_indices = [i+1 for i, p in enumerate(photos) if p["orientation"] == "landscape"]
    lines.append("")
    lines.append("MANDATORY PLACEMENT (you MUST follow this — no excuses):")
    hero_idx = landscape_indices[0] if landscape_indices else 1
    lines.append(f"  • HERO section: full-bleed background or split-pane right side using Image {hero_idx}.")
    if len(photos) >= 2:
        about_idx = next((i+1 for i, p in enumerate(photos)
                          if i+1 != hero_idx), 2)
        lines.append(f"  • ABOUT section: side-by-side image + content using Image {about_idx}.")
    remaining = [i+1 for i in range(len(photos))
                 if i+1 != hero_idx and i+1 != (about_idx if len(photos) >= 2 else -1)]
    if remaining:
        lines.append(f"  • SERVICES section: each service card MUST have a thumbnail/background image. "
                     f"Use these for the service cards: {', '.join(f'Image {x}' for x in remaining)}. "
                     f"If you have more service cards than remaining images, REUSE images.")
    lines.append("  • DO NOT leave ANY section without visual interest. Sections with no provided image "
                 "should use category-tinted gradient backgrounds.")
    lines.append("  • Use <img loading='lazy' alt='...'> with object-fit:cover sized to fill its slot.")
    lines.append("  • Use the EXACT src URLs above. They are absolute (https://...) so they work in "
                 "downloaded HTML files too. Do NOT change them to relative paths.")
    lines.append(f"  • THERE ARE EXACTLY {len(photos)} IMAGES. If you have more sections needing images "
                 f"(e.g. 6 service cards but only {len(photos)} images), REUSE the URLs above. "
                 f"NEVER invent _4, _5, or any other URL pattern beyond what's listed. "
                 f"Hallucinated URLs cause broken images.")

    attributions = sorted({p["attribution"] for p in photos if p["attribution"]})
    if attributions:
        lines.append(f"  • Include in footer: 'Photos: {', '.join(attributions[:3])} (via Google Maps + AI mockup)'")
    return "\n".join(lines)
