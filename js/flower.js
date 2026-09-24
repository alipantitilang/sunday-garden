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

  function taxonomyTreatmentMarkup(flower) {
    const taxonomy = flower.taxonomy || {};
    const accepted = taxonomy.acceptedName;
    if (accepted) return `<em>${escapeHTML(accepted)}</em>`;
    if (flower.researchStatus === 'complete' && flower.genus) {
      return `${escapeHTML(SundayGardenI18n.flower.genusLevelTreatment)} <em>${escapeHTML(flower.genus)}</em>`;
    }
    return escapeHTML(SundayGardenI18n.flower.researchPending);
  }

  function profileMarkup(flower) {
    const taxonomy = flower.taxonomy || {};
    const rows = [
      [SundayGardenI18n.flower.commonName, escapeHTML(flower.commonName)],
      [SundayGardenI18n.flower.scientificName, `<em>${escapeHTML(flower.scientificName)}</em>`],
      [SundayGardenI18n.flower.taxonomicTreatment, taxonomyTreatmentMarkup(flower)],
      [SundayGardenI18n.flower.family, escapeHTML(flower.family)],
      [SundayGardenI18n.flower.genus, `<em>${escapeHTML(flower.genus)}</em>`],
      [SundayGardenI18n.flower.order, escapeHTML(taxonomy.order)],
      [SundayGardenI18n.flower.kingdom, escapeHTML(taxonomy.kingdom)],
      [SundayGardenI18n.flower.synonyms, valueMarkup(taxonomy.synonyms)],
      [SundayGardenI18n.flower.growthForm, escapeHTML(flower.habitatProfile?.growthForm || flower.growthForm || '')],
      [SundayGardenI18n.flower.nativeRange, escapeHTML(flower.distribution?.nativeRange || flower.nativeRange || '')],
      [SundayGardenI18n.flower.habitat, escapeHTML(flower.habitatProfile?.habitat || flower.habitat || '')]
    ];
    return rows.filter(([, value]) => isMeaningful(value)).map(([label, value]) => `<div class="fact-row"><dt>${escapeHTML(label)}</dt><dd>${value}</dd></div>`).join('');
  }

  function labelForDataKey(key) {
    const labels = {
      color: 'Warna', colorRange: 'Rentang warna', kingdom: 'Kerajaan', order: 'Ordo', acceptedTaxon: 'Takson yang diterima', synonyms: 'Sinonim',
      size: 'Ukuran', height: 'Tinggi', width: 'Lebar',
      season: 'Musim', timing: 'Waktu', duration: 'Durasi',
      pollination: 'Penyerbukan', pollinators: 'Penyerbuk',
      fruit: 'Buah', seeds: 'Biji', seedDispersal: 'Penyebaran biji',
      propagation: 'Perbanyakan', germination: 'Perkecambahan',
      flowering: 'Pembungaan', bloom: 'Mekar',
      lifeSpan: 'Masa hidup', lifecycle: 'Siklus hidup',
      habitat: 'Habitat', ecology: 'Ekologi',
      nativeRange: 'Persebaran asli', distribution: 'Persebaran',
      growthForm: 'Bentuk pertumbuhan',
      dormancy: 'Dormansi', emergence: 'Kemunculan',
      maturity: 'Kematangan',
      roots: 'Akar', bulb: 'Umbi', stem: 'Batang', leaves: 'Daun',
      flowers: 'Bunga', petals: 'Kelopak', stamens: 'Benang sari',
      prickles: 'Duri',
      conservation: 'Konservasi', threats: 'Ancaman', introducedElsewhere: 'Introduksi di wilayah lain', distributionNote: 'Catatan persebaran', growthEnvironment: 'Lingkungan pertumbuhan', persistence: 'Keberlangsungan hidup', seasonalityNote: 'Catatan musim', role: 'Peran ekologis', caution: 'Catatan kehati-hatian', note: 'Catatan',
      status: 'Status', habitatType: 'Tipe habitat'
    };
    if (labels[key]) return labels[key];
    return key.replace(/([A-Z])/g, ' $1').replace(/[-_]/g, ' ').replace(/^./, c => c.toUpperCase());
  }

  function isMeaningful(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim() !== '';
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return true;
  }

  function valueMarkup(value) {
    if (!isMeaningful(value)) return '';
    if (Array.isArray(value)) {
      const items = value.map(item => `<li>${valueMarkup(item)}</li>`).join('');
      return `<ul class="data-list">${items}</ul>`;
    }
    if (typeof value === 'object') {
      return `<dl class="data-sublist">${Object.entries(value)
        .filter(([, item]) => isMeaningful(item))
        .map(([key, item]) => `<div><dt>${escapeHTML(labelForDataKey(key))}</dt><dd>${valueMarkup(item)}</dd></div>`)
        .join('')}</dl>`;
    }
    return escapeHTML(value);
  }

  function factsMarkup(items = []) {
    return items.filter(isMeaningful).map(item => `<article class="fact-note"><h3>${escapeHTML(item.title || SundayGardenI18n.flower.dataNote)}</h3><p>${valueMarkup(item.text || item.value || '')}</p></article>`).join('');
  }

  function dataItemsMarkup(data = {}) {
    return Object.entries(data)
      .filter(([, value]) => isMeaningful(value))
      .map(([key, value]) => `<article class="morphology-item"><h3>${escapeHTML(labelForDataKey(key))}</h3><div>${valueMarkup(value)}</div></article>`)
      .join('');
  }

  function morphologyMarkup(m = {}) {
    return dataItemsMarkup(m);
  }

  function detailSection(title, eyebrow, data) {
    if (!data || (Array.isArray(data) && !data.length) || (!Array.isArray(data) && !Object.keys(data).length)) return '';
    const items = Array.isArray(data) ? data : Object.fromEntries(Object.entries(data));
    return `<section class="flower-section container"><div class="section-heading"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div><div class="morphology-grid">${Array.isArray(data) ? data.filter(([, value]) => isMeaningful(value)).map(([label, value]) => `<article class="morphology-item"><h3>${escapeHTML(label)}</h3><div>${valueMarkup(value)}</div></article>`).join('') : dataItemsMarkup(items)}</div></section>`;
  }

  function growthCycleMarkup(phases = []) {
    const meaningful = phases.filter(isMeaningful);
    if (!meaningful.length) return '';
    const count = meaningful.length;
    const nodes = meaningful.map((step, i) => {
      const angle = (360 / count) * i - 90;
      return `<article class="growth-cycle__node" style="--angle:${angle}deg" aria-label="Fase ${i + 1} dari ${count}"><span>${String(i + 1).padStart(2, '0')}</span></article>`;
    }).join('');
    const details = meaningful.map((step, i) => `<article class="growth-cycle__detail"><span>${String(i + 1).padStart(2, '0')}</span><p>${escapeHTML(step)}</p></article>`).join('');
    return `<div class="container growth-cycle" style="--phase-count:${count}">
      <div class="growth-cycle__visual" role="img" aria-label="Siklus pertumbuhan dengan ${count} fase">
        <div class="growth-cycle__orbit" aria-hidden="true"></div>
        <div class="growth-cycle__center"><span>Siklus</span><strong>${count}</strong><small>fase</small></div>
        ${nodes}
      </div>
      <div class="growth-cycle__details">${details}</div>
    </div>`;
  }


  function meaningEntry(value, index) {
    const raw = typeof value === 'string' ? value.trim() : '';
    if (!raw) return '';
    const lower = raw.toLowerCase();
    let category = 'Asosiasi budaya';
    let context = 'Asosiasi yang dicatat dalam konteks budaya atau sejarah tertentu.';
    if (lower.includes('sunday garden interpretation')) {
      category = 'Pembacaan Sunday Garden';
      context = 'Interpretasi editorial Sunday Garden, bukan klaim universal tentang makna bunga.';
    } else if (lower.includes('interpretive')) {
      category = 'Interpretasi';
      context = 'Pembacaan interpretatif; bukan makna universal atau sifat biologis bunga.';
    } else if (lower.includes('religious') || lower.includes('christian') || lower.includes('victorian')) {
      category = 'Tradisi sejarah';
      context = 'Makna yang muncul dalam tradisi sejarah atau keagamaan tertentu.';
    } else if (lower.includes('language-of-flowers') || lower.includes('language of flowers') || lower.includes('floriography')) {
      category = 'Bahasa Bunga';
      context = 'Makna yang terdokumentasi dalam tradisi bahasa bunga atau floriografi.';
    } else if (lower.includes('documented')) {
      category = 'Terdokumentasi';
      context = 'Makna atau asosiasi yang disebut dalam sumber budaya/sejarah tertentu.';
    }
    const cleaned = raw.replace(/\s*[—–-]\s*(documented|interpretive|Sunday Garden interpretation).*$/i, '').trim();
    return `<article class="meaning-note">
      <div class="meaning-note__index">${String(index + 1).padStart(2, '0')}</div>
      <div class="meaning-note__body">
        <p class="meaning-note__category">${escapeHTML(category)}</p>
        <h3>${escapeHTML(cleaned)}</h3>
        <p class="meaning-note__context">${escapeHTML(context)}</p>
      </div>
    </article>`;
  }

  function meaningSectionMarkup(flower) {
    const entries = (flower.symbolism || []).filter(isMeaningful);
    const interpretation = flower.sundayGardenInterpretation || '';
    if (!entries.length && !interpretation) return '';
    return `<section class="flower-section container meaning-section">
      <div class="section-heading">
        <p class="eyebrow">What it can mean</p>
        <h2>${escapeHTML(flower.commonName)}, interpreted</h2>
        <p>Makna yang dihimpun dari tradisi, sejarah, seni, dan asosiasi budaya. Setiap catatan dibaca dalam konteks sumbernya.</p>
      </div>
      ${entries.length ? `<div class="meaning-notes">${entries.map((entry, index) => meaningEntry(entry, index)).join('')}</div>` : ''}
      ${interpretation ? `<aside class="meaning-reading"><p class="meaning-reading__label">A Sunday Garden Reading</p><p>${escapeHTML(interpretation)}</p></aside>` : ''}
    </section>`;
  }
  function sourcesMarkup(sources) {
    return sources.map(source => `<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title)} <span class="sr-only">${SundayGardenI18n.flower.sourcesNewTab}</span></a><span>${escapeHTML(source.type)}</span></li>`).join('');
  }

  function render() {
    const main = document.querySelector('#main-content');
    if (!state.gardener || !state.flower) {
      main.innerHTML = `<section class="flower-error container"><p class="eyebrow">The Garden</p><h1>Bunga itu tidak ditemukan.</h1><p>Coba kembali ke taman dan pilih cerita lainnya.</p><a class="button" href="garden.html">${SundayGardenI18n.cta.backToGarden}</a></section>`;
      return;
    }
    const g = state.gardener, f = state.flower;
    document.title = `${g.displayName} — ${f.commonName} | Sunday Garden`;
    main.innerHTML = `
      <article class="flower-page">
        <header class="flower-hero">
          <div class="flower-hero__image-wrap"><img src="${escapeHTML(g.media.hero)}" alt="${escapeHTML(f.commonName)} dipilih oleh ${escapeHTML(g.displayName)}" class="flower-hero__image" width="3413" height="1920" fetchpriority="high" decoding="async"></div>
          <div class="flower-hero__content container">
            <p class="eyebrow">A Gardener's Flower</p>
            <h1>${escapeHTML(f.commonName)}</h1>
            <p class="flower-hero__scientific"><em>${escapeHTML(f.scientificName)}</em></p>
            <p class="flower-hero__byline">${SundayGardenI18n.flower.chosenBy} <strong>${escapeHTML(g.displayName)}</strong></p>
          </div>
        </header>

        <section class="flower-section flower-story container">
          <p class="eyebrow">Why did they choose this flower?</p>
          ${storyMarkup(g.story, g.displayName)}
        </section>

        <section class="flower-section container flower-profile">
          <div class="section-heading"><p class="eyebrow">The flower</p><h2 id="flower-profile-title">A little about ${escapeHTML(f.commonName)}</h2><p>${escapeHTML(f.taxonomicNote || SundayGardenI18n.flower.taxonomicFallback)}</p></div>
          <dl class="fact-list">${profileMarkup(f)}</dl>
        </section>

        <section class="flower-section flower-growth">
          <div class="container section-heading"><p class="eyebrow">From the roots to the bloom</p><h2>How it grows</h2><p>${SundayGardenI18n.flower.growthIntro}</p></div>
          ${growthCycleMarkup(f.howItGrows)}
        </section>

        <section class="flower-section container">
          <div class="section-heading"><p class="eyebrow">A closer look</p><h2>Botanical details</h2></div>
          <div class="morphology-grid">${morphologyMarkup(f.morphology)}</div>
        </section>

        ${detailSection('Flowering', 'The bloom', f.flowering)}
        ${detailSection('Reproduction', 'How new plants begin', f.reproduction)}
        ${detailSection('Life cycle & ecology', 'Under the surface', { ...(f.lifeCycle || {}), ...(f.ecology || {}) })}
        ${detailSection('Distribution & habitat', 'Where it lives', { ...(f.distribution || {}), ...(f.habitatProfile || {}) })}
        ${detailSection('Conservation', 'A note on its status', f.conservation)}

        <section class="flower-section container">
          <div class="section-heading"><p class="eyebrow">Little discoveries</p><h2>Things worth knowing</h2></div>
          <div class="facts-grid">${factsMarkup(f.interestingFacts)}</div>
        </section>

        <section class="flower-section cultural-section">
          <div class="container section-heading"><p class="eyebrow">Beyond botany</p><h2>Cultural & historical notes</h2><p>What the flower has meant in places and periods where it was documented.</p></div>
          <div class="container facts-grid">${factsMarkup(f.culturalNotes)}</div>
        </section>

        <section class="flower-section sources-section container">
          <div class="section-heading"><p class="eyebrow">Read further</p><h2>Sources & further reading</h2><p>Botanical details and historical notes are kept separate from Sunday Garden's own interpretation.</p></div>
          <ol class="source-list">${sourcesMarkup(f.sources)}</ol>
        </section>

        <section class="flower-cta container"><p class="eyebrow">Keep wandering</p><h2>Setiap bunga membawa cerita yang berbeda.</h2><p>Masih ada Gardener lain yang menunggu untuk kamu temui di taman.</p><a class="button" href="garden.html">${SundayGardenI18n.cta.exploreGarden}</a></section>
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
        if (description) description.setAttribute('content', `${state.gardener.displayName} memilih ${state.flower.commonName}. Baca ceritanya dan kenali bunga di baliknya di Sunday Garden.`);
      }
      render();
    } catch (error) {
      console.error(error);
      document.querySelector('#main-content').innerHTML = `<section class="flower-error container"><p class="eyebrow">The Garden</p><h1>Terjadi kesalahan.</h1><p>Cerita bunga tidak dapat dimuat saat ini.</p><a class="button" href="garden.html">${SundayGardenI18n.cta.backToGarden}</a></section>`;
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
