# Sunday Garden

A quiet botanical journal of flowers and human stories.

## Current phase

- [x] Phase 01 — Foundation
- [x] Phase 02 — Navbar + Global Components
- [x] Phase 03 — Home
- [x] Phase 04 — The Garden
- [x] Phase 05 — Flower Page
- [x] Phase 06 — About
- [x] Phase 07 — Responsive Refinement
- [x] Phase 08 — Accessibility + Performance
- [x] Phase 09 — Content/Data
- [x] Phase 10 — Final Polish

## Run locally

Because the site loads JSON with `fetch()`, open it through a local static server rather than `file://`.

Example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.


## Phase 05 — Flower Page
Completed: universal Flower Page, Alip/Blue Lotus content, botanical facts, cultural notes, sources, story-first layout, responsive styling, and query-string routing.

## Phase 07 — Responsive Refinement

Completed responsive refinement across Home, The Garden, Flower Page, About, global navigation, and footer.

Focus areas:
- desktop / tablet / mobile layout transitions
- small-screen typography and spacing
- mobile navigation sizing and touch targets
- Garden grid and controls
- Flower Page hero, facts, growth flow, sources, and CTA
- About page editorial stacking
- footer wrapping
- 320px minimum-width resilience
- reduced-motion behavior preserved

## Phase 09 — Content/Data

- Expanded the Blue Lotus content model with distribution, habitat, flowering, reproduction, life-cycle, ecology, and conservation-note fields.
- Added explicit separation between botanical facts, cultural/historical notes, and Sunday Garden interpretation.
- Added optional Gardener `about` structure and publication status.
- Added `data/README.md` documenting the content model and editorial rules.
- Added `tools/validate-data.mjs` for lightweight local content validation.

## Phase 10 — Final Polish

- Added canonical URLs and basic Open Graph / Twitter metadata to the main pages.
- Added `robots.txt` and `sitemap.xml` for the planned `sundaygarden.com` domain.
- Added image failure handling to featured cards.
- Flower pages now update their document title and description from the selected Gardener/flower.
- Added small overflow/tap-target polish without changing the established visual direction.
- Re-ran data validation and JavaScript syntax checks.

## Asset note

The repository expects the visual assets described in `AI_RULES.md` under `assets/brand/`, `assets/images/`, and `assets/textures/`. Keep the original user-created assets at those paths before deployment.

## Gardener update — Sarah

Added Gardener **Sarah** with **Pink & White Lily** (`Lilium spp.`) and her original story. Image paths are configured for:
- `assets/images/Sarah-pink-white-lily-hero.png`
- `assets/images/Sarah-pink-white-lily-card.png`

These image files must be placed at those exact paths before deployment if they are not already present in the project assets.
