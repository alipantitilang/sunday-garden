# 🌱 Sunday Garden
## Product Requirements Document (PRD)

**Version:** 1.0  
**Status:** Active  
**Product:** Sunday Garden  
**Type:** Community storytelling / botanical journal  
**Last Updated:** 2026-10-03

---

## 1. Product Overview

**Sunday Garden** adalah ruang digital bertema botanical journal yang menggunakan bunga sebagai media untuk membantu seseorang memahami, menceritakan, dan merefleksikan dirinya.

Sunday Garden **bukan ensiklopedia bunga**.

Bunga bukan pusat ceritanya.

**Manusialah yang menjadi ceritanya.**

> **The flower is the question; the person is the answer.**

Setiap Gardener memilih sebuah bunga yang memiliki hubungan personal dengan dirinya. Hubungan tersebut dapat berasal dari kenangan masa lalu, keadaan atau refleksi saat ini, harapan terhadap masa depan, sifat dan karakter, pengalaman, seseorang, tempat, karya, simbol, atau alasan personal lainnya.

Sunday Garden mengubah pilihan tersebut menjadi sebuah cerita yang dapat dipahami tanpa menghilangkan alasan personal di baliknya.

---

## 2. Product Philosophy

Sunday Garden dibangun berdasarkan prinsip:

> **Different flowers. Different stories. One garden.**

> **Everyone blooms in their own way.**

Bunga yang sama tidak harus memiliki makna yang sama bagi dua orang berbeda.

Karena itu, Sunday Garden membedakan antara:

### Botanical Meaning
Makna, simbolisme, dan informasi yang berasal dari sumber atau pengetahuan tentang bunga.

### Personal Meaning
Makna yang muncul dari hubungan seseorang dengan bunga tersebut.

Sunday Garden tidak menentukan:

> “Bunga ini berarti X, maka kamu pasti X.”

Sebaliknya:

> “Bunga ini dapat memiliki makna X. Tetapi mengapa kamu memilihnya adalah bagian dari ceritamu.”

---

## 3. Problem Statement

Orang sering memiliki perasaan, pengalaman, atau bagian dari dirinya yang sulit dijelaskan secara langsung.

Bunga dapat menjadi bahasa alternatif untuk:
- menggambarkan perasaan,
- menyimpan kenangan,
- merefleksikan diri,
- menggambarkan sifat,
- menyampaikan harapan,
- atau menjelaskan sesuatu yang sulit diucapkan.

Namun informasi tentang bunga biasanya disajikan sebagai informasi botani atau simbolisme umum.

Sunday Garden ingin mempertemukan:

**flower + personal story + reflection**

dalam satu ruang yang tenang.

---

## 4. Product Goals

### Primary Goals

1. Membantu seseorang menemukan atau mengartikulasikan perasaan melalui bunga.
2. Membantu seseorang memahami makna bunga yang mereka pilih.
3. Memberi ruang untuk menjelaskan alasan personal di balik pilihan bunga.
4. Mendokumentasikan cerita setiap Gardener.
5. Membentuk sebuah “garden” yang terdiri dari berbagai cerita manusia.
6. Menjaga hubungan antara informasi bunga dan interpretasi personal secara jelas.

### Secondary Goals

1. Menjadi proyek web yang memiliki identitas visual kuat.
2. Menjadi contoh implementasi frontend/data-driven website.
3. Memiliki struktur data yang dapat berkembang tanpa harus rewrite seluruh website.
4. Memisahkan proses pengumpulan/maturasi data dari website publik.

---

## 5. Non-Goals

Sunday Garden bukan:
- ensiklopedia botani lengkap,
- database taksonomi bunga,
- diagnosis psikologis,
- tes kepribadian,
- generator “kepribadian berdasarkan bunga”,
- platform sosial penuh,
- marketplace bunga,
- forum diskusi,
- atau sistem yang menentukan makna personal seseorang secara absolut.

---

## 6. Target Users

### 6.1 Gardener

Orang yang memilih sebuah bunga dan memiliki cerita personal di baliknya.

Mereka dapat:
- memilih bunga,
- memberikan alasan,
- memberikan cerita,
- merefleksikan hubungan mereka dengan bunga,
- dan menjadi bagian dari garden.

### 6.2 Visitor

Orang yang mengunjungi Sunday Garden tanpa menjadi Gardener.

Mereka dapat:
- menjelajahi bunga,
- membaca cerita Gardener,
- memahami makna bunga,
- menemukan perspektif personal,
- dan menemukan hubungan baru dengan bunga.

### 6.3 Maintainer

