# Sunday Garden — AI Rules

## Source of truth

Sunday Garden is a quiet botanical journal: a digital garden of human stories, not primarily a flower encyclopedia.

Core philosophy:
- The flower is the question; the person is the answer.
- Different flowers. Different stories. One garden.
- Everyone blooms in their own way.

## Visual direction

Style: Quiet Botanical Journal.

It should feel like a quiet old botanical journal on a desk, but inside a browser.

Avoid:
- SaaS/dashboard aesthetics
- excessive rounded cards
- excessive shadows
- glassmorphism
- neon
- digital gradients
- excessive animation

Prefer:
- warm paper
- real photography
- thin borders
- editorial composition
- botanical line art
- subtle imperfections
- whitespace
- restrained motion

## Visual system

```css
--forest: #34463A;
--sage: #87977A;
--paper: #F3EEE3;
--taupe: #A69B88;
--mist: #A8B9BC;
--lotus-blue: #7188B5;
--dusty-rose: #C49A98;
--ink: #29302B;
```

Typography:
- Cormorant Garamond — editorial/display
- Manrope — body/UI
- Caveat — optional, sparingly

## Architecture

Static-first vanilla HTML/CSS/JS/JSON.

Do not add a framework unless explicitly requested.

HTML = structure.
CSS = visual design.
JS = behavior.
JSON = content/data.

`gardeners.json` is the primary content entity.

`flower.html` is universal and uses a query string:
`flower.html?id=alip-blue-lotus`

Do not create one HTML file per Gardener.

## Data principles

Never invent:
- personal stories
- personal biographies
- botanical facts
- quotes
- sources

Story text should remain free-form. Do not force it into short/long sections.

A Gardener may have:
- display name
- chosen flower
- story
- optional about section
- optional links
- media.hero
- media.gardenCard

The Garden Card image is prepared by the Garden Keeper. Code should only render/link it.

Large images should preferably be externally hosted/CDN-hosted. JSON stores their URLs.

## Coding rules

Before modifying existing code:
1. Understand the current structure.
2. Preserve working functionality.
3. Change only what the task requires.
4. Do not silently change architecture.

Use semantic HTML, meaningful class names, responsive/mobile-first CSS, accessibility defaults, and performance-conscious implementation.

No inline CSS.
No inline JavaScript.

When something is unspecified, choose the simplest maintainable solution consistent with the established botanical-journal aesthetic.

If a decision materially changes architecture, ask first.

## Development phases

1. Foundation
2. Navbar + global components
3. Home
4. Garden
5. Flower Page
6. About
7. Responsive refinement
8. Accessibility + performance
9. Content/data
10. Final polish

Build incrementally. Consistency is more important than adding features.
