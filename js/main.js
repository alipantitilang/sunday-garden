const SundayGardenI18n = Object.freeze({
  nav: { home: 'Beranda', garden: 'Taman', about: 'Tentang' },
  cta: {
    exploreGarden: 'Jelajahi Taman',
    about: 'Tentang Sunday Garden',
    plant: 'Tanam Bungamu',
    visitSundayVibes: 'Kunjungi Sunday Vibes',
    backToGarden: 'Kembali ke Taman'
  },
  garden: {
    search: 'Cari Gardener atau bunga',
    filter: 'Filter berdasarkan bunga',
    allFlowers: 'Semua bunga',
    opening: 'Membuka taman…',
    enableJs: 'Aktifkan JavaScript untuk menjelajahi koleksi Taman.',
    noMatch: 'Tidak ada bunga yang cocok dengan pencarian ini. Coba jalur lain di dalam taman.',
    firstFlowers: 'Bunga-bunga pertama masih sedang ditanam.',
    room: 'Masih ada ruang untuk bunga lain.',
    slowGrowth: 'Sunday Garden tumbuh perlahan. Satu bunga, satu orang, satu cerita dalam satu waktu.'
  },
  flower: {
    chosenBy: 'Chosen by',
    heroLabel: "A Gardener's Flower",
    commonName: 'Nama umum',
    scientificName: 'Nama ilmiah',
    taxonomicTreatment: 'Perlakuan taksonomi',
    genusLevelTreatment: 'Tidak ditetapkan sebagai satu spesies; profil menggunakan genus',
    researchPending: 'Penelitian masih dipersiapkan',
    family: 'Famili',
    genus: 'Genus',
    order: 'Ordo',
    kingdom: 'Kerajaan',
    synonyms: 'Sinonim',
    growthForm: 'Bentuk pertumbuhan',
    nativeRange: 'Persebaran asli',
    habitat: 'Habitat',
    taxonomicFallback: 'Penelitian botani untuk bunga ini masih dipersiapkan.',
    growthIntro: 'Perjalanan tenang dari bawah permukaan hingga bunga yang terlihat.',
    sourcesNewTab: '(terbuka di tab baru)',
    meaningFallback: 'Interpretasi bunga ini akan ditambahkan setelah tahap penelitiannya selesai.'
  },
  accessibility: {
    skip: 'Lewati ke konten utama',
    home: 'Beranda Sunday Garden'
  }
});

const SundayGarden = (() => {
  const navItems = [
    { href: "index.html", label: SundayGardenI18n.nav.home, key: "home" },
    { href: "garden.html", label: SundayGardenI18n.nav.garden, key: "garden" },
    { href: "about.html", label: SundayGardenI18n.nav.about, key: "about" }
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
      <nav class="site-nav container" aria-label="Navigasi utama">
        <a class="site-brand" href="index.html" aria-label="${SundayGardenI18n.accessibility.home}">
          <img src="assets/brand/logo.png" alt="Sunday Garden">
        </a>

        <button
          class="site-nav__toggle"
          type="button"
          aria-expanded="false"
          aria-controls="site-navigation"
          aria-label="Buka menu navigasi"
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
          <div class="site-footer__links" aria-label="Tautan footer">
            <a href="index.html">${SundayGardenI18n.nav.home}</a>
            <a href="garden.html">${SundayGardenI18n.nav.garden}</a>
            <a href="about.html">${SundayGardenI18n.nav.about}</a>
          </div>
        </div>

        <p class="site-footer__meta">
          Setiap orang mekar dengan caranya sendiri.<br>
          Bunga berbeda. Cerita berbeda. Satu taman.
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
