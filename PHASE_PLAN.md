# Sunday Garden — Structured Development Phase Plan

This document tracks **system and workflow development**, not the number of flowers or Gardeners in the garden.

## Phase rules

- **Phase = Update Patch / New Capability.** A Phase introduces a new system, feature, workflow, architecture, or meaningful new web capability.
- **Remake & Fix = existing-system change.** See `REMAKE_FIX_LOG.md`.
- Adding content alone does not create a Phase.
- New flower research is an ongoing content workflow governed by `FLOWER_RESEARCH_PROMPT.md`.
- The roadmap may continue beyond Phase 33 when new innovations are approved.

## Historical baseline

### Phase 01 — Foundation — COMPLETED
Initial site structure and visual direction.

### Phase 02 — Navbar + Global Components — COMPLETED
Reusable navigation and global UI components.

### Phase 03 — Home — COMPLETED
Landing/home experience and story-first introduction.

### Phase 04 — The Garden — COMPLETED
Gardener/card browsing experience.

### Phase 05 — Flower Page — COMPLETED
Universal Flower Page and query-string routing.

### Phase 06 — About — COMPLETED
About page and Sunday Garden identity.

### Phase 07 — Responsive Refinement — COMPLETED
Initial responsive refinement.

### Phase 08 — Accessibility + Performance — COMPLETED
Initial accessibility and performance baseline.

### Phase 09 — Content/Data Foundation — COMPLETED
Structured content, data model, and validation foundation.

### Phase 10 — Final Polish — COMPLETED
Metadata, robots/sitemap, image handling, and UI polish.

### Phase 11 — Data Source Audit — COMPLETED
Project source-of-truth and data audit.

### Phase 12 — Gardener Schema Normalization — COMPLETED
Canonical Gardener schema and stable IDs.

### Phase 13 — Existing Gardener Media Migration — COMPLETED
Canonical media references.

### Phase 14 — Flower Registry Normalization — COMPLETED
Canonical flower registry and taxonomy-scope handling.

> **Legacy content-research note:** Phases 15–19 were historically used for flower-specific research and audits. Individual flowers are intentionally no longer listed in the active Phase roadmap. Their research is now governed as ongoing content work by `FLOWER_RESEARCH_PROMPT.md` and the canonical flower schema. The historical numbering is retained for repository continuity, but it is not part of the active system-progress count.

## Active roadmap

### Remake baseline

RF-001 through RF-012 are completed. The remake series remains open: if another existing-system issue is identified, assign it to the next RF rather than creating a new Phase. New capability work may resume from the active Phase roadmap.

### Workstream / chat separation
- **Phase work and RF work must use separate chats.**
- A **Phase chat** may plan, implement, validate, and document the currently assigned Phase only, unless the user explicitly opens a different Phase.
- An **RF chat** may repair, redesign, refactor, or validate the currently assigned RF only, unless the user explicitly opens a different RF.
- Do not silently convert a Phase task into an RF, or an RF task into a Phase.
- If a requested change belongs to an already planned Phase, update that Phase's description/scope instead of creating a duplicate Phase.
- If a requested change is an existing-system fix, use the next RF and record it in `REMAKE_FIX_LOG.md`.

### RF-012 — Growth Cycle Timeline & Phase Viewer — CLOSED
- Replace the previous circular Growth Cycle visual with a horizontal phase timeline.
- Render one `O` node per research-backed `growthCycle.phases` entry.
- Provide a simple Phase Viewer with an active card and neighboring previews.
- Support direct timeline selection and minimal `<` / `>` previous-next controls.
- Use natural horizontal transitions, sequential entrance motion, and reduced-motion fallback.
- Keep the system data-driven for any supported phase count without inventing or merging biological phases.
- Final implementation is recorded in the latest RF-012 release package.
- Browser visual QA was attempted in the final environment but could not be completed because headless browser execution timed out; closure was accepted by the user after implementation/data validation.

### Phase 20 — Gardener-to-Flower Relationships — NEXT
- People of This Flower
- multiple Gardeners per flower
- canonical relationship rendering
- no duplicated flower research

### Phase 21 — Garden Page Responsive Rebuild
- intended 2-column desktop layout
- 1-column narrow/portrait behavior
- fluid card sizing
- proportional typography and spacing
- no horizontal overflow

### Phase 22 — Global Responsive Audit
Home, Garden, Flower, About, navigation, footer, and future shared components.

### Phase 23 — Feedback Popup
Reusable “Leave a Little Note” component.

### Phase 24 — Manual Feedback Workflow
Manual collection workflow with secrets kept server-side when needed.

### Phase 25 — Testimonial Data Layer
Reusable testimonial schema and publication states.

### Phase 26 — Home Running Cards & Testimonial Strip
A structural Home-page redesign for two data-driven running-card collections:
- up to **10 testimonial cards**;
- up to **10 flower cards**;
- each collection receives its own dedicated visual screen/section rather than being forced into the current Home layout;
- horizontal/continuous card presentation is the intended interaction direction;
- the final motion model, controls, speed, pause behavior, and exact composition remain to be designed and validated in the Phase 26 chat;
- the Home page may therefore undergo a **structural layout rebuild**, not merely a cosmetic section edit.

If the scope expands while still serving this same Home running-card capability, update Phase 26 rather than creating another Phase.

### Phase 27 — About Page Expansion
Garden Keeper, Sunday Garden origin, and supplied community information.

### Phase 28 — Sunday Vibes Data Boundary
Dedicated static community configuration/data boundary.

### Phase 29 — Content Editorial Audit
Story fidelity, attribution, sourcing, and editorial consistency.

### Phase 30 — Accessibility + Performance Audit
Final technical quality pass.

### Phase 31 — SEO + Metadata Audit
Consistent public-page metadata and discoverability.

### Phase 32 — Final Garden Release

Release candidate validation and final packaging.

## Future phases

When a new capability is agreed upon, append the next Phase number rather than rewriting old Phase history.

Examples of future Phase categories may include:
- new interaction systems;
- new community workflows;
- new content-management workflows;
- new relationship models;
- new discovery/navigation experiences;
- new publishing or moderation systems.

## Phase completion rule

When a Phase is completed:
1. validate the implementation;
2. update `README.md`;
3. update this file;
4. update the Feature & Innovation Registry when applicable;
5. record the completion and next step;
6. create a release ZIP only after verification.

### Phase 33 — Sunday Garden Program Profile & Brand Archive — PLANNED
A substantial About-page update that turns the page into the official profile and visual archive of Sunday Garden. The update will document program identity, origin, publication history, relationship with Sunday Vibes, logo/wordmark meaning, colors, typography, visual philosophy, and brand usage. The Primary Branding lockup will be displayed here as the visual reference for the identity explanations.

