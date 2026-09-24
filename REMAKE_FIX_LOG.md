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


## RF-007 — Documentation, Information & AI Governance Remake — COMPLETED

### Scope
- Reorganized README around project direction, architecture, Phase rules, Remake & Fix rules, Feature & Innovation Registry, information standards, data governance, workflow, validation, and documentation map.
- Removed individual flower/Gardener records from development progress.
- Removed flower-specific research work from the active Phase roadmap while retaining a continuity note for historical Phase 15–19 work.
- Established Phase as the system/new-capability update path and RF as the existing-system remake/fix path.
- Added an expandable Feature & Innovation Registry with implemented and planned items.
- Added a formal Flower Information Standard, including historical date, place, documented people/roles, scientific description, and history/timeline fields.
- Added a missing-information convention using `-` for relevant research fields that cannot be established.
- Established Indonesian as the primary language for future flower data, while preserving Latin/scientific terminology and relevant original-language excerpts with Indonesian translations.
- Renewed `AI_RULES.md`, `ADD_GARDENER_PROMPT.md` references/requirements, and created `FLOWER_RESEARCH_PROMPT.md`.
- Updated `data/README.md` to match the new governance and schema direction.

### Validation
- Documentation files checked after rewrite.
- Existing data schema retained; no flower/Gardener content was fabricated or removed as part of this documentation remake.

## RF-008 — Growth Cycle Template & Resolution Remake — COMPLETED

**Date:** 2026-09-25  
**Scope:** Growth Cycle data model, research standard, renderer templates, and governance documentation

### Problem

RF-003 made the Growth Cycle phase count dynamic, but the system still treated every phase sequence as if a single circular visual model were sufficient. Biological and developmental research does not provide one universal number of phases for all flowers. Phase count depends on the definition and resolution used by the source.

### Changes

- Replaced the canonical `howItGrows` growth-cycle representation with `growthCycle`.
- Added `type`, `resolution`, and explicit `phases` records.
- Added supported resolution values: `standard`, `detailed`, `specialized`, and `custom`.
- Preserved the existing researched phase descriptions without rewriting their content.
- Added phase IDs and labels so each phase can be addressed independently.
- Updated the Flower Page renderer to select a template from the data:
  - `cycle-3` through `cycle-8` for readable circular presentations;
  - `cycle-custom` for phase counts or structures outside that family.
- Added a custom ordered presentation so detailed/specialized cycles are not forced into an overcrowded circle.
- Kept a legacy renderer fallback for existing array-based growth data.
- Updated the data validator to require a valid `growthCycle` for flower records.
- Updated README, AI rules, Flower Research Prompt, data README, and Phase Plan to establish the new Growth Cycle standard.

### Governance rule

> **Research first → determine resolution → preserve the supported phase count → choose the visual template.**

The visual system must never invent, merge, delete, or reorder biological phases merely to satisfy a template.

### Validation

- `node --check js/flower.js` passed.
- `node --check js/main.js` passed.
- `node tools/validate-data.mjs` passed after the new schema migration.
- All five current flower records use `growthCycle`.
- Current phase counts remain unchanged: Blue Lotus 4, Red Rose 4, Pink Tulip 5, White Lily 4, Pink & White Lily 4.
- No flower research text was fabricated or rewritten.

### Result

RF-008 closes the Growth Cycle remake scope. Future changes to an existing Growth Cycle implementation should be logged as a new RF; a genuinely new interaction/capability should use the next Phase.
## RF-009 — Flower Data Language Consistency Remake — COMPLETED

**Date:** 2026-09-25  
**Scope:** Existing `data/flowers.json` visitor-facing language consistency and content-language compliance

### Problem

The project language standard requires flower content intended for visitors to be written primarily in Indonesian. The existing flower records still contained visitor-facing botanical, ecological, cultural, historical, growth-cycle, and explanatory fields written in English.

### Changes

- Audited the five current flower records in `data/flowers.json`.
- Migrated visitor-facing botanical and editorial prose to Indonesian.
- Migrated displayed flower common names to the established Indonesian naming standard:
  - Blue Lotus → **Teratai Biru**
  - Red Rose → **Mawar Merah**
  - Pink Tulip → **Tulip Merah Muda**
  - White Lily → **Lili Putih**
  - Pink & White Lily → **Lili Merah Muda & Putih**
- Translated nested content across taxonomy notes, morphology, distribution, habitat, flowering, reproduction, life cycle, ecology, conservation, Growth Cycle descriptions, interesting facts, cultural notes, symbolism, and Sunday Garden interpretations.
- Translated source metadata **types** into Indonesian while preserving original source titles and URLs.
- Preserved scientific names, taxonomic nomenclature, proper names, source titles, URLs, technical IDs, schema values, and other fields that should remain in their original form.
- Preserved Gardener stories; no personal story was translated or rewritten by this RF.
- Kept category-level flowers at their documented taxonomic scope; no species identification was introduced merely to localize the language.

### Language boundary

The standard is now: **visitor-facing botanical/editorial content → Indonesian; scientific nomenclature and source identity → preserved; original-language evidence → preserved when required.**

Source titles such as *Plants of the World Online*, museum collection titles, academic journal titles, and cultivar names remain in their original language because translating the title would alter source identity.

### Validation

- `node --check js/flower.js` passed.
- `node --check js/main.js` passed.
- `node tools/validate-data.mjs` passed.
- Registry remains valid: **5 Gardeners, 5 flowers, 5 researched, 0 pending**.
- JSON syntax validated successfully.
- No Gardener story content was changed.
- No scientific/taxonomic identifier was localized incorrectly.

### Result

RF-009 closes the current Flower Data Language Consistency remake scope. If another existing-system issue is discovered later, it should be classified independently and assigned to the next RF when appropriate. New flower research remains content workflow governed by `FLOWER_RESEARCH_PROMPT.md`, not a new Phase.
