## Iteration 4 — Stable index control sizing and editorial card metadata

### Fixed

- Stabilized the Botanical Index trigger so the `Browse the botanical index` label, active family text, and circular arrow keep fixed grid columns instead of pushing each other when the selected family is `Semua bunga` or `Nymphaeaceae`.
- Kept the active family name fluid inside a bounded column with ellipsis fallback, while the circular control remains a fixed `2rem` element.
- Reworked each Garden Card caption into a consistent three-column, two-row editorial metadata layout:
  - column 1: Gardener name / `Gardener`
  - column 2: English flower name / scientific name
  - column 3: genus / order
- The English flower name now comes from `heroName` so cards display `Blue Lotus`, `Red Rose`, `Pink Tulip`, etc., rather than the Indonesian `commonName`.
- Added taxonomy `order` to the Garden Card data model.
- Removed obsolete card-caption CSS from the previous layout.

### Responsive behavior

- The card metadata remains a three-column structure on mobile, with fluid type and tighter gaps so the information hierarchy stays recognizable without returning to the old stacked caption.
- The index trigger retains its stable arrow/control column at narrow widths.

### Validation

- `node --check js/garden.js` passed.
- `node tools/validate-data.mjs` passed.
- ZIP integrity checked after packaging.

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

### RF-009 Hero Language Correction — ITERATION 2

A follow-up audit found that the Flower Page hero had been localized to Indonesian even though the project language system intentionally reserves the hero/editorial opening for English. The correction remains inside RF-009 because it is part of the same Flower Data Language Consistency scope.

- Added a dedicated `heroName` presentation field to each canonical flower record.
- Restored the English common flower name in the Flower Page hero only:
  - Teratai Biru → **Blue Lotus**
  - Mawar Merah → **Red Rose**
  - Tulip Merah Muda → **Pink Tulip**
  - Lili Putih → **White Lily**
  - Lili Merah Muda & Putih → **Pink & White Lily**
- Restored the hero eyebrow to **“A Gardener's Flower”**.
- Restored the hero byline to **“Chosen by”**.
- Kept the rest of the visitor-facing flower data in Indonesian.
- Kept scientific names unchanged.
- Garden and other non-hero displays continue to use the Indonesian `commonName`.

### Validation

- `node --check js/flower.js` passed.
- `node --check js/main.js` passed.
- `node tools/validate-data.mjs` passed.
- All five flower records contain a valid English `heroName`.
- The hero uses `heroName` only; Indonesian `commonName` remains the canonical visitor-facing data name elsewhere.

### Result

RF-009 remains **ongoing**. Future language inconsistencies discovered during the same audit should continue to be corrected under RF-009 without changing its name. Once the agreed language audit is stable, RF-009 can be formally closed.


## RF-009 Hero & Page Language Consistency — ITERATION 3
**Status:** Ongoing

This iteration applies the requested page-level language corrections without renaming RF-009.

### English surfaces
- Home / The Question: `If you could become a flower, which flower would you want to be?` and `There is no wrong flower.`
- Home / Your Turn: `What flower do you want to bloom as?`
- The Garden / Growing Here: `Meet the Gardeners`
- The Garden / A Growing Collection: `There is still room for more flowers.`
- Flower/Gardener pages: `A little about [Flower]`, `Every flower carries a different story.`, and the shared footer philosophy.
- About: `It all began on a Sunday.`, `A garden where people can be seen without having to explain everything.`, `Gathering stories. Tending to them. Letting them bloom.`, and `Someone has to tend to the little things.`

### Indonesian surfaces
- Home / The Question rationale paragraph translated into Indonesian.
- Flower/Gardener pages: the `Beyond botany` explanation and `Read further` source explanation are Indonesian.
- About / Our Vision: both requested explanatory paragraphs are Indonesian.

### Implementation notes
- The Flower Page `A little about...` heading uses `heroName` when available so its editorial flower name remains English.
- Shared footer text in `js/main.js` is now English for all pages.
- RF-009 remains ongoing; future language issues must continue under RF-009 without creating RF-010 unless explicitly requested.

## RF-010 — Flower Search & Discovery Experience Remake — COMPLETED

**Date:** 2026-09-25  
**Scope:** The Garden search, botanical relationship discovery, filter/sort controls, grouping, and responsive interaction

