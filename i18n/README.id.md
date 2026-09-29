<p align="center">
  <img src="../.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# Vidix Player

Vidix Player adalah library komponen siap pakai untuk video player dari platform Vidix. Memiliki banyak bahasa, tombol bagikan, pemilihan server otomatis yang dapat Anda atur jumlahnya, serta tombol unduh yang muncul otomatis jika pengaturan di platform Vidix Anda mengaktifkannya.
Semua dapat diatur dari atribut HTML atau props framework yang tersedia.

Daftar akun Vidix dan mulai unggah konten: [Platform Vidix](https://vidix.mekbrut.com)

## Bahasa

Dokumentasi ini tersedia dalam bahasa berikut:

- [English (EN)](../README.md)
- [Español (ES)](./README.es.md)
- [Français (FR)](./README.fr.md)
- [हिन्दी (HI)](./README.hi.md)
- [Indonesia (ID)](./README.id.md)
- [Português (PT)](./README.pt.md)
- [Русский (RU)](./README.ru.md)
- [ไทย (TH)](./README.th.md)
- [Tiếng Việt (VI)](./README.vi.md)
- [中文 (ZH)](./README.zh.md)

## Daftar isi

- [Untuk pemilik situs (termasuk developer)](#untuk-pemilik-situs-termasuk-developer)
  - [Cara penggunaan pada situs Anda](#cara-penggunaan-pada-situs-anda)
    - [Vanilla JS](#vanilla-js)
      - [Bahasa yang didukung](#bahasa-yang-didukung)
    - [React](#react)
    - [Astro](#astro)
    - [Svelte / Kit](#svelte--kit)
    - [Iframe manual](#iframe-manual)
  - [Advance](#advance)
  - [Pemecahan masalah](#pemecahan-masalah)
- [Transparansi dan toleransi](#transparansi-dan-toleransi)
- [Berkontribusi ke repositori](#berkontribusi-ke-repositori)
- [Laporkan bug dan celah keamanan](#laporkan-bug-dan-celah-keamanan)

---

## Untuk pemilik situs (termasuk developer)

Vidix Player terintegrasi penuh dengan banyak framework. Silakan gunakan
komponen yang kompatibel dengan situs Anda.

### Cara penggunaan pada situs Anda

### Vanilla JS

Cocok untuk HTML native, PHP, dan lingkungan lain yang tidak berjalan di
Node.js / JavaScript bundler.

#### Script hosted

Tempatkan script ini di dalam `<head>...</head>` pada halaman yang ingin
menampilkan `vidix-player`:

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>
```

#### Komponen vidix-player

```html
<vidix-player
  playback-id="tUVARXFmPnT"
  lang=""
  accent-color=""
  layout-control-position=""
  layout-control-accent=""
  metadata-server-title="true"
  metadata-video-title=""
  metadata-thumbnail-url="https://....png"
  control-share="true"
  control-server-count="3"
  control-download="true"
  loading=""
  role=""
  aria-label="Video player"
></vidix-player>
```

#### Atribut

| Prop/attr                  | Required | Type        | Default              | Deskripsi                                                                                                          |
| -------------------------- | -------- | ----------- | -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `playback-id`              | **Ya**   | string      | —                    | ID video yang dihasilkan dari unggahan video Anda di platform Vidix, mis. `tUVARXFmPnT`. Tanpa ini pemutar tidak merender apa pun.                                 |
| `lang`                     | Tidak    | string      | `<html lang>`, `en`  | Bahasa antarmuka, mis. `id`, `en`, `es_419`, `zh_tw`, `vi`. Daftar lengkap: [Bahasa yang didukung](#bahasa-yang-didukung). Nilai tak dikenal jatuh ke `<html lang>`, lalu `en`. |
| `accent-color`             | Tidak    | string      | (bawaan tema)        | Warna aksen pemutar. Salah satu: `vidix`, `default`, `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`. Nilai lain diabaikan. |
| `layout-control-position`  | Tidak    | string      | `bottom`             | Posisi control bar: `bottom` atau `top`.                                                                            |
| `layout-control-accent`    | Tidak    | string      | (bawaan tema)        | Warna aksen tombol di control bar (tombol bagikan, pemilihan server, dan unduh). Daftar nilai sama dengan `accent-color`.                                          |
| `control-share`            | Tidak    | boolean     | `true`               | Tampilkan tombol share + dialog share-nya. Tautan yang di bagikan merupakan tautan situs Anda, bukan tautan video langsung atau tautan embed.                                                                          |
| `control-server-count`     | Tidak    | number      | `3`                  | Jumlah server di menu pilihan server. Rentang `0`–`10`; menu baru tampil saat `≥ 2`.                                 |
| `control-download`         | Tidak    | boolean     | `true`               | Tampilkan tombol unduh video. Tombol dapat secara otomatis hilang jika Anda mengatur tidak dapat di download di pengaturan platform Vidix walaupun Anda set `true`.                                                                                       |
| `metadata-video-title`     | Tidak    | string      | —                    | Judul video untuk aksesibilitas (label `aria`) dan tombol unduh.                                                     |
| `metadata-thumbnail-url`   | Tidak    | string (URL)| —                    | URL gambar thumbnail/poster. Dipakai sebagai blur-up sebelum video siap.                                             |
| `metadata-server-title`    | Tidak    | boolean     | `true`               | Tampilkan nama/judul yang diberikan server di pemutar. Set `"false"` untuk menyembunyikan.                                          |
| `loading`                  | Tidak    | string      | (browser default)    | Kapan memuat iframe pemutar: `eager` (segera) atau `lazy` (saat hampir terlihat). Nilai lain diabaikan.              |
| `console-log`              | Tidak    | boolean     | `false`              | Set `"true"` untuk mencatat pesan diagnostik di console DevTools. Aktifkan jika Anda memiliki masalah integrasi, masalah akan terlihat di console DevTools secara jelas.                                                   |
| `role`, `aria-label`       | Tidak    | —           | —                    | Atribut aksesibilitas HTML standar; diteruskan apa adanya.                                                           |

#### Bahasa yang didukung

Pemutar mengenali **71 kode locale** untuk 37 bahasa. Kode dapat ditulis dengan
tanda hubung atau garis bawah (`en-GB` diperlakukan sama dengan `en_gb`) dan
tidak peka huruf besar/kecil.

| Bahasa                    | Kode `lang`                                  |
| ------------------------- | -------------------------------------------- |
| Nederlands (Belanda)      | `nl`                                         |
| Български (Bulgaria)      | `bg`                                         |
| Català (Catalan)          | `ca`                                         |
| 中文 (Cina)                | `zh`, `zh_cn`, `zh_hk`, `zh_tw`              |
| Čeština (Cheska)          | `cs`                                         |
| Dansk (Denmark)           | `da`                                         |
| English                   | `en`, `en_au`, `en_ca`, `en_gb`, `en_ie`, `en_in`, `en_sg`, `en_za` |
| Eesti (Estonia)           | `et`                                         |
| Filipino                  | `fil`                                        |
| Suomi (Finlandia)         | `fi`                                         |
| हिन्दी (Hindi)             | `hi`                                         |
| Magyar (Hungaria)         | `hu` _(sementara teks Inggris)_              |
| Bahasa Indonesia          | `id`                                         |
| Íslenska (Islandia)       | `is`                                         |
| Italiano (Italia)         | `it`                                         |
| 日本語 (Jepang)            | `ja`                                         |
| Deutsch (Jerman)          | `de`, `de_at`                                |
| 한국어 (Korea)              | `ko`                                         |
| Latviešu (Latvia)         | `lv`                                         |
| Lietuvių (Lituania)       | `lt`                                         |
| Bahasa Melayu             | `ms`                                         |
| Norsk (Norwegia)          | `no`                                         |
| Polski (Polandia)         | `pl`                                         |
| Português (Portugis)      | `pt` _(sementara teks Inggris)_, `pt_br`, `pt_pt` |
| Français (Prancis)        | `fr`, `fr_ca`, `fr_ch`                       |
| Română (Rumania)          | `ro`                                         |
| Русский (Rusia)           | `ru`                                         |
| Српски (Serbia)           | `sr`                                         |
| Slovenčina (Slovakia)     | `sk`                                         |
| Slovenščina (Slovenia)    | `sl`                                         |
| Español (Spanyol)         | `es`, `es_419`, `es_ar`, `es_cl`, `es_co`, `es_cr`, `es_do`, `es_ec`, `es_sv`, `es_gt`, `es_hn`, `es_mx`, `es_ni`, `es_pa`, `es_pe`, `es_pr`, `es_py`, `es_us`, `es_uy`, `es_ve` |
| Svenska (Swedia)          | `sv`                                         |
| ไทย (Thailand)            | `th`                                         |
| Türkçe (Turki)            | `tr`                                         |
| Українська (Ukraina)      | `uk`                                         |
| Tiếng Việt (Vietnam)      | `vi`                                         |
| Ελληνικά (Yunani)         | `el`                                         |

Catatan:

- Varian region tanpa kamus sendiri (mis. `en_gb`, `es_mx`, `fr_ca`) otomatis
  memakai kamus bahasa dasarnya.
- Kode yang belum memiliki kamus sendiri (`hu`, `pt`) untuk sementara menampilkan
  teks Inggris. Gunakan varian regionnya (`pt_br`/`pt_pt`) untuk mendapatkan teks
  bahasa tersebut.
- Kode di luar daftar di atas jatuh ke `<html lang>`, lalu ke `en`.

### React

#### Install

```bash
# npm
npm install @mekbrut-com/vidix-player-react
```
```bash
# pnpm
pnpm add @mekbrut-com/vidix-player-react
```
```bash
# yarn
yarn add @mekbrut-com/vidix-player-react
```
```bash
# bun
bun add @mekbrut-com/vidix-player-react
```

Membutuhkan setidaknya React 18 atau 19 sebagai peer dependency; core (`@mekbrut-com/vidix-player`) dan
helper bersama datang sebagai dependencies.

#### Pasang komponen

```tsx
import { VidixPlayer } from "@mekbrut-com/vidix-player-react";

export function Page() {
  return (
    <VidixPlayer
      playbackId="tUVARXFmPnT"
      lang="en"
      accentColor="green"
      layout={{
        controlPosition: "bottom",
        controlAccent: "red"
      }}
      metadata={{
        videoTitle: "My video",
        thumbnailUrl: "https://....png",
        serverTitle: true,
      }}
      control={{
        share: true,
        serverCount: 3,
        download: true
      }}
      loading="eager"
      consoleLog={true}
      role="region"
      ariaLabel="Video player"
    />
  );
}
```

#### Props

| Prop                       | Atribut                 | Type                  | Default             | Deskripsi                                                     |
| -------------------------- | ----------------------- | --------------------- | ------------------- | ------------------------------------------------------------- |
| `playbackId`               | `playback-id`           | `string`              | —                   | ID video. Wajib.                                              |
| `lang`                     | `lang`                  | `string`              | `<html lang>` / `en`| Bahasa UI; 71 kode locale didukung — [daftar lengkap](#bahasa-yang-didukung). |
| `accentColor`              | `accent-color`          | `AccentColor`         | —                   | Warna aksen UI.                                               |
| `loading`                  | `loading`               | `"eager"` \| `"lazy"` | —                   | Perilaku muat iframe/blur-up.                                 |
| `consoleLog`               | `console-log`           | `boolean`             | `false`             | Catat diagnostik `[vidix-player]` ke console. Dev-only.       |
| `lqip`                     | _wrapper-only_          | `boolean`             | `true`              | Tampilkan placeholder blur-up (lihat [Advance](#advance)).    |
| **`metadata`**             |                         |                       |                     |                                                               |
| `metadata.videoTitle`      | `metadata-video-title`  | `string`              | —                   | Judul iframe, label unduh, teks share.                        |
| `metadata.thumbnailUrl`    | `metadata-thumbnail-url`| `string`              | —                   | Poster yang dipakai sebagai placeholder blur-up. URL http(s) absolut. |
| `metadata.thumbnailLqip`   | _wrapper-only_          | `string`              | —                   | Placeholder eksplisit; menimpa `thumbnailUrl` untuk blur-up.  |
| `metadata.serverTitle`     | `metadata-server-title` | `boolean`             | `true`              | Gunakan judul dari respons server.                            |
| **`layout`**               |                         |                       |                     |                                                               |
| `layout.controlPosition`   | `layout-control-position`   | `"bottom"` \| `"top"` | `"bottom"`      | Posisi control bar.                                           |
| `layout.controlAccent`     | `layout-control-accent`     | `AccentColor`         | —               | Warna aksen tombol control bar (independen dari `accentColor`). |
| **`control`**              |                         |                       |                     |                                                               |
| `control.share`            | `control-share`         | `boolean`             | `true`              | Tampilkan tombol share + dialog.                              |
| `control.serverCount`      | `control-server-count`  | `number`              | `3`                 | Server di selector, clamp `0`–`10`; tampil saat `2`+.         |
| `control.download`         | `control-download`      | `boolean`             | `true`              | Tampilkan tombol unduh (server masih bisa menyembunyikannya). |
| **events**                 |                         |                       |                     |                                                               |
| `onServerData`             | `vidix:server-data`     | `(detail) => void`    | —                   | Terpicu dengan `{ serverCount }` saat daftar server ter-resolve. |
| `onServerSelect`           | `vidix:server-select`   | `(detail) => void`    | —                   | Terpicu dengan `{ value }` saat user memilih server.          |

### Astro

Wrapper Astro merender kerangka (skeleton) Declarative Shadow DOM di server:
box 16:9 + critical CSS sudah ada **sebelum JavaScript dimuat**, sehingga
perpindahan layout (CLS) saat hidrasi ~0.

#### Install

```bash
# npm
npm install @mekbrut-com/vidix-player-astro
```
```bash
# pnpm
pnpm add @mekbrut-com/vidix-player-astro
```
```bash
# yarn
yarn add @mekbrut-com/vidix-player-astro
```
```bash
# bun
bun add @mekbrut-com/vidix-player-astro
```

Membutuhkan Astro 4+ sebagai peer dependency.

#### Pasang komponen

```astro
---
import { VidixPlayer } from "@mekbrut-com/vidix-player-astro";
---

<VidixPlayer
  playbackId="tUVARXFmPnT"
  lang="en"
  accentColor=""
  layout={{
    controlPosition: "bottom",
    controlAccent: "red"
  }}
  metadata={{
    videoTitle: "My videos",
    thumbnailUrl: "https://....jpg",
    serverTitle: true,
  }}
  control={{
    share: true,
    serverCount: 3,
    download: true
  }}
  loading="eager"
  consoleLog={true}
  role="region"
  ariaLabel="Video player"
/>
```

#### Props

Daftar prop sama dengan [React](#props), kecuali bahwa Astro tidak memiliki prop
event `onServerData` / `onServerSelect`. Pasang listener sendiri di script sisi
klien bila Anda memerlukannya:

```astro
<script>
  document.querySelector("vidix-player")?.addEventListener("vidix:server-data", (event) => {
    console.log("servers:", event.detail.serverCount);
  });
</script>
```

### Svelte / Kit

#### Install

```bash
# npm
npm install @mekbrut-com/vidix-player-svelte
```
```bash
# pnpm
pnpm add @mekbrut-com/vidix-player-svelte
```
```bash
# yarn
yarn add @mekbrut-com/vidix-player-svelte
```
```bash
# bun
bun add @mekbrut-com/vidix-player-svelte
```

Membutuhkan Svelte 5 sebagai peer dependency.

#### Pasang komponen

```svelte
<script lang="ts">
  import { VidixPlayer } from "@mekbrut-com/vidix-player-svelte";
</script>

<VidixPlayer
  playbackId="tUVARXFmPnT"
  lang="en"
  accentColor="green"
  layout={{
    controlPosition: "bottom",
    controlAccent: "red"
  }}
  metadata={{
    videoTitle: "My video",
    thumbnailUrl: "https://....png",
    serverTitle: true,
  }}
  control={{
    share: true,
    serverCount: 3,
    download: true
  }}
  loading="eager"
  onServerData={(detail) => console.log("servers:", detail.serverCount)}
/>
```

#### Props

Daftar prop dan event sama dengan [React](#props) (Svelte 5 memakai callback
prop `onServerData` / `onServerSelect`, bukan `createEventDispatcher` yang sudah
deprecated).

### Iframe manual

Iframe manual adalah iframe semantik HTML biasa, sehingga hanya memiliki satu server, yaitu server yang Anda pilih di platform Vidix.

Tag iframe ini diberikan atau dihasilkan oleh platform Vidix dari video yang Anda unggah — cukup salin dari platform Vidix dan sematkan di situs Anda:

```html
<iframe
  src="https://..."
  title="Example videos"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

---

## Advance

**Aturan boolean pada Vanilla JS:** atribut boolean cukup dituliskan namanya
(atau `="true"`) untuk mengaktifkan, dan `="false"` untuk mematikan. Contoh:
`control-share="false"`.

**Props adalah konfigurasi saat mount.** Core membaca atribut sekali di
`connectedCallback` (tidak ada `observedAttributes`), jadi mengubah props setelah
mount tidak memperbarui pemutar yang sedang jalan. Beri `key` (React/Svelte) atau
remount elemen saat konfigurasi harus berubah:

```svelte
{#key playbackId}
  <VidixPlayer {playbackId} />
{/key}
```

**Tema terang/gelap**

Pemutar mengikuti tema halaman secara otomatis, tanpa atribut tambahan:

- Jika `<html data-theme="dark">` (atau class `dark`) ada → mode gelap.
- Jika `<html data-theme="light">` (atau class `light`) ada → mode terang.
- Jika tidak ada → mengikuti `prefers-color-scheme` sistem pengguna.

**Catatan keamanan (CSP / Trusted Types)**

Pemutar dirancang ramah CSP ketat:

- **Tanpa `eval`, tanpa inline event handler** — aman di `script-src` ketat.
- **Style dipasang via `adoptedStyleSheets`**, bukan tag `<style>` injeksi —
  kompatibel dengan `style-src` tanpa `'unsafe-inline'`.
- Bila situs Anda menerapkan `require-trusted-types-for 'script'`, tambahkan nama
  policy **`vidix-player`** ke allowlist `trusted-types` Anda. Tanpa nama
  tersebut, pemutar tidak bisa merender di bawah CSP tersebut.

## Pemecahan masalah

- **Pemutar tidak tampil sama sekali** — periksa `playback-id` (wajib diisi) dan
  aktifkan `console-log="true"` untuk melihat pesan di DevTools.
- **Control bar hilang** — control bar tampil hanya jika minimal satu dari
  `control-share`, `control-server-count` (≥ 2), atau `control-download` aktif.
- **Tema tidak cocok** — pastikan tidak ada `data-theme` konflik di tag lain;
  pemutar membaca tema dari elemen `<html>`.

---

## Transparansi dan toleransi

### Batas permintaan (rate limit): 20 req/menit per IP penonton

Kami membatasi setiap pengunjung situs Anda dapat melihat video muncul maksimal
20× per menit. 20 kali per menit sudah sangat besar — 4 sampai 5 kali lebih besar
dari penggunaan umum. Biasanya, lebih dari 20 kali per menit adalah bot atau
otomasi yang menyerang situs Anda.

Penghitungan berbasis IP penonton. Sebagai contoh, penonton A (manusia),
penonton B (bot penyerang), dan C (crawler search engine):

- Penonton B (bot penyerang) melakukan scrape untuk mengambil video secara
  masif → backend Vidix Player memblokirnya.
- Penonton A (manusia) dan C (crawler search engine) tetap bisa mengakses tanpa
  gangguan sedikit pun.

Secara tidak langsung, ini melindungi video Anda dari bot (yang biasanya
berarti pencuri konten), sekaligus menjaga backend Vidix Player tetap berjalan normal (agar tidak down karena penyerang).

### Infrastruktur, bahasa backend, dan edge

**Infrastruktur berjalan di Uni Eropa.** Semua pemrosesan backend sepenuhnya
berjalan dan diolah di wilayah Uni Eropa dengan membagi beban permintaan. Ini
salah satu alasan Vidix menjadi pilihan aman dan cepat.

**Bahasa backend.** Kami terbuka bahwa kami menggunakan beberapa bahasa backend
sekaligus agar layanan ini tetap optimal:

- **Rust** — sekitar 60% untuk API.
- **Go** — sekitar 25%, membantu Rust mengolah data karena membutuhkan garbage collector dan kecepatan compiler-nya.
- **Python** — sekitar 10% untuk otomatisasi di balik layar.
- **Shell** — sisanya untuk menjalankan infrastruktur, cron, dan kebutuhan lain agar koneksi tetap aktif.

**Jaringan edge.** Kami menggunakan layanan edge dari beberapa penyedia: salah satu lulusan startup YCombinator yang tidak ingin disebutkan, Cloudflare, AWS, Akamai, Oracle, dan IBM.

Kami tidak menggunakan GCP untuk sementara waktu karena kami tidak ingin
pengelolaan jaringan disentuh AI (Gemini). Sebenarnya bisa diatur, namun kami memilih untuk tidak menggunakannya sementara, agar GDPR Vidix selalu dapat berjalan tanpa campur tangan pihak lain.

---

## Berkontribusi ke repositori

Kami sangat terbantu jika Anda membantu pengembangan Vidix Player. Silakan
pull request. Terima kasih telah membantu kami mengembangkan library komponen ini!

Belum yakin untuk mulai berkontribusi? Berikut peta Anda.

### Peta kode (code-tree)

```
vidix-player/
├── packages/
│   ├── vidix-player/          core library (source of truth; TypeScript)
│   ├── vidix-player-shared/   prop/attribute/image helper bersama untuk wrapper
│   ├── vidix-player-astro/    wrapper Astro (SSR skeleton, zero layout shift)
│   ├── vidix-player-react/    wrapper React (SSR-friendly, "use client")
│   └── vidix-player-svelte/   wrapper Svelte 5 (SSR-friendly, source-shipping)
├── e2e/                       Playwright tests + fixtures (tidak dipublikasikan)
│   ├── astro-app/             halaman parity Astro
│   ├── react-app/             halaman parity React (Vite SSR)
│   ├── svelte-app/            halaman parity Svelte (Vite SSR)
│   ├── vanillajs-app/         halaman parity vanilla JS (QA manual)
│   └── tests/                 parity specs
├── biome.json                 lint + format config
├── tsconfig.base.json         base TypeScript config
└── pnpm-workspace.yaml        workspace definition
```

Untuk lingkungan development, Anda membutuhkan Node.js 18+ dan
[pnpm](https://pnpm.io):

```bash
pnpm install
pnpm build       # build semua package di packages/*
pnpm typecheck   # typecheck semua package
pnpm lint        # biome check
pnpm test:e2e    # Playwright parity tests (lihat ./e2e)
```

### Halaman uji per-framework (E2E)

Setiap wrapper memiliki halaman parity agar QA dan reviewer dapat
membandingkannya dengan core vanilla sebelum rilis:

| Page                          | How to run                                                       |
| ----------------------------- | ---------------------------------------------------------------- |
| Vanilla (`e2e/vanillajs-app`) | `pnpm --filter vidix-player-vanillajs-e2e run preview` → `:3713` |
| Astro (`e2e/astro-app`)       | `pnpm --filter vidix-player-astro-e2e run preview` → `:3712`      |
| React (`e2e/react-app`)       | `pnpm --filter vidix-player-react-e2e run preview` → `:3714`      |
| Svelte (`e2e/svelte-app`)     | `pnpm --filter vidix-player-svelte-e2e run preview` → `:3715`      |

Keempat halaman merender dua player yang sama (accent, posisi control, dan
bahasa berbeda) sehingga core vanilla dan setiap wrapper dapat dibandingkan
berdampingan. Halaman vanilla memakai core yang sudah di-build persis seperti tag
CDN (`/dist/vidix-player.js`); halaman React dan Svelte menguji jalur SSR +
hidrasi (hanya atribut di HTML server — tidak ada Declarative Shadow DOM, yang
tidak bisa dihidrasi React maupun Svelte). Parity otomatis ada di `e2e/tests`:

- `pnpm test:e2e` menjalankan keempat project Playwright (`chromium` untuk
  vanilla, `astro`, `react`, dan `svelte` untuk wrapper) dan memastikan:
  vanilla/Astro mengirim skeleton sebelum JavaScript (wrapper Astro via
  Declarative Shadow DOM), wrapper React dan Svelte mengirim elemen telanjang
  dengan atribut tanpa DSD, geometri mempertahankan invarian box 16:9 +
  control bar di setiap kasus, dan iframe, share dialog, serta server select
  semuanya berfungsi setelah hidrasi.

`csp-tt.spec.ts` vanilla menjadi gate strict-CSP; wrapper Astro meng-inline
critical CSS di skeleton SSR-nya, jadi ia tidak memeriksa strict CSP (lihat
`packages/vidix-player-astro/README.md`).

> Anda boleh menggunakan AI untuk memahami kode dan melakukan perbaikan. Merge dilakukan setelah push Anda direview oleh tim Vidix atau collaborator OSS tepercaya.

---

## Laporkan bug dan celah keamanan

Menemukan bug? Silakan [open issue](https://github.com/mekbrutcom/vidix-player/issues).

Menemukan celah keamanan? [Laporkan secara privat](https://mekbrut.com/contact/bug-report).

Untuk celah keamanan, **jangan open issue secara publik**. Hubungi kami melalui
tautan "Laporkan secara privat" di atas atau melalui email yang tercantum di profil github ini. Kami akan meneruskan ke tim keamanan untuk
memperbaikinya secepat mungkin.

---

## Lisensi

Apache License 2.0 — lihat [LICENSE](../LICENSE).
