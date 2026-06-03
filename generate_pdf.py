"""Generate website_find_features.pdf documenting Phase 7 features."""
from datetime import datetime
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (PageBreak, Paragraph, SimpleDocTemplate, Spacer,
                                Table, TableStyle)

OUT = Path(__file__).parent / "website_find_features.pdf"

styles = getSampleStyleSheet()
H1 = ParagraphStyle("H1", parent=styles["Heading1"], fontSize=22, spaceAfter=14,
                    textColor=colors.HexColor("#1a1a1a"))
H2 = ParagraphStyle("H2", parent=styles["Heading2"], fontSize=16, spaceAfter=10,
                    textColor=colors.HexColor("#2980b9"))
H3 = ParagraphStyle("H3", parent=styles["Heading3"], fontSize=12, spaceAfter=6,
                    textColor=colors.HexColor("#1a1a1a"))
BODY  = ParagraphStyle("BODY",  parent=styles["BodyText"], fontSize=10.5, leading=15)
SMALL = ParagraphStyle("SMALL", parent=BODY, fontSize=9, textColor=colors.grey)
CODE  = ParagraphStyle("CODE",  parent=BODY, fontName="Courier", fontSize=9,
                       textColor=colors.HexColor("#444"),
                       backColor=colors.HexColor("#f5f5f5"),
                       leftIndent=12, rightIndent=12, spaceBefore=4, spaceAfter=8)


def p(text, style=BODY): return Paragraph(text, style)


story = []

# ---------- Cover ----------
story += [
    Spacer(1, 1.2 * inch),
    p("website_find — v2 features", H1),
    p("Built " + datetime.now().strftime("%B %d, %Y"), SMALL),
    Spacer(1, 0.6 * inch),
    p("Three new capabilities added on top of the v1 dashboard:", BODY),
    Spacer(1, 0.15 * inch),
    p("&nbsp;&nbsp;&nbsp;<b>1.</b> Live website verification — promotes hidden leads "
      "(dead sites, vendor templates) into the sellable bucket.", BODY),
    p("&nbsp;&nbsp;&nbsp;<b>2.</b> Cold-call script generator — instant, "
      "context-aware opener per lead.", BODY),
    p("&nbsp;&nbsp;&nbsp;<b>3.</b> Map view — every lead pinned by lat/lng, "
      "color-coded for route planning.", BODY),
    Spacer(1, 0.4 * inch),
    p("This document explains what each one does, how to use it, and how the lead "
      "pipeline now works end to end.", BODY),
    PageBreak(),
]

# ---------- Lead-type taxonomy (NEW) ----------
story += [
    p("Updated lead taxonomy", H2),
    p("Phase 7 introduces two new lead buckets, surfaced after a website is verified:", BODY),
    Spacer(1, 0.1 * inch),
]

taxonomy = [
    ["Bucket", "How it's detected", "Sales priority"],
    ["💥 dead_website", "websiteUri returns 4xx/5xx, parked page, or unreachable",
     "Highest — they're losing customers right now"],
    ["🧩 template_only", "websiteUri resolves to Booksy / Wix subdomain / Linktree / etc.",
     "High — already paying for online presence, ready to upgrade"],
    ["❌ no_website", "Google has no websiteUri at all",
     "High — strong intent but no foundation yet"],
    ["📷 social_only", "websiteUri is facebook.com / instagram.com / etc.",
     "Medium — they think social IS their website"],
    ["🌐 has_website (real)", "Verified live site, not a template, not social",
     "Skip — they already have what you'd sell"],
    ["🔗 chain", "Same root domain on 5+ Places (corporate location)",
     "Skip — auto-filtered"],
]
t = Table(taxonomy, colWidths=[1.5*inch, 2.6*inch, 2.4*inch])
t.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2980b9")),
    ("TEXTCOLOR",  (0, 0), (-1, 0), colors.white),
    ("FONTNAME",   (0, 0), (-1, 0), "Helvetica-Bold"),
    ("FONTSIZE",   (0, 0), (-1, -1), 9),
    ("VALIGN",     (0, 0), (-1, -1), "TOP"),
    ("GRID",       (0, 0), (-1, -1), 0.4, colors.lightgrey),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1),
     [colors.HexColor("#f9f9f9"), colors.white]),
]))
story += [t, PageBreak()]

