# Sunday Garden — AI Rules

## 1. Role and source of truth

You are maintaining **Sunday Garden**, a quiet botanical journal of flowers, people, and human stories.

Core philosophy:
- The flower is the question; the person is the answer.
- Different flowers. Different stories. One garden.
- Everyone blooms in their own way.

The project files are the source of truth. Inspect the current project before changing it. Never rely on an older remembered version when the current files are available.

## 2. Development classification

### Phase = new capability / update patch
Use a Phase when introducing a new feature, workflow, system, architecture, or meaningful new web capability.

### Remake & Fix = existing-system improvement
Use RF when repairing, refactoring, redesigning, restructuring, correcting, or improving something that already exists.

### Content-only change
Adding a Gardener, flower, story, or research entry does not automatically create a Phase or RF. Only the system change caused by that content belongs in development tracking.

Do not rewrite Phase history because content volume grows.

## 3. Language policy

Sunday Garden uses a bilingual editorial system.

### English
Use for:
- hero openings;
- editorial section openers/eyebrows;
- selected editorial headlines;
- short atmospheric phrases.

### Indonesian
Use for:
- navigation and UI;
- buttons and CTAs;
- labels and metadata;
- botanical descriptions;
- research summaries;
- cultural/historical explanations;
- growth/morphology information;
- practical instructions.

### Preserve original forms
Do not translate or alter:
- Latin scientific names;
- formal taxonomic nomenclature;
- proper names;
- source titles when the original is important;
- technical terms whose established scientific form is required;
- direct quotations.

If an original-language quote or term is included as research evidence, show the original and an Indonesian translation:

**Original:** “...”  
**Terjemahan:** “...”

## 4. Visual direction

Style: **Quiet Botanical Journal**.

It should feel like a quiet old botanical journal on a desk, inside a browser.

Avoid:
- SaaS/dashboard aesthetics;
- excessive rounded cards;
- excessive shadows;
- glassmorphism;
- neon;
- decorative digital gradients;
- excessive animation.

Prefer:
- warm paper;
- real photography;
- thin borders;
- editorial composition;
- botanical line art;
- subtle imperfections;
- whitespace;
- restrained motion.

## 5. Architecture

Static-first vanilla HTML/CSS/JS/JSON.

HTML = structure.  
CSS = visual design.  
JS = behavior/rendering.  
JSON = content/data.

Do not add a framework unless explicitly requested.

`gardeners.json` stores Gardener content. `flowers.json` stores canonical flower research. `flower.html` is universal and uses a query string.

Do not create one HTML page per Gardener or one HTML page per flower.

## 6. Data principles

Never invent:
- personal stories;
- personal biographies;
- botanical facts;
- dates;
- places;
- discoverers;
- scientific descriptions;
- historical events;
- quotations;
- sources;
- pollinators or ecological claims;
- taxonomy.

If a relevant field cannot be established by reliable research, use `-` in the user-facing content/data value rather than guessing.

If a field is genuinely not applicable and the schema permits it, use `null` or omit it as defined by the schema.

Distinguish:
- unknown/unverified information;
- not applicable information;
- documented information;
- Sunday Garden interpretation.

## 7. Historical research rules

When researching a flower's history, distinguish carefully between:
- Indigenous/local knowledge;
- earliest historical observation;
- earliest documented record;
- collection/specimen history;
- scientific description;
- naming/publication;
- later taxonomic classification.

Do **not** automatically call the first scientific describer the person who “discovered” the flower.

Where evidence exists, record:
- date or period;
- place/region;
- person(s) associated with the record;
- what they actually did;
- publication/name history;
- relevant historical context.

## 8. Flower information standard

A Flower Page may include:

### Identity & taxonomy
- common name;
- scientific name;
- accepted name/treatment;
- synonyms;
- taxonomic note;
- kingdom/order/family/genus;
- growth form.

### Botanical profile
- roots;
- bulb/rhizome/corm/tuber when applicable;
- stem;
- leaves;
- flowers;
- petals;
- stamens/reproductive structures;
- fruit;
- seeds;
- prickles/thorns or other relevant structures;
- additional documented morphology.

### Growth & ecology
- growth phases;
- growth cycle;
- flowering;
- reproduction;
- life cycle;
- seasonality;
- habitat;
- native distribution;
- introduced distribution when documented;
- ecology;
- conservation.

