/* Sunday Garden — The Garden page */

(() => {
  const grid = document.querySelector('[data-garden-grid]');
  const searchInput = document.querySelector('[data-garden-search]');
  const filterSelect = document.querySelector('[data-garden-filter]');
  const count = document.querySelector('[data-garden-count]');

  if (!grid || !searchInput || !filterSelect || !count) return;

  let gardeners = [];

  const normalize = (value) => String(value || '').trim().toLowerCase();

  const createCard = (gardener) => {
    const article = document.createElement('article');
    article.className = 'garden-card';
    article.dataset.name = normalize(gardener.displayName);
    article.dataset.flower = normalize(gardener.flower?.name);
    article.dataset.search = normalize([
      gardener.displayName,
      gardener.flower?.name,
      gardener.flower?.scientificName,
    ].join(' '));

    const link = document.createElement('a');
    link.className = 'garden-card__link';
    link.href = `flower.html?id=${encodeURIComponent(gardener.id)}`;
    link.setAttribute(
      'aria-label',
      `Read ${gardener.displayName}'s ${gardener.flower?.name || 'flower'} story`
    );

    const imageWrap = document.createElement('div');
    imageWrap.className = 'garden-card__image-wrap';

    const image = document.createElement('img');
    image.className = 'garden-card__image';
    image.src = gardener.media?.gardenCard || gardener.media?.hero || 'assets/images/placeholder/garden-card-placeholder.jpg';
    image.alt = `${gardener.displayName} — ${gardener.flower?.name || 'Flower'}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 1920;
    image.height = 1080;
    image.addEventListener('error', () => {
      image.removeAttribute('src');
      image.alt = 'Garden Card image unavailable';
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
    flower.textContent = gardener.flower?.name || 'Unknown flower';

    caption.append(name, flower);

    const scientificName = gardener.flower?.scientificName;
    if (scientificName) {
      const scientific = document.createElement('p');
      scientific.className = 'garden-card__scientific';
      scientific.textContent = scientificName;
      caption.appendChild(scientific);
    }

    link.append(imageWrap, caption);
    article.appendChild(link);

    return article;
  };

  const populateFilter = () => {
    const flowers = [...new Map(
      gardeners
        .filter((gardener) => gardener.flower?.name)
        .map((gardener) => [normalize(gardener.flower.name), gardener.flower.name])
    ).values()].sort((a, b) => a.localeCompare(b));

    filterSelect.replaceChildren(new Option('All flowers', 'all'));
    flowers.forEach((flower) => {
      filterSelect.appendChild(new Option(flower, normalize(flower)));
    });
  };

  const applyFilters = () => {
    const query = normalize(searchInput.value);
    const flower = normalize(filterSelect.value);
    let visible = 0;

    grid.querySelectorAll('.garden-card').forEach((card) => {
      const matchesSearch = !query || card.dataset.search.includes(query);
      const matchesFlower = flower === 'all' || card.dataset.flower === flower;
      const show = matchesSearch && matchesFlower;

      card.hidden = !show;
      if (show) visible += 1;
    });

    count.textContent = `${visible} ${visible === 1 ? 'Gardener' : 'Gardeners'}`;

    let empty = grid.querySelector('.garden-empty');
    if (!visible) {
      if (!empty) {
        empty = document.createElement('p');
        empty.className = 'garden-status garden-empty';
        grid.appendChild(empty);
      }
      empty.textContent = 'No flowers match that search. Try another path through the garden.';
    } else if (empty) {
      empty.remove();
    }
  };

  const render = () => {
    grid.replaceChildren();

    if (!gardeners.length) {
      const note = document.createElement('p');
      note.className = 'garden-status';
      note.textContent = 'The first flowers are still being planted.';
      grid.appendChild(note);
      count.textContent = '0 Gardeners';
      return;
    }

    gardeners.forEach((gardener) => grid.appendChild(createCard(gardener)));
    populateFilter();
    applyFilters();
  };

  const load = async () => {
    try {
      const response = await fetch('data/gardeners.json');
      if (!response.ok) throw new Error(`Gardeners request failed: ${response.status}`);

      const data = await response.json();
      gardeners = Array.isArray(data.gardeners) ? data.gardeners : [];
      render();
    } catch (error) {
      console.error('Sunday Garden: unable to load gardeners.', error);
      grid.replaceChildren();

      const note = document.createElement('p');
      note.className = 'garden-status';
      note.textContent = 'The garden could not be opened right now. Please try again later.';
      grid.appendChild(note);
      count.textContent = '';
    }
  };

  searchInput.addEventListener('input', applyFilters);
  filterSelect.addEventListener('change', applyFilters);

  load();
})();
