"""AI-generated mockup website (HTML) per lead.

Uses Vertex AI Gemini 2.5 Pro via service-account credentials. Each call
produces a complete single-page HTML tailored to the lead's category, name,
city, rating, AND its actual photos pulled from Google Maps.
"""
from __future__ import annotations

import os
import random
import re
from dataclasses import dataclass

import photos as photos_mod
from google import genai


@dataclass
class LeadInfo:
    name: str
    category: str
    rating: float | None
    review_count: int | None
    address: str
    lead_type: str
    website_uri: str | None = None


PROJECT  = os.environ.get("VERTEX_PROJECT",  "website-find-1777676850")
LOCATION = os.environ.get("VERTEX_LOCATION", "us-central1")
MODEL    = "gemini-2.5-pro"  # design quality matters more than speed/cost here

_client: genai.Client | None = None


def _get_client() -> genai.Client:
    global _client
    if _client is None:
        _client = genai.Client(vertexai=True, project=PROJECT, location=LOCATION)
    return _client


def _city(address: str) -> str:
    parts = [p.strip() for p in (address or "").split(",")]
    return parts[-3] if len(parts) >= 3 else (parts[-2] if len(parts) >= 2 else parts[0] if parts else "your city")


PROMPT_TEMPLATE = """You are a senior product designer at a top studio (Linear, Vercel, Stripe-tier). Produce ONE complete production-quality single-page HTML mockup for the local business below. This will be shown to the OWNER as a sales pitch — it must look like a real $5,000+ custom-built site, NOT a free template. If it looks generic or 2015-era, I lose the deal.

═══ OUTPUT FORMAT ═══
- Return ONLY the raw HTML starting with <!DOCTYPE html>. No markdown fences. No commentary before or after.
- All CSS inline in a single <style> tag in <head>.
- Allowed external resources: Google Fonts (via <link>) and image URLs I provide. NOTHING ELSE — no JS frameworks, no CSS frameworks, no icon libraries.
- LINKS: every <a href> must be EITHER a #anchor (e.g. #services, #about) for in-page scroll, OR tel:/mailto:. NEVER use paths like /about or /contact.html — those break the preview. Internal navigation = anchors only.

═══ DESIGN LANGUAGE (this is what separates a real site from a template) ═══
1. **Typography**: Use TWO Google Fonts paired well — one display/serif for hero + section headers, one sans for body. Examples by category:
   - Law / financial / medical: "Playfair Display" + "Inter"
   - Beauty / wellness / salons: "Fraunces" + "DM Sans"
   - Trades / contractors: "Space Grotesk" + "Inter"
   - Restaurants / cafes: "Bricolage Grotesque" or "Cormorant Garamond" + "Inter"
   Hero headline must be MASSIVE — at least clamp(3rem, 7vw, 6rem). Use font-weight 700-900 for display, tight letter-spacing (-0.02em or -0.04em).
2. **Photos**: I will provide a list of EXACT image URLs to use (real photos of the actual business pulled from Google Maps). You MUST use those URLs only — do NOT invent Unsplash URLs or any other image source. If no photos are provided, use abstract CSS gradients (Stripe/Linear style), NOT broken image tags.
3. **Color palette**: NOT just one accent. Use a sophisticated palette — primary, secondary, neutral surface tones, one bold contrast. Examples:
   - Law: warm cream background (#faf8f3), deep navy primary (#0f1e3a), gold accent (#c89e3c)
   - Beauty: blush surface (#fef0eb), terracotta primary (#a8503e), cream (#f9efe6)
   - Trades: charcoal primary (#1a1f2e), bright safety orange accent (#ff5722), warm grey (#f5f3f0)
   - Restaurants: warm beige (#f4ebe1), forest green (#2d5e3e), or deep red (#8b1a2b)
4. **Layout**: NO centered everything. Use asymmetric grids, oversized numbers, vertical text, edge-to-edge sections. Hero should be split-pane or have an oversized image with text overlay. Include at least one "stats" row with big numbers (years in business, clients served, rating).
5. **Motion**: Add subtle CSS-only animations — @keyframes for hero text fade-up on load, hover transitions on cards (transform/scale/shadow), smooth scroll between sections. Add a scroll-driven effect on the hero (subtle parallax via background-attachment: fixed, or an animated gradient blob).
6. **Section variety**: Each section must look VISUALLY DIFFERENT. Vary backgrounds (light, dark, image, gradient), vary layouts (centered vs split vs grid). Avoid the trap of every section being "container + h2 + content".

═══ SECTIONS REQUIRED ═══
1. **Sticky header** — clean nav with logo (typeset business name, not text in a box), 3-4 nav links, primary CTA button
2. **Hero** — split-layout. Left: massive typeset business name (treat it like a magazine cover), real one-line value prop tagline (NOT "Your Trusted Partner For X"), rating badge, primary + secondary CTAs. Right: real Unsplash photo with subtle overlay
3. **Trust strip** — row of 4 metric stats (Years • Clients • Rating • Specialty) in big numbers
4. **Services / Offerings** — 3-6 items in an asymmetric grid (alternate sides), each with custom number/letter marker (01, 02, 03...), short tight copy
5. **About / Story** — narrative section with a real photo. Tell a believable origin story tied to the city — not "founded with a vision."
6. **Testimonials** — 2-3 long-form quotes (3-4 sentences each, specific and believable, with realistic full names like "Daniel Chen, CTO @ Markham startup" not "John D."). Pull-quote treatment — large italic display font.
7. **CTA banner** — full-bleed contrasting band with single oversized question/statement + button
8. **Contact / Visit Us** — real address + phone + hours, formatted cleanly. Use the actual address + phone provided below.
9. **Footer** — multi-column. Quick links, social, location, copyright. Subtle, not overwhelming.

═══ COPY VOICE ═══
- Write like a senior copywriter, not an AI. Concrete and specific over abstract.
- The business name and city MUST appear naturally throughout — make it feel local and made-for-them.
- DO NOT use phrases: "Your Trusted Partner", "We pride ourselves", "exceptional service", "client-centered approach", "tailored solutions", "Welcome to our website". They scream template.
- DO use: specific neighborhood references, specific scenarios their customers face, numbers, a small personality joke or human touch.

═══ BUSINESS BEING MOCKED UP ═══
- Name: {name}
- Category: {category}
- City: {city}
- Full address: {address}
- Phone: {phone}
- Google rating: {rating_str} ({review_count} reviews)
- Lead context: this business currently has {situation}. The mockup should feel like a dramatic upgrade — show them what they're missing.

{photos_block}

═══ FINAL CHECK BEFORE YOU RETURN — go through each item ═══
- Did you use TWO Google fonts? (One display + one sans)
- Did you USE EVERY image URL I provided in the AVAILABLE IMAGES block? (Not optional — every Image 1, Image 2, etc. must appear in the HTML at the assigned section.)
- Is the hero asymmetric (split-pane image + content), not centered text on a flat background?
- Does the About section have a real image side-by-side with text?
- Does EVERY service card have a thumbnail or background image (not just text)?
- Did you avoid every banned phrase in COPY VOICE?
- Is your HTML valid? (No <tr> wrapped in <div>, all tags closed, proper table structure if you use one)
- Are you sure this would impress a designer friend, not embarrass you?

Return only HTML starting with <!DOCTYPE html>."""


