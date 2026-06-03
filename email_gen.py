"""Cold-outreach email generator (template-based).

Picks subject + body based on lead_type and weaves in their specific signal
(rating, review count, category, city, vendor name). No AI call required.
"""
from __future__ import annotations

import random
from dataclasses import dataclass


@dataclass
class LeadInfo:
    name: str
    category: str
    rating: float | None
    review_count: int | None
    address: str
    lead_type: str
    website_uri: str | None = None


def _city(address: str) -> str:
    parts = [p.strip() for p in (address or "").split(",")]
    return parts[-3] if len(parts) >= 3 else (parts[-2] if len(parts) >= 2 else parts[0] if parts else "")


def _social_label(uri: str | None) -> str:
    if not uri: return "your social page"
    u = uri.lower()
    if "instagram" in u: return "Instagram"
    if "facebook" in u or "fb.com" in u: return "Facebook"
    if "linktr" in u or "linktree" in u: return "Linktree"
    if "tiktok" in u: return "TikTok"
    return "your online listing"


def _template_label(uri: str | None) -> str:
    if not uri: return "current page"
    u = uri.lower()
    if "booksy" in u: return "Booksy page"
    if "square" in u: return "Square site"
    if "wix" in u: return "Wix site"
    if "weebly" in u: return "Weebly page"
    if "godaddy" in u: return "GoDaddy template"
    if "fresha" in u: return "Fresha booking page"
    if "vagaro" in u: return "Vagaro page"
    return "booking page"


def _credibility(lead: LeadInfo) -> str:
    r, n = lead.rating, lead.review_count or 0
    if r and r >= 4.7 and n >= 30:
        return f"With a {r:.1f}-star rating and {n}+ reviews, your reputation is doing real work."
    if r and r >= 4.5:
        return f"Your {r:.1f}-star Google rating is exactly the kind of social proof a homepage should be amplifying."
    if n >= 50:
        return f"You've already got {n} reviews — most of your competitors don't."
    if r and r >= 4.0:
        return f"Your {r:.1f}-star reputation puts you ahead of most {lead.category.lower() or 'businesses'} in {_city(lead.address)}."
    return f"Found you while looking at {lead.category.lower() or 'businesses'} in {_city(lead.address)}."


def generate(lead: LeadInfo) -> dict:
    """Return {subject, body}. Deterministic per lead (seeded by name+address)."""
    random.seed(hash(lead.name + lead.address))
    city = _city(lead.address)
    cred = _credibility(lead)
    cat  = lead.category.lower() or "business"

    if lead.lead_type == "no_website":
        subjects = [
            f"Quick mockup I made for {lead.name}",
            f"{lead.name} — a homepage idea",
            f"Free website mockup for {lead.name}",
        ]
        body = (
            f"Hi,\n\n"
            f"My name is {{your name}} — I help {cat}s in {city} put up clean, fast websites.\n\n"
            f"{cred} The only piece missing is somewhere to send customers when they Google "
            f"you. So I put together a quick mockup of what your homepage could look like — "
            f"see attached.\n\n"
            f"If anything in it catches your eye, just reply and I can have a working version "
            f"of the site live in under a week. No commitment to look it over.\n\n"
            f"Either way — keep doing what you're doing, you're clearly busy.\n\n"
            f"Cheers,\n"
            f"{{your name}}\n"
            f"{{your phone}}"
        )

    elif lead.lead_type == "dead_website":
        subjects = [
            f"Your website is down — quick fix for {lead.name}",
            f"{lead.name} — your site isn't loading",
            f"Heads up: customers can't reach {lead.name}'s site",
        ]
        body = (
            f"Hi,\n\n"
            f"I was checking out your Google listing for {lead.name} and noticed your "
            f"website is down. Customers Googling you are hitting a dead page right now.\n\n"
            f"{cred} I'd hate for you to lose first-time visits over a broken link.\n\n"
            f"I put together a quick mockup of a clean replacement — see attached. If it "
            f"looks like the right direction, I can have it live in a few days, mapped to "
            f"your existing domain.\n\n"
            f"Reply with a yes or a question and I'll take it from there.\n\n"
            f"Best,\n"
            f"{{your name}}\n"
            f"{{your phone}}"
        )

    elif lead.lead_type == "template_only":
        tlabel = _template_label(lead.website_uri)
        subjects = [
            f"Upgrade idea for {lead.name}",
            f"Beyond your {tlabel} — a mockup for {lead.name}",
            f"{lead.name} — would a real site help?",
        ]
        body = (
            f"Hi,\n\n"
            f"Your {tlabel} is fine for bookings, but when someone Googles {lead.name}, "
            f"they're seeing a generic page that doesn't really feel like *you*.\n\n"
            f"{cred} I think you'd convert more first-time browsers with a proper branded "
            f"site that funnels into your existing booking flow.\n\n"
            f"Attached is a mockup I put together for {lead.name}. If it lands, I can have "
            f"a working version live in under a week — keeps your booking system, just "
            f"gives it a real home.\n\n"
            f"Worth a quick reply?\n\n"
            f"Cheers,\n"
            f"{{your name}}\n"
            f"{{your phone}}"
        )

    elif lead.lead_type == "social_only":
        slabel = _social_label(lead.website_uri)
        subjects = [
            f"Saw you on {slabel} — quick idea for {lead.name}",
            f"{lead.name} — a website to match your {slabel}",
            f"Idea for {lead.name}",
        ]
        body = (
            f"Hi,\n\n"
            f"Found you through {slabel} — your work looks great.\n\n"
            f"{cred} The only thing missing is a real website to seal the deal when "
            f"customers Google you instead of finding you on social. Most of your "
            f"competitors don't have one either, so there's an opening.\n\n"
            f"I put together a quick mockup of what a homepage for {lead.name} could look "
            f"like — see attached. Would pair with your {slabel} cleanly.\n\n"
            f"If you want to see it live, reply and I'll have a working version in under "
            f"a week.\n\n"
            f"Cheers,\n"
            f"{{your name}}\n"
            f"{{your phone}}"
        )

    else:
        subjects = [f"A quick idea for {lead.name}"]
        body = (
            f"Hi,\n\n{cred}\n\n"
            f"Attached is a quick mockup of what a homepage for {lead.name} could look like. "
            f"If anything in it catches your eye, just reply and I'll take it from there.\n\n"
            f"Cheers,\n{{your name}}\n{{your phone}}"
        )

    return {"subject": random.choice(subjects), "body": body}
