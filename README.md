# Sunday Garden

> **A quiet botanical journal of flowers, people, and the stories between them.**
>
> **The flower is the question; the person is the answer.**
>
> **Different flowers. Different stories. One garden.**

## 1. Project Direction

Sunday Garden is a story-first digital garden inspired by botanical journals. Flowers provide a language through which people can express something about themselves; the website documents both the human story and the botanical context without confusing the two.

The project is designed to grow continuously. New flowers, Gardeners, stories, research material, features, and ideas may be added without rewriting the project's development history.

### Core principles

- The flower is the question; the person is the answer.
- Human stories remain personal and are never replaced by botanical interpretation.
- Botanical facts, documented history/culture, and Sunday Garden interpretation remain separate.
- Content should shape the interface; the interface should not force valid content into an arbitrary fixed structure.
- Missing research must remain visibly missing rather than being guessed.
- Sunday Garden uses English for its editorial voice and Indonesian for its practical/content voice.

---

## 2. Language System

The website uses a deliberate bilingual editorial system.

### English — editorial layer

Used primarily for:
- Hero opening lines
- Editorial section openers / eyebrows
- Selected editorial headlines
- Short atmospheric phrases that define the journal voice

### Indonesian — content and interface layer

Used primarily for:
- Navigation
- Buttons and calls to action
- Labels and metadata
- Botanical descriptions and explanations
- Research summaries
- Cultural and historical information
- Growth and morphology information
- Feedback and submission interfaces
- Feature descriptions and practical instructions

Gardener stories remain in the language supplied by the Gardener unless the Gardener explicitly requests editing or translation.

### Exceptions

Do not translate or alter:
- Latin botanical names
- Scientific nomenclature
- Taxonomic ranks when the established scientific form is required
- Proper nouns and source titles where the original form is important
- Technical terms that would lose meaning when translated
- Direct research quotations or distinctive original-language expressions

When an original-language quotation or term is useful, preserve the original wording and provide an Indonesian translation beside or immediately after it.

---

## 3. Architecture

Sunday Garden is static-first and intentionally lightweight.

```text
HTML  → structure
CSS   → visual system
JS    → behavior / rendering
JSON  → content / data
```

Current architecture:

```text
sunday-garden/
├── index.html
├── garden.html
├── flower.html
├── about.html
├── assets/
├── data/
│   ├── flowers.json
│   ├── gardeners.json
│   └── README.md
├── css/
├── js/
├── tools/
├── README.md
├── AI_RULES.md
├── ADD_GARDENER_PROMPT.md
├── FLOWER_RESEARCH_PROMPT.md
├── PHASE_PLAN.md
└── REMAKE_FIX_LOG.md
```

The universal Flower Page uses query-string routing. Flower and Gardener content must remain data-driven; do not create one HTML page per person or flower.

---

## 4. Development Tracking Model

Sunday Garden separates development work into two different histories.

### Phase — Update Patch / New Capability

A **Phase** introduces a new capability, system, workflow, architecture, or meaningful new web feature.

Examples:
- creating a feedback system;
- creating a testimonial data layer;
- introducing a new relationship model;
- introducing a new community workflow.

Phases are about **new capability**, not about the number of flowers or Gardeners in the garden.

Phases may continue beyond Phase 32 when new innovations are approved.

### Remake & Fix — Existing System Improvement

An **RF** entry improves, repairs, restructures, redesigns, or replaces something that already exists.

Examples:
- fixing a renderer that hides valid data;
- redesigning an existing component;
- correcting an existing data model;
- improving an existing responsive layout;
- correcting or clarifying published information.

RF entries do not rewrite the Phase history.

### Content additions are not automatically development work

Adding a new Gardener, adding a new flower, or adding a new story does not create a new Phase or RF by itself.

If the addition exposes a weakness in an existing system, the **system change** becomes an RF. If it requires a genuinely new capability, the **new capability** becomes a Phase.

---

## 5. Phase Roadmap

The roadmap describes system and workflow development only. It intentionally does **not** list individual flowers, Gardeners, or one research phase per flower.

### Completed baseline

- [x] Phase 01 — Foundation
- [x] Phase 02 — Navbar + Global Components
- [x] Phase 03 — Home
- [x] Phase 04 — The Garden
- [x] Phase 05 — Flower Page
- [x] Phase 06 — About
- [x] Phase 07 — Responsive Refinement
- [x] Phase 08 — Accessibility + Performance
- [x] Phase 09 — Content/Data Foundation
- [x] Phase 10 — Final Polish
- [x] Phase 11 — Data Source Audit
- [x] Phase 12 — Gardener Schema Normalization
- [x] Phase 13 — Existing Gardener Media Migration
- [x] Phase 14 — Flower Registry Normalization

