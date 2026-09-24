const SundayGarden = (() => {
  const navItems = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "about.html", label: "About", key: "about" },
    { href: "garden.html", label: "The Garden", key: "garden" }
  ];

  function currentPage() {
    const file = window.location.pathname.split("/").pop() || "index.html";
    if (file === "flower.html") return "garden";
    if (file === "garden.html") return "garden";
    if (file === "about.html") return "about";
    return "home";
  }

  function renderHeader() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;

    const page = currentPage();

    header.innerHTML = `
      <nav class="site-nav container" aria-label="Primary navigation">
        <a class="site-brand" href="index.html" aria-label="Sunday Garden home">
          <img src="assets/brand/logo.png" alt="Sunday Garden">
        </a>

        <button
          class="site-nav__toggle"
          type="button"
          aria-expanded="false"
          aria-controls="site-navigation"
          aria-label="Open navigation menu"
        >
          <span class="site-nav__toggle-bars" aria-hidden="true">
            <span></span>
            <span></span>
          </span>
        </button>

        <ul class="site-nav__links" id="site-navigation">
          ${navItems.map(item => `
            <li>
              <a href="${item.href}" ${page === item.key ? 'aria-current="page"' : ''}>
                ${item.label}
              </a>
            </li>
          `).join("")}
        </ul>
      </nav>
    `;

    const toggle = header.querySelector(".site-nav__toggle");
    const links = header.querySelector(".site-nav__links");

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open navigation menu" : "Close navigation menu");
      links.dataset.open = String(!open);
    });

    links.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        links.dataset.open = "false";
      }
    });

    document.addEventListener("click", (event) => {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (!header.contains(event.target)) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        links.dataset.open = "false";
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        links.dataset.open = "false";
        toggle.focus();
      }
    });
  }

  function renderFooter() {
    const footer = document.querySelector("[data-site-footer]");
    if (!footer) return;

    footer.innerHTML = `
      <div class="site-footer__inner">
        <div>
          <div class="site-footer__mark">Sunday Garden</div>
          <div class="site-footer__links" aria-label="Footer links">
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="garden.html">The Garden</a>
          </div>
        </div>

        <p class="site-footer__meta">
          Everyone blooms in their own way.<br>
          Different flowers. Different stories. One garden.
        </p>
      </div>
    `;
  }

  function init() {
    renderHeader();
    renderFooter();
  }

  return { init, currentPage };
})();

document.addEventListener("DOMContentLoaded", SundayGarden.init);
