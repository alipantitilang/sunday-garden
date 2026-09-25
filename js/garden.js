/* Sunday Garden — The Garden / RF-011 */

(() => {
  const grid = document.querySelector('[data-garden-grid]');
  const searchInput = document.querySelector('[data-garden-search]');
  const searchClear = document.querySelector('[data-garden-search-clear]');
  const familyList = document.querySelector('[data-garden-family-list]');
  const index = document.querySelector('[data-garden-index]');
  const indexToggle = document.querySelector('[data-garden-index-toggle]');
  const indexPanel = document.querySelector('[data-garden-index-panel]');
  const indexMeta = document.querySelector('[data-garden-index-meta]');
  const sortSelect = document.querySelector('[data-garden-sort]');
  const count = document.querySelector('[data-garden-count]');

  if (!grid || !searchInput || !familyList || !index || !indexToggle || !indexPanel || !indexMeta || !sortSelect || !count) return;

  let gardeners = [];
  let flowersById = new Map();
  let records = [];
  let selectedFamily = 'all';
  let indexOpen = false;
  let indexAnimationTimer = null;

  const normalize = (value) => String(value || '').trim().toLocaleLowerCase('id-ID');
  const display = (value, fallback = '-') => value || fallback;

  const getFlowerMeta = (gardener) => {
    const flower = flowersById.get(gardener.flower?.id);
    const taxonomy = flower?.taxonomy || {};
    return {
      family: flower?.family || taxonomy.family || '-',
      genus: flower?.genus || taxonomy.genus || '-',
      commonName: flower?.commonName || gardener.flower?.name || '-',
      heroName: flower?.heroName || gardener.flower?.name || '-',
      scientificName: flower?.scientificName || gardener.flower?.scientificName || '-'
    };
  };

  const createRecord = (gardener, index) => {
    const meta = getFlowerMeta(gardener);
    return {
      gardener,
      meta,
      originalIndex: index,
      searchText: normalize([
        gardener.displayName,
        gardener.flower?.name,
        meta.commonName,
        meta.heroName,
        meta.scientificName,
        meta.family,
        meta.genus
      ].join(' ')),
      nameKey: normalize(gardener.displayName),
      flowerKey: normalize(meta.commonName),
      familyKey: normalize(meta.family),
      genusKey: normalize(meta.genus)
    };
  };

  const createCard = (record) => {
    const { gardener, meta } = record;
    const article = document.createElement('article');
    article.className = 'garden-card';

    const link = document.createElement('a');
    link.className = 'garden-card__link';
    link.href = `flower.html?id=${encodeURIComponent(gardener.id)}`;
    link.setAttribute('aria-label', `Baca cerita ${gardener.displayName} tentang ${meta.commonName || 'bunga ini'}`);

    const imageWrap = document.createElement('div');
    imageWrap.className = 'garden-card__image-wrap';

    const image = document.createElement('img');
    image.className = 'garden-card__image';
    image.src = gardener.media?.gardenCard || gardener.media?.hero || 'assets/images/placeholder/garden-card-placeholder.jpg';
    image.alt = `${gardener.displayName} — ${meta.commonName || 'Bunga'}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 1920;
    image.height = 1080;
    image.addEventListener('error', () => {
      image.removeAttribute('src');
      image.alt = 'Gambar Garden Card tidak tersedia';
      imageWrap.classList.add('garden-card__image-wrap--missing');
    }, { once: true });
    imageWrap.appendChild(image);

    const caption = document.createElement('div');
    caption.className = 'garden-card__caption';

    const name = document.createElement('h3');
    name.className = 'garden-card__name';
    name.textContent = gardener.displayName;

    const flower = document.createElement('span');
    flower.className = 'garden-card__flower';
    flower.textContent = meta.commonName || 'Bunga tidak diketahui';
    caption.append(name, flower);

    if (meta.scientificName && meta.scientificName !== '-') {
      const scientific = document.createElement('p');
      scientific.className = 'garden-card__scientific';
      scientific.textContent = meta.scientificName;
      caption.appendChild(scientific);
    }

    const relation = document.createElement('div');
    relation.className = 'garden-card__relation';
    const family = document.createElement('span');
    family.textContent = display(meta.family);
    const dot = document.createElement('i');
    dot.setAttribute('aria-hidden', 'true');
    dot.textContent = '·';
    const genus = document.createElement('span');
    genus.textContent = display(meta.genus);
    relation.append(family, dot, genus);
    caption.appendChild(relation);

    link.append(imageWrap, caption);
    article.appendChild(link);
    return article;
  };

  const familyEntries = () => {
    const families = new Map();
    records.forEach((record) => {
      if (!families.has(record.familyKey)) families.set(record.familyKey, record.meta.family);
    });
    return [...families.entries()]
      .sort((a, b) => a[1].localeCompare(b[1], 'id'))
      .map(([key, label]) => ({ key, label }));
  };

  const updateFamilyButtons = () => {
    familyList.querySelectorAll('[data-family]').forEach((button) => {
      const active = button.dataset.family === selectedFamily;
      button.classList.toggle('garden-index__chip--active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  const selectFamily = (family) => {
    selectedFamily = family;
    updateFamilyButtons();
    const activeButton = [...familyList.querySelectorAll('[data-family]')]
      .find((button) => button.dataset.family === family);
    indexMeta.textContent = activeButton?.textContent || (family === 'all' ? 'Semua bunga' : family);
    applyFilters();
  };

  const populateFamilyIndex = () => {
    familyList.replaceChildren();

    const createFamilyButton = (key, label, active = false) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `garden-index__chip${active ? ' garden-index__chip--active' : ''}`;
      button.dataset.family = key;
      button.setAttribute('aria-pressed', String(active));
      button.textContent = label;
      button.addEventListener('click', () => selectFamily(key));
      return button;
    };

    familyList.appendChild(createFamilyButton('all', 'Semua bunga', selectedFamily === 'all'));
    familyEntries().forEach(({ key, label }) => {
      familyList.appendChild(createFamilyButton(key, label, selectedFamily === key));
    });
  };

  const compareRecords = (a, b, key) => (a[key] || '').localeCompare(b[key] || '', 'id');

  const sortRecords = (input) => {
    const sorted = input.slice();
    const sort = sortSelect.value;
    if (sort === 'gardener-asc') sorted.sort((a, b) => compareRecords(a, b, 'nameKey') || a.originalIndex - b.originalIndex);
    else if (sort === 'flower-asc') sorted.sort((a, b) => compareRecords(a, b, 'flowerKey') || compareRecords(a, b, 'nameKey') || a.originalIndex - b.originalIndex);
    else if (sort === 'family-asc') sorted.sort((a, b) => compareRecords(a, b, 'familyKey') || compareRecords(a, b, 'genusKey') || compareRecords(a, b, 'flowerKey') || a.originalIndex - b.originalIndex);
    else if (sort === 'genus-asc') sorted.sort((a, b) => compareRecords(a, b, 'genusKey') || compareRecords(a, b, 'familyKey') || compareRecords(a, b, 'flowerKey') || a.originalIndex - b.originalIndex);
    else sorted.sort((a, b) => a.originalIndex - b.originalIndex);
    return sorted;
  };

  const appendGrouped = (visibleRecords) => {
    const groups = new Map();
    visibleRecords.forEach((record) => {
      const familyKey = record.familyKey || '-';
      const genusKey = record.genusKey || '-';
      if (!groups.has(familyKey)) groups.set(familyKey, { label: record.meta.family, genera: new Map() });
      const familyGroup = groups.get(familyKey);
      if (!familyGroup.genera.has(genusKey)) {
        familyGroup.genera.set(genusKey, { label: record.meta.genus, records: [] });
      }
      familyGroup.genera.get(genusKey).records.push(record);
    });

    [...groups.entries()].forEach(([familyKey, familyGroup]) => {
      const familyBlock = document.createElement('section');
      familyBlock.className = 'garden-group garden-group--family';
      familyBlock.dataset.familyGroup = familyKey;

      const familyTitle = document.createElement('div');
      familyTitle.className = 'garden-group__heading';
      const indexLabel = document.createElement('span');
      indexLabel.className = 'garden-group__index';
      indexLabel.textContent = 'Family';
      const title = document.createElement('h3');
      title.textContent = familyGroup.label === '-' ? 'Famili belum ditetapkan' : familyGroup.label;
      familyTitle.append(indexLabel, title);
      familyBlock.appendChild(familyTitle);

      [...familyGroup.genera.entries()].forEach(([genusKey, genusGroup]) => {
        const genusBlock = document.createElement('div');
        genusBlock.className = 'garden-group__genus';

        const genusTitle = document.createElement('div');
        genusTitle.className = 'garden-group__genus-title';
        const genusLabel = document.createElement('span');
        genusLabel.textContent = 'Genus';
        const genusName = document.createElement('strong');
        genusName.textContent = genusGroup.label === '-' ? 'Belum ditetapkan' : genusGroup.label;
        genusTitle.append(genusLabel, genusName);
        genusBlock.appendChild(genusTitle);

        const genusGrid = document.createElement('div');
        genusGrid.className = 'garden-grid garden-grid--group';
        genusGroup.records.forEach((record) => genusGrid.appendChild(createCard(record)));
        genusBlock.appendChild(genusGrid);
        familyBlock.appendChild(genusBlock);
      });

      grid.appendChild(familyBlock);
    });
  };

  const applyFilters = () => {
    const query = normalize(searchInput.value);
    const visibleRecords = records.filter((record) => {
      const matchesSearch = !query || record.searchText.includes(query);
      const matchesFamily = selectedFamily === 'all' || record.familyKey === selectedFamily;
      return matchesSearch && matchesFamily;
    });

    const sortedRecords = sortRecords(visibleRecords);
    grid.replaceChildren();
    appendGrouped(sortedRecords);

    const visible = sortedRecords.length;
    count.textContent = `${visible} ${visible === 1 ? 'Gardener' : 'Gardeners'}`;
    if (searchClear) searchClear.hidden = !searchInput.value;

    if (!visible) {
      const empty = document.createElement('p');
      empty.className = 'garden-status garden-empty';
      empty.textContent = SundayGardenI18n.garden.noMatch;
      grid.appendChild(empty);
    }
  };

  const render = () => {
    if (!gardeners.length) {
      grid.replaceChildren();
      const note = document.createElement('p');
      note.className = 'garden-status';
      note.textContent = SundayGardenI18n.garden.firstFlowers;
      grid.appendChild(note);
      count.textContent = '0 Gardener';
      return;
    }

    records = gardeners.map(createRecord);
    populateFamilyIndex();
    applyFilters();
  };

  const setIndexOpen = (open) => {
    if (open === indexOpen) return;
    indexOpen = open;
    if (indexAnimationTimer) clearTimeout(indexAnimationTimer);

    index.classList.toggle('is-open', open);
    indexToggle.setAttribute('aria-expanded', String(open));
    indexPanel.setAttribute('aria-hidden', String(!open));

    if (open) {
      indexAnimationTimer = window.setTimeout(() => indexPanel.removeAttribute('inert'), 20);
    } else {
      indexPanel.setAttribute('inert', '');
    }
  };

  indexToggle.addEventListener('click', () => setIndexOpen(!indexOpen));

  document.addEventListener('click', (event) => {
    if (indexOpen && !index.contains(event.target)) setIndexOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && indexOpen) {
      setIndexOpen(false);
      indexToggle.focus();
    }
  });

  searchInput.addEventListener('input', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
  searchClear?.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    applyFilters();
  });

  const load = async () => {
    try {
      const [gardenersResponse, flowersResponse] = await Promise.all([
        fetch('data/gardeners.json'),
        fetch('data/flowers.json')
      ]);
      if (!gardenersResponse.ok) throw new Error(`Gardeners request failed: ${gardenersResponse.status}`);
      if (!flowersResponse.ok) throw new Error(`Flowers request failed: ${flowersResponse.status}`);

      const [gardenersData, flowersData] = await Promise.all([
        gardenersResponse.json(),
        flowersResponse.json()
      ]);

      gardeners = Array.isArray(gardenersData.gardeners) ? gardenersData.gardeners : [];
      const flowers = Array.isArray(flowersData.flowers) ? flowersData.flowers : [];
      flowersById = new Map(flowers.map((flower) => [flower.id, flower]));
      render();
    } catch (error) {
      console.error('Sunday Garden: unable to load garden discovery data.', error);
      grid.replaceChildren();
      const note = document.createElement('p');
      note.className = 'garden-status';
      note.textContent = 'Taman tidak dapat dibuka saat ini. Coba lagi nanti.';
      grid.appendChild(note);
      count.textContent = '';
    }
  };

  // Closed from the start so the panel never shifts the collection below it.
  indexPanel.setAttribute('inert', '');
  load();
})();