> Flower-specific research was historically performed during Phases 15–19. Those content activities are intentionally excluded from the active roadmap and from project progress calculations. Flower research is now treated as an ongoing content workflow governed by `FLOWER_RESEARCH_PROMPT.md` and the canonical data schema.

### Current system roadmap

- [ ] Phase 20 — Gardener-to-Flower Relationships
- [ ] Phase 21 — Garden Page Responsive Rebuild
- [ ] Phase 22 — Global Responsive Audit
- [ ] Phase 23 — Feedback Popup
- [ ] Phase 24 — Manual Feedback Workflow
- [ ] Phase 25 — Testimonial Data Layer
- [ ] Phase 26 — Home Testimonial Strip
- [ ] Phase 27 — About Page Expansion
- [ ] Phase 28 — Sunday Vibes Data Boundary
- [ ] Phase 29 — Content Editorial Audit
- [ ] Phase 30 — Accessibility + Performance Audit
- [ ] Phase 31 — SEO + Metadata Audit
- [ ] Phase 32 — Final Garden Release

Future innovations may add Phase 33, Phase 34, and beyond. A Phase is added only when a new capability is agreed upon.

**Active system roadmap progress: 14 / 32 phases complete.**

---

## 6. Remake & Fix Log

| ID | Area | Status |
|---|---|---|
| RF-001 | Language System Remake | ✅ Complete |
| RF-002 | Flower Data Visibility Remake | ✅ Complete |
| RF-003 | Dynamic Growth Cycle Remake | ✅ Complete |
| RF-004 | “What It Can Mean” Section Remake | ✅ Complete |
| RF-005 | Taxonomy & Fallback Robustness | ✅ Complete |
| RF-006 | Responsive Audit | ✅ Complete |
| RF-007 | Documentation, Information & AI Governance Remake | ✅ Complete |
| RF-008 | Growth Cycle Template & Resolution Remake | ✅ Complete |
| RF-009 | Flower Data Language Consistency Remake | 🔧 Ongoing iterative fix |


Detailed records are maintained in `REMAKE_FIX_LOG.md`.

---

### RF-009 — Current language consistency scope

RF-009 remains an ongoing iterative fix. The current iteration aligns the requested language system across Home, The Garden, Flower/Gardener pages, About, and the shared footer: selected editorial lines are English, while specified botanical/history explanatory lines and the Home question rationale are Indonesian. The Flower Page `A little about...` heading uses the English `heroName` when available. Future language inconsistencies continue under RF-009 without renaming it.

## 7. Feature & Innovation Registry

This registry describes what Sunday Garden can do now and what has been approved or proposed for the future. It is intentionally expandable.

Legend:
- `[x]` implemented and currently available
- `[ ]` planned / approved / proposed, but not yet implemented

### Core

- [x] Static-first HTML/CSS/JS/JSON architecture
- [x] Universal Flower Page
- [x] The Garden directory
- [x] Gardener story rendering
- [x] Data-driven content rendering
- [x] Responsive layout system
- [x] Accessibility/performance baseline

### Flower Information System

- [x] Flower identity
- [x] Scientific name
- [x] Taxonomy
- [x] Taxonomic notes and synonym handling
- [x] Growth form
- [x] Morphology
- [x] Distribution
- [x] Habitat
- [x] Flowering information
- [x] Reproduction
- [x] Life cycle
- [x] Ecology
- [x] Conservation notes
- [x] Growth Cycle visualization with data-driven phase count and resolution-aware templates
- [x] Interesting facts
- [x] Cultural and historical notes
- [x] Documented symbolism / meaning
- [x] Sunday Garden interpretation
- [x] Sources / further reading
- [ ] Historical timeline / chronology
- [ ] Earliest documented record and scientific description details
- [ ] Historical place/context of documentation
- [ ] Research excerpt + original-language quote + Indonesian translation
- [ ] Additional historical evidence modules as research needs grow

### Gardener System

- [x] Gardener identity
- [x] Chosen flower relationship
- [x] Personal story
- [x] Optional Gardener information
- [x] Hero and Garden Card media
- [x] Dynamic People of This Flower foundation
- [ ] Expanded Gardener-to-Flower relationships
- [ ] Richer Gardener profile system

### Community

- [ ] Feedback popup
- [ ] Manual feedback workflow
- [ ] Testimonial data layer
- [ ] Home testimonial strip
- [ ] Future testimonial archive/page

