# Sunday Garden — ADD_GARDENER_PROMPT

Use this prompt whenever a new Gardener is added to Sunday Garden.

## 0. Role

You are maintaining Sunday Garden, a quiet botanical journal of flowers, people, and human stories.

Core philosophy:
- The flower is the question; the person is the answer.
- Different flowers. Different stories. One garden.
- Everyone blooms in their own way.

Read `AI_RULES.md` and `README.md` first. They are the governing project rules.

## 1. Classification

Adding a Gardener is **content work**, not automatically a Phase or RF.

Create an RF only if the addition exposes or requires a change to an existing system.

Create a Phase only if the addition requires a genuinely new capability or workflow.

## 2. Before changing anything

Inspect:
1. `AI_RULES.md`
2. `README.md`
3. `data/gardeners.json`
4. `data/flowers.json`
5. `data/README.md`
6. `flower.html`
7. `js/flower.js`
8. `js/garden.js`
9. relevant CSS
10. existing Gardener using the same flower, if any

Preserve the established architecture. Do not create a one-off implementation for a single Gardener.

## 3. Input

Expected input may include:
- display name;
- chosen flower;
- personal story;
- hero image;
- Garden Card image;
- optional gallery;
- optional About information;
- optional links.

If information is not provided, leave it absent/disabled. Never invent personal information.

## 4. Gardener ID

Use a stable lowercase kebab-case ID.

Preferred pattern:
`gardener-flower`

Do not rename an existing ID merely to make it prettier.

## 5. Flower relationship

Reuse an existing canonical flower ID when the flower already exists.

Do not create duplicate flower records because two Gardeners choose the same flower.

If the flower is genuinely new:
1. create a stable flower ID;
2. use `FLOWER_RESEARCH_PROMPT.md` for research;
3. create one canonical flower record;
4. validate it.

## 6. Story preservation

Copy the Gardener's story exactly unless the user explicitly requests editing.

Preserve:
- wording;
- punctuation;
- paragraph breaks;
- capitalization;
- intentional informal language.

Never:
- rewrite the story into a generic poetic style;
- add emotions the Gardener did not state;
- turn personal symbolism into botanical fact;
- translate the story without permission.

## 7. Language

The Gardener story remains in the language supplied by the Gardener.

Website labels and structured botanical data follow `AI_RULES.md`:
- English for editorial openings;
- Indonesian for practical/content UI and future flower data;
- Latin/scientific terminology and relevant original-language evidence remain in original form.

## 8. Media

`media.hero` = clean/original Flower Page image.  
`media.gardenCard` = edited Garden Page image.

Do not swap them.

Do not edit or regenerate user-provided artwork unless explicitly requested.

## 9. Optional About information

Only include information supplied or explicitly approved by the Gardener.

Possible fields:
- What I Do
- What I Love
- Currently
- links

Do not infer occupation, age, location, personality, or interests.

## 10. Validation

After adding the Gardener, verify:
- stable ID;
- correct canonical flower ID;
- story preserved;
- media URLs present and correctly assigned;
- alt text exists;
- status is intentional;
- Flower Page loads the Gardener;
- Garden Page renders the Gardener;
- People of This Flower can find all relevant Gardeners;
- no duplicate flower record was created;
- no broken references;
- existing responsive behavior remains intact.

Run the project's data validator and any relevant syntax checks. Do not claim checks that were not performed.

## 11. Documentation

A normal Gardener addition does not require a Phase or RF update.

Update documentation only when the addition changes the system:
- existing-system change → RF;
- new capability → Phase;
- content-only addition → data files and validation only.

## 12. Output

Report:
1. Gardener added;
2. canonical flower used/created;
3. files changed;
4. media assigned;
5. research performed, if any;
6. validation performed;
7. remaining missing information;
8. whether a Phase or RF is actually required.
