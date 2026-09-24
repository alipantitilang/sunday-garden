# Sunday Garden

A quiet botanical journal of flowers and human stories.

> **The flower is the question; the person is the answer.**
>
> Different flowers. Different stories. One garden.

## Project status

**Current phase: Phase 19 — Blue Lotus Research Audit ✅**

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

## What each phase means

| Phase | Focus | Status |
|---|---|---|
| 01 | Foundation | ✅ Complete |
| 02 | Navbar + Global Components | ✅ Complete |
| 03 | Home | ✅ Complete |
| 04 | The Garden | ✅ Complete |
| 05 | Flower Page | ✅ Complete |
| 06 | About | ✅ Complete |
| 07 | Responsive Refinement | ✅ Complete |
| 08 | Accessibility + Performance | ✅ Complete |
| 09 | Content/Data | ✅ Complete |
| 10 | Final Polish | ✅ Complete |
| 11 | Data Source Audit | ✅ Complete |
| 12 | Gardener Schema Normalization | ✅ Complete |
| 13 | Existing Gardener Media Migration | ✅ Complete |
| 14 | Flower Registry Normalization | ✅ Complete |
| 15 | Red Rose Research | ✅ Complete |
| 16 | Pink Tulip Research | ✅ Complete |
| 17 | White Lily Research | ✅ Complete |
| 18 | Pink & White Lily Research | ✅ Complete |
| 19 | Blue Lotus Research Audit | ✅ Complete |
| 20 | Gardener-to-Flower Relationships | ⬜ Next |
| 21 | Garden Page Responsive Rebuild | ⬜ Planned |
| 22 | Global Responsive Audit | ⬜ Planned |
| 23 | Feedback Popup | ⬜ Planned |
| 24 | Manual Feedback Workflow | ⬜ Planned |
| 25 | Testimonial Data Layer | ⬜ Planned |
| 26 | Home Testimonial Strip | ⬜ Planned |
| 27 | About Page Expansion | ⬜ Planned |
| 28 | Sunday Vibes Data Boundary | ⬜ Planned |
| 29 | Content Editorial Audit | ⬜ Planned |
| 30 | Accessibility + Performance Audit | ⬜ Planned |
| 31 | SEO + Metadata Audit | ⬜ Planned |
| 32 | Final Garden Release | ⬜ Planned |

## Phase completion rule

Every completed phase must update this README and `PHASE_PLAN.md` before its release ZIP is considered final.

For each completed phase, record:
1. phase number and title
2. completion status
3. concise scope/results
4. important data or architecture changes
5. validation performed
6. next phase

This keeps every release self-documenting and makes any phase ZIP understandable without relying on chat history.

## Current milestone — Phase 19

The first complete flower-research set is now established:

- **Blue Lotus** — audited and normalized against the research standard
- **Red Rose** — researched with common-name ambiguity documented
- **Pink Tulip** — researched as a color/category description, not one species
- **White Lily** — researched at genus level with *Lilium candidum* treated as a relevant example, not an assumed identity
- **Pink & White Lily** — researched as a visual category within *Lilium*

The Gardener's personal story remains separate from botanical, historical, and symbolic research. Botanical research must never overwrite or invent a Gardener's personal information.

## Next milestone — Phase 20

**Gardener-to-Flower Relationships** will make repeated flowers scale correctly.

The relationship model should support:
- one flower → multiple Gardeners
- one canonical flower record → many Gardener references
- dynamic “People of This Flower” rendering
- no duplicated botanical data inside Gardener records
- stable technical IDs

## Run locally

Because the site loads JSON with `fetch()`, open it through a local static server rather than `file://`.

Example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Editorial principles

Sunday Garden is a digital garden of human stories, not primarily a flower encyclopedia.

- The **flower is the chosen language**.
- The **Gardener's story is the human center**.
- Botanical facts must be source-verified.
- Cultural and symbolic claims must be contextualized and attributed where appropriate.
- Never invent personal facts, stories, or biography.
- Common/color names such as “Red Rose”, “Pink Tulip”, “White Lily”, and “Pink & White Lily” do not automatically identify one species.
- A pending flower record must remain visibly incomplete rather than being filled with guesses.

## Data & validation

- `data/gardeners.json` is the primary Gardener entity source.
- `data/flowers.json` is the canonical flower registry.
- `data/README.md` documents the data schema and editorial rules.
- `tools/validate-data.mjs` performs lightweight registry validation.

Run:

```bash
node tools/validate-data.mjs
```

## Asset note

The repository expects the visual assets described in `AI_RULES.md` under `assets/brand/`, `assets/images/`, and `assets/textures/`. Keep the original user-created assets at those paths before deployment.

## Documentation

- `PHASE_PLAN.md` — complete 1–32 development roadmap and phase history
- `ADD_GARDENER_PROMPT.md` — canonical workflow for adding future Gardeners
- `AI_RULES.md` — project rules for AI-assisted development and content handling
- `data/README.md` — canonical content/data model
