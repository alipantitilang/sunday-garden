# Sunday Garden — Structured Development Phase Plan

This plan intentionally uses many small phases so content, data, UI, and editorial quality remain consistent as the garden grows.

## Phase history

### Phase 01 — Foundation — COMPLETED
Goal: establish the initial Sunday Garden site structure and visual direction.

### Phase 02 — Navbar + Global Components — COMPLETED
Goal: establish reusable navigation and global UI components.

### Phase 03 — Home — COMPLETED
Goal: build the landing/home experience and establish the site's story-first introduction.

### Phase 04 — The Garden — COMPLETED
Goal: create the Gardener/card browsing experience.

### Phase 05 — Flower Page — COMPLETED
Goal: create the universal Flower Page with query-string routing and story-first content.

### Phase 06 — About — COMPLETED
Goal: establish the About page and Sunday Garden identity.

### Phase 07 — Responsive Refinement — COMPLETED
Goal: refine Home, Garden, Flower, About, navigation, and footer across screen sizes.

### Phase 08 — Accessibility + Performance — COMPLETED
Goal: establish the initial accessibility and performance baseline.

### Phase 09 — Content/Data — COMPLETED
Goal: establish structured content, Blue Lotus research fields, optional Gardener data, and validation.

### Phase 10 — Final Polish — COMPLETED
Goal: complete metadata, robots/sitemap, image failure handling, dynamic Flower Page metadata, and small UI polish.

### Phase 11 — Data Source Audit — COMPLETED
Goal: establish the exact project files as the working source of truth.
- audit `AI_RULES.md`
- audit `data/gardeners.json`
- audit `data/flowers.json`
- audit data README and validator
- identify stale/local image references
- confirm universal Flower Page routing

### Phase 12 — Gardener Schema Normalization — COMPLETED
Goal: make every Gardener follow one canonical schema.
- normalize existing records
- preserve stable IDs
- preserve stories exactly
- add `about`, `media.gallery`, `media.altText`, and `status`
- do not change personal meaning

### Phase 13 — Existing Gardener Media Migration — COMPLETED
Goal: move all known Garden Card/Hero URLs into `gardeners.json`.
- Alip
- Sarah
- Hyunwo
- Gina
- Leo
- verify hero/card assignment
- verify canonical CDN URLs

### Phase 14 — Flower Registry Normalization — COMPLETED
Goal: establish one reusable canonical record per flower.
- Blue Lotus
- Pink & White Lily
- Red Rose
- Pink Tulip
- White Lily
- resolve taxonomy ambiguity explicitly
- prevent duplicate flower IDs
- allow pending records without invented research

### Phase 15 — Flower Research: Red Rose — COMPLETED
Goal: bring Red Rose to the canonical research standard.
- taxonomy
- morphology
- distribution/habitat
- growth/reproduction
- ecology
- cultural history
- documented symbolism
- Sunday Garden interpretation
- source verification

### Phase 16 — Flower Research: Pink Tulip — COMPLETED
Goal: bring Pink Tulip to the same canonical research standard while treating the name as a color/category description rather than one species.

### Phase 17 — Flower Research: White Lily — COMPLETED
Goal: research White Lily at the genus/category level and explicitly distinguish it from any one species such as *Lilium candidum*.

### Phase 18 — Flower Research: Pink & White Lily — COMPLETED
Goal: document the pink-and-white lily category without pretending the color combination identifies one species.
- Lily genus/family context
- color variation
- cultural/historical material
- symbolism with attribution
- clear limitations

### Phase 19 — Blue Lotus Research Audit — COMPLETED
Goal: review the existing Blue Lotus entry against the same canonical standard used for new flowers.
- taxonomy audited against current Kew treatment
- accepted name and synonym distinction clarified
- morphology and growth claims checked
- native/introduced distribution separated
- cultural claims restricted to documented contexts
- symbolism contextualized
- unsupported ecological/pollinator claims removed or avoided
- conservation status not overclaimed
- research sources strengthened
- Alip's personal story preserved separately

## Current milestone

**19 / 32 phases complete.**

## Remake & Fix tracking

Remake & Fix work is separate from the 01–32 phase history. It records redesigns, refactors, fixes, and visibility improvements applied to systems that have already been built.

