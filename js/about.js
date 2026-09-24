/* Sunday Garden — About page behavior */

(() => {
  const externalLinks = document.querySelectorAll('a[target="_blank"]');

  externalLinks.forEach((link) => {
    link.addEventListener('click', () => {
      link.dataset.visited = 'true';
    });
  });
})();