Orang yang mengelola data dan website.

Maintainer bertanggung jawab terhadap:
- validitas data,
- kualitas konten,
- struktur data,
- asset,
- website,
- dan deployment.

---

## 7. Core User Journey

### Visitor

```text
Landing
  ↓
Understand Sunday Garden
  ↓
Explore Garden
  ↓
Choose Gardener / Flower
  ↓
Read Flower Profile
  ↓
Read Personal Story
  ↓
Explore another flower
```

### Gardener

```text
Choose a flower
  ↓
Explain why
  ↓
Reflection / story
  ↓
Data maturation
  ↓
Validation
  ↓
Published Garden entry
```

---

## 8. Core Product Structure

Website minimal terdiri dari:

```text
/
├── Home
├── Garden
├── Flower
└── About
```

### Home

Tujuan:
- memperkenalkan konsep,
- membangun atmosphere,
- mengarahkan visitor ke Garden,
- memperkenalkan Sunday Garden secara singkat.

### Garden

Tujuan:
- menampilkan Gardener,
- memungkinkan eksplorasi berdasarkan bunga,
- menjadi pusat koleksi cerita.

### Flower

Tujuan:
- menjelaskan bunga,
- menampilkan informasi botani yang relevan,
- menampilkan simbolisme,
- menampilkan interpretasi Sunday Garden,
- menampilkan cerita Gardener yang memilih bunga tersebut.

### About

Tujuan:
- menjelaskan filosofi,
- menjelaskan bagaimana Sunday Garden bekerja,
- menjelaskan cara seseorang dapat menjadi Gardener,
- memberikan konteks project.

---

## 9. Flower Page Requirements

Setiap halaman bunga minimal dapat memiliki:

### Identity
- Common Name
- Scientific Name
- Taxonomy
- Family
- Genus

### Profile
- Appearance
- Habitat
- Growth
- Distribution
- Conservation
- Cultural Notes

### Meaning
- Symbolism
- Sunday Garden Interpretation

### Gardener Story
- Gardener name
- Flower
- Personal meaning
- Personal reason
- Story / reflection
- Media jika tersedia

### Sources

Informasi faktual harus dapat ditelusuri ke sumber yang digunakan.

---

## 10. Gardener Model

Setiap Gardener memiliki:

```text
id
name
flower
personalMeaning
personalReason
story
media
metadata
status
```

Contoh konseptual:

```json
{
  "id": "alip",
  "name": "Alip",
  "flower": "blue-lotus",
  "personalMeaning": "...",
  "personalReason": "...",
  "story": "...",
  "media": {},
  "status": "valid"
}
```

Data personal tidak boleh digantikan oleh asumsi sistem.

---

## 11. Flower Data Model

Flower merupakan entity terpisah dari Gardener.

Konsep:

```text
Flower
├── identity
├── taxonomy
├── botanical profile
├── symbolism
├── interpretation
├── cultural information
├── conservation
└── sources
```

Satu flower dapat direferensikan oleh banyak Gardener.

```text
1 Flower
   ↓
many Gardener
```

---

## 12. Data Integrity Rules

### Flower

Flower merupakan entity yang relatif immutable setelah dipublikasikan.

Perubahan besar pada flower harus melalui proses update/revision, bukan perubahan sembarangan.

### Gardener

Gardener dapat mengalami:
- input,
- edit,
- correction,
- update,
- revision,
- validation.

History tidak boleh dihapus hanya karena data baru masuk.

---

## 13. Sunday Garden Data Maturation

Sunday Garden menggunakan proses bertahap untuk mengubah input mentah menjadi data yang siap dipublikasikan.

```text
Level 0
↓
Level 1
↓
Level 2
↓
Level 3
↓
Validated
```

### Level 0 — Name + Flower

Input:
```text
name
flower
```

Output:
- raw inspiration

Tujuan: memberikan titik awal tanpa mengarang cerita personal pengguna.

### Level 1 — Raw Inspiration

Input:
```text
name
flower
raw inspiration
```

Output:
- raw meaning & reason
- mature inspiration

### Level 2 — Mature Inspiration

Input:
```text
name
flower
raw inspiration
mature inspiration
```

Output:
- mature meaning
- mature reason

### Level 3 — Gardener Validation

Gardener memeriksa hasil.

Jika Gardener menyetujui:

```text
Level 3 = Valid
```

Hasil tersebut menjadi data publik.

---

## 14. Golden Rule for Personal Meaning

Output personal meaning dan reason harus dimulai dengan:

> **“aku memilih bunga ini karna”**

