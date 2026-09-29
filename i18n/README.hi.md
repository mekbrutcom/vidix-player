<p align="center">
  <img src="../.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# Vidix Player

Vidix Player Vidix प्लेटफ़ॉर्म के वीडियो प्लेयर के लिए एक उपयोग के लिए तैयार कंपोनेंट लाइब्रेरी है। इसमें कई भाषाएँ, एक शेयर बटन, अपने-आप सर्वर चयन (जिसकी संख्या आप सेट कर सकते हैं), और एक डाउनलोड बटन है जो अपने-आप दिखता है अगर आपकी Vidix प्लेटफ़ॉर्म सेटिंग में यह चालू है।
सब कुछ HTML एट्रिब्यूट्स या उपलब्ध फ्रेमवर्क props से कॉन्फ़िगर किया जा सकता है।

Vidix खाता बनाएं और कंटेंट अपलोड करना शुरू करें: [Vidix प्लेटफ़ॉर्म](https://vidix.mekbrut.com)

## भाषाएँ

यह डॉक्यूमेंटेशन निम्नलिखित भाषाओं में उपलब्ध है:

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

## विषय सूची

- [साइट स्वामियों के लिए (डेवलपर्स सहित)](#साइट-स्वामियों-के-लिए-डेवलपर्स-सहित)
  - [अपनी साइट पर इसका उपयोग करें](#अपनी-साइट-पर-इसका-उपयोग-करें)
    - [Vanilla JS](#vanilla-js)
      - [समर्थित भाषाएँ](#समर्थित-भाषाएँ)
    - [React](#react)
    - [Astro](#astro)
    - [Svelte / Kit](#svelte--kit)
    - [मैनुअल iframe](#मैनुअल-iframe)
  - [उन्नत](#उन्नत)
  - [समस्या निवारण](#समस्या-निवारण)
- [पारदर्शिता और सहनशीलता](#पारदर्शिता-और-सहनशीलता)
- [रिपॉजिटरी में योगदान दें](#रिपॉजिटरी-में-योगदान-दें)
- [बग और सुरक्षा भेद्यताएँ रिपोर्ट करें](#बग-और-सुरक्षा-भेद्यताएँ-रिपोर्ट-करें)

---

## साइट स्वामियों के लिए (डेवलपर्स सहित)

Vidix Player कई फ्रेमवर्क के साथ पूरी तरह इंटीग्रेट होता है। अपनी साइट के
कंपैटिबल कंपोनेंट का उपयोग करें।

### अपनी साइट पर इसका उपयोग करें

### Vanilla JS

नेटिव HTML, PHP, और ऐसे अन्य एनवायरनमेंट के लिए उपयुक्त जो Node.js /
JavaScript बंडलर पर नहीं चलते।

#### होस्टेड स्क्रिप्ट

इस स्क्रिप्ट को उस पेज के `<head>...</head>` में रखें जहाँ आप `vidix-player`
दिखाना चाहते हैं:

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>
```

#### vidix-player कंपोनेंट

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

#### एट्रिब्यूट्स

| Prop/attr                  | आवश्यक   | Type        | डिफ़ॉल्ट             | विवरण                                                                                                            |
| -------------------------- | -------- | ----------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `playback-id`              | **हाँ**  | string      | —                   | आपके वीडियो अपलोड से Vidix प्लेटफ़ॉर्म पर जनरेट किया गया वीडियो ID, जैसे `tUVARXFmPnT`। इसके बिना प्लेयर कुछ नहीं रेंडर करता। |
| `lang`                     | नहीं     | string      | `<html lang>`, `en` | इंटरफ़ेस भाषा, जैसे `id`, `en`, `es_419`, `zh_tw`, `vi`। पूरी सूची: [समर्थित भाषाएँ](#समर्थित-भाषाएँ)। अनजान वैल्यू `<html lang>` पर, फिर `en` पर गिरती हैं। |
| `accent-color`             | नहीं     | string      | (थीम डिफ़ॉल्ट)        | प्लेयर का एक्सेंट रंग। इनमें से एक: `vidix`, `default`, `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`। अन्य वैल्यू इग्नोर कर दी जाती हैं। |
| `layout-control-position`  | नहीं     | string      | `bottom`            | कंट्रोल बार की स्थिति: `bottom` या `top`।                                                                        |
| `layout-control-accent`    | नहीं     | string      | (थीम डिफ़ॉल्ट)        | कंट्रोल बार के बटनों का एक्सेंट रंग (शेयर बटन, सर्वर चयन, और डाउनलोड)। `accent-color` जैसी ही वैल्यू सूची।            |
| `control-share`            | नहीं     | boolean     | `true`              | शेयर बटन + उसका शेयर डायलॉग दिखाएँ। शेयर किया गया लिंक आपकी साइट का लिंक है, वीडियो का डायरेक्ट लिंक या एम्बेड लिंक नहीं। |
| `control-server-count`     | नहीं     | number      | `3`                 | सर्वर चयन मेनू में सर्वर की संख्या। रेंज `0`–`10`; मेनू `≥ 2` पर दिखता है।                                            |
| `control-download`         | नहीं     | boolean     | `true`              | वीडियो डाउनलोड बटन दिखाएँ। अगर आपने Vidix प्लेटफ़ॉर्म सेटिंग में डाउनलोड बंद किए हैं, तो बटन अपने-आप गायब हो सकता है, भले ही आप इसे `true` सेट करें। |
| `metadata-video-title`     | नहीं     | string      | —                   | एक्सेसिबिलिटी (`aria` लेबल) और डाउनलोड बटन के लिए वीडियो टाइटल।                                                    |
| `metadata-thumbnail-url`   | नहीं     | string (URL)| —                   | थंबनेल/पोस्टर इमेज URL। वीडियो तैयार होने से पहले blur-up प्लेसहोल्डर के रूप में इस्तेमाल।                              |
| `metadata-server-title`    | नहीं     | boolean     | `true`              | प्लेयर में सर्वर द्वारा दिया गया नाम/टाइटल दिखाएँ। छिपाने के लिए `"false"` सेट करें।                                  |
| `loading`                  | नहीं     | string      | (ब्राउज़र डिफ़ॉल्ट)   | प्लेयर iframe कब लोड करें: `eager` (तुरंत) या `lazy` (जब लगभग दिखने लगे)। अन्य वैल्यू इग्नोर कर दी जाती हैं।           |
| `console-log`              | नहीं     | boolean     | `false`             | DevTools कंसोल में डायग्नोस्टिक मैसेज लॉग करने के लिए इसे `"true"` सेट करें। अगर आपको इंटीग्रेशन समस्याएँ हैं तो इसे चालू करें — वे DevTools कंसोल में साफ दिखेंगी। |
| `role`, `aria-label`       | नहीं     | —           | —                   | स्टैंडर्ड HTML एक्सेसिबिलिटी एट्रिब्यूट्स; जैसा है वैसे ही पास किए जाते हैं।                                          |

#### समर्थित भाषाएँ

प्लेयर 37 भाषाओं के **71 locale कोड** पहचानता है। कोड हाइफ़न या अंडरस्कोर से
लिखे जा सकते हैं (`en-GB` को `en_gb` की तरह ट्रीट किया जाता है) और ये
केस-इनसेंसिटिव हैं।

| भाषा                     | `lang` कोड                                       |
| ------------------------ | ------------------------------------------------ |
| अंग्रेज़ी                 | `en`, `en_au`, `en_ca`, `en_gb`, `en_ie`, `en_in`, `en_sg`, `en_za` |
| आइसलैंडिक                | `is`                                             |
| इंडोनेशियाई              | `id`                                             |
| इतालवी                   | `it`                                             |
| एस्टोनियाई               | `et`                                             |
| कातालान                  | `ca`                                             |
| कोरियाई                  | `ko`                                             |
| चीनी                     | `zh`, `zh_cn`, `zh_hk`, `zh_tw`                  |
| चेक                      | `cs`                                             |
| जापानी                   | `ja`                                             |
| जर्मन                    | `de`, `de_at`                                    |
| डच                       | `nl`                                             |
| डैनिश                    | `da`                                             |
| तुर्की                   | `tr`                                             |
| थाई                      | `th`                                             |
| नॉर्वेजियाई              | `no`                                             |
| पुर्तगाली                | `pt` _(अभी के लिए अंग्रेज़ी टेक्स्ट)_, `pt_br`, `pt_pt` |
| पोलिश                    | `pl`                                             |
| फिनिश                    | `fi`                                             |
| फिलिपिनो                 | `fil`                                            |
| फ़्रेंच                   | `fr`, `fr_ca`, `fr_ch`                           |
| बल्गेरियाई               | `bg`                                             |
| मलय                      | `ms`                                             |
| यूक्रेनियाई               | `uk`                                             |
| यूनानी                   | `el`                                             |
| रूसी                     | `ru`                                             |
| रोमानियाई                | `ro`                                             |
| लातवियाई                 | `lv`                                             |
| लिथुआनियाई               | `lt`                                             |
| वियतनामी                 | `vi`                                             |
| सर्बियाई                 | `sr`                                             |
| स्पैनिश                  | `es`, `es_419`, `es_ar`, `es_cl`, `es_co`, `es_cr`, `es_do`, `es_ec`, `es_sv`, `es_gt`, `es_hn`, `es_mx`, `es_ni`, `es_pa`, `es_pe`, `es_pr`, `es_py`, `es_us`, `es_uy`, `es_ve` |
| स्लोवाक                  | `sk`                                             |
| स्लोवेनियाई              | `sl`                                             |
| स्वीडिश                  | `sv`                                             |
| हंगेरियाई                | `hu` _(अभी के लिए अंग्रेज़ी टेक्स्ट)_              |
| हिन्दी                   | `hi`                                             |

नोट:

- अपनी डिक्शनरी न होने वाले रीजनल वेरिएंट (जैसे `en_gb`, `es_mx`, `fr_ca`)
  अपने-आप बेस भाषा की डिक्शनरी इस्तेमाल करते हैं।
- जिन कोड की अभी अपनी डिक्शनरी नहीं है (`hu`, `pt`) वे अभी के लिए अंग्रेज़ी
  टेक्स्ट दिखाते हैं। उस भाषा का टेक्स्ट पाने के लिए उनके रीजनल वेरिएंट
  (`pt_br`/`pt_pt`) इस्तेमाल करें।
- ऊपर दी गई सूची के बाहर के कोड `<html lang>` पर, फिर `en` पर गिरते हैं।

### React

#### इंस्टॉल करें

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

peer dependency के रूप में React 18 या 19 चाहिए; core (`@mekbrut-com/vidix-player`) और
शेयर किए गए helpers dependencies के रूप में आते हैं।

#### कंपोनेंट माउंट करें

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

| Prop                       | Attribut                     | Type                  | डिफ़ॉल्ट             | विवरण                                                    |
| -------------------------- | ---------------------------- | --------------------- | ------------------- | -------------------------------------------------------- |
| `playbackId`               | `playback-id`                | `string`              | —                   | वीडियो ID। आवश्यक।                                        |
| `lang`                     | `lang`                       | `string`              | `<html lang>` / `en`| UI भाषा; 71 locale कोड समर्थित — [पूरी सूची](#समर्थित-भाषाएँ)। |
| `accentColor`              | `accent-color`               | `AccentColor`         | —                   | UI एक्सेंट रंग।                                            |
| `loading`                  | `loading`                    | `"eager"` \| `"lazy"` | —                   | iframe/blur-up लोडिंग व्यवहार।                            |
| `consoleLog`               | `console-log`                | `boolean`             | `false`             | `[vidix-player]` डायग्नोस्टिक्स कंसोल में लॉग करें। सिर्फ़ dev। |
| `lqip`                     | _wrapper-only_               | `boolean`             | `true`              | blur-up प्लेसहोल्डर दिखाएँ ([उन्नत](#उन्नत) देखें)।          |
| **`metadata`**             |                              |                       |                     |                                                          |
| `metadata.videoTitle`      | `metadata-video-title`       | `string`              | —                   | iframe टाइटल, डाउनलोड लेबल, शेयर टेक्स्ट।                  |
| `metadata.thumbnailUrl`    | `metadata-thumbnail-url`     | `string`              | —                   | blur-up प्लेसहोल्डर के रूप में इस्तेमाल पोस्टर। एब्सोल्यूट http(s) URL। |
| `metadata.thumbnailLqip`   | _wrapper-only_               | `string`              | —                   | एक्सप्लिसिट प्लेसहोल्डर; blur-up के लिए `thumbnailUrl` को ओवरराइड करता है। |
| `metadata.serverTitle`     | `metadata-server-title`      | `boolean`             | `true`              | सर्वर रिस्पॉन्स का टाइटल इस्तेमाल करें।                     |
| **`layout`**               |                              |                       |                     |                                                          |
| `layout.controlPosition`   | `layout-control-position`    | `"bottom"` \| `"top"` | `"bottom"`          | कंट्रोल बार की स्थिति।                                     |
| `layout.controlAccent`     | `layout-control-accent`      | `AccentColor`         | —                   | कंट्रोल बार बटनों का एक्सेंट रंग (`accentColor` से आज़ाद)।    |
| **`control`**              |                              |                       |                     |                                                          |
| `control.share`            | `control-share`              | `boolean`             | `true`              | शेयर बटन + डायलॉग दिखाएँ।                                  |
| `control.serverCount`      | `control-server-count`       | `number`              | `3`                 | सिलेक्टर में सर्वर, `0`–`10` क्लैम्प्ड; `2`+ पर दिखता है।     |
| `control.download`         | `control-download`           | `boolean`             | `true`              | डाउनलोड बटन दिखाएँ (सर्वर अभी भी इसे छिपा सकता है)।           |
| **events**                 |                              |                       |                     |                                                          |
| `onServerData`             | `vidix:server-data`          | `(detail) => void`    | —                   | सर्वर लिस्ट resolve होने पर `{ serverCount }` के साथ फ़ायर होता है। |
| `onServerSelect`           | `vidix:server-select`        | `(detail) => void`    | —                   | यूज़र जब सर्वर चुनता है तो `{ value }` के साथ फ़ायर होता है।   |

### Astro

Astro wrapper सर्वर पर Declarative Shadow DOM स्केलेटन रेंडर करता है: 16:9
बॉक्स + critical CSS **किसी भी JavaScript लोड होने से पहले** मौजूद रहते हैं,
इसलिए हाइड्रेशन पर लेआउट शिफ्ट (CLS) ~0 है।

#### इंस्टॉल करें

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

peer dependency के रूप में Astro 4+ चाहिए।

#### कंपोनेंट माउंट करें

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

props की सूची [React](#props) जैसी है, सिवाय इसके कि Astro में `onServerData` /
`onServerSelect` इवेंट props नहीं हैं। अगर ज़रूरत हो तो अपने खुद के listeners एक
क्लाइंट-साइड स्क्रिप्ट में लगाएँ:

```astro
<script>
  document.querySelector("vidix-player")?.addEventListener("vidix:server-data", (event) => {
    console.log("servers:", event.detail.serverCount);
  });
</script>
```

### Svelte / Kit

#### इंस्टॉल करें

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

peer dependency के रूप में Svelte 5 चाहिए।

#### कंपोनेंट माउंट करें

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

props और इवेंट की सूची [React](#props) जैसी है (Svelte 5 `onServerData` /
`onServerSelect` callback props इस्तेमाल करता है, डेप्रीकेटेड
`createEventDispatcher` नहीं)।

### मैनुअल iframe

मैनुअल iframe एक साधारण सिमेंटिक HTML iframe है, इसलिए इसमें सिर्फ़ एक सर्वर होता है: वह सर्वर जिसे आपने Vidix प्लेटफ़ॉर्म पर चुना।

यह iframe टैग Vidix प्लेटफ़ॉर्म आपके अपलोड किए गए वीडियो से देता या जनरेट करता है — इसे Vidix प्लेटफ़ॉर्म से कॉपी करें और अपनी साइट पर एम्बेड करें:

```html
<iframe
  src="https://..."
  title="Example videos"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

---

## उन्नत

**Vanilla JS में बूलियन नियम:** बूलियन एट्रिब्यूट्स सिर्फ़ नाम लिखने (या
`="true"`) से चालू होते हैं, और `="false"` से बंद। उदाहरण:
`control-share="false"`।

**props माउंट-टाइम कॉन्फ़िगरेशन हैं।** core एट्रिब्यूट्स को `connectedCallback`
में एक बार पढ़ता है (कोई `observedAttributes` नहीं), इसलिए माउंट के बाद props
बदलने से चल रहा प्लेयर अपडेट नहीं होता। जब कॉन्फ़िगरेशन बदलना ज़रूरी हो तो एक
`key` (React/Svelte) दें या एलिमेंट को फिर से माउंट करें:

```svelte
{#key playbackId}
  <VidixPlayer {playbackId} />
{/key}
```

**लाइट/डार्क थीम**

प्लेयर अपने-आप पेज का थीम फ़ॉलो करता है, बिना किसी अतिरिक्त एट्रिब्यूट के:

- अगर `<html data-theme="dark">` (या `dark` क्लास) मौजूद है → डार्क मोड।
- अगर `<html data-theme="light">` (या `light` क्लास) मौजूद है → लाइट मोड।
- अगर कोई नहीं है → यूज़र के सिस्टम `prefers-color-scheme` को फ़ॉलो करता है।

**सुरक्षा नोट्स (CSP / Trusted Types)**

प्लेयर सख़्त-CSP फ्रेंडली बनाया गया है:

- **कोई `eval` नहीं, कोई इनलाइन इवेंट हैंडलर नहीं** — सख़्त `script-src` में
  सुरक्षित।
- **स्टाइल्स `adoptedStyleSheets` से इंस्टॉल होते हैं**, इंजेक्टेड `<style>`
  टैग से नहीं — `'unsafe-inline'` के बिना `style-src` से कंपैटिबल।
- अगर आपकी साइट `require-trusted-types-for 'script'` लागू करती है, तो अपनी
  `trusted-types` एलाउलिस्ट में policy नाम **`vidix-player`** जोड़ें। उस नाम के
  बिना, प्लेयर उस CSP के नीचे रेंडर नहीं हो सकता।

## समस्या निवारण

- **प्लेयर बिल्कुल नहीं दिखता** — `playback-id` जाँचें (आवश्यक) और DevTools
  में मैसेज देखने के लिए `console-log="true"` चालू करें।
- **कंट्रोल बार गायब है** — कंट्रोल बार सिर्फ़ तभी दिखता है जब `control-share`,
  `control-server-count` (≥ 2), या `control-download` में से कम से कम एक एक्टिव
  हो।
- **थीम मैच नहीं करता** — सुनिश्चित करें कि किसी और टैग पर कोई टकराव वाला
  `data-theme` नहीं है; प्लेयर थीम `<html>` एलिमेंट से पढ़ता है।

---

## पारदर्शिता और सहनशीलता

### अनुरोध सीमा: प्रति दर्शक IP प्रति मिनट 20

हम आपकी साइट के हर विज़िटर को प्रति मिनट ज़्यादा से ज़्यादा 20× वीडियो दिखने
तक सीमित करते हैं। प्रति मिनट 20 बार पहले ही बहुत ज़्यादा है — आम इस्तेमाल से
4 से 5 गुना ज़्यादा। आमतौर पर, प्रति मिनट 20 से ज़्यादा बार कोई बॉट या
ऑटोमेशन है जो आपकी साइट पर हमला कर रहा है।

गिनती दर्शक के IP पर आधारित है। उदाहरण के लिए, दर्शक A (इंसान), दर्शक B
(हमलावर बॉट), और C (सर्च इंजन क्रॉलर):

- दर्शक B (हमलावर बॉट) बड़े पैमाने पर वीडियो निकालने के लिए स्क्रेप करता है →
  Vidix Player बैकएंड उसे ब्लॉक करता है।
- दर्शक A (इंसान) और C (सर्च इंजन क्रॉलर) बिना किसी रुकावट के एक्सेस कर
  सकते हैं।

अप्रत्यक्ष रूप से, यह आपके वीडियो को बॉट्स से बचाता है (जिसका मतलब आमतौर पर
कंटेंट चोर होता है), साथ ही Vidix Player बैकएंड को नॉर्मल चलाए रखता है (ताकि
किसी हमलावर की वजह से डाउन न हो)।

### इंफ्रास्ट्रक्चर, बैकएंड भाषाएँ और एज

**इंफ्रास्ट्रक्चर यूरोपीय संघ में चलता है।** सारा बैकएंड प्रोसेसिंग पूरी तरह
यूरोपीय संघ के रीजन में रिक्वेस्ट लोड-बैलेंस करके चलता और प्रोसेस होता है। यही
एक वजह है कि Vidix एक सुरक्षित और तेज़ विकल्प है।

**बैकएंड भाषाएँ।** हम खुले हैं कि हम इस सर्विस को ऑप्टिमल रखने के लिए एक साथ
कई बैकएंड भाषाएँ इस्तेमाल करते हैं:

- **Rust** — API के लिए करीब 60%।
- **Go** — करीब 25%, Rust को डेटा प्रोसेस करने में मदद करता है क्योंकि उसे
  गार्बेज कलेक्टर और उसके कंपाइलर की स्पीड चाहिए।
- **Python** — पर्दे के पीछे ऑटोमेशन के लिए करीब 10%।
- **Shell** — बाकी, इंफ्रास्ट्रक्चर, क्रॉन और दूसरी ज़रूरतों को चलाने के लिए
  ताकि कनेक्शन एक्टिव रहें।

**एज नेटवर्क।** हम कई प्रोवाइडर्स की एज सर्विसेज़ इस्तेमाल करते हैं: YCombinator
का एक स्टार्टअप ग्रेजुएट जो नाम नहीं लेना चाहता, Cloudflare, AWS, Akamai,
Oracle, और IBM।

हम फ़िलहाल GCP इस्तेमाल नहीं करते क्योंकि हम नहीं चाहते कि नेटवर्क
मैनेजमेंट AI (Gemini) द्वारा छुआ जाए। इसे कॉन्फ़िगर किया जा सकता था, लेकिन हम
अभी इसका इस्तेमाल न करना चुनते हैं, ताकि Vidix का GDPR हमेशा तीसरे पक्ष के
हस्तक्षेप के बिना चल सके।

---

## रिपॉजिटरी में योगदान दें

हमें Vidix Player डेवलप करने में आपकी मदद का बहुत स्वागत है। कृपया पुल
रिक्वेस्ट भेजें। इस कंपोनेंट लाइब्रेरी को डेवलप करने में मदद करने के लिए
धन्यवाद!

योगदान शुरू करने के बारे में निश्चित नहीं? यहाँ आपका नक्शा है।

### कोड मैप (code-tree)

```
vidix-player/
├── packages/
│   ├── vidix-player/          core लाइब्रेरी (सत्य का स्रोत; TypeScript)
│   ├── vidix-player-shared/   wrappers के लिए शेयर किए गए prop/attribute/image helpers
│   ├── vidix-player-astro/    Astro wrapper (SSR स्केलेटन, zero layout shift)
│   ├── vidix-player-react/    React wrapper (SSR-friendly, "use client")
│   └── vidix-player-svelte/   Svelte 5 wrapper (SSR-friendly, source-shipping)
├── e2e/                       Playwright टेस्ट + fixtures (पब्लिश नहीं किए गए)
│   ├── astro-app/             Astro parity पेज
│   ├── react-app/             React parity पेज (Vite SSR)
│   ├── svelte-app/            Svelte parity पेज (Vite SSR)
│   ├── vanillajs-app/         vanilla JS parity पेज (मैनुअल QA)
│   └── tests/                 parity specs
├── biome.json                 lint + format config
├── tsconfig.base.json         base TypeScript config
└── pnpm-workspace.yaml        workspace परिभाषा
```

डेवलपमेंट एनवायरनमेंट के लिए आपको Node.js 18+ और [pnpm](https://pnpm.io) चाहिए:

```bash
pnpm install
pnpm build       # packages/* के सारे पैकेज build करें
pnpm typecheck   # सारे पैकेज typecheck करें
pnpm lint        # biome check
pnpm test:e2e    # Playwright parity टेस्ट (./e2e देखें)
```

### प्रति-फ्रेमवर्क टेस्ट पेज (E2E)

हर wrapper का एक parity पेज है ताकि QA और रिव्यूअर्स रिलीज़ से पहले उसकी
तुलना vanilla core से कर सकें:

| पेज                        | कैसे चलाएँ                                                        |
| -------------------------- | ---------------------------------------------------------------- |
| Vanilla (`e2e/vanillajs-app`) | `pnpm --filter vidix-player-vanillajs-e2e run preview` → `:3713` |
| Astro (`e2e/astro-app`)    | `pnpm --filter vidix-player-astro-e2e run preview` → `:3712`      |
| React (`e2e/react-app`)    | `pnpm --filter vidix-player-react-e2e run preview` → `:3714`      |
| Svelte (`e2e/svelte-app`)  | `pnpm --filter vidix-player-svelte-e2e run preview` → `:3715`      |

चारों पेज एक जैसे दो प्लेयर रेंडर करते हैं (अलग एक्सेंट, कंट्रोल स्थिति, और
भाषा) ताकि vanilla core और हर wrapper को साथ-साथ तुलना जा सके। vanilla पेज
पहले से बिल्ट core का इस्तेमाल ठीक CDN टैग की तरह करता है
(`/dist/vidix-player.js`); React और Svelte पेज SSR + हाइड्रेशन पाथ टेस्ट करते
हैं (सिर्फ़ एट्रिब्यूट्स सर्वर HTML में — कोई Declarative Shadow DOM नहीं, जिसे
React या Svelte हाइड्रेट नहीं कर सकते)। ऑटोमैटिक parity `e2e/tests` में है:

- `pnpm test:e2e` चारों Playwright प्रोजेक्ट चलाता है (`chromium` vanilla के
  लिए, `astro`, `react`, और `svelte` wrappers के लिए) और सुनिश्चित करता है:
  vanilla/Astro JavaScript से पहले स्केलेटन भेजते हैं (Astro wrapper
  Declarative Shadow DOM से), React और Svelte wrappers खाली एलिमेंट
  एट्रिब्यूट्स के साथ बिना DSD भेजते हैं, ज्योमेट्री हर केस में 16:9 बॉक्स +
  कंट्रोल बार इनवेरिएंट बनाए रखती है, और iframe, शेयर डायलॉग, और सर्वर सिलेक्ट
  सब हाइड्रेशन के बाद काम करते हैं।

vanilla का `csp-tt.spec.ts` सख़्त-CSP गेट है; Astro wrapper अपने SSR
स्केलेटन में critical CSS इनलाइन करता है, इसलिए वह सख़्त CSP जाँच नहीं करता
(`packages/vidix-player-astro/README.md` देखें)।

> आप कोड को समझने और फ़िक्स करने के लिए AI इस्तेमाल कर सकते हैं। मर्ज तब होता है जब आपका push Vidix टीम या भरोसेमंद OSS सहयोगी द्वारा रिव्यू किया जाता है।

---

## बग और सुरक्षा भेद्यताएँ रिपोर्ट करें

बग मिला? कृपया [issue खोलें](https://github.com/mekbrutcom/vidix-player/issues)।

सुरक्षा भेद्यता मिली? [निजी तरीके से रिपोर्ट करें](https://mekbrut.com/contact/bug-report)।

सुरक्षा भेद्यताओं के लिए, **सार्वजनिक issue न खोलें**। ऊपर दिए "निजी तरीके से
रिपोर्ट करें" लिंक से या इस GitHub प्रोफ़ाइल पर दिए गए ईमेल से हमसे संपर्क
करें। हम इसे सुरक्षा टीम को आगे भेजेंगे ताकि जितना जल्दी हो सके ठीक हो जाए।

---

## लाइसेंस

Apache License 2.0 — [LICENSE](../LICENSE) देखें।
