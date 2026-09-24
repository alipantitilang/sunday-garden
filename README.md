# Sunday Garden

A quiet botanical journal of flowers and human stories.

> **The flower is the question; the person is the answer.**
>
> Different flowers. Different stories. One garden.

## Project status

**Current phase: Phase 19 — Blue Lotus Research Audit ✅**  
**Current remake/fix: RF-006 — Responsive Audit ✅**

Flower research foundation: **5 / 5 flowers complete**.

Gardeners currently represented:
- Alip → Blue Lotus
- Hyunwo → Red Rose
- Gina → Pink Tulip
- Leo → White Lily
- Sarah → Pink & White Lily

## Master phase checklist

### Foundation & UI
- [x] **Phase 01 — Foundation**
- [x] **Phase 02 — Navbar + Global Components**
- [x] **Phase 03 — Home**
- [x] **Phase 04 — The Garden**
- [x] **Phase 05 — Flower Page**
- [x] **Phase 06 — About**
- [x] **Phase 07 — Responsive Refinement**
- [x] **Phase 08 — Accessibility + Performance**
- [x] **Phase 09 — Content/Data**
- [x] **Phase 10 — Final Polish**

### Data & research foundation
- [x] **Phase 11 — Data Source Audit**
- [x] **Phase 12 — Gardener Schema Normalization**
- [x] **Phase 13 — Existing Gardener Media Migration**
- [x] **Phase 14 — Flower Registry Normalization**
- [x] **Phase 15 — Flower Research: Red Rose**
- [x] **Phase 16 — Flower Research: Pink Tulip**
- [x] **Phase 17 — Flower Research: White Lily**
- [x] **Phase 18 — Flower Research: Pink & White Lily**
- [x] **Phase 19 — Blue Lotus Research Audit**

### Relationships, responsive rebuild & feedback
- [ ] **Phase 20 — Gardener-to-Flower Relationships**
- [ ] **Phase 21 — Garden Page Responsive Rebuild**
- [ ] **Phase 22 — Global Responsive Audit**
- [ ] **Phase 23 — Feedback Popup**
- [ ] **Phase 24 — Manual Feedback Workflow**
- [ ] **Phase 25 — Testimonial Data Layer**
- [ ] **Phase 26 — Home Testimonial Strip**

### About, community boundary & editorial quality
- [ ] **Phase 27 — About Page Expansion**
- [ ] **Phase 28 — Sunday Vibes Data Boundary**
- [ ] **Phase 29 — Content Editorial Audit**
- [ ] **Phase 30 — Accessibility + Performance Audit**
- [ ] **Phase 31 — SEO + Metadata Audit**
- [ ] **Phase 32 — Final Garden Release**

**Progress: 19 / 32 phases complete.**

## Remake & Fix

Remake & Fix entries track changes to systems that have already been built. They do **not** alter the Phase 01–32 history. This allows the project to show how existing systems evolve after real testing and content growth.

| ID | Area | Status |
|---|---|---|
| RF-001 | Language System Remake | ✅ Complete |
| RF-002 | Flower Data Visibility Remake | ✅ Complete |
| RF-003 | Dynamic Growth Cycle Remake | ✅ Complete |
| RF-004 | “What It Can Mean” Section Remake | ✅ Complete |
| RF-005 | Taxonomy & Fallback Robustness | ✅ Complete |
| RF-006 | Responsive Audit | ✅ Complete |


### RF-006 result

- Completed a responsive audit across the Flower Page, Garden, Home, About, and global navigation/footer.
- Added fluid breakpoints for desktop, tablet, mobile portrait, narrow mobile, and short landscape viewports.
- Improved Flower Page typography, data grids, source lists, meaning notes, growth-cycle sizing, and long-text wrapping.
- Kept the Garden at two columns on desktop and one column on narrow/mobile layouts.
- Prevented common content overflow cases from long scientific names, source URLs, labels, and editorial text.
- Kept the circular growth cycle readable on smaller screens with progressively smaller orbit/node sizing.
- Preserved reduced-motion behavior and the existing quiet botanical visual direction.

### RF-005 result

The Flower Page no longer treats a missing `taxonomy.acceptedName` as missing research. Category-level records such as Pink Tulip are explicitly presented as genus-level profiles, while species-level ambiguity remains visible instead of being guessed. Taxonomy fields such as kingdom, order, synonyms, family, and genus are now surfaced consistently. The legacy duplicate symbolism block left behind by the previous remake was also removed so each Flower Page has one canonical meaning section.

### RF-004 result

The Flower Page symbolism presentation is now an editorial sequence of numbered meaning notes. Each note keeps its context visible, while the separate **A Sunday Garden Reading** clearly identifies Sunday Garden's own interpretation. The number of notes follows the available `symbolism[]` data instead of a fixed visual layout.

### RF-003 result

The Flower Page growth presentation is now a data-driven circular cycle. The number of nodes follows each flower's `howItGrows` phase count, while readable phase descriptions remain available below the visual cycle. Pink Tulip therefore renders five cycle nodes without a fixed four-phase layout.