Sistem tidak boleh mengubahnya menjadi klaim objektif tentang identitas seseorang.

Contoh yang benar:

> aku memilih bunga ini karna bunga ini mengingatkanku pada...

Hindari:

> kamu adalah orang yang...

kecuali pernyataan tersebut memang berasal dari Gardener.

---

## 15. Data History

Setiap perubahan harus mempertahankan history.

```text
Gardener
├── core
└── history
    ├── level 0
    ├── level 1
    ├── level 2
    └── level 3
```

`core` berisi data aktif.

`history` berisi perkembangan data.

History tidak dihapus ketika data baru dibuat.

---

## 16. Internal Data Tool

Sunday Garden memiliki tool internal untuk membantu proses data maturation.

Tool ini **bukan bagian dari website publik**.

Tujuannya:
- menerima input Gardener,
- membantu menghasilkan interpretasi,
- mempertahankan history,
- melakukan correction,
- melakukan revision,
- menghasilkan data final,
- dan melakukan export.

Commands:

```text
/input
/output
/edit
/correct
/update
/revision
/remove
```

### `/input`
Menambahkan input baru.

### `/output`
Membaca output/data. Read-only.

### `/edit`
Mengubah informasi yang diperbolehkan tanpa menghapus history.

### `/correct`
Memperbaiki kesalahan.

### `/update`
Memperbarui data aktif.

### `/revision`
Membuat revisi baru sambil mempertahankan versi sebelumnya.

### `/remove`
Menghapus entity dari data aktif sesuai aturan project, tanpa menghilangkan history yang diperlukan.

---

## 17. Validation

Sebelum data dipublikasikan:

```text
Input
 ↓
Generated
 ↓
Gardener Review
 ↓
Accepted
 ↓
Validated
 ↓
Published
```

Sistem tidak boleh menganggap generated output sebagai fakta personal sampai Gardener mengonfirmasinya.

---

## 18. Content Rules

### Botanical Content

Harus:
- dapat ditelusuri ke sumber,
- tidak mengarang fakta,
- membedakan fakta dari interpretasi,
- menjaga nama ilmiah dan taxonomy.

### Personal Content

Harus:
- berasal dari Gardener,
- tidak dipaksakan,
- tidak mengubah asumsi menjadi fakta,
- mempertahankan suara personal sebisa mungkin.

### AI-generated Content

AI boleh membantu:
- menyusun,
- memperjelas,
- menemukan kemungkinan hubungan,
- menghasilkan draft,
- mengorganisasi data.

AI tidak boleh:
- menciptakan pengalaman hidup Gardener,
- menciptakan alasan personal yang tidak diberikan,
- mengklaim interpretasi sebagai fakta,
- menggantikan validasi Gardener.

---

## 19. Design Direction

### Mood

- quiet
- botanical
- reflective
- warm
- intimate
- natural
- journal-like

### Primary Colors

```text
Forest Ink
#34463A

Paper
#F3EEE3
```

Visual harus terasa seperti:

> sebuah halaman jurnal botani yang perlahan dibuka pada pagi hari.

Bukan:

> database bunga.

---

## 20. UX Principles

### Principle 1 — Story First
Informasi bunga membantu membuka cerita. Cerita manusia tetap menjadi inti.

### Principle 2 — Quiet Interface
Jangan memenuhi halaman dengan UI yang tidak diperlukan.

### Principle 3 — Slow Discovery
Pengguna boleh menjelajah tanpa merasa sedang menyelesaikan task.

### Principle 4 — Personal, Not Prescriptive
Jangan mengatakan kepada user siapa mereka. Biarkan mereka menemukan maknanya sendiri.

### Principle 5 — Every Interaction Has a Reason
Animasi, transition, filter, modal, dan interaction harus memiliki tujuan.

---

## 21. Accessibility Requirements

Minimum:
- semantic HTML,
- proper heading hierarchy,
- keyboard navigation,
- visible focus state,
- accessible buttons,
- accessible forms,
- meaningful alt text,
- sufficient color contrast,
- ARIA hanya ketika memang diperlukan,
- reduced-motion support untuk animasi yang relevan.

---

## 22. Performance Requirements

Target:
- optimized images,
- modern image formats ketika sesuai,
- SVG untuk icon/vector,
- tidak mengirim asset berukuran besar tanpa alasan,
- lazy-load image yang tidak langsung terlihat,
- minimalkan JavaScript yang tidak diperlukan,
- hindari duplicate assets,
- hindari unused CSS/JS.

Setiap asset baru harus dipertanyakan:

> “Apakah ukuran dan kompleksitasnya sepadan dengan manfaatnya?”

