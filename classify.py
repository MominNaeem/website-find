"""Lead classification: which Places are sellable leads?"""
from __future__ import annotations

from collections import Counter
from typing import Literal

import tldextract

from places import Place

LeadType = Literal["no_website", "social_only", "has_website", "chain",
                   "dead_website", "template_only"]

SOCIAL_DOMAINS = {
    "facebook", "instagram", "linktr", "linkedin", "tiktok",
    "yelp", "wa", "beacons", "linktree", "youtube", "x", "twitter",
}

CHAIN_THRESHOLD = 5  # same website domain on 5+ Places => chain, drop


def _domain(url: str) -> str:
    ext = tldextract.extract(url)
    return ext.domain.lower()


def _is_social(url: str) -> bool:
    return _domain(url) in SOCIAL_DOMAINS


def classify_all(places: list[Place]) -> list[tuple[Place, LeadType]]:
    """Bucket every Place. Chains identified by website domain repetition."""
    domain_counts: Counter[str] = Counter()
    for p in places:
        if p.website:
            d = _domain(p.website)
            if d not in SOCIAL_DOMAINS:
                domain_counts[d] += 1
    chain_domains = {d for d, n in domain_counts.items() if n >= CHAIN_THRESHOLD}

    out: list[tuple[Place, LeadType]] = []
    for p in places:
        if not p.website:
            out.append((p, "no_website"))
        elif _is_social(p.website):
            out.append((p, "social_only"))
        elif _domain(p.website) in chain_domains:
            out.append((p, "chain"))
        else:
            out.append((p, "has_website"))
    return out