def _situation(lead: LeadInfo) -> str:
    return {
        "no_website":    "no website at all",
        "dead_website":  "a broken website that won't load",
        "template_only": f"only a generic vendor page ({lead.website_uri or 'a booking platform'})",
        "social_only":   f"only a social media link ({lead.website_uri or 'social-only presence'})",
    }.get(lead.lead_type, "no real website")


def generate_html(lead: LeadInfo, place_id: str | None = None) -> str:
    """Call Vertex AI Gemini and return the generated HTML string.

    If `place_id` is supplied, fetches the business's actual photos from Google
    Maps and includes them in the prompt with section-placement guidance.
    """
    business_photos = []
    if place_id:
        try:
            # Real photos first; supplement with AI-generated if fewer than 4.
            business_photos = photos_mod.fetch_with_ai_fallback(
                place_id, lead.category, target_count=4
            )
        except Exception:
            business_photos = []

    prompt = PROMPT_TEMPLATE.format(
        name=lead.name,
        category=lead.category or "local business",
        city=_city(lead.address),
        address=lead.address or "address not provided",
        phone="(use a placeholder phone)" if not lead.website_uri else "(use the actual contact info implied)",
        rating_str=f"{lead.rating:.1f}/5" if lead.rating else "no rating yet",
        review_count=lead.review_count or 0,
        situation=_situation(lead),
        photos_block=photos_mod.to_prompt_block(business_photos),
    )
    resp = _get_client().models.generate_content(
        model=MODEL,
        contents=prompt,
        config={"temperature": 0.85, "max_output_tokens": 32000},
    )
    html = (resp.text or "").strip()
    # Strip stray markdown fences just in case
    if html.startswith("```"):
        html = html.split("\n", 1)[1] if "\n" in html else html
        if html.endswith("```"):
            html = html.rsplit("```", 1)[0]
    html = html.strip()
    # Inject <base target="_blank"> so any non-anchor link opens in a new tab
    # instead of navigating the iframe preview (which would load our dashboard).
    if "<base " not in html and "<head>" in html:
        html = html.replace("<head>", '<head>\n  <base target="_blank">', 1)
    # Defensive validation: replace any image URL the AI hallucinated (e.g.
    # invented _4.jpg when only _0..._3 exist) with a real one from our list.
    if business_photos:
        valid = {p["url"] for p in business_photos}
        html = _replace_hallucinated_image_urls(html, valid)

    # Save mockup to a public path so the URL can be shared in DMs / emails.
    if place_id:
        try:
            _save_public_mockup(place_id, html)
        except Exception:
            pass  # Non-fatal; preview still works in dashboard
    return html


_MOCKUP_DIR = None
def _save_public_mockup(place_id: str, html: str) -> str:
    """Write the mockup to /static/mockups/<place_id>.html for public sharing."""
    global _MOCKUP_DIR
    if _MOCKUP_DIR is None:
        from pathlib import Path
        _MOCKUP_DIR = Path(__file__).parent / "static" / "mockups"
        _MOCKUP_DIR.mkdir(parents=True, exist_ok=True)
    safe = place_id.replace("/", "_").replace(":", "_")
    path = _MOCKUP_DIR / f"{safe}.html"
    path.write_text(html, encoding="utf-8")
    return str(path)


def public_mockup_url(place_id: str) -> str:
    """The publicly accessible URL for a saved mockup (whether or not it exists)."""
    base = os.environ.get("PUBLIC_BASE", "https://15-156-6-65.sslip.io")
    safe = place_id.replace("/", "_").replace(":", "_")
    return f"{base}/assets/mockups/{safe}.html"


def _replace_hallucinated_image_urls(html: str, valid: set[str]) -> str:
    """Replace any /static/photos/ URL not in `valid` with a random valid one."""
    if not valid:
        return html
    valid_list = list(valid)
    pattern = re.compile(r'https?://[^\s\)"\'<>]+/(?:static|assets)/photos/[^\s\)"\'<>]+')

    def _sub(m):
        url = m.group(0)
        return url if url in valid else random.choice(valid_list)

    return pattern.sub(_sub, html)
