<p align="center">
  <img src="../.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# Vidix Player

Vidix Player เป็นไลบรารีคอมโพเนนต์สำเร็จรูปสำหรับวิดีโอเพลเยอร์ของแพลตฟอร์ม Vidix รองรับหลายภาษา ปุ่มแชร์ การเลือกเซิร์ฟเวอร์อัตโนมัติที่กำหนดจำนวนได้ และปุ่มดาวน์โหลดที่จะปรากฏอัตโนมัติหากการตั้งค่าแพลตฟอร์ม Vidix ของคุณเปิดใช้งานไว้
ทุกอย่างตั้งค่าได้จากแอตทริบิวต์ HTML หรือ props ของเฟรมเวิร์กที่มีให้

สมัครบัญชี Vidix และเริ่มอัปโหลดคอนเทนต์: [แพลตฟอร์ม Vidix](https://vidix.mekbrut.com)

## ภาษา

เอกสารนี้มีให้ใช้งานในภาษาต่อไปนี้:

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

## สารบัญ

- [สำหรับเจ้าของเว็บไซต์ (รวมถึงนักพัฒนา)](#สำหรับเจ้าของเว็บไซต์-รวมถึงนักพัฒนา)
  - [วิธีใช้งานบนเว็บไซต์ของคุณ](#วิธีใช้งานบนเว็บไซต์ของคุณ)
    - [Vanilla JS](#vanilla-js)
      - [ภาษาที่รองรับ](#ภาษาที่รองรับ)
    - [React](#react)
    - [Astro](#astro)
    - [Svelte / Kit](#svelte--kit)
    - [iframe แบบกำหนดเอง](#iframe-แบบกำหนดเอง)
  - [ขั้นสูง](#ขั้นสูง)
  - [แก้ไขปัญหา](#แก้ไขปัญหา)
- [ความโปร่งใสและความอดทน](#ความโปร่งใสและความอดทน)
- [ร่วมพัฒนาให้กับรีพอซิทอรี](#ร่วมพัฒนาให้กับรีพอซิทอรี)
- [รายงานบั๊กและช่องโหว่ด้านความปลอดภัย](#รายงานบั๊กและช่องโหว่ด้านความปลอดภัย)

---

## สำหรับเจ้าของเว็บไซต์ (รวมถึงนักพัฒนา)

Vidix Player ผนวกรวมได้อย่างสมบูรณ์กับเฟรมเวิร์กหลายตัว ใช้คอมโพเนนต์ที่
เข้ากันได้กับเว็บไซต์ของคุณ

### วิธีใช้งานบนเว็บไซต์ของคุณ

### Vanilla JS

เหมาะสำหรับ HTML แบบ native, PHP และสภาพแวดล้อมอื่นๆ ที่ไม่ได้ทำงานบน
Node.js / JavaScript bundler

#### สคริปต์ที่โฮสต์

วางสคริปต์นี้ไว้ภายใน `<head>...</head>` ของหน้าที่คุณต้องการให้แสดง
`vidix-player`:

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>
```

#### คอมโพเนนต์ vidix-player

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

#### แอตทริบิวต์

| Prop/attr                  | จำเป็น    | Type        | Default             | คำอธิบาย                                                                                                          |
| -------------------------- | -------- | ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `playback-id`              | **ใช่**  | string      | —                   | รหัสวิดีโอที่สร้างจากการอัปโหลดวิดีโอของคุณบนแพลตฟอร์ม Vidix เช่น `tUVARXFmPnT` หากไม่มีค่านี้เพลเยอร์จะไม่เรนเดอร์สิ่งใด |
| `lang`                     | ไม่ใช่   | string      | `<html lang>`, `en` | ภาษาของอินเทอร์เฟซ เช่น `id`, `en`, `es_419`, `zh_tw`, `vi` รายการทั้งหมด: [ภาษาที่รองรับ](#ภาษาที่รองรับ) ค่าที่ไม่รู้จักจะกลับไปใช้ `<html lang>` แล้วจึงเป็น `en` |
| `accent-color`             | ไม่ใช่   | string      | (ค่าเริ่มต้นของธีม) | สีหลักของเพลเยอร์ หนึ่งใน: `vidix`, `default`, `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown` ค่าอื่นๆ จะถูกละเว้น |
| `layout-control-position`  | ไม่ใช่   | string      | `bottom`            | ตำแหน่งของแถบควบคุม: `bottom` หรือ `top`                                                                          |
| `layout-control-accent`    | ไม่ใช่   | string      | (ค่าเริ่มต้นของธีม) | สีหลักของปุ่มต่างๆ ในแถบควบคุม (ปุ่มแชร์ การเลือกเซิร์ฟเวอร์ และดาวน์โหลด) ใช้ชุดค่าเดียวกับ `accent-color` |
| `control-share`            | ไม่ใช่   | boolean     | `true`              | แสดงปุ่มแชร์ + กล่องโต้ตอบการแชร์ ลิงก์ที่แชร์คือลิงก์ของเว็บไซต์คุณ ไม่ใช่ลิงก์วิดีโอโดยตรงหรือลิงก์ฝัง |
| `control-server-count`     | ไม่ใช่   | number      | `3`                 | จำนวนเซิร์ฟเวอร์ในเมนูเลือกเซิร์ฟเวอร์ ช่วง `0`–`10`; เมนูจะปรากฏที่ `≥ 2`                        |
| `control-download`         | ไม่ใช่   | boolean     | `true`              | แสดงปุ่มดาวน์โหลดวิดีโอ ปุ่มนี้อาจหายไปอัตโนมัติหากคุณปิดการดาวน์โหลดในการตั้งค่าแพลตฟอร์ม Vidix แม้คุณจะตั้งเป็น `true` ก็ตาม |
| `metadata-video-title`     | ไม่ใช่   | string      | —                   | ชื่อวิดีโอสำหรับการเข้าถึง (label `aria`) และปุ่มดาวน์โหลด                                                      |
| `metadata-thumbnail-url`   | ไม่ใช่   | string (URL)| —                   | URL ของรูปภาพธัมบ์เนล/โปสเตอร์ ใช้เป็น blur-up placeholder ก่อนที่วิดีโอจะพร้อมใช้งาน                |
| `metadata-server-title`    | ไม่ใช่   | boolean     | `true`              | แสดงชื่อ/ชื่อเรื่องที่เซิร์ฟเวอร์ให้มาในเพลเยอร์ ตั้งเป็น `"false"` เพื่อซ่อน                                        |
| `loading`                  | ไม่ใช่   | string      | (ค่าเริ่มต้นของเบราว์เซอร์) | กำหนดว่าจะโหลด iframe ของเพลเยอร์เมื่อใด: `eager` (ทันที) หรือ `lazy` (เมื่อใกล้จะมองเห็น) ค่าอื่นๆ จะถูกละเว้น |
| `console-log`              | ไม่ใช่   | boolean     | `false`             | ตั้งเป็น `"true"` เพื่อบันทึกข้อความวินิจฉัยไปยังคอนโซล DevTools เปิดใช้งานหากคุณมีปัญหาเรื่องการผนวกรวม — ปัญหาเหล่านั้นจะแสดงชัดเจนในคอนโซล DevTools |
| `role`, `aria-label`       | ไม่ใช่   | —           | —                   | แอตทริบิวต์ความสามารถในการเข้าถึงมาตรฐานของ HTML; ส่งผ่านตรงๆ โดยไม่เปลี่ยนแปลง                                      |

#### ภาษาที่รองรับ

เพลเยอร์รู้จักรหัส locale ทั้งหมด **71 รหัส** ครอบคลุม 37 ภาษา รหัสสามารถเขียนด้วย
ยัติภังค์หรือขีดล่าง (`en-GB` ถือว่าเหมือนกับ `en_gb`) และไม่ต้องคำนึงถึง
ตัวพิมพ์เล็ก/พิมพ์ใหญ่

| ภาษา                      | รหัส `lang`                                       |
| ------------------------- | ------------------------------------------------- |
| กรีก                      | `el`                                              |
| เกาหลี                    | `ko`                                              |
| คาตาลัน                   | `ca`                                              |
| จีน                       | `zh`, `zh_cn`, `zh_hk`, `zh_tw`                   |
| เช็ก                      | `cs`                                              |
| เซิร์เบีย                 | `sr`                                              |
| ญี่ปุ่น                   | `ja`                                              |
| ดัตช์                     | `nl`                                              |
| เดนมาร์ก                  | `da`                                              |
| ตุรกี                     | `tr`                                              |
| ไทย                       | `th`                                              |
| นอร์เวย์                  | `no`                                              |
| บัลแกเรีย                 | `bg`                                              |
| โปรตุเกส                 | `pt` _(ชั่วคราวแสดงข้อความภาษาอังกฤษ)_, `pt_br`, `pt_pt` |
| โปแลนด์                  | `pl`                                              |
| ฝรั่งเศส                  | `fr`, `fr_ca`, `fr_ch`                            |
| ฟินแลนด์                  | `fi`                                              |
| ฟิลิปปินส์                | `fil`                                             |
| มาเลย์                    | `ms`                                              |
| ยูเครน                    | `uk`                                              |
| เยอรมัน                   | `de`, `de_at`                                     |
| รัสเซีย                   | `ru`                                              |
| โรมาเนีย                  | `ro`                                              |
| ลัตเวีย                   | `lv`                                              |
| ลิทัวเนีย                 | `lt`                                              |
| เวียดนาม                  | `vi`                                              |
| สเปน                      | `es`, `es_419`, `es_ar`, `es_cl`, `es_co`, `es_cr`, `es_do`, `es_ec`, `es_sv`, `es_gt`, `es_hn`, `es_mx`, `es_ni`, `es_pa`, `es_pe`, `es_pr`, `es_py`, `es_us`, `es_uy`, `es_ve` |
| สโลวัก                    | `sk`                                              |
| สโลวีเนีย                 | `sl`                                              |
| สวีเดน                    | `sv`                                              |
| อังกฤษ                    | `en`, `en_au`, `en_ca`, `en_gb`, `en_ie`, `en_in`, `en_sg`, `en_za` |
| อิตาลี                    | `it`                                              |
| อินโดนีเซีย               | `id`                                              |
| เอสโตเนีย                 | `et`                                              |
| ไอซ์แลนด์                 | `is`                                              |
| ฮังการี                   | `hu` _(ชั่วคราวแสดงข้อความภาษาอังกฤษ)_              |
| ฮินดี                     | `hi`                                              |

หมายเหตุ:

- รหัสระดับภูมิภาคที่ยังไม่มีพจนานุกรมของตัวเอง (เช่น `en_gb`, `es_mx`,
  `fr_ca`) จะใช้พจนานุกรมของภาษาหลักโดยอัตโนมัติ
- รหัสที่ยังไม่มีพจนานุกรมของตัวเอง (`hu`, `pt`) ชั่วคราวจะแสดง
  ข้อความภาษาอังกฤษ ใช้รหัสระดับภูมิภาค (`pt_br`/`pt_pt`) เพื่อรับ
  ข้อความในภาษานั้น
- รหัสที่อยู่นอกเหนือจากรายการข้างต้นจะกลับไปใช้ `<html lang>` แล้วจึงเป็น `en`

### React

#### ติดตั้ง

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

ต้องมี React 18 หรือ 19 เป็น peer dependency; core (`@mekbrut-com/vidix-player`) และ
helper ต่างๆ จะตามมาเป็น dependencies

#### ติดตั้งคอมโพเนนต์

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

| Prop                       | แอตทริบิวต์                 | Type                  | Default             | คำอธิบาย                                                     |
| -------------------------- | -------------------------- | --------------------- | ------------------- | ------------------------------------------------------------- |
| `playbackId`               | `playback-id`               | `string`              | —                   | รหัสวิดีโอ จำเป็นต้องระบุ                                     |
| `lang`                     | `lang`                     | `string`              | `<html lang>` / `en`| ภาษา UI; รองรับ 71 รหัส locale — [รายการทั้งหมด](#ภาษาที่รองรับ) |
| `accentColor`              | `accent-color`              | `AccentColor`         | —                   | สีหลักของ UI                                                  |
| `loading`                  | `loading`                  | `"eager"` \| `"lazy"` | —                   | พฤติกรรมการโหลด iframe/blur-up                                 |
| `consoleLog`               | `console-log`               | `boolean`             | `false`             | บันทึกข้อความวินิจฉัย `[vidix-player]` ไปยังคอนโซล สำหรับการพัฒนาเท่านั้น |
| `lqip`                     | _wrapper-only_              | `boolean`             | `true`              | แสดง blur-up placeholder (ดู [ขั้นสูง](#ขั้นสูง))               |
| **`metadata`**             |                            |                       |                     |                                                               |
| `metadata.videoTitle`      | `metadata-video-title`      | `string`              | —                   | ชื่อเรื่อง iframe, label ดาวน์โหลด, ข้อความแชร์                |
| `metadata.thumbnailUrl`    | `metadata-thumbnail-url`    | `string`              | —                   | รูปโปสเตอร์ที่ใช้เป็น blur-up placeholder ต้องเป็น URL http(s) แบบเต็ม |
| `metadata.thumbnailLqip`   | _wrapper-only_              | `string`              | —                   | placeholder ที่กำหนดเอง; จะแทนที่ `thumbnailUrl` สำหรับ blur-up |
| `metadata.serverTitle`     | `metadata-server-title`     | `boolean`             | `true`              | ใช้ชื่อเรื่องจากการตอบกลับของเซิร์ฟเวอร์                        |
| **`layout`**               |                            |                       |                     |                                                               |
| `layout.controlPosition`   | `layout-control-position`   | `"bottom"` \| `"top"` | `"bottom"`          | ตำแหน่งของแถบควบคุม                                          |
| `layout.controlAccent`     | `layout-control-accent`     | `AccentColor`         | —                   | สีหลักของปุ่มในแถบควบคุม (ไม่ขึ้นกับ `accentColor`)             |
| **`control`**              |                            |                       |                     |                                                               |
| `control.share`            | `control-share`             | `boolean`             | `true`              | แสดงปุ่มแชร์ + กล่องโต้ตอบ                                    |
| `control.serverCount`      | `control-server-count`      | `number`              | `3`                 | เซิร์ฟเวอร์ในตัวเลือก ถูกจำกัดที่ `0`–`10`; แสดงที่ `2` ขึ้นไป   |
| `control.download`         | `control-download`          | `boolean`             | `true`              | แสดงปุ่มดาวน์โหลด (เซิร์ฟเวอร์ยังสามารถซ่อนได้)               |
| **events**                 |                            |                       |                     |                                                               |
| `onServerData`             | `vidix:server-data`         | `(detail) => void`    | —                   | เริ่มทำงานพร้อม `{ serverCount }` เมื่อรายการเซิร์ฟเวอร์ถูกไขออกมาแล้ว |
| `onServerSelect`           | `vidix:server-select`       | `(detail) => void`    | —                   | เริ่มทำงานพร้อม `{ value }` เมื่อผู้ใช้เลือกเซิร์ฟเวอร์        |

### Astro

wrapper ของ Astro จะเรนเดอร์โครงสร้าง Declarative Shadow DOM บนเซิร์ฟเวอร์:
กล่องอัตราส่วน 16:9 + critical CSS จะปรากฏขึ้น **ก่อนที่ JavaScript จะโหลด**
ดังนั้นการเลื่อนของเลย์เอาต์ (CLS) ตอน hydrate จึงใกล้เคียงกับ 0

#### ติดตั้ง

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

ต้องมี Astro 4+ เป็น peer dependency

#### ติดตั้งคอมโพเนนต์

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

รายการ prop เหมือนกับ [React](#props) ยกเว้นว่า Astro ไม่มี prop
อีเวนต์ `onServerData` / `onServerSelect` หากคุณต้องการ ให้แนบ listener
ของคุณเองในสคริปต์ฝั่งไคลเอนต์:

```astro
<script>
  document.querySelector("vidix-player")?.addEventListener("vidix:server-data", (event) => {
    console.log("servers:", event.detail.serverCount);
  });
</script>
```

### Svelte / Kit

#### ติดตั้ง

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

ต้องมี Svelte 5 เป็น peer dependency

#### ติดตั้งคอมโพเนนต์

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

รายการ prop และอีเวนต์เหมือนกับ [React](#props) (Svelte 5 ใช้ callback
prop แบบ `onServerData` / `onServerSelect` ไม่ใช่ `createEventDispatcher`
ที่ถูกยกเลิกไปแล้ว)

### iframe แบบกำหนดเอง

iframe แบบกำหนดเองคือ iframe HTML แบบปกติทั่วไป จึงมีเซิร์ฟเวอร์เดียวคือเซิร์ฟเวอร์ที่คุณเลือกไว้บนแพลตฟอร์ม Vidix

แท็ก iframe นี้มีให้หรือถูกสร้างขึ้นโดยแพลตฟอร์ม Vidix จากวิดีโอที่คุณอัปโหลด — เพียงคัดลอกจากแพลตฟอร์ม Vidix แล้วฝังลงบนเว็บไซต์ของคุณ:

```html
<iframe
  src="https://..."
  title="Example videos"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

---

## ขั้นสูง

**กฎเกี่ยวกับ boolean ใน Vanilla JS:** เปิดใช้งานแอตทริบิวต์ boolean เพียงแค่เขียน
ชื่อของมัน (หรือ `="true"`) และปิดด้วย `="false"` ตัวอย่าง:
`control-share="false"`

**props คือการตั้งค่าตอน mount** core จะอ่านแอตทริบิวต์ครั้งเดียวใน
`connectedCallback` (ไม่มี `observedAttributes`) ดังนั้นการเปลี่ยน props
หลัง mount จะไม่อัปเดตเพลเยอร์ที่กำลังทำงานอยู่ มอบ `key` (React/Svelte)
หรือติดตั้งอิลิเมนต์ใหม่เมื่อจำเป็นต้องเปลี่ยนการตั้งค่า:

```svelte
{#key playbackId}
  <VidixPlayer {playbackId} />
{/key}
```

**ธีมแสง/ธีมมืด**

เพลเยอร์จะตามธีมของหน้าอัตโนมัติ โดยไม่ต้องมีแอตทริบิวต์เพิ่มเติม:

- หากมี `<html data-theme="dark">` (หรือ class `dark`) → โหมดมืด
- หากมี `<html data-theme="light">` (หรือ class `light`) → โหมดแสง
- หากไม่มีทั้งสองอย่าง → จะตาม `prefers-color-scheme` ของระบบผู้ใช้

**หมายเหตุด้านความปลอดภัย (CSP / Trusted Types)**

เพลเยอร์ถูกออกแบบมาให้ใช้งานร่วมกับ strict CSP ได้:

- **ไม่มี `eval` ไม่มี inline event handler** — ปลอดภัยภายใต้ `script-src`
  แบบเข้มงวด
- **สไตล์ถูกติดตั้งผ่าน `adoptedStyleSheets`** ไม่ใช่การแทรกแท็ก `<style>` —
  ใช้งานร่วมกับ `style-src` ได้โดยไม่ต้องมี `'unsafe-inline'`
- หากเว็บไซต์ของคุณใช้ `require-trusted-types-for 'script'` ให้เพิ่มชื่อ
  policy **`vidix-player`** ไปยัง allowlist ของ `trusted-types` หากไม่มี
  ชื่อนั้น เพลเยอร์จะไม่สามารถเรนเดอร์ภายใต้ CSP นั้นได้

## แก้ไขปัญหา

- **เพลเยอร์ไม่ปรากฏเลย** — ตรวจสอบ `playback-id` (จำเป็น) แล้วเปิดใช้งาน
  `console-log="true"` เพื่อดูข้อความใน DevTools
- **แถบควบคุมหายไป** — แถบควบคุมจะปรากฏก็ต่อเมื่อมีอย่างน้อยหนึ่งจาก
  `control-share`, `control-server-count` (≥ 2), หรือ `control-download`
  ที่ทำงานอยู่
- **ธีมไม่ตรง** — ตรวจสอบให้แน่ใจว่าไม่มี `data-theme` ที่ขัดแย้งกันอยู่บน
  แท็กอื่น; เพลเยอร์อ่านธีมจากอิลิเมนต์ `<html>`

---

## ความโปร่งใสและความอดทน

### ขีดจำกัดคำขอ 20 ครั้งต่อนาทีสำหรับ IP ของผู้ชม

เราจำกัดให้ผู้เยี่ยมชมแต่ละคนของเว็บไซต์คุณเห็นวิดีโอปรากฏขึ้นได้ไม่เกิน
20 ครั้งต่อนาที 20 ครั้งต่อนาทีนั้นมากมากอยู่แล้ว — มากกว่าการใช้งาน
ปกติถึง 4 ถึง 5 เท่า โดยทั่วไป การที่เกิน 20 ครั้งต่อนาทีมักเป็นบอท
หรือระบบอัตโนมัติที่กำลังโจมตีเว็บไซต์ของคุณ

การนับจะอ้างอิงจาก IP ของผู้ชม ตัวอย่างเช่น ผู้ชม A (มนุษย์),
ผู้ชม B (บอทที่โจมตี), และ C (crawler ของเสิร์ชเอนจิ้น):

- ผู้ชม B (บอทที่โจมตี) ทำการ scrape เพื่อดึงวิดีโอจำนวนมาก → backend
  ของ Vidix Player จะบล็อก
- ผู้ชม A (มนุษย์) และ C (crawler ของเสิร์ชเอนจิ้น) ยังคงเข้าถึงได้
  ตามปกติโดยไม่ถูกรบกวน

โดยอ้อม สิ่งนี้จะปกป้องวิดีโอของคุณจากบอท (ซึ่งมักหมายถึงผู้ขโมย
คอนเทนต์) ไปพร้อมกันก็รักษา backend ของ Vidix Player ให้ทำงานตาม
ปกติ (เพื่อไม่ให้ล่มจากการโจมตี)

### โครงสร้างพื้นฐาน ภาษา backend และ edge

**โครงสร้างพื้นฐานทำงานในสหภาพยุโรป** การประมวลผล backend ทั้งหมดทำงาน
และดำเนินการอยู่ภายในภูมิภาคสหภาพยุโรปโดยการกระจายคำขอ นี่เป็นหนึ่งใน
เหตุผลที่ Vidix เป็นตัวเลือกที่ปลอดภัยและรวดเร็ว

**ภาษา backend** เราเปิดเผยว่าเราใช้ภาษา backend หลายภาษาพร้อมกัน
เพื่อรักษาบริการนี้ให้เหมาะสมที่สุด:

- **Rust** — ประมาณ 60% สำหรับ API
- **Go** — ประมาณ 25% ช่วย Rust ประมวลผลข้อมูลเพราะต้องการ garbage
  collector และความเร็วของคอมไพเลอร์
- **Python** — ประมาณ 10% สำหรับระบบอัตโนมัติเบื้องหลัง
- **Shell** — ส่วนที่เหลือ สำหรับการรันโครงสร้างพื้นฐาน, cron และ
  ความต้องการอื่นๆ เพื่อให้การเชื่อมต่อยังคงอยู่

**เครือข่าย edge** เราใช้บริการ edge จากผู้ให้บริการหลายราย: สตาร์ทอัพ
หนึ่งที่จบจาก YCombinator ซึ่งไม่ต้องการให้ออกนาม, Cloudflare, AWS,
Akamai, Oracle และ IBM

ในขณะนี้เราไม่ใช้ GCP เพราะเราไม่ต้องการให้การจัดการเครือข่ายถูก
ควบคุมโดย AI (Gemini) จริงๆ แล้วสามารถตั้งค่าได้ แต่เราเลือกที่จะไม่ใช้
ในตอนนี้ เพื่อให้ GDPR ของ Vidix สามารถทำงานได้โดยไม่ถูกแทรกแซงจาก
บุคคลที่สาม

---

## ร่วมพัฒนาให้กับรีพอซิทอรี

เราจะขอบคุณอย่างมากหากคุณช่วยพัฒนา Vidix Player โปรดส่ง
pull request ขอบคุณที่ช่วยพัฒนาไลบรารีคอมโพเนนต์นี้ของเรา!

ยังไม่แน่ใจว่าจะเริ่มจากตรงไหน? นี่คือแผนผังของคุณ

### แผนผังโค้ด (code-tree)

```
vidix-player/
├── packages/
│   ├── vidix-player/          core library (source of truth; TypeScript)
│   ├── vidix-player-shared/   prop/attribute/image helper สำหรับ wrapper
│   ├── vidix-player-astro/    wrapper ของ Astro (SSR skeleton, zero layout shift)
│   ├── vidix-player-react/    wrapper ของ React (SSR-friendly, "use client")
│   └── vidix-player-svelte/   wrapper ของ Svelte 5 (SSR-friendly, source-shipping)
├── e2e/                       การทดสอบ Playwright + fixtures (ไม่ได้เผยแพร่)
│   ├── astro-app/             หน้า parity ของ Astro
│   ├── react-app/             หน้า parity ของ React (Vite SSR)
│   ├── svelte-app/            หน้า parity ของ Svelte (Vite SSR)
│   ├── vanillajs-app/         หน้า parity ของ vanilla JS (QA ด้วยมือ)
│   └── tests/                 parity specs
├── biome.json                 config สำหรับ lint + format
├── tsconfig.base.json         config TypeScript พื้นฐาน
└── pnpm-workspace.yaml        นิยามของ workspace
```

สำหรับสภาพแวดล้อมการพัฒนา คุณต้องมี Node.js 18+ และ
[pnpm](https://pnpm.io):

```bash
pnpm install
pnpm build       # build ทุก package ใน packages/*
pnpm typecheck   # typecheck ทุก package
pnpm lint        # ตรวจสอบ biome
pnpm test:e2e    # การทดสอบ parity ของ Playwright (ดู ./e2e)
```

### หน้าทดสอบสำหรับแต่ละเฟรมเวิร์ก (E2E)

wrapper แต่ละตัวมีหน้า parity เพื่อให้ QA และผู้ตรวจสอบสามารถนำไป
เปรียบเทียบกับ core แบบ vanilla ก่อนปล่อยเวอร์ชัน:

| Page                          | How to run                                                       |
| ----------------------------- | ---------------------------------------------------------------- |
| Vanilla (`e2e/vanillajs-app`) | `pnpm --filter vidix-player-vanillajs-e2e run preview` → `:3713` |
| Astro (`e2e/astro-app`)       | `pnpm --filter vidix-player-astro-e2e run preview` → `:3712`      |
| React (`e2e/react-app`)       | `pnpm --filter vidix-player-react-e2e run preview` → `:3714`      |
| Svelte (`e2e/svelte-app`)     | `pnpm --filter vidix-player-svelte-e2e run preview` → `:3715`      |

หน้าทั้งสี่จะเรนเดอร์เพลเยอร์สองตัวเหมือนกัน (ต่างกันที่สีหลัก,
ตำแหน่งแถบควบคุม และภาษา) เพื่อให้สามารถเปรียบเทียบ core แบบ vanilla
กับ wrapper แต่ละตัวได้แบบเคียงข้างกัน หน้า vanilla ใช้ core ที่ build
แล้วเหมือนกับแท็ก CDN (`/dist/vidix-player.js`); หน้า React และ Svelte
จะทดสอบเส้นทาง SSR + hydration (มีแค่แอตทริบิวต์ใน HTML ฝั่งเซิร์ฟเวอร์ —
ไม่มี Declarative Shadow DOM ซึ่ง React และ Svelte ไม่สามารถ hydrate ได้)
parity อัตโนมัติอยู่ใน `e2e/tests`:

- `pnpm test:e2e` จะรัน project ของ Playwright ทั้งสี่ตัว (`chromium`
  สำหรับ vanilla, `astro`, `react` และ `svelte` สำหรับ wrapper) และ
  ตรวจสอบว่า: vanilla/Astro ส่ง skeleton ออกมาก่อนที่ JavaScript จะ
  ทำงาน (wrapper ของ Astro ผ่าน Declarative Shadow DOM), wrapper ของ
  React และ Svelte ส่งอิลิเมนต์เปล่าๆ พร้อมแอตทริบิวต์โดยไม่มี DSD,
  เรขาคณิตยังคงรักษาค่าคงที่ของกล่องอัตราส่วน 16:9 + แถบควบคุมใน
  ทุกกรณี และ iframe, กล่องโต้ตอบแชร์ และตัวเลือกเซิร์ฟเวอร์ ทำงานได้
  หลังจาก hydrate แล้วทั้งหมด

`csp-tt.spec.ts` ของ vanilla เป็น gate สำหรับ strict-CSP; wrapper ของ
Astro จะ inline critical CSS ลงใน skeleton SSR ของตัวเอง จึงไม่ได้
ตรวจสอบ strict CSP (ดู `packages/vidix-player-astro/README.md`)

> คุณสามารถใช้ AI เพื่อทำความเข้าใจโค้ดและทำการแก้ไขได้ การ merge จะเกิดขึ้นหลังจากที่ **push** ของคุณได้รับการ review โดยทีม Vidix หรือ collaborator OSS ที่น่าไว้วางใจ

---

## รายงานบั๊กและช่องโหว่ด้านความปลอดภัย

พบบั๊ก? โปรด [เปิด issue](https://github.com/mekbrutcom/vidix-player/issues)

พบช่องโหว่ด้านความปลอดภัย? [รายงานเป็นส่วนตัว](https://mekbrut.com/contact/bug-report)

สำหรับช่องโหว่ด้านความปลอดภัย **ห้ามเปิด issue สาธารณะ** ติดต่อเราผ่าน
ลิงก์ "รายงานเป็นส่วนตัว" ด้านบน หรือผ่านอีเมลที่ระบุไว้ในโปรไฟล์ GitHub
นี้ เราจะส่งต่อให้ทีมรักษาความปลอดภัยเพื่อแก้ไขโดยเร็วที่สุด

---

## สิทธิ์การใช้งาน

Apache License 2.0 — ดู [LICENSE](../LICENSE)
