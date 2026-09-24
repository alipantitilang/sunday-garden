# Sunday Garden Data

This folder contains the canonical content layer for the static site.

## `gardeners.json`

A Gardener is the primary human-content entity. Each record may contain:

- `id` — stable identifier.
- `displayName` — public name.
- `status` — publication state.
- `flower` — canonical flower reference.
- `story` — Gardener's own free-form story.
- `about` — optional self-provided information.
- `media.hero` — Flower Page hero image.
- `media.gardenCard` — Garden Page card image.
- `media.gallery` — optional additional images.
- `media.altText` — accessible media description.

Personal information must never be invented.

## `flowers.json`

A flower record is shared by all Gardeners who choose the same flower/category. It contains the canonical botanical and research layer.

### Current information groups

- identity
- taxonomy
- taxonomic notes and synonyms
- growth form
- morphology
- growth phases / growth cycle
- growth-cycle resolution (`standard`, `detailed`, `specialized`, `custom`)
- distribution
- habitat
- flowering
- reproduction
- life cycle
- ecology
- conservation
- interesting facts
- cultural and historical notes
- symbolism / documented meanings
- Sunday Garden interpretation
- sources

### Planned / extensible historical information

The flower schema may be extended to include:

- earliest documented record
- date or period
- historical place/region
- associated historical people and their documented roles
- scientific description/publication
- naming/classification history
- historical timeline

Historical fields must distinguish scientific description from the much broader concept of human “discovery”. Indigenous/local knowledge may predate written scientific records.

## Language rule

New flower data should primarily use **Indonesian**.

Keep Latin scientific names, taxonomic nomenclature, proper names, required technical terms, and relevant original source quotations in their original form.

When an original-language research excerpt is included:

- preserve the original;
- provide an Indonesian translation;
- identify the source;
- never fabricate or paraphrase as though it were a direct quote.

## Missing information rule

If a relevant field cannot be established through reliable research, use `-` rather than guessing.

`-` means the information is unknown, unavailable, or not established by the current research.

Use `null` or omission only when the schema explicitly treats the field as genuinely not applicable/optional.

## Editorial separation

Keep these layers separate:

1. Botanical fact.
2. Documented cultural/historical context.
3. Gardener's personal story.
4. Sunday Garden interpretation.

A cultural meaning must not be presented as a universal botanical fact.

## Taxonomy rule

Use a recognised botanical authority when available. Common colour/category names do not automatically identify one species. Genus-level or category-level records are valid when that is the evidence-supported scope.

## Image rule

Large images should remain externally hosted/CDN-hosted where practical. JSON stores URLs/paths rather than image binaries.

## Canonical registry rule

Each flower/category has one stable ID. Gardeners reference that ID. Do not duplicate botanical research for every Gardener.

A research record may be incomplete, but it must never be completed with guesses merely to satisfy the schema.

## Growth Cycle Data Standard

Use `growthCycle` as the canonical growth-cycle field:

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

The number of phases must come from the research resolution being used. It must not be changed solely to satisfy a visual template. `howItGrows` is a legacy compatibility field and should not be used for new records.

### Visitor-facing language

Flower records should keep visitor-facing botanical, ecological, cultural, historical, and editorial prose primarily in Indonesian. Scientific names, taxonomic nomenclature, proper names, source titles, URLs, technical IDs, and original-language evidence may remain in their original form.


### Flower Page Hero Language
The Flower Page hero is an intentional English editorial surface. Flower records may define `heroName` for the English common flower name used only in the hero. The canonical `commonName` remains the Indonesian visitor-facing name used elsewhere. Scientific names remain unchanged.