### Problem

The existing Garden search used a standard search input and flower select filter. It treated flower choices primarily as names and did not expose the botanical relationships already present in the canonical flower data. Related records such as White Lily and Pink & White Lily both using `Lilium spp.` therefore had no visible relationship in discovery. The controls also did not fit the Quiet Botanical Journal direction strongly enough.

### Changes

- Rebuilt the Garden search as an editorial botanical search component with an integrated search mark, clear action, focus state, and responsive behavior.
- Search now matches Gardener name, flower name, English hero name, scientific name, family, and genus.
- The Garden now loads `flowers.json` alongside `gardeners.json` so family/genus relationships come from the canonical botanical records rather than duplicated Gardener data.
- Added a botanical index accordion with family-based discovery controls.
- Added sorting options for Gardener A–Z, flower A–Z, family A–Z, and genus A–Z while preserving the existing garden order as the default.
- Grouped visible results by **Family → Genus → Gardener cards**, allowing related flower categories to be discovered together.
- Kept distinct flower/category records separate even when they share a genus or family.
- Added a compact family/genus relationship line to each Garden Card.
- Added responsive layouts for the discovery controls and grouped result headings.
- Added `prefers-reduced-motion` handling for the new accordion/search interactions.
- Kept the existing Garden Card media, links, and data-driven rendering model.

### Taxonomy behavior

The discovery hierarchy is:

```text
Family → Genus → Flower / category → Gardener
```

This is a relationship view, not a taxonomic merge. For example, White Lily and Pink & White Lily remain separate category records even though both use `Lilium spp.` and share their botanical relationship.

### Documentation updates

- Closed RF-009 as the agreed language audit is complete.
- Added RF-010 to `README.md` and this log.
- Added Flower Search & Discovery governance to `AI_RULES.md`.
- Added the family/genus discovery rule to `data/README.md`.
- Added planned **Phase 33 — Sunday Garden Program Profile & Brand Archive** to the roadmap. This corresponds to the future large About-page update previously discussed as RF-013.

### Validation

- `node --check js/garden.js` passed.
- `node --check js/main.js` passed.
- `node --check js/flower.js` passed.
- `node tools/validate-data.mjs` passed.
- The Garden discovery uses canonical family/genus values from `flowers.json`.
- Current related records resolve correctly: Pink Tulip → Liliaceae / Tulipa; White Lily → Liliaceae / Lilium; Pink & White Lily → Liliaceae / Lilium; Red Rose → Rosaceae / Rosa; Blue Lotus → Nymphaeaceae / Nymphaea.
- No Gardener stories or botanical research content were rewritten by RF-010.

### Result

RF-010 closes the current Flower Search & Discovery Experience scope. Future changes to this existing search/discovery implementation should be logged as a new RF unless they introduce a genuinely new capability that belongs in a future Phase.

## RF-011 — Brand Identity, Navigation & Gardener Asset Remake — CLOSED

**Started:** 2026-09-25

### Scope
- Replace the previous flat brand asset structure with the new brand/content asset architecture.
- Integrate the supplied Sunday Garden favicon, logo, wordmark, compact lockup, and primary branding assets.
- Remake the global navigation around the compact logo+wordmark lockup.
- Remake the global footer around the standalone logo mark and wordmark.
- Update favicon and Apple touch icon references.
- Remove obsolete references to the former `assets/brand/logo.png` and `assets/brand/favicon.png` files.
- Preserve the primary branding asset for the future About / Brand Archive work; it is not used in the navbar.
- Keep Gardener media external where currently defined; the new `assets/images/gardeners/` directory is reserved for future local assets.

### Asset architecture
```text
assets/
├── brand/
│   ├── logo/
│   ├── wordmark/
│   ├── lockup/
│   ├── primary/
│   └── favicon/
├── images/
│   ├── gardeners/
│   ├── flowers/
│   ├── home/
│   └── placeholder/
└── textures/
    └── paper/
```

### Integration rules
- Navbar uses `brand/lockup/sg-logo-wordmark-transparent.svg`.
- Footer uses the standalone logo and wordmark assets.
- `brand/primary/` is reserved for the About / brand archive presentation planned for Phase 33.
- Favicon implementation uses SVG as the modern primary icon, ICO as compatibility fallback, 16/32 PNG browser sizes, and 180 PNG for Apple touch icon.
- 192/512 PNG assets remain available for future PWA/manifest work and are not forced into the current static site before a manifest exists.

