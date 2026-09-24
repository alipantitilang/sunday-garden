# Sunday Garden — FLOWER_RESEARCH_PROMPT

Use this prompt whenever researching a new flower or substantially updating an existing Flower Page.

## 0. Role

You are researching botanical, historical, cultural, and ecological information for Sunday Garden, a story-first botanical journal.

The flower provides context for human stories. Research must be accurate, sourced, and separated from personal interpretation.

## 1. Before research

Inspect:
1. `AI_RULES.md`
2. `README.md`
3. `data/README.md`
4. `data/flowers.json`
5. existing Flower Page renderer
6. existing records for the same flower/category
7. relevant existing RF history

Do not create a duplicate flower record if a canonical record already exists.

## 2. Research language

Write new flower data primarily in **Indonesian**.

Keep unchanged when appropriate:
- Latin scientific names;
- taxonomic nomenclature;
- proper names;
- source titles;
- technical terms that require their established form;
- direct quotations.

If a source contains a useful original-language term or quotation, record it only when it materially helps the research:

**Original:** “...”

**Terjemahan:** “...”

The Indonesian translation must be a translation, not a fabricated quote.

## 3. Research standard

Prefer authoritative sources according to the claim:
- botanical databases / herbaria / taxonomic authorities;
- peer-reviewed research;
- museums and institutional collections;
- government/conservation institutions;
- established horticultural institutions for cultivation claims.

Do not treat search snippets, unsourced blogs, AI-generated pages, or copied summaries as sufficient evidence for important claims.

Cross-check important taxonomic and historical claims where practical.

## 4. Taxonomy

Determine the most appropriate taxonomic scope.

A colour/common-name category such as Red Rose, Pink Tulip, White Lily, or Pink & White Lily may represent multiple species or cultivated groups. Do not invent one species merely because the user supplied a common name.

Where the accepted taxon is not a single species, explain the scope and use an appropriate genus/category treatment.

Distinguish accepted names, synonyms, historical names, cultivars, and common names.

## 5. History and “discovery”

Research the requested historical information carefully.

Where reliable evidence exists, identify:
- earliest documented record;
- date or period;
- place/region;
- person(s) associated with the record;
- what each person actually did;
- scientific description/publication;
- author/collector/illustrator when documented;
- naming history;
- taxonomic history;
- important historical uses/cultivation;
- relevant chronology.

Do not write “discovered by X” unless the source and historical context genuinely support that wording.

A scientific description by a botanist is not automatically the first human knowledge of a plant. Indigenous and local knowledge may predate written scientific records.

## 6. Required information model

Populate relevant fields for:

### Identity & taxonomy
- `id`
- `commonName`
- `scientificName`
- `acceptedName`
- `taxonomicNote`
- `family`
- `genus`
- `taxonomy`
- `synonyms`
- `growthForm`

### Morphology
- roots
- bulb/rhizome/corm/tuber when applicable
- stem
- leaves
- flowers/flower
- petals
- stamens/reproductive structures
- fruit
- seeds
- prickles/thorns
- other documented structures

### Growth
- `howItGrows`
- flowering
- reproduction
- life cycle
- seasonality

### Growth Cycle Resolution

Treat growth-cycle phase count as a **research result**, not a design requirement.

Use:

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

Choose `resolution` from:
- `standard`
- `detailed`
- `specialized`
- `custom`

Research workflow:
1. identify the developmental/life-cycle sequence supported by reliable sources;
2. decide the appropriate level of resolution from the evidence;
3. preserve the supported number and order of phases;
4. record each phase without inventing biological stages for visual symmetry;
5. let the renderer choose an appropriate template afterward.

Do not assume every flower has the same number of phases. A detailed scientific staging system may contain many more stages than an editorial life-cycle summary; these are different resolutions, not contradictions.

If the source does not establish a phase clearly, do not manufacture it. Use the project's missing-information convention (`-`) where the field is relevant but cannot be established.

### Distribution & ecology
- native range
- introduced range where documented
- habitat
- ecological role
- conservation information

### History
Use an extensible `history` object when the current schema supports it or when a schema update has been approved. Suggested fields:

```json
"history": {
  "earliestDocumentedRecord": "-",
  "dateOrPeriod": "-",
  "placeOrRegion": "-",
  "associatedPeople": [],
  "scientificDescription": "-",
  "historicalName": "-",
  "timeline": []
}
```

`associatedPeople` should identify roles rather than imply “discoverer” when the evidence does not support that claim.

### Knowledge and meaning
- interesting facts
- cultural/historical notes
- symbolism
- Sunday Garden interpretation

### Sources
Every meaningful research claim should be traceable to a reliable source. Record source title, URL/reference, and source type.

## 7. Missing information rule

If a relevant field cannot be established from reliable research, use:

```text
-
```

Do not guess.

Examples:
- unknown date → `-`
- unknown place → `-`
- no reliable person associated with earliest record → `-`
- uncertain historical claim → `-` or a carefully sourced limitation

Do not replace missing information with vague AI prose.

If a field is genuinely not applicable, use `null` or omit it only where the canonical schema permits that distinction.

## 8. Cultural and historical claims

Never turn a cultural association into a universal definition.

Use contextual wording such as:
- “Dalam konteks ...”
- “Sumber X mencatat ...”
- “Dalam tradisi ...”

Do not state that a flower universally means something unless strong evidence supports a genuinely broad claim.

## 9. Symbolism vs interpretation

Keep documented symbolism separate from:

**A Sunday Garden Reading**

The latter is editorial interpretation, not botanical or historical fact.

## 10. Data integrity

Do not:
- overwrite a valid existing field without evidence;
- delete a source merely because it is inconvenient;
- invent a species from a colour category;
- invent a discovery date;
- invent a discoverer;
- invent a historical quote;
- invent a source;
- add unsupported pollinators or ecological claims.

Preserve stable IDs and existing valid structure.

## 11. Validation

After research:
1. validate JSON;
2. check the canonical schema;
3. confirm no duplicate flower ID was created;
4. confirm language policy;
5. confirm missing fields use the agreed convention;
6. confirm claims are sourced;
7. confirm original-language excerpts have translations;
8. inspect the Flower Page renderer for visibility of newly added fields;
9. report remaining unknowns honestly.

## 12. Output

Report:
1. flower/category researched;
2. taxonomic scope;
3. new or updated information fields;
4. historical information found;
5. sources used;
6. fields left as `-`;
7. validation performed;
8. remaining uncertainties;
9. whether an existing system requires an RF or whether the work is content-only.
