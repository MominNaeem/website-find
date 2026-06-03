"""AI-generated images via Imagen 3 on Vertex AI.

Used as a FALLBACK when a business has too few (or zero) real photos on
Google Maps. Generated images are cached locally so we don't regenerate.
"""
from __future__ import annotations

import os
from pathlib import Path

from google import genai

PROJECT  = os.environ.get("VERTEX_PROJECT",  "website-find-1777676850")
LOCATION = os.environ.get("VERTEX_LOCATION", "us-central1")
MODEL    = "imagen-3.0-generate-002"
PUBLIC_BASE = os.environ.get("PUBLIC_BASE", "https://15-156-6-65.sslip.io")
CACHE    = Path(__file__).parent / "static" / "photos"
CACHE.mkdir(parents=True, exist_ok=True)

_client: genai.Client | None = None


def _get_client() -> genai.Client:
    global _client
    if _client is None:
        _client = genai.Client(vertexai=True, project=PROJECT, location=LOCATION)
    return _client


# Category-specific photo direction. Match by substring against lead.category.
CATEGORY_HINTS = [
    ("barber",           "Modern barbershop interior, vintage barber chair, warm wood and brass accents, no people"),
    ("hair salon",       "Upscale hair salon interior, mirror stations, plush chairs, natural lighting, no people"),
    ("nail salon",       "Clean modern nail salon, manicure stations, soft pastel tones, no people"),
    ("spa",              "Luxury spa interior, candles, dim warm lighting, peaceful, no people"),
    ("massage",          "Serene massage therapy room, plush towels, dim lighting, no people"),
    ("dentist",          "Modern dental office, clean equipment, bright professional lighting, no people"),
    ("optometrist",      "Modern optometry office, eyewear display wall, professional lighting"),
    ("chiropract",       "Modern chiropractic clinic interior, treatment table, clean lighting"),
    ("plumb",            "Professional plumber working on residential pipes, clean uniform, cinematic"),
    ("electric",         "Professional electrician at work on a panel, clean workshop, cinematic shot"),
    ("hvac",             "HVAC technician working on a residential outdoor unit, professional, clean uniform"),
    ("roof",             "Professional roofer at work on shingled roof, blue sky, action shot"),
    ("landscap",         "Beautifully landscaped front yard, professional lawn care equipment in background"),
    ("contractor",       "Professional contractor reviewing blueprints on a job site, clean workwear"),
    ("restaurant",       "Beautifully plated dish on a restaurant table, ambient warm lighting, food photography"),
    ("cafe",             "Cozy modern cafe interior, espresso machine, warm wood tones, natural light"),
    ("bakery",           "Beautiful display of fresh artisan bread and pastries, golden light"),
    ("pizza",            "Wood-fired pizza fresh from the oven, charred crust, food photography close-up"),
    ("law",              "Modern law office interior, leather chairs, books, warm professional lighting, no people"),
    ("account",          "Modern accounting office, desk with laptop and documents, warm professional lighting"),
    ("real estate",      "Modern real estate office or beautiful exterior of a home for sale"),
    ("gym",              "Modern gym interior with clean equipment, bright energetic atmosphere"),
    ("yoga",             "Serene yoga studio interior, mats laid out, soft warm light, no people"),
    ("auto",             "Clean professional auto repair shop, lifted vehicle, organized tools, cinematic"),
    ("car detail",       "Pristine car being detailed, water beading, professional cinematic shot"),
    ("pet groom",        "Happy small dog being groomed, professional grooming station, soft lighting"),
    ("vet",              "Modern veterinary clinic interior, examination table, friendly atmosphere"),
    ("florist",          "Beautiful floral arrangements in a modern florist shop, bright natural light"),
    ("jewel",            "Elegant jewelry display case, sparkling pieces, dramatic lighting"),
    ("dry clean",        "Clean modern dry cleaner storefront or pristine garments on rack"),
]
DEFAULT_HINT = "Professional small business interior, clean modern, warm professional lighting, no people"

SLOT_DIRECTION = {
    "hero":    "wide cinematic shot, hero composition, premium feel, magazine-quality photography",
    "about":   "inviting candid composition, warmth, story-telling, editorial photography",
    "service": "close-up detail shot, focused on the craft or work being done, editorial photography",
}


def _category_hint(category: str) -> str:
    cat = (category or "").lower()
    for needle, hint in CATEGORY_HINTS:
        if needle in cat:
            return hint
    return DEFAULT_HINT


def _build_prompt(category: str, slot: str) -> str:
    return (f"{_category_hint(category)}. "
            f"{SLOT_DIRECTION.get(slot, SLOT_DIRECTION['service'])}. "
            f"Real photograph, photorealistic, no text overlay, no logos, no watermarks.")


def _safe_id(place_id: str) -> str:
    return place_id.replace("/", "_").replace(":", "_")


def generate_for_slots(
    place_id: str,
    category: str,
    slots: list[str],
) -> list[dict]:
    """Generate one image per slot. Cached on disk; skips if already generated.

    Returns list of {url, width, height, orientation, attribution} dicts
    matching the shape returned by photos.fetch_and_cache.
    """
    safe = _safe_id(place_id)
    out: list[dict] = []
    client = _get_client()
    for i, slot in enumerate(slots):
        path = CACHE / f"{safe}_ai_{slot}_{i}.png"
        if not path.exists() or path.stat().st_size == 0:
            try:
                resp = client.models.generate_images(
                    model=MODEL,
                    prompt=_build_prompt(category, slot),
                    config={
                        "number_of_images": 1,
                        "aspect_ratio": "16:9" if slot == "hero" else "4:3",
                        "safety_filter_level": "BLOCK_ONLY_HIGH",
                        "person_generation": "DONT_ALLOW",
                    },
                )
                if not resp.generated_images:
                    continue
                img = resp.generated_images[0].image
                # img.image_bytes contains PNG bytes
                path.write_bytes(img.image_bytes)
            except Exception as e:
                # Skip silently; generate_html will fall back to remaining real photos
                # or CSS art if all generations fail.
                print(f"  [ai_images] failed slot={slot}: {e}")
                continue
        is_hero = slot == "hero"
        out.append({
            "url": f"{PUBLIC_BASE}/assets/photos/{path.name}",
            "width":  1600 if is_hero else 1200,
            "height": 900  if is_hero else 900,
            "orientation": "landscape",
            "attribution": "AI-generated for mockup",
        })
    return out
