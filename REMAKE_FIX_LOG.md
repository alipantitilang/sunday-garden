# Sunday Garden — Remake & Fix Log

Remake & Fix entries record changes to systems that were already built in a completed or active phase. They do **not** rewrite Phase 01–32 history.

## RF-001 — Language System Remake — COMPLETED

**Date:** 2026-09-25  
**Scope:** Global UI language and content-language conventions

### Language rule

- **English** remains for Hero openings, section eyebrows/openers, and selected editorial headlines.
- **Bahasa Indonesia** is used for navigation, buttons, labels, explanatory copy, data presentation, metadata labels, filters, feedback-facing UI, and other user-facing utility text.
- **Gardener stories** remain in the language and wording supplied by the Gardener.
- **Scientific names and botanical nomenclature** remain in their original Latin/scientific form.

### Changes

- Added a shared `SundayGardenI18n` language map in `js/main.js`.
- Changed global navigation and footer labels to Indonesian.
- Changed Garden search/filter/status strings to Indonesian.
- Changed Home and About utility copy and CTAs to Indonesian while retaining English editorial openings.
- Changed Flower Page profile labels and fallback UI to Indonesian.
- Added Indonesian labels for common botanical data keys shown by the current renderer.
- Changed accessibility labels and no-JavaScript messages to Indonesian.
- Preserved English editorial eyebrows/openers such as `A Gardener's Flower`, `Why did they choose this flower?`, and `From the roots to the bloom`.

### Validation

- `node --check js/main.js`
- `node --check js/home.js`
- `node --check js/garden.js`
- `node --check js/flower.js`
- Existing data validator remains the source-of-truth validation for JSON content.

### Next

**RF-002 — Flower Data Visibility Remake**: make the Flower Page renderer expose every available morphology/data field instead of relying on a fixed field list.


## RF-002 — Flower Data Visibility Remake — COMPLETED

**Date:** 2026-09-25  
**Scope:** Flower Page data rendering and visibility

### Problem
The research records contained fields that the renderer did not explicitly know about. This caused valid data such as Red Rose `roots`, `stem`, and `prickles`, or Pink Tulip/White Lily `bulb` and singular `flower`, to disappear from the rendered page. Complex future values could also degrade into `[object Object]`.

### Changes
- Replaced the fixed morphology renderer with a data-driven renderer that iterates over every meaningful field present in the record.
- Added support for both singular and plural keys (`flower` / `flowers`) without special-case page markup.
- Added recursive rendering for arrays and nested objects.
- Added Indonesian labels for additional botanical/taxonomic data keys.
- Exposed researched distribution/habitat details that were previously only partially represented.
- Exposed conservation data when present.
- Kept empty/null values hidden rather than inventing content.
- Preserved the existing editorial section structure and Gardener story.

### Validation
- `node --check js/flower.js` passed.
- `node tools/validate-data.mjs` passed: 5 Gardener(s), 5 flower(s), 5 researched / 0 pending.
- All five current flower records were checked against their morphology keys; the renderer now uses dynamic key iteration rather than a fixed field list.

## RF-003 — Dynamic Growth Cycle Remake — COMPLETED

**Date:** 2026-09-25  
**Scope:** Flower Page growth-cycle presentation

### Problem
The previous growth presentation used a fixed four-column card grid. Flowers with a different number of phases, such as Pink Tulip with five phases, did not have a layout that reflected the actual cycle structure.

### Changes
- Replaced the fixed `growth-flow` card grid with a data-driven circular growth cycle.
- The number of cycle nodes is derived directly from `howItGrows.length`.
- The visual remains circular for different phase counts instead of assuming four phases.
- Added a central cycle indicator showing the current number of phases.
- Added accessible labels describing the number and order of phases.
- Added a readable detail list beneath the circular visualization so long phase descriptions remain legible on smaller screens.
- Removed the old fixed growth-card CSS and its responsive overrides.
- Kept the cycle content sourced exclusively from `flowers.json`; no growth phase was invented or rewritten.

