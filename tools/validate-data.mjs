import fs from 'node:fs';

const read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const gardeners = read('./data/gardeners.json').gardeners;
const flowers = read('./data/flowers.json').flowers;

const errors = [];
const flowerIds = new Set();
const gardenerIds = new Set();

for (const f of flowers) {
  if (!f.id || !f.commonName || !f.scientificName) errors.push(`Incomplete flower identity: ${f.id || '(missing id)'}`);
  if (flowerIds.has(f.id)) errors.push(`Duplicate flower id: ${f.id}`);
  flowerIds.add(f.id);
  if (!['pending', 'complete'].includes(f.researchStatus)) errors.push(`Invalid flower researchStatus: ${f.id}`);
  if (!f.taxonomy || f.taxonomy.family !== f.family || f.taxonomy.genus !== f.genus) errors.push(`Taxonomy mismatch: ${f.id}`);
  if (!f.growthCycle || !Array.isArray(f.growthCycle.phases) || f.growthCycle.phases.length === 0) {
    errors.push(`Missing growthCycle phases: ${f.id}`);
  } else {
    if (!['standard', 'detailed', 'specialized', 'custom'].includes(f.growthCycle.resolution)) {
      errors.push(`Invalid growthCycle resolution: ${f.id}`);
    }
    const phaseIds = new Set();
    for (const [index, phase] of f.growthCycle.phases.entries()) {
      if (!phase?.id || phaseIds.has(phase.id)) errors.push(`Invalid or duplicate growth phase id: ${f.id} phase ${index + 1}`);
      if (!phase?.description) errors.push(`Missing growth phase description: ${f.id} phase ${index + 1}`);
      phaseIds.add(phase.id);
    }
  }
  if (f.researchStatus === 'complete') {
    if (!Array.isArray(f.sources) || f.sources.length === 0) errors.push(`No sources: ${f.id}`);
    if (!Array.isArray(f.interestingFacts) || f.interestingFacts.length === 0) errors.push(`No interesting facts: ${f.id}`);
  }
}

for (const g of gardeners) {
  if (!g.id || gardenerIds.has(g.id)) errors.push(`Invalid or duplicate gardener id: ${g.id}`);
  gardenerIds.add(g.id);
  if (!g.displayName) errors.push(`Missing displayName: ${g.id}`);
  if (!g.story) errors.push(`Missing story: ${g.id}`);
  if (!g.flower?.id || !flowerIds.has(g.flower.id)) errors.push(`Unknown flower reference: ${g.id}`);
  if (!g.media?.hero) errors.push(`Missing hero media: ${g.id}`);
  if (!g.media?.gardenCard) errors.push(`Missing gardenCard media: ${g.id}`);
}

if (errors.length) {
  console.error(errors.map((e) => `- ${e}`).join('\n'));
  process.exit(1);
}

const complete = flowers.filter(f => f.researchStatus === 'complete').length;
console.log(`Sunday Garden registry valid: ${gardeners.length} Gardener(s), ${flowers.length} flower(s), ${complete} researched / ${flowers.length - complete} pending.`);