# ---------- Feature 1: Live website verification ----------
story += [
    p("Feature 1 — Live website verification", H2),
    p("<b>Module:</b> verify.py", SMALL),
    p("Why this exists", H3),
    p("Google's <i>websiteUri</i> field is the URL the business owner submitted. "
      "It says nothing about whether that URL still works. Before this feature, "
      "any business with a websiteUri was bucketed as <i>has_website</i> and "
      "skipped. In reality, a meaningful fraction are dead links, expired domains, "
      "or vendor templates that don't represent the business — all of which are "
      "great leads.", BODY),

    p("How it classifies", H3),
    p("Each URL is fetched (8s timeout, real browser User-Agent). The result is one of:", BODY),
    p("<b>ok</b> — site loads, isn't a template, isn't social, body has real content.", BODY),
    p("<b>dead</b> — connection refused, 4xx/5xx, parked page, or 'coming soon' marker.", BODY),
    p("<b>template</b> — host or final-redirect host matches a vendor pattern "
      "(booksy.com, wixsite.com, linktr.ee, square.site, etc).", BODY),
    p("<b>social</b> — host is facebook.com / instagram.com / yelp.com / etc.", BODY),
    p("After classification, refine_lead_type() promotes the lead to dead_website "
      "or template_only as appropriate.", BODY),

    p("How to use", H3),
    p("Two ways:", BODY),
    p("<b>Per-lead:</b> open the detail panel for any lead → click <b>✅ Verify "
      "this website now</b>. Updates that single lead in &lt;10s.", BODY),
    p("<b>Bulk:</b> open the <b>🔧 Tools</b> tab → see how many leads need verification "
      "→ click <b>Verify all N websites</b>. Runs 16 in parallel; ~5–15 min for hundreds.", BODY),

    p("Cost", H3),
    p("Zero — verification doesn't use any paid API. Uses Python's requests library "
      "to hit each lead's website directly.", BODY),
    PageBreak(),
]

# ---------- Feature 2: Outreach script generator ----------
story += [
    p("Feature 2 — Outreach script generator", H2),
    p("<b>Module:</b> outreach.py", SMALL),
    p("What it produces", H3),
    p("A 3-part cold-call script personalized to one lead:", BODY),
    p("<b>Opener</b> — names the business, references their actual rating/reviews, "
      "and acknowledges their specific situation (no site / dead site / template / social).", BODY),
    p("<b>Ask</b> — a low-friction next step appropriate to that lead type.", BODY),
    p("<b>If they brush you off</b> — graceful re-attempt that protects the relationship.", BODY),

    p("How it picks the right script", H3),
    p("The prompt template forks on lead_type. A barber with 4.9★ and 200 reviews and "
      "no website gets a different opener than a plumber with a dead website. "
      "Each lead's script is deterministic (seeded by name+address) so re-renders are stable.", BODY),

    p("Example output for a no_website lead with 4.6★ rating", H3),
    p("<i>Hey, calling for Ako Barbershop. Your 4.6★ Google rating is the kind of "
      "social proof a homepage should be showing off. I noticed you don't have a "
      "website yet — is that a deliberate choice or just hasn't been a priority?</i>", BODY),

    p("Example output for a dead_website lead with 4.9★ rating", H3),
    p("<i>Hi, is this Joes Plumbing? I was checking out your Google listing and "
      "noticed your website is down — didn't want you losing customers because of it. "
      "Your 4.9★ Google rating is the kind of social proof a homepage should be showing off.</i>", BODY),

    p("How to use", H3),
    p("Open the detail panel for any lead → click <b>✍️ Generate outreach script</b>. "
      "Script appears below in a green callout, saved to the DB so it survives reloads.", BODY),

    p("Cost", H3),
    p("Zero — template-based, runs locally. (Future upgrade path noted in code: "
      "swap to Claude Haiku via the Anthropic SDK for naturally-varied phrasing. "
      "Cost would be &lt;$0.001 per script.)", BODY),
    PageBreak(),
]

