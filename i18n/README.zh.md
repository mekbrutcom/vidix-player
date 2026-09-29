<p align="center">
  <img src="../.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# Vidix Player

Vidix Player 是一个面向 Vidix 平台视频播放器的、即装即用的组件库。它支持多种语言、分享按钮、可配置数量的自动服务器选择，以及当您的 Vidix 平台设置启用时自动出现的下载按钮。
一切都可以通过 HTML 属性或可用的框架 props 来配置。

注册 Vidix 账号并开始上传内容：[Vidix 平台](https://vidix.mekbrut.com)

## 语言

本文档提供以下语言版本：

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

## 目录

- [对于网站所有者（包括开发者）](#对于网站所有者包括开发者)
  - [如何在您的网站上使用](#如何在您的网站上使用)
    - [Vanilla JS](#vanilla-js)
      - [支持的语言](#支持的语言)
    - [React](#react)
    - [Astro](#astro)
    - [Svelte / Kit](#svelte--kit)
    - [手动 iframe](#手动-iframe)
  - [进阶](#进阶)
  - [故障排除](#故障排除)
- [透明度与容忍度](#透明度与容忍度)
- [为仓库做贡献](#为仓库做贡献)
- [报告 bug 与安全漏洞](#报告-bug-与安全漏洞)

---

## 对于网站所有者（包括开发者）

Vidix Player 与许多框架完全集成。请使用与您的网站兼容的组件。

### 如何在您的网站上使用

### Vanilla JS

适用于原生 HTML、PHP 以及其他不运行在 Node.js / JavaScript bundler
上的环境。

#### 托管脚本

将此脚本放在您想显示 `vidix-player` 的页面的 `<head>...</head>` 中：

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>
```

#### vidix-player 组件

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

#### 属性

| Prop/attr                  | 必需      | Type        | Default             | 说明                                                                                                              |
| -------------------------- | -------- | ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `playback-id`              | **是**   | string      | —                   | 您在 Vidix 平台上上传视频后生成的视频 ID，例如 `tUVARXFmPnT`。没有它，播放器不渲染任何内容。                      |
| `lang`                     | 否       | string      | `<html lang>`, `en` | 界面语言，例如 `id`、`en`、`es_419`、`zh_tw`、`vi`。完整列表：[支持的语言](#支持的语言)。未知值会回退到 `<html lang>`，然后是 `en`。 |
| `accent-color`             | 否       | string      | （主题默认）         | 播放器的强调色。可选：`vidix`、`default`、`red`、`orange`、`yellow`、`green`、`mint`、`teal`、`cyan`、`blue`、`indigo`、`purple`、`pink`、`brown`。其他值会被忽略。 |
| `layout-control-position`  | 否       | string      | `bottom`            | 控制栏位置：`bottom` 或 `top`。                                                                                    |
| `layout-control-accent`    | 否       | string      | （主题默认）         | 控制栏按钮（分享按钮、服务器选择和下载）的强调色。可选值与 `accent-color` 相同。                                    |
| `control-share`            | 否       | boolean     | `true`              | 显示分享按钮及其分享对话框。分享的是您的网站链接，不是直接视频链接或嵌入链接。                                        |
| `control-server-count`     | 否       | number      | `3`                 | 服务器选择菜单中的服务器数量。范围 `0`–`10`；菜单在 `≥ 2` 时出现。                                                 |
| `control-download`         | 否       | boolean     | `true`              | 显示视频下载按钮。如果您在 Vidix 平台设置中禁用了下载，即使设为 `true`，该按钮也可能自动消失。                        |
| `metadata-video-title`     | 否       | string      | —                   | 用于无障碍访问（`aria` 标签）和下载按钮的视频标题。                                                                |
| `metadata-thumbnail-url`   | 否       | string (URL)| —                   | 缩略图/海报图片 URL。在视频就绪前用作 blur-up 占位符。                                                             |
| `metadata-server-title`    | 否       | boolean     | `true`              | 在播放器中显示服务器提供的名称/标题。设为 `"false"` 可隐藏。                                                       |
| `loading`                  | 否       | string      | （浏览器默认）       | 何时加载播放器 iframe：`eager`（立即）或 `lazy`（接近可见时）。其他值会被忽略。                                     |
| `console-log`              | 否       | boolean     | `false`             | 设为 `"true"` 可将诊断信息记录到 DevTools 控制台。如果您遇到集成问题，请启用它——它们会清楚地显示在 DevTools 控制台中。 |
| `role`, `aria-label`       | 否       | —           | —                   | 标准 HTML 无障碍属性；原样传递。                                                                                  |

#### 支持的语言

播放器识别 **71 个 locale 代码**，涵盖 37 种语言。代码可以用连字符或下划线
书写（`en-GB` 与 `en_gb` 同等对待），并且不区分大小写。

| 语言                      | `lang` 代码                                      |
| ------------------------- | ------------------------------------------------- |
| 爱沙尼亚语                | `et`                                              |
| 保加利亚语                | `bg`                                              |
| 冰岛语                    | `is`                                              |
| 波兰语                    | `pl`                                              |
| 丹麦语                    | `da`                                              |
| 德语                      | `de`, `de_at`                                     |
| 俄语                      | `ru`                                              |
| 法语                      | `fr`, `fr_ca`, `fr_ch`                            |
| 菲律宾语                  | `fil`                                             |
| 芬兰语                    | `fi`                                              |
| 韩语                      | `ko`                                              |
| 荷兰语                    | `nl`                                              |
| 加泰罗尼亚语              | `ca`                                              |
| 捷克语                    | `cs`                                              |
| 拉脱维亚语                | `lv`                                              |
| 立陶宛语                  | `lt`                                              |
| 罗马尼亚语                | `ro`                                              |
| 马来语                    | `ms`                                              |
| 挪威语                    | `no`                                              |
| 葡萄牙语                  | `pt` _(暂时显示英文文本)_, `pt_br`, `pt_pt`       |
| 日语                      | `ja`                                              |
| 瑞典语                    | `sv`                                              |
| 塞尔维亚语                | `sr`                                              |
| 斯洛伐克语                | `sk`                                              |
| 斯洛文尼亚语              | `sl`                                              |
| 泰语                      | `th`                                              |
| 土耳其语                  | `tr`                                              |
| 乌克兰语                  | `uk`                                              |
| 西班牙语                  | `es`, `es_419`, `es_ar`, `es_cl`, `es_co`, `es_cr`, `es_do`, `es_ec`, `es_sv`, `es_gt`, `es_hn`, `es_mx`, `es_ni`, `es_pa`, `es_pe`, `es_pr`, `es_py`, `es_us`, `es_uy`, `es_ve` |
| 希腊语                    | `el`                                              |
| 匈牙利语                  | `hu` _(暂时显示英文文本)_                         |
| 意大利语                  | `it`                                              |
| 印地语                    | `hi`                                              |
| 印尼语                    | `id`                                              |
| 英语                      | `en`, `en_au`, `en_ca`, `en_gb`, `en_ie`, `en_in`, `en_sg`, `en_za` |
| 越南语                    | `vi`                                              |
| 中文                      | `zh`, `zh_cn`, `zh_hk`, `zh_tw`                   |

注：

- 没有自己字典的区域变体（例如 `en_gb`、`es_mx`、`fr_ca`）会自动使用
  基础语言的字典。
- 尚无自己字典的代码（`hu`、`pt`）暂时显示英文文本。请使用它们的区域
  变体（`pt_br`/`pt_pt`）来获取该语言的文本。
- 不在上述列表中的代码会回退到 `<html lang>`，然后是 `en`。

### React

#### 安装

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

需要 React 18 或 19 作为 peer dependency；core（`@mekbrut-com/vidix-player`）和共享
helpers 会作为 dependencies 一起提供。

#### 挂载组件

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

| Prop                       | 属性                       | Type                  | Default             | 说明                                                     |
| -------------------------- | -------------------------- | --------------------- | ------------------- | --------------------------------------------------------- |
| `playbackId`               | `playback-id`               | `string`              | —                   | 视频 ID。必需。                                           |
| `lang`                     | `lang`                     | `string`              | `<html lang>` / `en`| UI 语言；支持 71 个 locale 代码 — [完整列表](#支持的语言)。 |
| `accentColor`              | `accent-color`              | `AccentColor`         | —                   | UI 强调色。                                               |
| `loading`                  | `loading`                  | `"eager"` \| `"lazy"` | —                   | iframe/blur-up 的加载行为。                               |
| `consoleLog`               | `console-log`               | `boolean`             | `false`             | 将 `[vidix-player]` 诊断信息记录到控制台。仅开发用。      |
| `lqip`                     | _wrapper-only_              | `boolean`             | `true`              | 显示 blur-up 占位符（见 [进阶](#进阶)）。                 |
| **`metadata`**             |                            |                       |                     |                                                           |
| `metadata.videoTitle`      | `metadata-video-title`      | `string`              | —                   | iframe 标题、下载标签、分享文本。                         |
| `metadata.thumbnailUrl`    | `metadata-thumbnail-url`    | `string`              | —                   | 用作 blur-up 占位符的海报。必须是绝对 http(s) URL。       |
| `metadata.thumbnailLqip`   | _wrapper-only_              | `string`              | —                   | 显式占位符；为 blur-up 覆盖 `thumbnailUrl`。              |
| `metadata.serverTitle`     | `metadata-server-title`     | `boolean`             | `true`              | 使用服务器响应中的标题。                                  |
| **`layout`**               |                            |                       |                     |                                                           |
| `layout.controlPosition`   | `layout-control-position`   | `"bottom"` \| `"top"` | `"bottom"`          | 控制栏位置。                                              |
| `layout.controlAccent`     | `layout-control-accent`     | `AccentColor`         | —                   | 控制栏按钮的强调色（独立于 `accentColor`）。              |
| **`control`**              |                            |                       |                     |                                                           |
| `control.share`            | `control-share`             | `boolean`             | `true`              | 显示分享按钮 + 对话框。                                   |
| `control.serverCount`      | `control-server-count`      | `number`              | `3`                 | 选择器中的服务器数量，钳制在 `0`–`10`；在 `2`+ 时显示。   |
| `control.download`         | `control-download`          | `boolean`             | `true`              | 显示下载按钮（服务器仍可能隐藏它）。                      |
| **events**                 |                            |                       |                     |                                                           |
| `onServerData`             | `vidix:server-data`         | `(detail) => void`    | —                   | 当服务器列表解析完成时，附带 `{ serverCount }` 触发。     |
| `onServerSelect`           | `vidix:server-select`       | `(detail) => void`    | —                   | 当用户选择服务器时，附带 `{ value }` 触发。               |

### Astro

Astro wrapper 在服务器端渲染一个 Declarative Shadow DOM 骨架：16:9
盒子 + critical CSS 在**任何 JavaScript 加载之前**就已存在，因此水合
时的布局偏移（CLS）约为 0。

#### 安装

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

需要 Astro 4+ 作为 peer dependency。

#### 挂载组件

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

prop 列表与 [React](#props) 相同，只是 Astro 没有
`onServerData` / `onServerSelect` 事件 props。如果需要，请在客户端
脚本中挂载您自己的监听器：

```astro
<script>
  document.querySelector("vidix-player")?.addEventListener("vidix:server-data", (event) => {
    console.log("servers:", event.detail.serverCount);
  });
</script>
```

### Svelte / Kit

#### 安装

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

需要 Svelte 5 作为 peer dependency。

#### 挂载组件

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

prop 和事件列表与 [React](#props) 相同（Svelte 5 使用
`onServerData` / `onServerSelect` 回调 props，而不是已弃用的
`createEventDispatcher`）。

### 手动 iframe

手动 iframe 是普通的语义化 HTML iframe，因此只有一个服务器：您在 Vidix 平台上选择的服务器。

此 iframe 标签由 Vidix 平台根据您上传的视频提供或生成——只需从 Vidix 平台复制它并嵌入您的网站：

```html
<iframe
  src="https://..."
  title="Example videos"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

---

## 进阶

**Vanilla JS 中的布尔规则：** 布尔属性只需写出其名称（或 `="true"`）
即可启用，用 `="false"` 禁用。示例：`control-share="false"`。

**props 是挂载时的配置。** core 在 `connectedCallback` 中一次性读取属性
（没有 `observedAttributes`），因此挂载后更改 props 不会更新正在运行的
播放器。当配置必须更改时，请提供 `key`（React/Svelte）或重新挂载元素：

```svelte
{#key playbackId}
  <VidixPlayer {playbackId} />
{/key}
```

**亮色/暗色主题**

播放器自动跟随页面主题，无需额外属性：

- 如果存在 `<html data-theme="dark">`（或 `dark` class）→ 暗色模式。
- 如果存在 `<html data-theme="light">`（或 `light` class）→ 亮色模式。
- 如果两者都不存在 → 跟随用户系统的 `prefers-color-scheme`。

**安全说明（CSP / Trusted Types）**

播放器设计为对严格 CSP 友好：

- **没有 `eval`，没有内联事件处理器** — 在严格的 `script-src` 下安全。
- **样式通过 `adoptedStyleSheets` 安装**，而不是注入的 `<style>` 标签 —
  兼容不带 `'unsafe-inline'` 的 `style-src`。
- 如果您的站点应用 `require-trusted-types-for 'script'`，请将 policy 名称
  **`vidix-player`** 添加到您的 `trusted-types` 允许列表。没有该名称，
  播放器无法在该 CSP 下渲染。

## 故障排除

- **播放器根本没有出现** — 检查 `playback-id`（必需）并启用
  `console-log="true"` 以在 DevTools 中查看消息。
- **控制栏缺失** — 控制栏仅在 `control-share`、`control-server-count`
  （≥ 2）或 `control-download` 中至少一个处于活动状态时才出现。
- **主题不匹配** — 确保其他标签上没有冲突的 `data-theme`；播放器从
  `<html>` 元素读取主题。

---

## 透明度与容忍度

### 每位观众 IP 每分钟 20 次请求的速率限制

我们将您站点的每位访客看到视频出现的次数限制为每分钟最多 20 次。每分钟
20 次已经非常大了——比典型使用量大 4 到 5 倍。通常，每分钟超过 20 次
就是机器人或自动化程序在攻击您的站点。

计数基于观众的 IP。例如，观众 A（人类）、观众 B（攻击机器人）和
C（搜索引擎爬虫）：

- 观众 B（攻击机器人）抓取以批量获取视频 → Vidix Player 后端会阻止它。
- 观众 A（人类）和 C（搜索引擎爬虫）仍然可以完全不受影响地访问。

间接地，这保护您的视频免受机器人（通常意味着内容窃贼）的侵害，同时
保持 Vidix Player 后端正常运行（这样它就不会因为攻击者而崩溃）。

### 基础设施、后端语言与边缘网络

**基础设施在欧盟运行。** 所有后端处理完全在欧盟区域内运行，通过对
请求进行负载均衡来处理。这是 Vidix 成为安全和快速选择的原因之一。

**后端语言。** 我们公开承认我们同时使用多种后端语言来保持此服务的
最佳状态：

- **Rust** — API 的大约 60%。
- **Go** — 大约 25%，帮助 Rust 处理数据，因为它需要垃圾回收器及其
  编译器速度。
- **Python** — 大约 10%，用于幕后自动化。
- **Shell** — 其余部分，用于运行基础设施、cron 和其他需求，以保持
  连接存活。

**边缘网络。** 我们使用来自多个提供商的边缘服务：一家不愿透露姓名的
YCombinator 创业公司校友、Cloudflare、AWS、Akamai、Oracle 和 IBM。

我们暂时不使用 GCP，因为我们不希望网络管理被 AI（Gemini）插手。它
可以被配置，但我们目前选择不使用它，以便 Vidix 的 GDPR 始终能在没有
第三方干预的情况下运行。

---

## 为仓库做贡献

如果您能帮助开发 Vidix Player，我们将不胜感激。请发送 pull request。
感谢您帮助我们开发这个组件库！

不知道从哪里开始贡献？这是您的地图。

### 代码地图（code-tree）

```
vidix-player/
├── packages/
│   ├── vidix-player/          core library (source of truth; TypeScript)
│   ├── vidix-player-shared/   用于 wrapper 的共享 prop/attribute/image helper
│   ├── vidix-player-astro/    Astro wrapper (SSR skeleton, zero layout shift)
│   ├── vidix-player-react/    React wrapper (SSR-friendly, "use client")
│   └── vidix-player-svelte/   Svelte 5 wrapper (SSR-friendly, source-shipping)
├── e2e/                       Playwright tests + fixtures（未发布）
│   ├── astro-app/             Astro parity 页面
│   ├── react-app/             React parity 页面 (Vite SSR)
│   ├── svelte-app/            Svelte parity 页面 (Vite SSR)
│   ├── vanillajs-app/         vanilla JS parity 页面（手动 QA）
│   └── tests/                 parity specs
├── biome.json                 lint + format config
├── tsconfig.base.json         基础 TypeScript config
└── pnpm-workspace.yaml        workspace 定义
```

对于开发环境，您需要 Node.js 18+ 和
[pnpm](https://pnpm.io)：

```bash
pnpm install
pnpm build       # 构建 packages/* 中的所有 package
pnpm typecheck   # 类型检查所有 package
pnpm lint        # biome check
pnpm test:e2e    # Playwright parity tests（见 ./e2e）
```

### 各框架的测试页面（E2E）

每个 wrapper 都有一个 parity 页面，以便 QA 和评审者可以在发布前将其
与 vanilla core 进行比较：

| Page                          | How to run                                                       |
| ----------------------------- | ---------------------------------------------------------------- |
| Vanilla (`e2e/vanillajs-app`) | `pnpm --filter vidix-player-vanillajs-e2e run preview` → `:3713` |
| Astro (`e2e/astro-app`)       | `pnpm --filter vidix-player-astro-e2e run preview` → `:3712`      |
| React (`e2e/react-app`)       | `pnpm --filter vidix-player-react-e2e run preview` → `:3714`      |
| Svelte (`e2e/svelte-app`)     | `pnpm --filter vidix-player-svelte-e2e run preview` → `:3715`      |

所有四个页面都渲染相同的两个播放器（不同的强调色、控制栏位置和
语言），以便 vanilla core 和每个 wrapper 可以并排比较。vanilla 页面
完全像 CDN 标签一样使用已构建的 core（`/dist/vidix-player.js`）；
React 和 Svelte 页面测试 SSR + 水合路径（服务器 HTML 中只有属性 —
没有 Declarative Shadow DOM，因为 React 和 Svelte 都无法水合它）。
自动 parity 位于 `e2e/tests`：

- `pnpm test:e2e` 运行所有四个 Playwright 项目（vanilla 用
  `chromium`，wrapper 用 `astro`、`react` 和 `svelte`）并确保：
  vanilla/Astro 在 JavaScript 之前发送骨架（Astro wrapper 通过
  Declarative Shadow DOM），React 和 Svelte wrapper 发送仅带属性的
  裸元素且没有 DSD，几何形状在每种情况下都保持 16:9 盒子 + 控制栏的
  不变量，并且 iframe、分享对话框和服务器选择在水合后都能工作。

vanilla 的 `csp-tt.spec.ts` 是 strict-CSP 的 gate；Astro wrapper 将
critical CSS 内联到其 SSR 骨架中，因此它不检查 strict CSP（见
`packages/vidix-player-astro/README.md`）。

> 您可以使用 AI 来理解代码并做修复。合并发生在您的 **push** 被 Vidix 团队或受信任的 OSS 协作者 review 之后。

---

## 报告 bug 与安全漏洞

发现 bug？请[打开 issue](placeholder-link)。

发现安全漏洞？请[私下报告](placeholder-link)。

对于安全漏洞，**不要打开公开的 issue**。请通过上方的"私下报告"链接
或此 GitHub 配置文件上列出的电子邮件联系我们。我们会将其转发给安全
团队，以便尽快修复。

---

## 许可证

Apache License 2.0 — 见 [LICENSE](../LICENSE)。
