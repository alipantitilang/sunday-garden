const SundayGardenFlower = (() => {
  const state = { gardeners: [], flowers: [], gardener: null, flower: null };

  async function loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Could not load ${path}`);
    return response.json();
  }

  function escapeHTML(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  }

  function storyMarkup(story, name) {
    return `<blockquote class="flower-story__quote"><p>${escapeHTML(story)}</p><footer>— <cite>${escapeHTML(name)}</cite></footer></blockquote>`;
  }

  function profileMarkup(flower) {
    const rows = [
      ['Common name', flower.commonName],
      ['Scientific name', `<em>${flower.scientificName}</em>`],
      ['Current Kew treatment', `<em>${flower.acceptedName}</em>`],
      ['Family', flower.family],
      ['Genus', `<em>${flower.genus}</em>`],
      ['Growth form', flower.habitatProfile?.growthForm || flower.growthForm],
      ['Native range', flower.distribution?.nativeRange || flower.nativeRange],
      ['Habitat', flower.habitatProfile?.habitat || flower.habitat]
    ];
    return rows.map(([label, value]) => `<div class="fact-row"><dt>${label}</dt><dd>${value}</dd></div>`).join('');
  }

  function factsMarkup(items) {
    return items.map(item => `<article class="fact-note"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></article>`).join('');
  }

  function morphologyMarkup(m) {
    const labels = [['Leaves', m.leaves], ['Flowers', m.flowers], ['Petals', m.petals], ['Stamens', m.stamens], ['Fruit', m.fruit], ['Seeds', m.seeds]];
    return labels.map(([label, text]) => `<article class="morphology-item"><h3>${label}</h3><p>${escapeHTML(text)}</p></article>`).join('');
  }


  function detailSection(title, eyebrow, items) {
    if (!items || !items.length) return '';
    return `<section class="flower-section container"><div class="section-heading"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div><div class="morphology-grid">${items.map(([label, text]) => `<article class="morphology-item"><h3>${escapeHTML(label)}</h3><p>${escapeHTML(text)}</p></article>`).join('')}</div></section>`;
  }

  function sourcesMarkup(sources) {
    return sources.map(source => `<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title)} <span class="sr-only">(opens in a new tab)</span></a><span>${escapeHTML(source.type)}</span></li>`).join('');
  }

  function peopleMarkup(gardeners, flowerId, currentId) {
    const people = gardeners.filter(item => item.flower?.id === flowerId);
    if (!people.length) return '';
    return `<section class="flower-section container people-section"><div class="section-heading"><p class="eyebrow">The garden grows</p><h2>People of This Flower</h2><p>Different people can find different words in the same flower.</p></div><div class="morphology-grid">${people.map(person => `<article class="morphology-item"><h3>${escapeHTML(person.displayName)}</h3><p>${escapeHTML(person.story || '')}</p><a class="text-link" href="flower.html?id=${encodeURIComponent(person.id)}" aria-current="${person.id === currentId ? 'page' : 'false'}">Read their story →</a></article>`).join('')}</div></section>`;
  }

  function aboutGardenerMarkup(gardener) {
    if (!gardener.about?.display || !gardener.about?.content?.length) return '';
    return `<section class="flower-section container gardener-about"><div class="section-heading"><p class="eyebrow">Beyond the flower</p><h2>A little about ${escapeHTML(gardener.displayName)}</h2></div><div class="morphology-grid">${gardener.about.content.map(item => `<article class="morphology-item"><h3>${escapeHTML(item.label)}</h3><p>${escapeHTML(item.value)}</p></article>`).join('')}</div></section>`;
  }

  function render() {
    const main = document.querySelector('#main-content');
    if (!state.gardener || !state.flower) {
      main.innerHTML = `<section class="flower-error container"><p class="eyebrow">The Garden</p><h1>We couldn't find that flower.</h1><p>Try returning to the garden and choosing another story.</p><a class="button" href="garden.html">Back to The Garden</a></section>`;
      return;
    }
    const g = state.gardener, f = state.flower;
    document.title = `${g.displayName} — ${f.commonName} | Sunday Garden`;
    main.innerHTML = `
      <article class="flower-page">
        <header class="flower-hero">
          <div class="flower-hero__image-wrap"><img src="${escapeHTML(g.media.hero)}" alt="${escapeHTML(f.commonName)} chosen by ${escapeHTML(g.displayName)}" class="flower-hero__image" width="3413" height="1920" fetchpriority="high" decoding="async"></div>
          <div class="flower-hero__content container">
            <p class="eyebrow">A Gardener's Flower</p>
            <h1>${escapeHTML(f.commonName)}</h1>
            <p class="flower-hero__scientific"><em>${escapeHTML(f.scientificName)}</em></p>
            <p class="flower-hero__byline">Chosen by <strong>${escapeHTML(g.displayName)}</strong></p>
          </div>
        </header>

        <section class="flower-section flower-story container">
          <p class="eyebrow">Why did they choose this flower?</p>
          ${storyMarkup(g.story, g.displayName)}
        </section>

        ${aboutGardenerMarkup(g)}

        <section class="flower-section container flower-profile">
          <div class="section-heading"><p class="eyebrow">The flower</p><h2 id="flower-profile-title">A little about ${escapeHTML(f.commonName)}</h2><p>${escapeHTML(f.taxonomicNote)}</p></div>
          <dl class="fact-list">${profileMarkup(f)}</dl>
        </section>

        <section class="flower-section flower-growth">
          <div class="container section-heading"><p class="eyebrow">From the roots to the bloom</p><h2>How it grows</h2><p>A quiet journey from what sustains the plant to the bloom we see.</p></div>
          <div class="container growth-flow">${f.howItGrows.map((step, i) => `<article class="growth-step"><span>${String(i + 1).padStart(2, '0')}</span><p>${escapeHTML(step)}</p></article>`).join('')}</div>
        </section>

        <section class="flower-section container">
          <div class="section-heading"><p class="eyebrow">A closer look</p><h2>Botanical details</h2></div>
          <div class="morphology-grid">${morphologyMarkup(f.morphology)}</div>
        </section>

        ${detailSection('Flowering', 'The bloom', Object.entries(f.flowering || {}).map(([k,v]) => [k.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()), v]))}
        ${detailSection('Reproduction', 'How new plants begin', Object.entries(f.reproduction || {}).map(([k,v]) => [k.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()), v]))}
        ${detailSection('Life cycle & ecology', 'Under the surface', [
          ...(f.lifeCycle ? Object.entries(f.lifeCycle).map(([k,v]) => [k.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()), v]) : []),
          ...(f.ecology ? Object.entries(f.ecology).map(([k,v]) => [k.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()), v]) : [])
        ])}

        <section class="flower-section container">
          <div class="section-heading"><p class="eyebrow">Little discoveries</p><h2>Things worth knowing</h2></div>
          <div class="facts-grid">${factsMarkup(f.interestingFacts)}</div>
        </section>

        <section class="flower-section cultural-section">
          <div class="container section-heading"><p class="eyebrow">Beyond botany</p><h2>Cultural & historical notes</h2><p>What the flower has meant in places and periods where it was documented.</p></div>
          <div class="container facts-grid">${factsMarkup(f.culturalNotes)}</div>
        </section>

        <section class="flower-section container meaning-section">
          <div class="section-heading"><p class="eyebrow">What it can mean</p><h2>${escapeHTML(f.commonName)}, interpreted</h2></div>
          <div class="meaning-layout"><div class="meaning-tags">${f.symbolism.map(word => `<span>${escapeHTML(word)}</span>`).join('')}</div><p class="meaning-text">${escapeHTML(f.sundayGardenInterpretation)}</p></div>
        </section>

        ${peopleMarkup(state.gardeners, f.id, g.id)}

        <section class="flower-section sources-section container">
          <div class="section-heading"><p class="eyebrow">Read further</p><h2>Sources & further reading</h2><p>Botanical details and historical notes are kept separate from Sunday Garden's own interpretation.</p></div>
          <ol class="source-list">${sourcesMarkup(f.sources)}</ol>
        </section>

        <section class="flower-cta container"><p class="eyebrow">Keep wandering</p><h2>Every flower carries a different story.</h2><p>There are more Gardeners waiting in the garden.</p><a class="button" href="garden.html">Explore The Garden</a></section>
      </article>`;
  }

  async function init() {
    try {
      const [gardenersData, flowersData] = await Promise.all([loadJSON('data/gardeners.json'), loadJSON('data/flowers.json')]);
      state.gardeners = gardenersData.gardeners || [];
      state.flowers = flowersData.flowers || [];
      const id = new URLSearchParams(window.location.search).get('id');
      state.gardener = state.gardeners.find(item => item.id === id);
      if (state.gardener) state.flower = state.flowers.find(item => item.id === state.gardener.flower.id);
      if (state.gardener && state.flower) {
        document.title = `${state.gardener.displayName} — ${state.flower.commonName} | Sunday Garden`;
        const description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute('content', `${state.gardener.displayName} chose ${state.flower.commonName}. Read their story and explore the flower behind it on Sunday Garden.`);
      }
      render();
    } catch (error) {
      console.error(error);
      document.querySelector('#main-content').innerHTML = `<section class="flower-error container"><p class="eyebrow">The Garden</p><h1>Something went wrong.</h1><p>The flower story could not be loaded right now.</p><a class="button" href="garden.html">Back to The Garden</a></section>`;
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