### History & culture
- earliest documented record;
- date/period;
- historical place/region;
- scientist/author/collector/illustrator or other documented person;
- scientific description/publication;
- naming/classification history;
- historical use/cultivation;
- cultural/historical notes;
- chronology/timeline when useful.

### Meaning
- documented symbolism;
- language of flowers;
- religious/traditional associations;
- literature/art associations;
- Sunday Garden interpretation.

### Evidence
- sources;
- source type;
- short original-language excerpt or term when useful;
- Indonesian translation;
- research note/context where needed.

## 9. Data visibility principle

The renderer must be data-aware.

**The data should shape the page, not the page limit the data.**

Do not hard-code a fixed number of morphology fields, growth phases, symbolism entries, or similar content when the data model is intentionally extensible.

### Growth Cycle Governance

Growth Cycle phase count is not a universal constant across flowers or research sources. A phase count reflects the resolution and purpose of the source being used.

Use the canonical structure:

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

Allowed resolutions:
- `standard`
- `detailed`
- `specialized`
- `custom`

Research determines the phases first. The interface template is selected afterward. Never invent, merge, delete, or reorder research-backed phases only to fit a visual layout.

For phase counts from 3–8, the current renderer may use a corresponding circular template family. Counts outside that range use the custom ordered presentation unless a future validated template family is introduced. This is a rendering decision, not a biological rule.

Legacy `howItGrows` arrays may be read for compatibility, but new flower records should use `growthCycle.phases`.


Support compatible singular/plural forms where the schema requires it, such as `flower` and `flowers`.

Never hide valid data simply because an older renderer did not anticipate the field.

## 10. Content separation

Keep these layers separate:

1. **Botanical fact** — source-supported.
2. **Documented cultural/historical context** — attributed/contextualized.
3. **Gardener's personal meaning** — preserved as supplied.
4. **Sunday Garden interpretation** — clearly labeled as interpretation.

Do not convert one layer into another.

## 11. Gardener rules

Preserve a Gardener's story exactly unless editing is explicitly requested.

Never:
- rewrite their story into a generic poetic style;
- invent biography;
- add emotions they did not state;
- turn their metaphor into botanical fact.

Use stable IDs. Reuse an existing canonical flower instead of duplicating flower research.

## 12. Coding rules

Before modifying code:
1. inspect the current structure;
2. inspect the relevant data;
3. identify existing behavior;
4. preserve working functionality;
5. change only what the task requires;
6. validate the result.

Use semantic HTML, meaningful classes, responsive/mobile-first CSS, accessibility defaults, and performance-conscious implementation.

No inline CSS.  
No inline JavaScript.

If a decision materially changes architecture, discuss it before implementation unless the user has already approved it.

## 13. Documentation rules

When a new capability is approved:
- add/update Feature & Innovation Registry;
- create or update the appropriate Phase;
- record acceptance criteria;
- validate;
- update `README.md` and `PHASE_PLAN.md`.

When an existing system is changed:
- create/update an RF entry;
- record the problem and scope;
- validate;
- update `README.md` and `REMAKE_FIX_LOG.md`.

Do not put individual flower/Gardener counts into development progress.

## 14. Validation rules

Never claim validation that was not actually performed.

Before release, check as applicable:
- JSON/data validation;
- JavaScript syntax;
- internal links;
- image references;
- renderer visibility;
- responsive behavior;
- accessibility;
- missing-data markers;
- documentation status.

### Flower Data Language Consistency

- Visitor-facing botanical and editorial flower content should be written primarily in Indonesian.
- Preserve scientific names, taxonomic nomenclature, proper names, source titles, URLs, technical identifiers, and original-language evidence where translation would change their identity or evidentiary function.
- Do not translate Gardener stories unless explicitly requested.
- A language inconsistency in an existing record is an RF/content-data correction, not a new Phase.


### RF-009 language iteration — page-level editorial surfaces
- Home `The question`: the question and selected supporting editorial line are English; the flower-choice rationale paragraph is Indonesian.
- Home `Your turn`: the requested headline is English.
- The Garden: the requested collection/continuation headlines are English.
- Flower/Gardener Page: `A little about...`, `Keep wandering`, and the requested closing line are English; specified cultural/history/source explanatory copy is Indonesian.
- About: the requested section headlines are English; the two requested `Our vision` paragraphs are Indonesian.
- Shared footer: the closing philosophy is English.
- This is part of RF-009 and must remain under the same RF name for future language corrections.
