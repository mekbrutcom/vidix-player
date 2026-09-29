/**
 * Mini i18n dictionary: just the keys the shell skeleton needs for first paint.
 *
 * Ported verbatim from scaffold-design/vidix-player.js:454-507. The full bundle
 * replaces this with the complete ~50-locale table (see full.ts) via
 * `Object.assign(I18N, ...)`, and translate() reads the map per call, so labels
 * are correct right after the swap without a re-render.
 */

/* eslint-disable */
// biome-ignore format: verbatim port */
export const MINI_I18N: Record<string, Record<string, string>> = {
  en: {
    share: "Share",
    server: "Server {n}",
    download: "Download",
    sharePage: "Share this video page",
    serverSr: "Choose a video server",
    controls: "Video player controls",
    primaryActions: "Primary actions",
  },
  id: { share: "Bagikan", download: "Unduh" },
  es: { share: "Compartir", server: "Servidor {n}", download: "Descargar" },
  es_419: { share: "Compartir", server: "Servidor {n}", download: "Descargar" },
  es_mx: { share: "Compartir", server: "Servidor {n}", download: "Descargar" },
  fr: { share: "Partager", server: "Serveur {n}", download: "Télécharger" },
  pt_br: { share: "Compartilhar", server: "Servidor {n}", download: "Baixar" },
  pt_pt: { share: "Partilhar", server: "Servidor {n}", download: "Descarregar" },
  ca: { share: "Comparteix", server: "Servidor {n}", download: "Baixa" },
  it: { share: "Condividi", download: "Scarica" },
  ro: { share: "Distribuie", download: "Descarcă" },
  de: { share: "Teilen", download: "Herunterladen" },
  de_at: { share: "Teilen", download: "Herunterladen" },
  nl: { share: "Delen", download: "Downloaden" },
  sv: { share: "Dela", download: "Ladda ner" },
  da: { share: "Del" },
  no: { share: "Del", download: "Last ned" },
  fi: { share: "Jaa", server: "Serveri {n}", download: "Lataa" },
  is: { share: "Deila", server: "Pjónn {n}", download: "Sækja" },
  ru: { share: "Поделиться", server: "Сервер {n}", download: "Скачать" },
  uk: { share: "Поділитися", server: "Сервер {n}", download: "Завантажити" },
  pl: { share: "Udostępnij", server: "Serwer {n}", download: "Pobierz" },
  cs: { share: "Sdílet", download: "Stáhnout" },
  sk: { share: "Zdieľať", download: "Stiahnuť" },
  bg: { share: "Сподели", server: "Сървър {n}", download: "Изтегли" },
  sr: { share: "Подели", server: "Сервер {n}", download: "Преузми" },
  hr: { share: "Podijeli", server: "Poslužitelj {n}", download: "Preuzmi" },
  sl: { share: "Deli", server: "Strežnik {n}", download: "Prenesi" },
  lv: { share: "Kopīgot", server: "Serveris {n}", download: "Lejupielādēt" },
  lt: { share: "Dalintis", server: "Serveris {n}", download: "Atsisiųsti" },
  et: { share: "Jaga", download: "Laadi alla" },
  el: { share: "Κοινοποίηση", server: "Διακομιστής {n}", download: "Λήψη" },
  tr: { share: "Paylaş", server: "Sunucu {n}", download: "İndir" },
  ja: { share: "共有", server: "サーバー {n}", download: "ダウンロード" },
  ko: { share: "공유", server: "서버 {n}", download: "다운로드" },
  zh: { share: "分享", server: "服务器 {n}", download: "下载" },
  zh_cn: { share: "分享", server: "服务器 {n}", download: "下载" },
  zh_tw: { share: "分享", server: "伺服器 {n}", download: "下載" },
  zh_hk: { share: "分享", server: "伺服器 {n}", download: "下載" },
  th: { share: "แชร์", server: "เซิร์ฟเวอร์ {n}", download: "ดาวน์โหลด" },
  vi: { share: "Chia sẻ", server: "Máy chủ {n}", download: "Tải xuống" },
  hi: { share: "साझा करें", server: "सर्वर {n}", download: "डाउनलोड" },
  ms: { share: "Kongsi", server: "Pelayan {n}", download: "Muat turun" },
  fil: { share: "Ibahagi", download: "I-download" },
};
