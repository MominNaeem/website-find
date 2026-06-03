"""Live website verification.

For each lead with a website_uri, fetch the URL and classify what's actually on
the other end. Many "has_website" leads are dead links, expired domains, or
template-only pages — those are sellable leads we'd otherwise miss.
"""
from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from typing import Literal
from urllib.parse import urlparse

import requests

WebsiteStatus = Literal["ok", "dead", "template", "social", "unknown"]

# Vendor template / page-builder hosts. Match exact OR any subdomain of these.
# A URL whose hostname matches => the owner doesn't have a real site.
TEMPLATE_PATTERNS = (
    "booksy.com", "booksy.co",
    "square.site", "squareup.com",
    "sites.google.com",
    "wixsite.com", "wix.com",
    "weebly.com",
    "godaddysites.com",
    "linktr.ee", "linktree.com",
    "beacons.ai",
    "carrd.co",
    "fresha.com",
    "vagaro.com",
    "schedulista.com",
    "as.me",
    "getsquire.com",
)

SOCIAL_PATTERNS = (
    "facebook.com", "fb.com", "m.facebook.com",
    "instagram.com",
    "linkedin.com",
    "tiktok.com",
    "x.com", "twitter.com",
    "yelp.com", "yelp.ca",
    "youtube.com",
    "wa.me",
)

PARKED_MARKERS = (
    "domain is for sale",
    "this domain is parked",
    "buy this domain",
    "godaddy.com/domains/searchresults",
    "coming soon",
    "under construction",
    "site temporarily unavailable",
    "default web page",
    "apache2 ubuntu default",
    "welcome to nginx",
)

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
TIMEOUT = 8
RETRIES = 1   # one retry after a brief sleep — catches transient failures (rate limits, blips)
RETRY_SLEEP = 2


def _matches(host: str, patterns: tuple[str, ...]) -> bool:
    """True if host equals any pattern, or is a subdomain of one."""
    host = host.lower()
    return any(host == p or host.endswith("." + p) for p in patterns)


def _classify_host(host: str) -> WebsiteStatus | None:
    if _matches(host, SOCIAL_PATTERNS):
        return "social"
    if _matches(host, TEMPLATE_PATTERNS):
        return "template"
    return None


def check(url: str) -> WebsiteStatus:
    """Classify what's actually on the other end of the URL."""
    if not url:
        return "unknown"
    try:
        parsed = urlparse(url if "://" in url else f"http://{url}")
    except ValueError:
        return "unknown"
    host = (parsed.hostname or "").lower()
    if not host:
        return "unknown"

    by_host = _classify_host(host)
    if by_host:
        return by_host

    # Try up to (1 + RETRIES) times to filter transient failures (anti-bot, rate
    # limits, momentary outages). Real dead sites fail every attempt; real live
    # sites usually recover on the second try.
    import time as _time
    r = None
    for attempt in range(RETRIES + 1):
        try:
            r = requests.get(url, headers={"User-Agent": UA}, timeout=TIMEOUT,
                             allow_redirects=True)
            if r.status_code < 400:
                break
        except requests.exceptions.RequestException:
            r = None
        if attempt < RETRIES:
            _time.sleep(RETRY_SLEEP)
    if r is None:
        return "dead"

    if r.status_code >= 400:
        return "dead"

    final_host = (urlparse(r.url).hostname or "").lower()
    by_final = _classify_host(final_host)
    if by_final:
        return by_final

    body = (r.text[:6000] if r.text else "").lower()
    if any(m in body for m in PARKED_MARKERS):
        return "dead"
    if len(body) < 200:
        return "dead"

    return "ok"


def check_many(urls: list[str], max_workers: int = 16) -> dict[str, WebsiteStatus]:
    """Parallel verification. Returns {url: status}."""
    out: dict[str, WebsiteStatus] = {}
    if not urls:
        return out
    with ThreadPoolExecutor(max_workers=max_workers) as pool:
        futures = {pool.submit(check, u): u for u in urls}
        for fut in as_completed(futures):
            url = futures[fut]
            try:
                out[url] = fut.result()
            except Exception:
                out[url] = "unknown"
    return out


# Map a verified WebsiteStatus to a refined lead_type.
# This OVERRIDES the initial classification done from Google's data alone.
def refine_lead_type(initial_lead_type: str, verified_status: WebsiteStatus) -> str:
    """Given the original lead_type and the verified website status, return the
    refined lead_type.
    - dead website that Google thought was real => dead_website (best leads)
    - template/booksy/etc that Google thought was real => template_only
    - confirmed social by network round-trip => social_only
    - ok => keep has_website
    - chain stays chain (don't reverify chain leads)
    """
    if initial_lead_type == "chain":
        return "chain"
    if verified_status == "dead":
        return "dead_website"
    if verified_status == "template":
        return "template_only"
    if verified_status == "social":
        return "social_only"
    if verified_status == "ok":
        return "has_website"
    return initial_lead_type


def now_iso() -> str:
    return datetime.utcnow().isoformat(timespec="seconds")