### Platform & Workflow

- [x] Static JSON content layer
- [x] Data validator
- [x] Remake & Fix tracking
- [x] Feature registry
- [x] AI/content governance prompts
- [ ] Google Form submission workflow
- [ ] Editorial review pipeline
- [ ] Automated or semi-automated content publishing workflow

The registry grows whenever a new web innovation is agreed upon. A registry entry does not automatically mean implementation has begun.

---

## 8. Flower Information Standard

Every published Flower Page may contain the following information when reliable research is available. The renderer should display what exists and should not invent what does not.

### Identity

- Common name
- Scientific name
- Accepted botanical treatment, when applicable
- Synonyms / historical names
- Taxonomic note
- Family
- Genus
- Kingdom / order when useful
- Growth form

### Botanical profile

- Roots
- Bulb / rhizome / corm / tuber when applicable
- Stem
- Leaves
- Flowers
- Petals
- Stamens / reproductive structures
- Fruit
- Seeds
- Prickles / thorns or other notable structures when applicable
- Other documented morphological structures

### Growth and life

- Growth phases
- Growth cycle
- Growth-cycle resolution: `standard`, `detailed`, `specialized`, or `custom`
- Data-driven cycle templates selected from the researched phase count
- Flowering position and characteristics
- Flowering season or timing, when source-supported
- Reproduction
- Life cycle
- Seasonality notes
- Ecological role
- Habitat
- Native distribution
- Introduced distribution, when documented
- Conservation information

### History and human context

- Earliest documented record, when known
- Date / period of earliest reliable documentation
- Place / region associated with the earliest record
- Scientific description / publication year, when known
- Scientist, author, collector, illustrator, or other documented historical figure associated with the record, when known
- Important historical development of the name or classification
- Historical uses or cultivation, when reliably documented
- Cultural and historical notes
- Historical timeline / chronology when useful

**Important historical wording rule:** do not claim that a scientist “discovered” a flower merely because they were the first person to publish a scientific description. Distinguish Indigenous/local knowledge, historical observation, collection, scientific description, naming, and later classification whenever the evidence allows.

### Meaning and interpretation

- Documented symbolism
- Language of flowers
- Religious/traditional associations when relevant and sourced
- Literary/artistic associations when relevant and sourced
- Sunday Garden interpretation, clearly separated from documented cultural claims

### Research evidence

- Source title
- Source type
- Source URL/reference
- Research notes when needed
- Short original-language excerpts or terms when they materially clarify a source
- Indonesian translation of each included excerpt

### Gardener layer

- Gardener display name
- Chosen flower
- Personal story
- Optional self-provided information
- Optional social links
- Hero image
- Garden Card image
- Gallery when supplied

Not every flower will have every field. Missing information is acceptable and must remain visibly marked as missing.

---

## 9. Missing Information Policy

Research must never be completed with guesses.

If a field is relevant to the canonical schema but reliable information cannot be established, store/display:

```text
-
```

Use `-` for **unknown, unavailable, or not established by the current research**.

Do not use invented prose such as:
- “probably” without evidence;
- “it is believed” without an identified source;
- guessed dates;
- guessed discoverers;
- guessed historical places;
- guessed pollinators;
- generic AI-generated history.

When a field is genuinely not applicable to a particular flower, the data model may use `null` or an omitted optional field where the schema explicitly permits it. This is different from a relevant field whose information simply could not be established; the latter should use `-` in the user-facing content layer.

---

## 9A. Growth Cycle Standard

The Growth Cycle is a **research-driven representation**, not a universal fixed biological stage count. Different sources may describe the same plant at different levels of resolution, and specialized developmental studies may use substantially more stages than a general life-cycle summary.

Sunday Garden therefore stores the cycle explicitly:

```json
"growthCycle": {
  "type": "standard",
  "resolution": "standard",
  "phases": [
    {
      "id": "phase-01",
      "name": "Phase 01",
      "description": "..."
    }
  ]
}
```

### Resolution values

- `standard` — a normal editorial life-cycle representation.
- `detailed` — a finer-grained representation supported by the research.
- `specialized` — a domain-specific developmental sequence.
- `custom` — a structure that does not fit the standard template families.

### Template rule

The renderer may use compact circular templates for phase counts that remain readable, and a custom ordered presentation when the phase count or structure would make a circular diagram misleading or overcrowded.

The implementation must **not** create biological phases merely to fill a visual template, merge research-backed phases merely to reduce a count, or assume that a flower has the same number of phases as another flower.

