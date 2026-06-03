"""Cold-call / cold-email script generator.

Template-based for now — picks the right opener based on the lead's bucket
(no_website / dead_website / template_only / social_only) and weaves in
their specific signal (rating, review count, category, city). No API key
required, generates instantly, costs $0.

Future upgrade path (not built): if ANTHROPIC_API_KEY is set in .env, route
through Claude Haiku for natural-sounding variations. Cost would be < $0.001
per script.
"""
from __future__ import annotations

import random
import re
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
    """Extract a friendly city name from a Google formatted_address."""
    parts = [p.strip() for p in (address or "").split(",")]
    if len(parts) >= 3:
        return parts[-3]
    if len(parts) >= 2:
        return parts[-2]
    return parts[0] if parts else ""


def _social_label(uri: str | None) -> str:
    if not uri:
        return "your social page"
    u = uri.lower()
    if "instagram" in u:                  return "Instagram"
    if "facebook" in u or "fb.com" in u:  return "Facebook"
    if "linktr"   in u or "linktree" in u: return "Linktree"
    if "tiktok"   in u:                   return "TikTok"
    return "your online listing"


def _template_label(uri: str | None) -> str:
    """Returns a noun phrase WITHOUT a leading possessive — caller adds 'Your' etc."""
    if not uri:
        return "current page"
    u = uri.lower()
    if "booksy"  in u: return "Booksy page"
    if "square"  in u: return "Square site"
    if "wix"     in u: return "Wix site"
    if "weebly"  in u: return "Weebly page"
    if "godaddy" in u: return "GoDaddy template"
    if "fresha"  in u: return "Fresha booking page"
    if "vagaro"  in u: return "Vagaro page"
    return "booking page"


def _credibility_line(lead: LeadInfo) -> str:
    """One sentence that proves you actually looked at their listing."""
    rating, n = lead.rating, lead.review_count or 0
    if rating and rating >= 4.7 and n >= 30:
        return f"Saw your {rating:.1f}★ rating with {n}+ reviews — clearly people love what you do."
    if rating and rating >= 4.5:
        return f"Your {rating:.1f}★ Google rating is the kind of social proof a homepage should be showing off."
    if n >= 50:
        return f"You've already got {n} reviews — your reputation is doing the heavy lifting."
    if rating and rating >= 4.0:
        return f"Solid {rating:.1f}★ on Google — most {lead.category.lower() or 'businesses'} in {_city(lead.address)} aren't there."
    return f"Came across your listing while looking at {lead.category.lower() or 'businesses'} in {_city(lead.address)}."


def generate_script(lead: LeadInfo) -> str:
    """Return a 3-part script: opener, ask, follow-up offer. Markdown formatted."""
    random.seed(hash(lead.name + lead.address))  # stable per lead so re-renders match
    city = _city(lead.address)
    cred = _credibility_line(lead)

    if lead.lead_type == "no_website":
        hooks = [
            f"Hi, is this {lead.name}? I'm {{your name}}, I help {lead.category.lower() or 'small businesses'} "
            f"in {city} put up clean, fast websites. {cred}",
            f"Hey, calling for {lead.name}. {cred} I noticed you don't have a website yet — "
            f"is that a deliberate choice or just hasn't been a priority?",
        ]
        ask = ("Would it be useful to see a 2-minute mockup of what a homepage for "
               f"{lead.name} could look like? No cost, no obligation.")

    elif lead.lead_type == "dead_website":
        hooks = [
            f"Hi, is this {lead.name}? I was checking out your Google listing and noticed your website is down — "
            f"didn't want you losing customers because of it. {cred}",
            f"Hey, calling for {lead.name}. Tried visiting your website and it's not loading. "
            f"That happens more than people realize. {cred}",
        ]
        ask = ("Want me to spin up a working replacement page so customers can find you again? "
               "Quick fix, can have it live in a few days.")

    elif lead.lead_type == "template_only":
        tlabel = _template_label(lead.website_uri)
        hooks = [
            f"Hi, is this {lead.name}? I noticed you're using a {tlabel} as your online presence — "
            f"that works for bookings but it doesn't really feel like *you*. {cred}",
            f"Hey, calling for {lead.name}. Your {tlabel} is fine for taking appointments, "
            f"but you're losing customers who Google you and don't see a real site. {cred}",
        ]
        ask = ("Would it help to have your own branded site that still funnels into your booking system? "
               "Most of my clients see more first-time bookings within a month.")

    elif lead.lead_type == "social_only":
        slabel = _social_label(lead.website_uri)
        hooks = [
            f"Hi, is this {lead.name}? Found you through {slabel} — your work looks great. {cred}",
            f"Hey, calling for {lead.name}. {slabel} is doing a lot of the lifting for you online. "
            f"{cred} The only thing missing is a proper website to seal the deal when people Google you.",
        ]
        ask = ("Want me to build you something simple that links your bookings + Instagram in one place? "
               "Most of your competitors don't even have that.")

    else:
        hooks = [f"Hi, is this {lead.name}? {cred}"]
        ask = "Got 60 seconds to chat?"

    opener = random.choice(hooks)
    follow = ("If now isn't a good time, totally understand — when's better to catch you "
              "for 5 minutes this week?")

    return f"**Opener**\n{opener}\n\n**Ask**\n{ask}\n\n**If they brush you off**\n{follow}"


def script_to_sms(script_md: str, max_chars: int = 320) -> str:
    """Strip markdown + collapse to a 1-2 sentence text-message version."""
    plain = re.sub(r"\*\*.+?\*\*", "", script_md)
    plain = re.sub(r"\s+", " ", plain).strip()
    return plain[:max_chars].rsplit(" ", 1)[0] + "..." if len(plain) > max_chars else plain
