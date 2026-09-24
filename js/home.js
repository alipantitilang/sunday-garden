/* Sunday Garden — Home page */

(() => {
  const featuredRoot = document.querySelector('[data-featured-gardeners]');
  if (!featuredRoot) return;

  const truncate = (text, max = 260) => {
    if (!text || text.length <= max) return text || '';
    return `${text.slice(0, max).trimEnd()}…`;
  };

  const createCard = (gardener) => {
    const article = document.createElement('article');
    article.className = 'featured-card';

    const link = document.createElement('a');
    link.href = `flower.html?id=${encodeURIComponent(gardener.id)}`;
    link.setAttribute('aria-label', `Read ${gardener.displayName}'s ${gardener.flower.name} story`);

    const imageWrap = document.createElement('div');
    imageWrap.className = 'featured-card__image-wrap';

    const image = document.createElement('img');
    image.className = 'featured-card__image';
    image.src = gardener.media?.gardenCard || gardener.media?.hero || 'assets/images/placeholder/garden-card-placeholder.jpg';
    image.alt = `${gardener.displayName} — ${gardener.flower.name}`;
    image.loading = 'lazy';
    image.width = 1920;
    image.height = 1080;
    image.addEventListener('error', () => {
      image.removeAttribute('src');
      image.alt = 'Featured Garden Card image unavailable';
      imageWrap.classList.add('featured-card__image-wrap--missing');
    });
    imageWrap.appendChild(image);

    const body = document.createElement('div');
    body.className = 'featured-card__body';

    const name = document.createElement('h3');
    name.className = 'featured-card__name';
    name.textContent = gardener.displayName;

    const flower = document.createElement('span');
    flower.className = 'featured-card__flower';
    flower.textContent = gardener.flower.name;

    const story = document.createElement('p');
    story.className = 'featured-card__story';
    story.textContent = `“${truncate(gardener.story)}”`;

    body.append(name, flower, story);
    link.append(imageWrap, body);
    article.appendChild(link);

    return article;
  };

  const render = async () => {
    try {
      const response = await fetch('data/gardeners.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Gardeners request failed: ${response.status}`);

      const data = await response.json();
      const gardeners = Array.isArray(data.gardeners) ? data.gardeners : [];

      featuredRoot.replaceChildren();

      if (!gardeners.length) {
        const note = document.createElement('p');
        note.className = 'empty-note';
        note.textContent = 'The first flowers are still being planted.';
        featuredRoot.appendChild(note);
        return;
      }

      gardeners.slice(0, 4).forEach((gardener) => {
        featuredRoot.appendChild(createCard(gardener));
      });
    } catch (error) {
      console.error('Sunday Garden: unable to load featured gardeners.', error);
      featuredRoot.replaceChildren();

      const note = document.createElement('p');
      note.className = 'empty-note';
      note.textContent = 'The garden could not be opened right now. Please try again later.';
      featuredRoot.appendChild(note);
    }
  };

  render();
})();