> **The data should shape the cycle; the cycle should not shape the data.**

For new or substantially researched flowers:

1. research the documented developmental sequence;
2. determine the appropriate resolution;
3. preserve the supported phase count;
4. choose the renderer template based on that data;
5. validate that every phase remains visible and understandable.

The renderer retains a backward-compatible fallback for legacy phase arrays, but new records should use `growthCycle`.

---

## 10. Content Language Standard

Future flower data should be written primarily in **Indonesian**.

Keep the following in their original form when required:
- Latin scientific names
- Taxonomic nomenclature
- Proper names
- Source titles where the original title matters
- Technical terms whose established form is not meaningfully translated
- Direct quotations
- Original-language words or phrases used as evidence

For research excerpts:

> **Original:** “...”
>
> **Terjemahan:** “...”

The translation must preserve meaning and must not be presented as a direct quotation from the original source.

Existing records may be migrated gradually. A language inconsistency should be treated as a content/data improvement, not as a reason to alter historical Phase numbers. RF-009 tracks the systematic cleanup of existing flower records and Flower Page language consistency. Visitor-facing botanical/editorial data is primarily Indonesian, while the Flower Page hero intentionally follows the English editorial language standard and uses the English flower common name. Scientific nomenclature, proper names, source titles, URLs, technical identifiers, and evidence language remain preserved where appropriate. RF-009 remains open for iterative language fixes until the language audit is considered stable.

---

## 11. Data Governance

- One canonical flower record per flower/category.
- Gardeners reference flowers; they do not duplicate botanical research.
- Stable IDs must not be casually renamed.
- Personal stories must be preserved exactly unless editing is explicitly requested.
- Botanical facts require reliable sources.
- Cultural/historical claims require contextual attribution.
- Sunday Garden interpretations must be clearly labeled as interpretations.
- Research excerpts must identify their source.
- No fabricated quotations or sources.
- No fabricated personal information.
- No species-level identification from a colour/common-name category without evidence.
- Valid data must not disappear because a renderer expected a different field name.
- The UI should adapt to available content rather than forcing content into a fixed count.

---

## 12. Development Workflow

### For a new feature or innovation

1. Discuss the idea.
2. Define the intended user/system behavior.
3. Decide whether it is a new capability.
4. Add it to the Feature & Innovation Registry.
5. If approved for implementation, create the next Phase.
6. Implement and validate.
7. Update `README.md` and `PHASE_PLAN.md`.
8. Create a release ZIP only after verification.

### For an existing-system change

1. Discuss the problem or improvement.
2. Identify the existing system affected.
3. Add an RF entry.
4. Define scope and acceptance criteria.
5. Implement and validate.
6. Update `README.md` and `REMAKE_FIX_LOG.md`.
7. Create a release ZIP only after verification.

### For new content only

1. Follow the relevant content prompt.
2. Validate the data.
3. Do not create a Phase merely because a new flower or Gardener was added.
4. Create an RF only if the content exposes or requires a change to an existing system.

---

## 13. Validation & Release Rules

Before a release:

- validate JSON;
- validate JavaScript syntax;
- verify internal links and asset references;
- verify image assignments;
- inspect responsive behavior when UI changes are involved;
- check that no valid data has disappeared from rendering;
- check that missing research uses the agreed missing-data convention;
- update documentation;
- record the change in the appropriate Phase or RF log;
- create the release ZIP only after the checks pass.

Never claim a validation was performed unless it was actually performed.

---

## 14. Documentation Map

| File | Purpose |
|---|---|
| `README.md` | Project direction, systems, roadmap, feature registry, information standard, and workflow |
| `PHASE_PLAN.md` | Structured Phase roadmap and completion tracking |
| `REMAKE_FIX_LOG.md` | Detailed Remake & Fix history |
| `AI_RULES.md` | Core rules for AI-assisted project work |
| `ADD_GARDENER_PROMPT.md` | Standard workflow for adding a Gardener |
| `FLOWER_RESEARCH_PROMPT.md` | Standard workflow for researching/updating flower data |
| `data/README.md` | Canonical data schema and content rules |
| `tools/validate-data.mjs` | Data validation |

---

## 15. Project State

**System roadmap:** 14 / 32 active phases complete  
**Remake & Fix:** RF-007 complete  
**Feature registry:** continuously expanding  
**Flower/Gardener content:** intentionally excluded from system progress counts

Sunday Garden is expected to grow beyond the original roadmap. The documentation should grow with the system without turning content volume into development history.