- **RF-001 — Language System Remake — COMPLETED**
- **RF-002 — Flower Data Visibility Remake — COMPLETED**
- **RF-003 — Dynamic Growth Cycle Remake — COMPLETED**
- **RF-004 — “What It Can Mean” Section Remake — COMPLETED**
- **RF-005 — Taxonomy & Fallback Robustness — COMPLETED**
- **RF-006 — Responsive Audit — COMPLETED**

Detailed history: `REMAKE_FIX_LOG.md`

All five current flower records are now researched:
- Blue Lotus — complete
- Red Rose — complete
- Pink Tulip — complete
- White Lily — complete
- Pink & White Lily — complete

## Next structured roadmap

### Phase 20 — Gardener-to-Flower Relationships — NEXT
Goal: make repeated flowers scale correctly.
- People of This Flower
- multiple Gardeners per flower
- no duplicate flower data
- dynamic relationship rendering

### Phase 21 — Garden Page Responsive Rebuild
Goal: restore the intended 2-column desktop Garden layout and make it fluid.
- 2 columns as desktop default
- 1 column on narrow/portrait layouts
- fluid card width
- fluid typography and spacing
- no horizontal overflow
- zoom-friendly sizing
- preserve 16:9 card ratio
- no fixed-size assumptions that break at unusual viewport sizes

### Phase 22 — Global Responsive Audit
Goal: test Home, Garden, Flower, About, navigation, footer, and popup at varied widths and browser zoom levels.

### Phase 23 — Feedback Popup
Goal: add one reusable “Leave a Little Note” component to every page.
- viewer/Gardener-neutral
- thought/testimonial/reaction/idea/suggestion/other
- fixed bottom-right trigger
- organic entrance/exit animation
- no database yet

### Phase 24 — Manual Feedback Workflow
Goal: connect the popup to the chosen manual collection method.
- email and/or Discord
- if Discord webhook is used, keep the secret server-side
- no exposed webhook in frontend JavaScript

### Phase 25 — Testimonial Data Layer
Goal: prepare `data/testimonials.json`.
- reusable schema
- manual curation
- published/unpublished status
- Gardener/viewer source when known
- future database migration should not require UI rewrite

### Phase 26 — Home Testimonial Strip
Goal: display testimonials in a calm horizontal editorial strip.
- auto movement
- horizontal scroll
- drag/swipe
- pause on interaction
- accessible controls/fallback
- avoid ticker/advertising feel

### Phase 27 — About Page Expansion
Goal: complete the Sunday Garden origin and Garden Keeper sections.
- Garden Keeper profile
- developer photo when supplied
- Sunday Vibes origin
- server image/card when supplied
- owner name when supplied
- manually maintained active member count initially

### Phase 28 — Sunday Vibes Data Boundary
Goal: isolate community metadata from page markup.
- dedicated static data/config
- member count field
- invite link
- owner information
- later API/database integration without rewriting About HTML

### Phase 29 — Content Editorial Audit
Goal: ensure every published Gardener is represented faithfully.
- story preservation
- personal facts only when supplied
- source attribution
- no accidental AI-generated biography

### Phase 30 — Accessibility + Performance Audit
Goal: final technical quality.
- semantic HTML
- keyboard navigation
- focus states
- alt text
- reduced motion
- image loading
- lazy loading where appropriate
- broken image handling
- JSON fetch errors

### Phase 31 — SEO + Metadata Audit
Goal: consistent metadata for all public pages.
- title/description
- canonical URLs
- Open Graph
- sitemap
- robots
- dynamic Flower Page metadata

### Phase 32 — Final Garden Release
Goal: freeze a stable release candidate.
- validate JSON
- validate links
- validate images
- run JavaScript syntax checks
- run responsive checks
- inspect all published Gardeners
- create release ZIP only after verification

## Phase completion rule

Whenever a phase is completed, update both `README.md` and this file before producing the phase release ZIP. Each completion note should state what changed, what was validated, and what phase comes next.

## Content expansion rule

When a new Gardener arrives, do not restart the whole project.

Use this mini-flow:
1. Add/normalize Gardener data.
2. Reuse an existing flower if possible.
3. If the flower is new, create its canonical record.
4. Research that flower in its dedicated flower phase.
5. Validate the relationship and media.
6. Publish only when the required content is complete.

This keeps every flower equally structured as the garden grows.