### Iteration 2 — Discovery control and accordion behavior

- Fixed the Flower Search/Discovery rendering state so filtering and sorting always operate on the complete canonical Gardener card set instead of the currently rendered group. This prevents a selected family from becoming the accidental source set for subsequent filters.
- Fixed the sequence `Semua bunga → family → another family → Semua bunga`; each state is now recalculated from all published Gardeners.
- Remade the botanical index toggle into a circular arrow control with a stable footprint, so opening/closing does not change the button dimensions.
- Reworked the index panel animation into a measured height transition with opacity and vertical motion.
- The index panel now overlays the collection instead of participating in normal document flow, so opening the accordion no longer pushes the Garden collection section downward.
- Added staggered section entrance timing inside the accordion.
- Stabilized the sorting select dimensions and replaced the browser-dependent select arrow with a consistent botanical-style CSS arrow.
- Preserved `prefers-reduced-motion` behavior.

### Iteration 3 — Deterministic discovery state and true overlay accordion

- Replaced the DOM-card-as-state model with immutable Gardener records. Every search, family filter, and sort operation now derives from the complete `records` collection and creates a fresh card tree. This removes the class of bugs where a previous family selection can leak into the next state.
- Family selection and sorting are now independent state dimensions: selecting Liliaceae does not rewrite or shrink the source dataset, and returning to `Semua bunga` always restores all published Gardeners.
- Sorting now uses stable keys plus the original garden index as a deterministic tie-breaker.
- Replaced native `<details>` accordion behavior with a controlled button/panel accordion. This prevents browser-native open/close behavior from racing the animation.
- The accordion panel uses a grid-row height transition inside an absolutely positioned overlay. It animates its own height while remaining outside normal document flow, so the collection below never moves.
- The circular arrow keeps a fixed footprint and rotates smoothly without changing the trigger dimensions.
- Added click-outside and Escape handling for the controlled accordion.
- The panel contents use staggered opacity/translate transitions after the panel begins opening, creating a visible opening process rather than an instant content swap.
- Preserved reduced-motion behavior and keyboard focus semantics.
- Removed obsolete duplicate root-level brand/home/texture files left over from the asset migration.

### Status
RF-011 is **closed**. The final accepted implementation is the v4 remake, including the stabilized Botanical Index, independent filtering/sorting state, responsive brand/navigation system, cleaned asset architecture, and updated Gardener card metadata layout.

### Asset-format normalization note
The supplied files named with `.svg` extensions were inspected and found to contain raster image data rather than native SVG markup. To keep the approved filenames and make browser MIME handling reliable, RF-011 wraps those supplied raster assets inside valid SVG containers. This preserves the supplied artwork but does **not** turn it into true vector artwork. A future true-vector export can replace these files without changing the website paths.

The supplied `favicon.ico` was likewise a PNG file with an `.ico` extension; RF-011 replaces it with a valid multi-resolution ICO generated from the supplied favicon artwork.


## RF-012 — Growth Cycle Visual & Interaction Remake — IN PROGRESS

RF-012 started after RF-011 closure. The existing data-driven Growth Cycle model from RF-003/RF-008 is retained, while its visual and interaction layer is being remade.

### Initial implementation scope
- Preserve data-driven phase counts; do not hard-code a universal number of phases.
- Keep `standard`, `detailed`, `specialized`, and `custom` resolution handling.
- Retain the circular botanical-editorial presentation for standard 3–8 phase cycles.
- Add sequential entrance animation for orbit, direction cue, center, and phase nodes.
- Make phase nodes interactive with active state, detail transition, and keyboard navigation.
- Keep the detailed phase reading below the visual rather than overcrowding the circle.
- Keep custom-resolution / out-of-range phase counts on the safe linear fallback.
- Support reduced-motion preferences.
- Preserve legacy growth-cycle fallback behavior and avoid changing botanical content.

### Current validation
- `node --check js/flower.js` passes.
- Data schema/content remains unchanged by this RF.
- Browser visual QA is still pending before RF-012 can be closed.
