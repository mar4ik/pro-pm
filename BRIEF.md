# AI քեզ Project Manager — redesign brief

Date: 2026-10-19 · Page: https://aiqezban.ai/courses/pro/project-manager · Content source: Notion "AI քեզ Project Manager" (AI Qez Ban | Squadspace / 1. Products)

## 1. Brief

- **What:** the course landing page for «AI քեզ Project Manager» («AI քեզ բան» × M.A.M), Armenian, one page, registration form at the end.
- **Audience:** working Project / Product Managers and anyone running multi-step initiatives. Not beginners.
- **One thing it must communicate:** you arrive with an idea and leave with an AI-strengthened real project, built lesson by lesson through Soft Labs, ending at Demo Day.
- **Conversion:** register (47,000 AMD, start Nov 4, Wed + Fri 19:00–21:00, Zoom).
- **Brand (AI Քեզ Բան brandbook, Mar 2026):**
  - Type: Adelle Sans / Adelle Sans Arm. Bold for headlines, Regular for text, Thin for fine detail. Nothing else.
  - Primary: Black #1E1E21 · Orange #FF5E16 · Grey #D1D1D1 · White.
  - Secondary: Blue #1E66EE · Yellow #FFCA53 · Teal #00C4B1 · Sky #A2D4FF · Pink #FFB0E8 · Violet #6868E4 · Tan #BD8164.
  - Identity: black blob mascot with white googly eyes; logo = eyes mark + «AIՔեզԲան» wordmark. Black backgrounds are the brand's home.
  - Note: a newer "AI-Qez-Ban-Brand-Guidelines.pdf" was posted in Slack on 2026-09-30. It is not in Notion, so this brief uses the March brandbook plus the tokens already on aiqezban.ai. If the newer guide changes colours or type, tell me and I will re-tokenise.

## 2. Research notes

### Current page (live, desktop + mobile)
- Dark (#1a1a1a) hero with orange CTA, a floating-person hero photo, orange info strip. Already on-brand in colour and uses Adelle Sans ARM for headings, but body falls back to Noto Sans Armenian.
- A blue (#2038c9) block for the programme overview breaks the brand palette (not a brandbook blue) and uses ALL-CAPS Armenian headlines.
- Sections: hero → who it's for → programme (8 lesson cards, 3 bullets each) → outcomes (6) → how we work (3) → Demo Day (short) → form + price panel → FAQ (10) → contacts → footer. Sticky bottom price pill on mobile.
- Everything is a rounded card on a dark surface; eight identical lesson cards in a row is the main scroll-fatigue point. The Demo Day section is thin and the teachers appear only as small avatars inside lesson cards.

### Content gaps vs Notion (must keep / add)
| Notion has | Live page | Action |
|---|---|---|
| Structure line: 3 մոդուլ • 8 դաս • 1 նախագիծ • 1 Demo Day | only "8 դաս՝ 4 շաբաթում" | add as the spec strip |
| Resources: recordings, slides, SOP templates, updating AI-tools list | one sentence in price panel | add to spec / FAQ |
| GTD chain: հավաքել → հստակեցնել → կազմակերպել → վերանայել → գործել | missing | add; it is the page's spine |
| 8 "after 8 lessons you can…" outcomes | 6 reworded outcomes | keep 8 from Notion |
| How we work: 5 points (2h lesson, 10-min break, 4×5-min Q&A, live tool demos, recordings, Soft Labs, Demo Day pre-selection) | 3 cards | restore the detail |
| Per lesson: full topic list, tools, result, Soft Lab | 3 bullets | show tools + result + Soft Lab, expandable topics |
| Continuous project chain (audit → AI workspace → … → presentation) | missing | add |
| Demo Day: 2h, open to all, top 5 live, one winner, prize TBA; 5-step selection; 6 weighted criteria (20/15/10/30/10/15) | 3 bullets | add criteria with weights |
| Teacher bios (Anjela, Artak) + guest experts note | names + one-line roles only | add bios |
| Contacts: +374 44 199 199 (AQB), +374 12 220 221 and WhatsApp +374 44 220 221 (M.A.M) | present | keep |
| Price 47,000 AMD | present | keep |

### What to drop or trim
- The off-brand blue block and ALL-CAPS headings.
- Identical card grids for every section; emoji-free already, keep it so.
- Duplicate "Ո՞ւմ համար է" wording across hero + section + FAQ.

## 3. Discover — 15 directions

Seeds (hex, per mocked direction): A `e2e47b2c34ad520cc9c307f5aaa53e35` · B `f14f8185b822a00e88ac5291bf259e5e` · C `2e671e0cf7a6f505b6eb68c4e304e76d`

1. **Syllabus poster** — white paper, Swiss grid, the 8 lessons as a timetable with hairlines; orange only for rules and the CTA. *(mocked: A)*
2. **GTD chain** — one orange line runs down the whole page; every section is a node on հավաքել → … → գործել. *(mocked: B)*
3. **Colour-block modules** — each module is a full-bleed band in a secondary brand colour (blue, teal, yellow); black hero, orange Demo Day. *(mocked: C)*
4. **Black board** — all-black editorial, huge Adelle Bold headlines, orange only on numbers and CTAs; mascot eyes peek from corners.
5. **Kanban board** — the page is a PM board: sections as columns, modules as swimlanes, Demo Day in "Done".
6. **Status report** — the course as a project dashboard: red/yellow/green chips, weighted criteria bars, tabular numerals.
7. **Window chrome** — hero and lessons framed as browser/Zoom windows, echoing the brandbook's digital page.
8. **Mascot-led** — the black blobs carry the story; eyes react per section; very little text per screen.
9. **Spec sheet** — brutalist product-label block up top (3 • 8 • 1 • 1), monoline tables, no cards at all.
10. **Night class** — black with tan/yellow warmth for an evening 19:00–21:00 feel; a large clock motif.
11. **Two-brand split** — AQB black/orange left, M.A.M white/black right, halves meet at the register panel.
12. **Magazine feature** — long-form editorial, teacher pull-quotes, large duotone portraits.
13. **Demo Day spotlight** — the finale drives the page: countdown hero, criteria as a big ring chart, lessons as the path there.
14. **Thumb stack** — single column of thumb-sized panels, sticky price pill, accordion curriculum; built for Instagram traffic.
15. **Orange field** — invert the brand: orange page, black type, white panels; black only in the hero.

Mocks are in this folder: `mock-a-syllabus.html`, `mock-b-chain.html`, `mock-c-blocks.html`; compare them in `mocks.html`. The working page is `index.html` (served at http://localhost:8765/pm/).