---

## 23. Code Architecture

Project harus mempertahankan pemisahan:

```text
HTML
↓
Structure

CSS
↓
Presentation

JS
↓
Behavior

JSON
↓
Content/Data

Assets
↓
Media
```

Data tidak boleh disebar ke banyak file JS jika dapat dikelola sebagai data source.

---

## 24. Folder Structure

Target structure:

```text
sunday-garden/
│
├── index.html
├── garden.html
├── flower.html
├── about.html
│
├── css/
│   ├── base.css
│   ├── components.css
│   ├── home.css
│   ├── garden.css
│   ├── flower.css
│   └── about.css
│
├── js/
│   ├── main.js
│   ├── home.js
│   ├── garden.js
│   └── flower.js
│
├── data/
│   ├── gardeners.json
│   └── flowers.json
│
├── assets/
│   ├── brand/
│   ├── icons/
│   ├── images/
│   └── textures/
│
├── tools/
│   └── ...
│
├── docs/
│   └── ...
│
└── README.md
```

Internal data-generation/maturation tooling harus tetap dapat dibedakan dari runtime website.

---

## 25. Asset Rules

Setiap asset harus:
1. Memiliki nama yang jelas.
2. Menggunakan extension sesuai format sebenarnya.
3. Tidak memiliki duplicate.
4. Tidak memiliki file orphan.
5. Tidak terlalu besar tanpa alasan.
6. Menggunakan SVG untuk icon/vector jika memungkinkan.
7. Memiliki fallback jika asset tersebut kritikal.

---

## 26. Code Quality Rules

Sebelum feature dianggap selesai:
- tidak ada console error,
- tidak ada unused import,
- tidak ada unused function,
- tidak ada unused variable,
- tidak ada dead CSS yang diketahui,
- tidak ada broken reference,
- tidak ada duplicate asset,
- tidak ada temporary debug code,
- tidak ada placeholder yang tertinggal tanpa alasan.

Prioritas:

```text
Broken
↓
Unused
↓
Duplicate
↓
Confusing
↓
Optimization
↓
Refactor
```

Jangan melakukan refactor besar hanya untuk membuat code terlihat “lebih bersih”.

---

## 27. Feature Development Workflow

Setiap fitur baru harus melewati:

```text
1. Idea
   ↓
2. PRD requirement
   ↓
3. Data requirement
   ↓
4. UX design
   ↓
5. Implementation
   ↓
6. Functional test
   ↓
7. Responsive test
   ↓
8. Accessibility test
   ↓
9. Performance check
   ↓
10. Code audit
   ↓
11. Production test
   ↓
12. Documentation
```

Sebuah fitur tidak dianggap selesai hanya karena UI-nya muncul.

---

## 28. Definition of Done

### Function
- [ ] fitur bekerja sesuai requirement
- [ ] happy path bekerja
- [ ] error state ditangani
- [ ] empty state ditangani

### UI
- [ ] desktop
- [ ] mobile
- [ ] tablet bila relevan
- [ ] hover
- [ ] focus
- [ ] active
- [ ] disabled bila relevan

### Code
- [ ] tidak ada console error
- [ ] tidak ada dead code baru
- [ ] tidak ada duplicate code yang tidak perlu
- [ ] naming jelas

### Data
- [ ] schema benar
- [ ] validation lolos
- [ ] tidak ada data orphan
- [ ] history dipertahankan jika diperlukan

### Performance
- [ ] asset dioptimalkan
- [ ] tidak menambah dependency tanpa alasan
- [ ] tidak menambah asset besar tanpa alasan

### Production
- [ ] berhasil di-build/deploy
- [ ] production URL diuji
- [ ] direct URL diuji
- [ ] refresh diuji
- [ ] mobile production diuji

---

## 29. Testing Checklist

### Functional

```text
[ ] navigation
[ ] links
[ ] buttons
[ ] filters
[ ] search
[ ] flower page
[ ] gardener page
[ ] image loading
[ ] fallback
[ ] invalid URL
[ ] missing data
```

### Responsive

```text
[ ] 320px
[ ] 375px
[ ] 390px
[ ] 430px
[ ] tablet
[ ] 1366px
[ ] 1920px
```

### Browser

```text
[ ] Chrome
[ ] Firefox
[ ] Edge
[ ] mobile browser
```

---

## 30. SEO

SEO hanya diprioritaskan pada halaman yang memang ditujukan untuk discovery publik.

Minimum:
- meaningful `<title>`
- meta description
- canonical
- Open Graph
- semantic HTML
- sitemap jika diperlukan
- robots.txt
- descriptive URL jika memungkinkan

