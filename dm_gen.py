"""Instagram DM message generator + handle parser.

For social_only leads where website_uri is an Instagram URL, generate a
short casual DM that includes the mockup URL. The user copies and sends
manually — no automation, no ban risk.
"""
from __future__ import annotations

import random
import re
from urllib.parse import urlparse


_HANDLE_RE = re.compile(r"^[A-Za-z0-9._]{1,30}$")


def extract_handle(website_uri: str | None) -> str | None:
    """Pull an Instagram handle out of a URL. Returns None if not parseable.

    Supports:
        https://instagram.com/joeshair
        https://www.instagram.com/joeshair/
        https://instagram.com/joeshair?hl=en
        https://m.instagram.com/joeshair
        instagram.com/joeshair
    Rejects:
        anything that isn't an instagram.com URL
        post / reel / explore URLs (path is /p/ /reel/ /explore/)
    """
    if not website_uri or not isinstance(website_uri, str):
        return None
    url = website_uri.strip()
    if "://" not in url:
        url = "https://" + url
    try:
        parsed = urlparse(url)
    except ValueError:
        return None
    host = (parsed.hostname or "").lower()
    if not (host == "instagram.com" or host.endswith(".instagram.com")):
        return None
    parts = [p for p in parsed.path.split("/") if p]
    if not parts:
        return None
    handle = parts[0]
    # Reject reserved paths
    if handle.lower() in {"p", "reel", "reels", "explore", "stories", "tv", "direct"}:
        return None
    if not _HANDLE_RE.match(handle):
        return None
    return handle


def profile_url(handle: str) -> str:
    return f"https://www.instagram.com/{handle}/"


def generate_dm(
    business_name: str,
    category: str,
    rating: float | None,
    review_count: int | None,
    mockup_url: str | None,
    your_handle: str = "thrivewebco",
) -> str:
    """A short, casual DM. Not too 'sales-y'. Includes mockup link if provided."""
    random.seed(hash(business_name + (mockup_url or "")))

    cat = (category or "spot").lower().replace("_", " ")
    cred = ""
    if rating and rating >= 4.7 and (review_count or 0) >= 30:
        cred = f"saw your {rating:.1f}★ — thats wild"
    elif rating and rating >= 4.5:
        cred = f"your {rating:.1f}★ rating caught my eye"
    elif rating and rating >= 4.0:
        cred = f"noticed your {rating:.1f}★ on google"
    else:
        cred = f"came across your page"

    openers = [
        f"hey! {cred}. i build websites for {cat}s like yours — actually made you a quick mockup, no strings",
        f"hi! {cred}. made you a free mockup of what your site could look like — wanna see?",
        f"hey, {cred} ✨ i made a quick mockup site for {business_name} — totally free, just thought you'd like to see",
    ]
    opener = random.choice(openers)

    if mockup_url:
        body = f"{opener}:\n{mockup_url}\n\nif you like it i can have a working version live in a few days. if not, no worries — keep the mockup 🙏"
    else:
        body = f"{opener}\n\nif youre interested lmk and i can show you the mockup"

    return body
