# Sunday Garden Data

This folder contains the content layer for the static site.

## `gardeners.json`

A Gardener is the primary content entity. Each record contains:

- `id` — stable URL/query identifier.
- `displayName` — public Gardener name.
- `status` — publication state (`published`, `draft`, or `archived`).
- `flower` — the chosen flower reference (`id`, `name`, `scientificName`).
- `story` — the Gardener's own free-form story. Do not rewrite personal stories during data entry unless explicitly requested.
- `about` — optional Gardener information. It may remain empty.
- `media.hero` — original/clean Flower Page hero image.
- `media.gardenCard` — edited Garden Card image.

## `flowers.json`

Flower data is shared by all Gardeners who choose the same flower. It contains:

- identity and taxonomy
- distribution and habitat
- morphology
- flowering and reproduction notes
- growth/life-cycle information
- interesting facts
- cultural/historical notes
- symbolism
- Sunday Garden interpretation
- sources

### Editorial rule

Keep **botanical fact**, **documented cultural history**, and **Sunday Garden interpretation** separate. If a claim is not supported by a source, do not present it as established fact.

### Taxonomy rule

Use the current accepted treatment from a recognised botanical authority when available, while retaining familiar historical/synonym names when they help readers understand the flower.

### Image rule

Large images should remain external/CDN-hosted in production where practical. JSON should store the URL/path, not image binary data.
