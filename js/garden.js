/* Sunday Garden — The Garden / RF-010 */

(() => {
  const grid = document.querySelector('[data-garden-grid]');
  const searchInput = document.querySelector('[data-garden-search]');
  const searchClear = document.querySelector('[data-garden-search-clear]');
  const familyList = document.querySelector('[data-garden-family-list]');
  const indexMeta = document.querySelector('[data-garden-index-meta]');
  const sortSelect = document.querySelector('[data-garden-sort]');
  const count = document.querySelector('[data-garden-count]');

  if (!grid || !searchInput || !familyList || !indexMeta || !sortSelect || !count) return;

  let gardeners = [];
  let flowersById = new Map();
  let selectedFamily = 'all';

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

  const createCard = (gardener) => {
    const meta = getFlowerMeta(gardener);
    const article = document.createElement('article');
    article.className = 'garden-card';
    article.dataset.name = normalize(gardener.displayName);
    article.dataset.flower = normalize(meta.commonName);
    article.dataset.family = normalize(meta.family);
    article.dataset.genus = normalize(meta.genus);
    article.dataset.search = normalize([
      gardener.displayName,
      gardener.flower?.name,
      meta.commonName,
      meta.heroName,
      meta.scientificName,
      meta.family,
      meta.genus
    ].join(' '));

    const link = document.createElement('a');
    link.className = 'garden-card__link';
    link.href = `flower.html?id=${encodeURIComponent(gardener.id)}`;
    link.setAttribute(
      'aria-label',
      `Baca cerita ${gardener.displayName} tentang ${meta.commonName || 'bunga ini'}`
    );

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

    const scientificName = meta.scientificName;
    if (scientificName && scientificName !== '-') {
      const scientific = document.createElement('p');
      scientific.className = 'garden-card__scientific';
      scientific.textContent = scientificName;
      caption.appendChild(scientific);
    }

    const relation = document.createElement('div');
    relation.className = 'garden-card__relation';
    relation.innerHTML = `<span>${display(meta.family)}</span><i aria-hidden="true">·</i><span>${display(meta.genus)}</span>`;
    caption.appendChild(relation);

    link.append(imageWrap, caption);
    article.appendChild(link);

    return article;
  };

  const familyEntries = () => {
    const families = new Map();
    gardeners.forEach((gardener) => {
      const meta = getFlowerMeta(gardener);
      const key = normalize(meta.family);
      if (!families.has(key)) families.set(key, meta.family);
    });
    return [...families.entries()]
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([key, label]) => ({ key, label }));
  };

  const populateFamilyIndex = () => {
    familyList.replaceChildren();

    const allButton = document.createElement('button');
    allButton.type = 'button';
    allButton.className = 'garden-index__chip garden-index__chip--active';
    allButton.dataset.family = 'all';
    allButton.textContent = 'Semua bunga';
    allButton.addEventListener('click', () => selectFamily('all'));
    familyList.appendChild(allButton);

    familyEntries().forEach(({ key, label }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'garden-index__chip';
      button.dataset.family = key;
      button.textContent = label;
      button.addEventListener('click', () => selectFamily(key));
      familyList.appendChild(button);
    });
  };

  const updateFamilyButtons = () => {
    familyList.querySelectorAll('[data-family]').forEach((button) => {
      button.classList.toggle('garden-index__chip--active', button.dataset.family === selectedFamily);
      button.setAttribute('aria-pressed', button.dataset.family === selectedFamily ? 'true' : 'false');
    });
  };

  const selectFamily = (family) => {
    selectedFamily = family;
    updateFamilyButtons();
    const label = family === 'all'
      ? 'Semua bunga'
      : familyList.querySelector(`[data-family="${CSS.escape(family)}"]`)?.textContent || family;
    indexMeta.textContent = label;
    applyFilters();
  };

  const getCards = () => [...grid.querySelectorAll('.garden-card')];

  const sortCards = (cards) => {
    const sort = sortSelect.value;
    const compare = (a, b, key) => (a.dataset[key] || '').localeCompare(b.dataset[key] || '', 'id');

    if (sort === 'gardener-asc') return cards.sort((a, b) => compare(a, b, 'name'));
    if (sort === 'flower-asc') return cards.sort((a, b) => compare(a, b, 'flower'));
    if (sort === 'family-asc') return cards.sort((a, b) => compare(a, b, 'family') || compare(a, b, 'genus') || compare(a, b, 'flower'));
    if (sort === 'genus-asc') return cards.sort((a, b) => compare(a, b, 'genus') || compare(a, b, 'flower'));
    return cards;
  };

  const appendGrouped = (cards) => {
    const groups = new Map();
    cards.forEach((card) => {
      const family = card.dataset.family || '-';
      const genus = card.dataset.genus || '-';
      if (!groups.has(family)) groups.set(family, new Map());
      const familyGroup = groups.get(family);
      if (!familyGroup.has(genus)) familyGroup.set(genus, []);
      familyGroup.get(genus).push(card);
    });

    [...groups.entries()].forEach(([family, genera]) => {
      const familyBlock = document.createElement('section');
      familyBlock.className = 'garden-group garden-group--family';
      familyBlock.dataset.familyGroup = family;

      const familyTitle = document.createElement('div');
      familyTitle.className = 'garden-group__heading';
      familyTitle.innerHTML = `<span class="garden-group__index">Family</span><h3>${family === '-' ? 'Famili belum ditetapkan' : family}</h3>`;
      familyBlock.appendChild(familyTitle);

      [...genera.entries()].forEach(([genus, genusCards]) => {
        const genusBlock = document.createElement('div');
        genusBlock.className = 'garden-group__genus';

        const genusTitle = document.createElement('div');
        genusTitle.className = 'garden-group__genus-title';
        genusTitle.innerHTML = `<span>Genus</span><strong>${genus === '-' ? 'Belum ditetapkan' : genus}</strong>`;
        genusBlock.appendChild(genusTitle);

        const genusGrid = document.createElement('div');
        genusGrid.className = 'garden-grid garden-grid--group';
        genusCards.forEach((card) => genusGrid.appendChild(card));
        genusBlock.appendChild(genusGrid);
        familyBlock.appendChild(genusBlock);
      });

      grid.appendChild(familyBlock);
    });
  };

  const applyFilters = () => {
    const query = normalize(searchInput.value);
    const visibleCards = getCards().filter((card) => {
      const matchesSearch = !query || card.dataset.search.includes(query);
      const matchesFamily = selectedFamily === 'all' || card.dataset.family === selectedFamily;
      return matchesSearch && matchesFamily;
    });

    const sorted = sortCards(visibleCards);
    grid.replaceChildren();
    appendGrouped(sorted);

    const visible = sorted.length;
    count.textContent = `${visible} ${visible === 1 ? 'Gardener' : 'Gardeners'}`;

    if (searchClear) {
      searchClear.hidden = !searchInput.value;
    }

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

    grid.replaceChildren(...gardeners.map(createCard));
    populateFamilyIndex();
    applyFilters();
  };

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

  searchInput.addEventListener('input', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
  searchClear?.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    applyFilters();
  });

  load();
})();