Dynamic flower pages harus memiliki strategi canonical/indexing yang konsisten.

Jangan mengoptimalkan SEO hanya karena checklist mengatakan SEO harus ada.

---

## 31. Deployment

Production deployment harus melalui:

```text
Local
 ↓
Audit
 ↓
Build
 ↓
Production
 ↓
Production verification
```

Setelah deployment:
- cek asset,
- cek routing,
- cek direct URL,
- cek image,
- cek mobile,
- cek console,
- cek performance.

---

## 32. Analytics & Monitoring

Analytics digunakan untuk memahami:
- halaman yang dikunjungi,
- jalur navigasi,
- penggunaan fitur,
- performa halaman.

Analytics tidak boleh mengorbankan:
- privacy,
- performance,
- simplicity.

---

## 33. Roadmap

### Phase 1 — Foundation

- [x] Core website
- [x] Garden
- [x] Flower pages
- [x] Gardener data
- [x] Data validation
- [x] Internal maturation tool

### Phase 2 — Quality

- [ ] comprehensive accessibility audit
- [ ] performance optimization
- [ ] SEO strategy
- [ ] automated data validation
- [ ] automated broken-reference checking
- [ ] asset audit automation

### Phase 3 — Experience

Potential:
- improved flower discovery
- improved storytelling
- richer Gardener profiles
- refined transitions
- deeper reflection experience

### Phase 4 — Scale

Jika diperlukan:
- larger flower dataset
- more Gardener entries
- stronger content management
- automated deployment validation
- structured database/backend

Tidak ada fitur Phase 3/4 yang boleh mengorbankan filosofi inti Sunday Garden.

---

## 34. Project Governance

Setiap perubahan besar harus menjawab:

### Why?
Mengapa fitur ini diperlukan?

### Who?
Siapa yang menggunakannya?

### What?
Apa yang berubah?

### Impact?
Apa yang terdampak?

### Data?
Apakah schema berubah?

### UX?
Apakah user flow berubah?

### Technical?
Apakah architecture berubah?

### Cleanup?
Apakah ada code/asset lama yang harus dihapus?

---

## 35. AI / Vibe Coding Rules

AI digunakan sebagai development assistant, bukan sebagai pengganti product reasoning.

Setiap AI-generated change harus diperiksa terhadap:

```text
Requirement
↓
Existing architecture
↓
Existing data
↓
Existing UI
↓
Security
↓
Accessibility
↓
Performance
↓
Dead code
```

AI tidak boleh:
- membuat fitur yang tidak diminta,
- mengubah schema tanpa alasan,
- menghapus history,
- mengarang personal story,
- mengganti existing architecture hanya karena ada pendekatan baru,
- membuat duplicate utility,
- menambahkan dependency tanpa kebutuhan.

Setelah AI melakukan perubahan:

```text
AI change
↓
Review diff
↓
Run validation
↓
Run tests
↓
Inspect UI
↓
Audit unused code
↓
Commit
```

---

## 36. Change Log

Setiap perubahan penting dicatat.

Format:

```text
## YYYY-MM-DD

### Added
-

### Changed
-

### Fixed
-

### Removed
-

### Data
-

### Notes
-
```

---

## 37. Product Success

Sunday Garden berhasil apabila:

1. Visitor dapat memahami konsep tanpa penjelasan panjang.
2. Visitor dapat menjelajah bunga dengan mudah.
3. Setiap Gardener memiliki ruang untuk menyampaikan cerita personalnya.
4. Informasi botani dan interpretasi personal tidak tercampur.
5. Data dapat berkembang tanpa merusak data lama.
6. Website tetap ringan dan mudah dipelihara.
7. Visual terasa seperti sebuah garden/journal, bukan database.
8. Sistem membantu orang **menemukan makna**, bukan menentukan makna untuk mereka.

---

## 38. North Star

Semua keputusan produk dapat kembali kepada satu pertanyaan:

> **“Apakah ini membantu bunga menjadi jalan menuju cerita manusia, atau justru membuat bunga menjadi pusatnya?”**

Jika jawabannya yang kedua, reconsider.

---

## 39. Core Statement

> **The flower is the question; the person is the answer.**

> **Different flowers. Different stories. One garden.**

> **Everyone blooms in their own way.**

Sunday Garden bukan tentang menemukan bunga yang “paling cocok”.

Sunday Garden adalah tentang menemukan cerita yang mungkin selama ini sulit diucapkan—lalu memberinya tempat untuk tumbuh.
