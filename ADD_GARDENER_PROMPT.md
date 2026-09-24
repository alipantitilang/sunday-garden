# Sunday Garden — ADD_GARDENER_PROMPT

Use this prompt whenever a new Gardener is added to Sunday Garden.

## 0. Role

You are maintaining Sunday Garden, a quiet botanical journal of human stories.

Core philosophy:
- The flower is the question; the person is the answer.
- Different flowers. Different stories. One garden.
- Everyone blooms in their own way.

The Gardener's personal story is primary. Botanical research supports the page; it must never overwrite, reinterpret, or invent the person's experience.

## 1. Before changing anything

Inspect the current project first:
1. `AI_RULES.md`
2. `data/gardeners.json`
3. `data/flowers.json`
4. `data/README.md`
5. the existing `flower.html` implementation
6. `js/flower.js`, `js/garden.js`, and relevant CSS
7. the Garden Card rendering
8. any existing Gardener using the same flower

Preserve the established architecture and visual direction. Do not create a one-off implementation for a single Gardener.

## 2. Input

Expected input may include:
- Gardener name/display name
- chosen flower
- personal story
- one or two images
- optional About information
- optional links

If information is not provided, leave it absent or disabled. Never invent personal details.

## 3. Gardener ID

Create a stable lowercase kebab-case ID.

Preferred pattern:
`gardener-flower`

Examples:
- `alip-blue-lotus`
- `sarah-pink-white-lily`
- `hyunwo-red-rose`
- `ginaa-pink-tulip`
- `leo-white-lily`

Do not rename an existing ID merely to make it prettier. IDs are data references and must remain stable.

## 4. Flower ID

Use an existing flower ID when the flower already exists.

Do not create duplicate flower records because two Gardeners chose the same flower.

If the flower is genuinely new:
1. create a stable lowercase kebab-case flower ID;
2. research it in the flower-content phase;
3. add one canonical flower record to `flowers.json`.

## 5. Story preservation

Copy the Gardener's story exactly unless the user explicitly asks for editing.

Preserve:
- wording
- punctuation
- paragraph breaks
- capitalization
- intentional informal language

Never:
- rewrite it into a generic poetic style;
- add emotions the Gardener did not state;
- turn personal symbolism into botanical fact;
- shorten it merely for layout convenience.

## 6. Images

If two images are supplied:
- first image → `media.hero`
- second image → `media.gardenCard`

If one image is supplied:
- use it as `media.hero`;
- leave `media.gardenCard` empty until the Garden Keeper provides the Garden Card.

The Garden Card is externally prepared by the Garden Keeper. Do not automatically edit, crop, generate, or replace it unless explicitly requested.

Prefer stable external/CDN URLs when supplied by the user.

Canonical media shape:
```json
"media": {
  "hero": "...",
  "gardenCard": "...",
  "gallery": [],
  "altText": "Name — Flower"
}
```

## 7. About section

Use the flexible structure:
```json
"about": {
  "display": false,
  "content": [],
  "links": []
}
```

If the Gardener supplies public information, use only what they supplied:
```json
"about": {
  "display": true,
  "content": [
    {"label": "What I Do", "value": "..."},
    {"label": "What I Love", "value": "..."}
  ],
  "links": []
}
```

Do not ask the Gardener to provide botanical facts. That is the editorial team's job.

## 8. Flower research

If the flower is new or incomplete, do not fill it with generic symbolism first.

Research in this order:
1. taxonomy and accepted name;
2. family/genus;
3. morphology;
4. distribution;
5. habitat;
6. growth/life cycle;
7. flowering and reproduction;
8. ecology;
9. conservation where relevant;
10. interesting facts;
11. cultural/historical records;
12. documented symbolism;
13. Sunday Garden interpretation.

Preferred sources:
- Kew Plants of the World Online
- botanical gardens
- universities
- government biodiversity databases
- peer-reviewed papers
- museums and cultural institutions
- reputable horticultural organizations

Use sources appropriate to the claim. Do not invent citations or URLs.

Keep these categories separate:
- Botanical fact
- Cultural/historical record
- Symbolism or traditional meaning
- Sunday Garden interpretation

A symbolism list is never proof of botanical behavior.

## 9. Canonical Gardener schema

Every published Gardener should follow this minimum structure:
```json
{
  "id": "...",
  "displayName": "...",
  "flower": {
    "id": "...",
    "name": "...",
    "scientificName": "..."
  },
  "story": "...",
  "about": {
    "display": false,
    "content": [],
    "links": []
  },
  "media": {
    "hero": "...",
    "gardenCard": "...",
    "gallery": [],
    "altText": "..."
  },
  "status": "published"
}
```

## 10. Flower Page

The universal page is:
`flower.html?id=<gardener-id>`

It must dynamically render the selected Gardener and its flower.

Expected content order:
1. Gardener/Flower Hero
2. Why did they choose this flower?
3. A Little About the Gardener (only when available)
4. About the Flower
5. Cultural / Historical Notes
6. From the Roots to the Bloom
7. How It Grows
8. Gallery (only when media exists)
9. What [Flower] Can Mean
10. People of This Flower
11. Closing CTA

Do not create a new HTML page for a new Gardener.

## 11. Garden Page

The Garden Page must automatically read `gardeners.json`.

Do not manually add a Gardener card to `garden.html`.

A Garden Card links to:
`flower.html?id=<gardener-id>`

## 12. Validation

Before declaring the Gardener complete, verify:
- valid JSON;
- unique Gardener ID;
- stable flower ID;
- no duplicate flower record;
- story preserved;
- image URLs present and correctly assigned;
- `hero` and `gardenCard` are not swapped;
- alt text exists;
- status is intentional;
- Flower Page loads the Gardener;
- Garden Page renders the Gardener automatically;
- People of This Flower can find all Gardeners using that flower;
- no broken HTML/CSS/JS references;
- responsive behavior is unchanged for existing Gardeners.

## 13. Phase discipline

Do not combine unrelated work into one Gardener addition.

Use the project phase plan:
- data normalization first;
- then one flower at a time for research/content completeness;
- then responsive/UI refinement;
- then feedback/testimonials;
- then About/Sunday Vibes expansion;
- final validation last.

When a flower has multiple Gardeners, research the flower once and reuse the canonical flower record.

## 14. Output

After completing an addition, report:
1. Gardener added;
2. flower used or created;
3. files changed;
4. image URLs assigned;
5. research sources used, if any;
6. validation performed;
7. remaining work, if any.

Do not claim a validation or file exists unless it was actually checked.
