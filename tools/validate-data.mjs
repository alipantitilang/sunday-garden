import fs from 'node:fs';

const read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const gardeners = read('./data/gardeners.json').gardeners;
const flowers = read('./data/flowers.json').flowers;

const errors = [];
const flowerIds = new Set(flowers.map((f) => f.id));
const gardenerIds = new Set();

for (const g of gardeners) {
  if (!g.id || gardenerIds.has(g.id)) errors.push(`Invalid or duplicate gardener id: ${g.id}`);
  gardenerIds.add(g.id);
  if (!g.displayName) errors.push(`Missing displayName: ${g.id}`);
  if (!g.story) errors.push(`Missing story: ${g.id}`);
  if (!g.flower?.id || !flowerIds.has(g.flower.id)) errors.push(`Unknown flower reference: ${g.id}`);
  if (!g.media?.hero) errors.push(`Missing hero media: ${g.id}`);
  if (!g.media?.gardenCard) errors.push(`Missing gardenCard media: ${g.id}`);
}

for (const f of flowers) {
  if (!f.id || !f.commonName || !f.scientificName) errors.push(`Incomplete flower identity: ${f.id || '(missing id)'}`);
  if (!Array.isArray(f.sources) || f.sources.length === 0) errors.push(`No sources: ${f.id}`);
  if (!Array.isArray(f.interestingFacts) || f.interestingFacts.length === 0) errors.push(`No interesting facts: ${f.id}`);
}

if (errors.length) {
  console.error(errors.map((e) => `- ${e}`).join('\n'));
  process.exit(1);
}

console.log(`Sunday Garden data valid: ${gardeners.length} Gardener(s), ${flowers.length} flower(s).`);