# ---------- Feature 3: Map view ----------
story += [
    p("Feature 3 — Map view", H2),
    p("<b>Module:</b> app.py 🗺️ Map tab + folium / streamlit-folium", SMALL),

    p("What you see", H3),
    p("An interactive map (Cartodb Positron tiles) with one circular pin per "
      "lead. Pins are color-coded by lead type:", BODY),
    Spacer(1, 0.05 * inch),
]
legend_table = [
    ["Color", "Bucket"],
    ["Red",     "💥 dead_website"],
    ["Orange",  "🧩 template_only"],
    ["Blue",    "❌ no_website"],
    ["Purple",  "📷 social_only"],
    ["Grey",    "🌐 has_website"],
]
lt = Table(legend_table, colWidths=[1.0*inch, 3.5*inch])
lt.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2980b9")),
    ("TEXTCOLOR",  (0, 0), (-1, 0), colors.white),
    ("FONTNAME",   (0, 0), (-1, 0), "Helvetica-Bold"),
    ("FONTSIZE",   (0, 0), (-1, -1), 9),
    ("GRID",       (0, 0), (-1, -1), 0.4, colors.lightgrey),
]))
story += [
    lt,
    Spacer(1, 0.15 * inch),
    p("Hovering shows the business name. Clicking a pin opens a popup with name, "
      "lead type, rating, address, phone.", BODY),

    p("How it knows where to draw", H3),
    p("Each lead now stores lat/lng (added in this phase). New scans auto-populate "
      "these. Existing leads from prior scans are missing coords — open the "
      "<b>🔧 Tools</b> tab and click <b>Backfill coordinates</b> to retroactively geocode them.", BODY),

    p("Why it matters", H3),
    p("Plan a calling or in-person route. Dropping into one neighborhood and visiting "
      "10 no-website salons in an afternoon is much higher conversion than cold-calling. "
      "The map turns the spreadsheet into territory.", BODY),

    p("Cost", H3),
    p("Zero for the map itself (Folium uses free OSM-style tiles). Backfill uses "
      "Geocoding API which has a separate 10k/month free tier — should cost $0.", BODY),
    PageBreak(),
]

# ---------- Code map ----------
story += [
    p("Codebase reference", H2),
    p("<b>places.py</b> — Google Places + Geocoding client. Fan-out by category, "
      "circular radius enforcement via locationBias + post-filter.", BODY),
    p("<b>classify.py</b> — Initial bucketing from Google data alone "
      "(no_website / social_only / has_website / chain).", BODY),
    p("<b>verify.py</b> — Live website check. Returns ok / dead / template / social / unknown. "
      "refine_lead_type() promotes leads to dead_website / template_only.", BODY),
    p("<b>outreach.py</b> — Template-based cold-call script generator. "
      "Forks on lead_type, weaves in specific signal (rating, review count, city, "
      "vendor name).", BODY),
    p("<b>db.py</b> — SQLite layer. Schema includes lat/lng, website_status, "
      "outreach_script, last_contacted_at. Upserts preserve user-edited status/notes.", BODY),
    p("<b>app.py</b> — Streamlit dashboard. Three tabs: Leads, Map, Tools.", BODY),

    Spacer(1, 0.3 * inch),
    p("Lead pipeline (end to end)", H3),
    p("1. <b>Scan</b> an area (sidebar) → API calls fan out by category, deduped, "
      "radius-clipped, classified.", BODY),
    p("2. <b>Verify</b> all websites in bulk (Tools tab) → refines initial buckets.", BODY),
    p("3. <b>Backfill coords</b> if needed (Tools tab) → enables Map tab.", BODY),
    p("4. <b>Filter</b> by lead type / status / address text in the sidebar.", BODY),
    p("5. <b>Pick a lead</b> from the sortable table → review the detail panel.", BODY),
    p("6. <b>Generate script</b> → call → save status + notes.", BODY),
    p("7. <b>Export CSV</b> for further outreach in batch.", BODY),
]

doc = SimpleDocTemplate(str(OUT), pagesize=LETTER,
                        leftMargin=0.8*inch, rightMargin=0.8*inch,
                        topMargin=0.8*inch, bottomMargin=0.8*inch,
                        title="website_find features", author="Claude")
doc.build(story)
print(f"Wrote {OUT}")