### Validation
- `node --check js/flower.js` passed.
- `node tools/validate-data.mjs` passed: 5 Gardener(s), 5 flower(s), 5 researched / 0 pending.
- Current growth phase counts verified: Blue Lotus 4, Red Rose 4, Pink Tulip 5, White Lily 4, Pink & White Lily 4.

### Next
**RF-005 — Taxonomy & Fallback Robustness**


## RF-005 — Taxonomy & Fallback Robustness — COMPLETED

**Date:** 2026-09-25  
**Scope:** Flower Page taxonomy display, category-level records, and fallback behavior

### Problem
A null `taxonomy.acceptedName` was being treated as if research were incomplete. This was incorrect for category-level records such as Pink Tulip, where the research deliberately remains at genus level. The Flower Page also did not surface several existing taxonomy fields consistently.

### Changes
- Added a taxonomy-aware fallback: a researched record with no accepted species name now states that it is not assigned to a single species and identifies the researched genus instead of showing a research-pending message.
- Added Kingdom, Order, and Synonyms to the Flower Page botanical profile when those values exist.
- Escaped taxonomy/profile values consistently before rendering.
- Kept accepted names such as `Nymphaea nouchali var. caerulea (Savigny) Verdc.` visible as the current treatment when the record provides one.
- Preserved category-level uncertainty for Red Rose, Pink Tulip, White Lily, and Pink & White Lily without assigning an unsupported species.
- Removed a legacy duplicate `What It Can Mean` renderer left behind after RF-004, leaving one canonical meaning section per Flower Page.

### Validation
- `node --check js/flower.js` passed.
- `node --check js/main.js` passed.
- `node tools/validate-data.mjs` passed: 5 Gardener(s), 5 flower(s), 5 researched / 0 pending.
- Taxonomy records checked: Blue Lotus has an accepted treatment; Pink Tulip has no accepted species name but remains `complete` and uses genus-level treatment; the remaining category records retain their documented genus-level scope.

### Next
**RF-006 — Responsive Audit**


## RF-006 — Responsive Audit — COMPLETED

**Date:** 2026-09-25  
**Scope:** Responsive behavior across the Flower Page and site-wide editorial layouts

### Problem
The new RF-001 through RF-005 components needed a final responsive pass. Several areas still relied on breakpoint-specific sizing, fixed mobile growth-cycle offsets, or layouts that could become cramped when text, scientific names, source URLs, or data fields grew.

### Changes
- Added a dedicated RF-006 responsive layer to `flower.css`, `garden.css`, `home.css`, `about.css`, and `components.css`.
- Added fluid desktop/tablet/mobile sizing and narrower fallbacks without changing the quiet botanical visual identity.
- Kept Garden Cards at two columns on desktop and switched to one column on narrow screens.
- Improved Flower Page morphology/facts grids, taxonomy rows, meaning notes, source lists, CTA, and long-text wrapping.
- Tuned the circular Growth Cycle for tablet, mobile, very narrow, and short-landscape viewports.
- Added safe wrapping for scientific names and external source URLs.
- Improved mobile navigation/footer sizing and Home/About stacking.
- Preserved reduced-motion behavior and avoided introducing horizontal content overflow through fixed child widths.

### Validation
- `node --check js/flower.js` passed.
- `node --check js/garden.js` passed.
- `node --check js/main.js` passed.
- `node tools/validate-data.mjs` passed: 5 Gardener(s), 5 flower(s), 5 researched / 0 pending.
- Responsive rules were audited across 320px, 380px, 430px, 600px, 680px, 800px, 900px, 1100px, and wide desktop breakpoint ranges.

### Result
RF-006 closes the current responsive audit scope for the RF-001–RF-005 remake series. Future responsive changes should be logged as a new Remake & Fix entry rather than rewriting the Phase 01–32 history.
