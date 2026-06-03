"""Generate the Thrive Web Co 27-Point Conversion Checklist PDF."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

WIDTH, HEIGHT = letter
BG = HexColor("#0a0a0a")
ACCENT = HexColor("#C4E86B")
PURPLE = HexColor("#9B92C4")
WHITE = HexColor("#E8E8EA")
GRAY = HexColor("#888888")
DARK_CARD = HexColor("#1a1a1a")

SECTIONS = [
    ("Above the Fold", [
        "Hero headline addresses a specific pain point, not a feature list",
        "Primary CTA is visible without scrolling on all devices",
        "Social proof (logos, stats, or testimonials) within first viewport",
        "Page loads in under 2.5 seconds (Core Web Vitals pass)",
        "Clear value proposition in 6 words or fewer",
        "Hero image/video shows outcome, not process",
    ]),
    ("Call-to-Action Strategy", [
        "Only ONE primary CTA per page (reduce decision fatigue)",
        "CTA button uses action verb + benefit (e.g. 'Get My Free Audit')",
        "CTA color contrasts with surrounding elements",
        "Secondary CTA offered for not-ready visitors (e.g. download, learn more)",
        "CTA repeated after every major content section",
        "Sticky header or floating CTA on mobile",
    ]),
    ("Trust & Social Proof", [
        "Client logos displayed prominently (aim for 5-8)",
        "Testimonials include full name, photo, and company",
        "Specific results/metrics in testimonials (not vague praise)",
        "Case study or before/after within scroll depth",
        "Trust badges: SSL, guarantees, certifications",
    ]),
    ("Mobile Optimization", [
        "Tap targets are at least 48x48px with adequate spacing",
        "Forms use appropriate mobile input types (tel, email, etc.)",
        "No horizontal scrolling on any breakpoint",
        "Font size minimum 16px on mobile (prevents iOS zoom)",
        "Thumb-friendly navigation — key actions in bottom half of screen",
    ]),
    ("Conversion Psychology", [
        "Urgency or scarcity element (genuine, not fake)",
        "Risk reversal near CTA (guarantee, free trial, no commitment)",
        "Price anchoring if showing pricing (show value vs. cost)",
        "Exit-intent or scroll-triggered secondary offer",
        "Thank-you page upsells or next step (don't waste the confirmation)",
    ]),
]


def draw_rounded_rect(c, x, y, w, h, r, fill_color):
    c.setFillColor(fill_color)
    c.setStrokeColor(fill_color)
    p = c.beginPath()
    p.moveTo(x + r, y)
    p.lineTo(x + w - r, y)
    p.arcTo(x + w - r, y, x + w, y + r, r)
    p.lineTo(x + w, y + h - r)
    p.arcTo(x + w, y + h - r, x + w - r, y + h, r)
    p.lineTo(x + r, y + h)
    p.arcTo(x + r, y + h, x, y + h - r, r)
    p.lineTo(x, y + r)
    p.arcTo(x, y + r, x + r, y, r)
    p.close()
    c.drawPath(p, fill=1, stroke=0)


def draw_checkbox(c, x, y, size=12):
    c.setStrokeColor(PURPLE)
    c.setLineWidth(1.5)
    c.setFillColor(HexColor("#1a1a1a"))
    c.roundRect(x, y, size, size, 2, fill=1, stroke=1)


def new_page_bg(c):
    c.setFillColor(BG)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)


def build_pdf():
    output = "thrive_conversion_checklist.pdf"
    c = canvas.Canvas(output, pagesize=letter)

    # --- PAGE 1: Cover ---
    new_page_bg(c)

    # Accent bar at top
    c.setFillColor(ACCENT)
    c.rect(0, HEIGHT - 6, WIDTH, 6, fill=1, stroke=0)

    # Brand
    c.setFillColor(GRAY)
    c.setFont("Helvetica", 11)
    c.drawCentredString(WIDTH / 2, HEIGHT - 50, "THRIVE WEB CO")

    # Title
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 38)
    c.drawCentredString(WIDTH / 2, HEIGHT - 160, "The 27-Point")
    c.setFillColor(ACCENT)
    c.drawCentredString(WIDTH / 2, HEIGHT - 205, "Conversion Checklist")

    # Subtitle
    c.setFillColor(GRAY)
    c.setFont("Helvetica", 14)
    c.drawCentredString(WIDTH / 2, HEIGHT - 250, "The exact framework we use to 3x conversions for our clients.")

    # Divider line
    c.setStrokeColor(PURPLE)
    c.setLineWidth(2)
    c.line(WIDTH / 2 - 40, HEIGHT - 280, WIDTH / 2 + 40, HEIGHT - 280)

    # Stats row
    stats = [("150+", "Brands Served"), ("3x", "Avg. Conversion Lift"), ("27", "Checkpoints")]
    stat_y = HEIGHT - 360
    for i, (num, label) in enumerate(stats):
        sx = 130 + i * 180
        draw_rounded_rect(c, sx - 60, stat_y - 20, 130, 65, 10, DARK_CARD)
        c.setFillColor(ACCENT)
        c.setFont("Helvetica-Bold", 24)
        c.drawCentredString(sx + 5, stat_y + 20, num)
        c.setFillColor(GRAY)
        c.setFont("Helvetica", 9)
        c.drawCentredString(sx + 5, stat_y - 5, label)

    # How to use
    box_y = HEIGHT - 520
    draw_rounded_rect(c, 60, box_y, WIDTH - 120, 90, 12, DARK_CARD)
    c.setFillColor(ACCENT)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(85, box_y + 60, "How to Use This Checklist")
    c.setFillColor(HexColor("#bbbbbb"))
    c.setFont("Helvetica", 10)
    c.drawString(85, box_y + 40, "Go through each item and check it off for your website.")
    c.drawString(85, box_y + 24, "Any unchecked box is a conversion leak costing you customers.")
    c.drawString(85, box_y + 8, "Fix the gaps, re-test, and watch your numbers climb.")

    # Footer
    c.setFillColor(HexColor("#555555"))
    c.setFont("Helvetica", 9)
    c.drawCentredString(WIDTH / 2, 40, "thriveweb.co  |  Free Conversion Checklist  |  Page 1")

    c.showPage()

    # --- PAGE 2+: Checklist sections ---
    margin_x = 60
    y = HEIGHT - 60
    section_idx = 0
    item_count = 0

    new_page_bg(c)
    # Top bar
    c.setFillColor(ACCENT)
    c.rect(0, HEIGHT - 4, WIDTH, 4, fill=1, stroke=0)
    page_num = 2

    for sec_title, items in SECTIONS:
        # Check if we need a new page (need ~40px for header + items)
        needed = 50 + len(items) * 28
        if y - needed < 60:
            # Footer
            c.setFillColor(HexColor("#555555"))
            c.setFont("Helvetica", 9)
            c.drawCentredString(WIDTH / 2, 40, f"thriveweb.co  |  Free Conversion Checklist  |  Page {page_num}")
            c.showPage()
            page_num += 1
            new_page_bg(c)
            c.setFillColor(ACCENT)
            c.rect(0, HEIGHT - 4, WIDTH, 4, fill=1, stroke=0)
            y = HEIGHT - 60

        section_idx += 1

        # Section header
        y -= 15
        c.setFillColor(PURPLE)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(margin_x, y, f"SECTION {section_idx}")
        y -= 22
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 18)
        c.drawString(margin_x, y, sec_title)
        y -= 8

        # Divider
        c.setStrokeColor(HexColor("#333333"))
        c.setLineWidth(0.5)
        c.line(margin_x, y, WIDTH - margin_x, y)
        y -= 20

        # Items
        for item in items:
            item_count += 1
            draw_checkbox(c, margin_x, y - 2)

            # Item number
            c.setFillColor(PURPLE)
            c.setFont("Helvetica-Bold", 9)
            c.drawString(margin_x + 20, y, f"{item_count}.")

            # Item text — handle wrapping for long items
            c.setFillColor(HexColor("#cccccc"))
            c.setFont("Helvetica", 10)
            text_x = margin_x + 38
            max_width = WIDTH - margin_x - text_x + 20
            # Simple word wrap
            words = item.split()
            lines = []
            current = ""
            for w in words:
                test = f"{current} {w}".strip()
                if c.stringWidth(test, "Helvetica", 10) < max_width:
                    current = test
                else:
                    lines.append(current)
                    current = w
            if current:
                lines.append(current)

            for li, line in enumerate(lines):
                c.drawString(text_x, y - li * 14, line)

            y -= max(len(lines), 1) * 14 + 12

    # Final footer
    c.setFillColor(HexColor("#555555"))
    c.setFont("Helvetica", 9)
    c.drawCentredString(WIDTH / 2, 40, f"thriveweb.co  |  Free Conversion Checklist  |  Page {page_num}")

    # --- LAST PAGE: CTA ---
    c.showPage()
    page_num += 1
    new_page_bg(c)
    c.setFillColor(ACCENT)
    c.rect(0, HEIGHT - 4, WIDTH, 4, fill=1, stroke=0)

    # Big CTA section
    cta_y = HEIGHT / 2 + 80
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawCentredString(WIDTH / 2, cta_y, "Need Help Fixing the Gaps?")

    c.setFillColor(GRAY)
    c.setFont("Helvetica", 13)
    c.drawCentredString(WIDTH / 2, cta_y - 35, "Book a free 15-minute audit call with our team.")
    c.drawCentredString(WIDTH / 2, cta_y - 55, "We'll review your site and show you exactly what to fix.")

    # CTA button
    btn_w, btn_h = 260, 50
    btn_x = (WIDTH - btn_w) / 2
    btn_y = cta_y - 120
    draw_rounded_rect(c, btn_x, btn_y, btn_w, btn_h, 25, ACCENT)
    c.setFillColor(BG)
    c.setFont("Helvetica-Bold", 15)
    c.drawCentredString(WIDTH / 2, btn_y + 17, "Book Your Free Audit")

    # Contact
    c.setFillColor(GRAY)
    c.setFont("Helvetica", 11)
    c.drawCentredString(WIDTH / 2, btn_y - 40, "thriveweb.co")

    # Footer
    c.setFillColor(HexColor("#555555"))
    c.setFont("Helvetica", 9)
    c.drawCentredString(WIDTH / 2, 40, f"thriveweb.co  |  Free Conversion Checklist  |  Page {page_num}")

    c.save()
    print(f"PDF generated: {output}")


if __name__ == "__main__":
    build_pdf()
