# Sunday Garden — Portable AI Handoff Prompt

> **Purpose:** This file is the portable instruction set for any AI that receives a Sunday Garden ZIP without access to the previous development conversation.

---

## COPY / PASTE PROMPT

You are now continuing development of **Sunday Garden**.

You may be a fresh ChatGPT session, a different ChatGPT account, or another AI/development assistant. **Do not assume you know this project from memory. Reconstruct the project from the ZIP and its documentation.**

### 1. First principle — the repository is the source of truth

Before changing anything:

1. Read this `AI_HANDOFF_PROMPT.md`.
2. Read `README.md`.
3. Read `AI_RULES.md`.
4. Read `PHASE_PLAN.md`.
5. Read `REMAKE_FIX_LOG.md`.
6. Read any task-specific prompt/document relevant to the user's request.
7. Inspect the actual HTML/CSS/JS/JSON/assets involved in the requested change.
8. Treat the current ZIP as authoritative over remembered or assumed older versions.

Do not claim a feature exists merely because it is described in an old document. Verify it in the current files.

---

## 2. What Sunday Garden is

Sunday Garden is a quiet botanical journal of flowers, people, and human stories.

Core philosophy:

- **The flower is the question; the person is the answer.**
- **Different flowers. Different stories. One garden.**
- **Everyone blooms in their own way.**

It is not primarily a flower encyclopedia. Flowers are a language through which people express identity, memories, feelings, and stories.

Participants are **Gardeners**.
The creator/curator role is **Garden Keeper**.

Visual direction: **Quiet Botanical Journal** — warm paper, real photography, thin borders, editorial composition, botanical line art, subtle imperfections, whitespace, restrained motion. Avoid SaaS/dashboard aesthetics, excessive rounded cards, glassmorphism, neon, decorative digital gradients, excessive shadows, and unnecessary animation.

---

## 3. Architecture

Sunday Garden is static-first and vanilla:

```text
HTML  = structure
CSS   = visual design
JS    = behavior/rendering
JSON  = content/data
```

Do not introduce a framework unless explicitly requested.

Canonical pages:

```text
index.html
 garden.html
 flower.html
 about.html
```

Canonical data:

```text
data/flowers.json
data/gardeners.json
data/testimonials.json   (when/if introduced by the approved Phase)
```

Do not create one HTML page per Gardener or per flower.

---

## 4. Phase vs RF — strict development classification

### Phase
A Phase is a **new capability, system, workflow, architecture, or meaningful new web capability**.

Examples:
- new testimonial system;
- new community workflow;
- new relationship model;
- new Home interaction architecture.

### RF — Remake & Fix
An RF is an **improvement, repair, redesign, refactor, restructuring, or correction of something that already exists**.

Examples:
- fixing a broken renderer;
- correcting a responsive layout;
- redesigning an existing component;
- correcting existing data behavior.

### Content-only work
Adding a flower, Gardener, story, or research entry is not automatically a Phase or RF.

If the content exposes a system weakness, the system change belongs to RF.
If the content requires a genuinely new capability, the capability belongs to a Phase.

---

## 5. Separate development chats

**Phase work and RF work must happen in different chats.**

### If the user says this is a Phase chat
- Work only on that Phase.
- Update the Phase's scope, implementation, validation, and documentation.
- Do not silently turn unrelated fixes into a new RF.

### If the user says this is an RF chat
- Work only on that RF.
- Record fixes in `REMAKE_FIX_LOG.md`.
- Do not silently create a new Phase for the fix.

### If the requested feature already exists in the roadmap
**Update the existing Phase instead of creating a duplicate Phase.**

This rule is important for Home-page planning and future feature expansions.

---

## 6. Current development state

The historical Phase roadmap currently reaches **Phase 33**.

Phases 01–14 are completed.
Phases 15–19 were historically used for flower-specific research/audits and are no longer treated as active system-progress phases.

Current planned capability sequence includes:

- Phase 20 — Gardener-to-Flower Relationships
- Phase 21 — Garden Page Responsive Rebuild
- Phase 22 — Global Responsive Audit
- Phase 23 — Feedback Popup
- Phase 24 — Manual Feedback Workflow
- Phase 25 — Testimonial Data Layer
- **Phase 26 — Home Running Cards & Testimonial Strip**
- Phase 27 — About Page Expansion
- Phase 28 — Sunday Vibes Data Boundary
- Phase 29 — Content Editorial Audit
- Phase 30 — Accessibility + Performance Audit
- Phase 31 — SEO + Metadata Audit
- Phase 32 — Final Garden Release
- Phase 33 — Sunday Garden Program Profile & Brand Archive

RF-012 — Growth Cycle Timeline & Phase Viewer — **CLOSED**.

Always verify the current status from `PHASE_PLAN.md` and `REMAKE_FIX_LOG.md` because future ZIP versions may change it.

---

## 7. Approved upcoming Home concept — Phase 26

The Home page is planned for a **structural visual redesign**, not merely a cosmetic edit.

The approved concept is a dedicated running-card presentation for two collections:

1. **10 testimonial cards**
2. **10 flower cards**

The collections should have their own dedicated visual screen/section on the Home page rather than being squeezed into the current layout.

The intended direction is a calm editorial **horizontal/continuous running-card** experience.

Important: the exact implementation is **not yet locked**. The Phase 26 chat should decide and validate:

- whether the cards move continuously or use controlled stepping;
- direction and speed;
- hover/touch pause behavior;
- accessibility and reduced-motion behavior;
- whether the two collections use the same or different movement patterns;
- card dimensions and responsive behavior;
- section composition and transitions;
- how the 10 testimonials and 10 flowers are sourced from JSON;
- how navigation/click behavior works.

Do not implement these details prematurely unless the user explicitly asks to begin Phase 26.

If additional requirements are discovered that still belong to this same Home running-card capability, **update Phase 26** rather than creating a new Phase.

---

## 8. Data integrity

Never invent:

- personal stories;
- biographies;
- botanical facts;
- taxonomy;
- dates;
- places;
- historical events;
- scientific claims;
- quotations;
- sources.

Use `-` when relevant research is unavailable rather than guessing.

Keep human story, botanical facts, documented history/culture, and Sunday Garden interpretation distinct.

The principle is:

> **The data should shape the page, not the page limit the data.**

---

## 9. Language system

English is primarily the editorial layer.

Indonesian is primarily the interface and factual/content layer.

Do not translate or alter Latin scientific names, formal taxonomy, proper names, source titles, or required technical terminology.

---

## 10. Change discipline

When modifying the project:

1. Inspect first.
2. Make the smallest coherent change that fulfills the request.
3. Preserve existing working behavior unless the requested scope requires otherwise.
4. Do not silently rewrite unrelated sections.
5. Validate JavaScript syntax and data integrity when applicable.
6. Update the appropriate project documentation.
7. Do not mark a Phase/RF complete until the implementation has actually been checked.
8. If visual browser QA was not successfully performed, say so explicitly.
9. When creating a release ZIP, include the complete repository, not only changed files.

Never claim visual QA passed if it was not successfully performed.

---

## 11. Handoff rule

When finishing a development task, leave the repository in a state that another AI can continue from.

The next AI should be able to answer:

- What is Sunday Garden?
- What architecture does it use?
- What has already been completed?
- What Phase/RF is active or closed?
- What was changed?
- What remains planned?
- Which decisions are locked?
- Which ideas are only proposed?

If an important decision is made during a chat, record it in the appropriate repository document before closing the task.

**Do not depend on the previous chat transcript for project continuity.**

---

## 12. Response behavior

When the user asks for a code/repository change:

- inspect the actual files;
- explain the relevant change briefly;
- implement it rather than merely describing it when the request is actionable;
- validate it;
- provide the resulting full ZIP when appropriate.

When the user is only planning a future Phase/RF:

- update the planning documentation if requested;
- do not implement the feature prematurely;
- distinguish locked decisions from open design questions.

The user prefers iterative collaboration in Indonesian and values precise visual/layout adjustments.
