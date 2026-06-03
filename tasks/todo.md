# brand_site — BeforeAfterSlider Redesign (Phase B1)

## Context
Eeman built a Vite+React+TS+shadcn marketing site for Thrive Web Co (in `brand_site/`). The BeforeAfterSlider section currently shows 3 case studies with empty placeholder text + emoji. First attempt to fix it (commit before this plan) crammed full pixel-detailed page mockups (nav + content grid + sidebar + footer + marquee + web counter, etc.) into a ~700x400px container — every element became unreadable noise at that scale.

## Goal
Make the before/after sliders genuinely impressive — the kind of thing a prospect sees and immediately gets "this agency knows design." Each slider must:
- Read instantly as DATED on the left, MODERN on the right (even at thumbnail size)
- Be readable / scannable at the actual rendered size (~700x400)
- Differentiate the 3 case studies visibly (ecom / saas / local)

## Approach (post-research)

### Visual density principles
- **Far fewer elements per pane.** A hero zone + ONE supporting element. Max 5–6 visual blocks total per side.
- **Bigger type.** Headlines at base 18–24px, not 10–15px.
- **Single hero focal point per side.** Not a full page imitation.
- Both sides should share the SAME structural skeleton (header, hero, support block) so the contrast lands on STYLE, not on layout differences.

### "Dated" signals (pick 2-3 per project, don't pile on)
- Bevel/inset buttons with shadow
- Comic-sans/Times-New-Roman heavy serif headline
- Clashing palette: red + yellow + electric blue
- Centered text alignment everywhere
- Repeating tile background (bg + texture)
- Animated GIF / spinning under-construction motif (use CSS keyframes)
- ALL CAPS + multiple !!!
- Web-1.0 visit counter

### "Modern" signals (pick 2-3 per project)
- Generous whitespace
- Single restrained primary color (brand green or near-black)
- One large heroic statement headline (kerned, tracking-tight)
- Soft shadows + subtle gradient
- Pill nav, rounded soft cards
- Status badge (green dot + label)
- One clear CTA in brand color

### Industry differentiation
- E-com (Luna & Co): product card hero vs. dated catalog table
- SaaS (Stackline): code-snippet visual vs. dated bullet-point table
- Local (Northside Dental): review stars + booking CTA vs. opening-hours text block

## Build Steps

- [ ] Read research subagent's report
- [ ] Rewrite BeforeMockup with 5–6 elements max, larger type, ONE dominant "dated" signal cluster per pane
- [ ] Rewrite AfterMockup with same structural skeleton but modern style language
- [ ] Make the section container wider (max-w-7xl) so the sliders render bigger
- [ ] Drop the row layout for project info; place it INSIDE the slider as part of a meta strip below
- [ ] Improve slider handle visibility (white pill works, but use brand green ring for moment of brand reinforcement)
- [ ] Add a default-position useEffect that auto-animates the slider from 0 → 50 on first viewport entry — sells the interaction immediately

## Verify
- [ ] Take a screenshot of each case study at 50/50, 0/100, 100/0 slider positions and inspect
- [ ] At 50/50, the contrast between left and right must be obvious without reading text
- [ ] Text in both panes must be readable at the rendered size
- [ ] Confirm no overflow / scrollbar / clipping bugs

## Out of scope
- Real client screenshots (no portfolio yet)
- Sound / particle effects
- Animation choreography beyond the auto-reveal

---

## Research findings (from subagent, 2026-05-16)

### Pattern in the wild (agency sites that nailed this)
- Webflow/Framer template galleries, Ueno, Locomotive, Cuberto, Obys, Unfold, Lusion — all use **HERO CROPS, not full-page screenshots**. ~5-7 elements per pane.
- Headlines on the artboard are 28-40px so they survive scaling. Body text rarely smaller than 16px equivalent.

### "Dated" signals (pick 2-3 per project, don't stack all)
- Tiled repeating background (stars, clouds, brushed metal)
- Comic Sans or Papyrus header
- Rainbow WordArt gradient + drop-shadow + outline stroke
- Glossy beveled buttons (`border-style: ridge/outset` or 3D inset shadow)
- Hit-counter / "Best viewed in IE" / animated GIF tropes
- Three clashing primaries (red + lime + royal blue)
- Center-aligned everything
- Marquee/scrolling ribbon

### "Modern" signals (pick 2-3 per project)
- Massive single headline (~25-30% of canvas height), tight tracking
- 60%+ negative space
- Monochrome + ONE accent (near-black + neon-lime CTA)
- Soft low-opacity shadow on one floating element
- Abstract geometric hero blob (gradient mesh + blur)
- Tiny refined nav: wordmark + 3 links

### Density
- **MAX 6-8 elements** at 700x400. Hero crop only, not a full page.
- Anatomy: thin nav · big headline · subline · CTA · visual element · 1 small detail. Done.
- The "bad" side can break the density rule — that's part of the joke. 12-15 cluttered elements is fine IF each is a recognizable trope, not detailed text.

### Faking convincing UIs without real images
- Blurred gradient blobs (`filter: blur(60px)`) = "hero illustration"
- Skeleton bars of varying widths = "body copy"
- Overlapping `rounded-full` avatars w/ conic-gradient fills = "social proof"
- Glass cards: `backdrop-blur` + 1px white/10 border over gradient
- Mini bar charts: a few `<div>`s with varying heights + `bg-gradient-to-t`
- Browser chrome: rounded top + 3 dots + gray URL pill = "this is a website"

### Key principle
**After should feel like an art-directed poster, not a Wikipedia page. Before should feel like a meme of 2008, not a real broken site.**

---

## SESSION PAUSED 2026-05-16 16:15
Status: research done, plan written, NOT YET IMPLEMENTED. Current `BeforeAfterSlider.tsx` in `brand_site/` is the over-dense first attempt — needs to be discarded and rebuilt per the research above.

Dev server (`npm run dev` in `brand_site/`) was running on `:5173` — likely killed when laptop closes.

To resume: re-read this todo.md, restart the dev server, rebuild `BeforeAfterSlider.tsx` per the build steps above.

