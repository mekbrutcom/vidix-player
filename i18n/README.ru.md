<p align="center">
  <img src="../.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# Vidix Player

Vidix Player — это готовая к использованию библиотека компонентов для видеоплеера платформы Vidix. Поддерживает множество языков, кнопку «поделиться», автоматический выбор сервера с настраиваемым количеством, а также кнопку загрузки, которая появляется автоматически, если это включено в настройках вашей платформы Vidix.
Всё настраивается через HTML-атрибуты или доступные props фреймворка.

Создайте аккаунт Vidix и начните загружать контент: [Платформа Vidix](https://vidix.mekbrut.com)

## Языки

Эта документация доступна на следующих языках:

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

## Содержание

- [Для владельцев сайтов (включая разработчиков)](#для-владельцев-сайтов-включая-разработчиков)
  - [Как использовать на вашем сайте](#как-использовать-на-вашем-сайте)
    - [Vanilla JS](#vanilla-js)
      - [Поддерживаемые языки](#поддерживаемые-языки)
    - [React](#react)
    - [Astro](#astro)
    - [Svelte / Kit](#svelte--kit)
    - [Ручной iframe](#ручной-iframe)
  - [Продвинутые настройки](#продвинутые-настройки)
  - [Устранение неполадок](#устранение-неполадок)
- [Прозрачность и терпимость](#прозрачность-и-терпимость)
- [Вклад в репозиторий](#вклад-в-репозиторий)
- [Сообщить об ошибках и уязвимостях безопасности](#сообщить-об-ошибках-и-уязвимостях-безопасности)

---

## Для владельцев сайтов (включая разработчиков)

Vidix Player полностью интегрируется со многими фреймворками. Используйте
компонент, совместимый с вашим сайтом.

### Как использовать на вашем сайте

### Vanilla JS

Подходит для нативного HTML, PHP и других сред, не работающих на
Node.js / сборщике JavaScript.

#### Размещаемый скрипт

Поместите этот скрипт внутри `<head>...</head>` страницы, где вы хотите
отображать `vidix-player`:

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>
```

#### Компонент vidix-player

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

#### Атрибуты

| Prop/attr                  | Обязательно | Тип         | По умолчанию        | Описание                                                                                                         |
| -------------------------- | ----------- | ----------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `playback-id`              | **Да**      | string      | —                   | ID видео, сгенерированный из загруженного вами видео на платформе Vidix, например `tUVARXFmPnT`. Без этого плеер ничего не отображает. |
| `lang`                     | Нет         | string      | `<html lang>`, `en` | Язык интерфейса, например `id`, `en`, `es_419`, `zh_tw`, `vi`. Полный список: [Поддерживаемые языки](#поддерживаемые-языки). Неизвестные значения переходят к `<html lang>`, затем к `en`. |
| `accent-color`             | Нет         | string      | (по умолчанию у темы) | Акцентный цвет плеера. Один из: `vidix`, `default`, `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`. Остальные значения игнорируются. |
| `layout-control-position`  | Нет         | string      | `bottom`            | Позиция панели управления: `bottom` или `top`.                                                                   |
| `layout-control-accent`    | Нет         | string      | (по умолчанию у темы) | Акцентный цвет кнопок на панели управления (кнопка «поделиться», выбор сервера и загрузка). Тот же список значений, что и `accent-color`. |
| `control-share`            | Нет         | boolean     | `true`              | Показывать кнопку «поделиться» + её диалог. Общей ссылкой является ссылка на ваш сайт, а не прямая ссылка на видео или ссылка на встраивание. |
| `control-server-count`     | Нет         | number      | `3`                 | Количество серверов в меню выбора сервера. Диапазон `0`–`10`; меню появляется при `≥ 2`.                          |
| `control-download`         | Нет         | boolean     | `true`              | Показывать кнопку загрузки видео. Кнопка может автоматически исчезнуть, если вы отключили загрузки в настройках платформы Vidix, даже если установите `true`. |
| `metadata-video-title`     | Нет         | string      | —                   | Название видео для доступности (метка `aria`) и кнопки загрузки.                                                 |
| `metadata-thumbnail-url`   | Нет         | string (URL)| —                   | URL-адрес изображения-превью/постера. Используется как размытый placeholder (blur-up) до готовности видео.        |
| `metadata-server-title`    | Нет         | boolean     | `true`              | Показывать имя/название, предоставленное сервером, в плеере. Установите `"false"`, чтобы скрыть.                 |
| `loading`                  | Нет         | string      | (по умолчанию браузера) | Когда загружать iframe плеера: `eager` (немедленно) или `lazy` (когда почти виден). Остальные значения игнорируются. |
| `console-log`              | Нет         | boolean     | `false`             | Установите `"true"`, чтобы записывать диагностические сообщения в консоль DevTools. Включите, если у вас проблемы с интеграцией — они будут чётко видны в консоли DevTools. |
| `role`, `aria-label`       | Нет         | —           | —                   | Стандартные атрибуты доступности HTML; передаются как есть.                                                      |

#### Поддерживаемые языки

Плеер распознаёт **71 код локали** для 37 языков. Коды могут записываться
через дефис или нижнее подчёркивание (`en-GB` обрабатывается так же, как
`en_gb`) и нечувствительны к регистру.

| Язык                     | Коды `lang`                                       |
| ------------------------ | ------------------------------------------------- |
| Английский               | `en`, `en_au`, `en_ca`, `en_gb`, `en_ie`, `en_in`, `en_sg`, `en_za` |
| Болгарский               | `bg`                                              |
| Венгерский               | `hu` _(пока английский текст)_                     |
| Вьетнамский              | `vi`                                              |
| Греческий                | `el`                                              |
| Датский                  | `da`                                              |
| Индонезийский            | `id`                                              |
| Исландский               | `is`                                              |
| Испанский                | `es`, `es_419`, `es_ar`, `es_cl`, `es_co`, `es_cr`, `es_do`, `es_ec`, `es_sv`, `es_gt`, `es_hn`, `es_mx`, `es_ni`, `es_pa`, `es_pe`, `es_pr`, `es_py`, `es_us`, `es_uy`, `es_ve` |
| Итальянский              | `it`                                              |
| Каталанский              | `ca`                                              |
| Китайский                | `zh`, `zh_cn`, `zh_hk`, `zh_tw`                   |
| Корейский                | `ko`                                              |
| Латышский                | `lv`                                              |
| Литовский                | `lt`                                              |
| Малайский                | `ms`                                              |
| Немецкий                 | `de`, `de_at`                                     |
| Нидерландский            | `nl`                                              |
| Норвежский               | `no`                                              |
| Польский                 | `pl`                                              |
| Португальский            | `pt` _(пока английский текст)_, `pt_br`, `pt_pt`  |
| Румынский                | `ro`                                              |
| Русский                  | `ru`                                              |
| Сербский                 | `sr`                                              |
| Словацкий                | `sk`                                              |
| Словенский               | `sl`                                              |
| Тайский                  | `th`                                              |
| Турецкий                 | `tr`                                              |
| Украинский               | `uk`                                              |
| Филиппинский             | `fil`                                             |
| Финский                  | `fi`                                              |
| Французский              | `fr`, `fr_ca`, `fr_ch`                            |
| Хинди                    | `hi`                                              |
| Чешский                  | `cs`                                              |
| Шведский                 | `sv`                                              |
| Эстонский                | `et`                                              |
| Японский                 | `ja`                                              |

Примечания:

- Региональные варианты без собственного словаря (например `en_gb`, `es_mx`,
  `fr_ca`) автоматически используют словарь базового языка.
- Коды, у которых пока нет собственного словаря (`hu`, `pt`), временно
  отображают английский текст. Используйте их региональные варианты
  (`pt_br`/`pt_pt`), чтобы получить текст на этом языке.
- Коды вне списка выше переходят к `<html lang>`, затем к `en`.

### React

#### Установка

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

Требуется React 18 или 19 в качестве peer dependency; ядро (`@mekbrut-com/vidix-player`) и
общие хелперы идут как зависимости.

#### Монтирование компонента

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

| Prop                       | Attribut                     | Type                  | По умолчанию        | Описание                                                    |
| -------------------------- | ---------------------------- | --------------------- | ------------------- | ---------------------------------------------------------- |
| `playbackId`               | `playback-id`                | `string`              | —                   | ID видео. Обязательно.                                      |
| `lang`                     | `lang`                       | `string`              | `<html lang>` / `en`| Язык UI; поддерживается 71 код локали — [полный список](#поддерживаемые-языки). |
| `accentColor`              | `accent-color`               | `AccentColor`         | —                   | Акцентный цвет UI.                                          |
| `loading`                  | `loading`                    | `"eager"` \| `"lazy"` | —                   | Поведение загрузки iframe/blur-up.                          |
| `consoleLog`               | `console-log`                | `boolean`             | `false`             | Записывает диагностику `[vidix-player]` в консоль. Только для разработки. |
| `lqip`                     | _wrapper-only_               | `boolean`             | `true`              | Показывать размытый placeholder (см. [Продвинутые настройки](#продвинутые-настройки)). |
| **`metadata`**             |                              |                       |                     |                                                            |
| `metadata.videoTitle`      | `metadata-video-title`       | `string`              | —                   | Заголовок iframe, метка загрузки, текст «поделиться».       |
| `metadata.thumbnailUrl`    | `metadata-thumbnail-url`     | `string`              | —                   | Постер, используемый как размытый placeholder. Абсолютный http(s) URL. |
| `metadata.thumbnailLqip`   | _wrapper-only_               | `string`              | —                   | Явный placeholder; переопределяет `thumbnailUrl` для blur-up. |
| `metadata.serverTitle`     | `metadata-server-title`      | `boolean`             | `true`              | Использовать заголовок из ответа сервера.                   |
| **`layout`**               |                              |                       |                     |                                                            |
| `layout.controlPosition`   | `layout-control-position`    | `"bottom"` \| `"top"` | `"bottom"`          | Позиция панели управления.                                  |
| `layout.controlAccent`     | `layout-control-accent`      | `AccentColor`         | —                   | Акцентный цвет кнопок панели управления (независимо от `accentColor`). |
| **`control`**              |                              |                       |                     |                                                            |
| `control.share`            | `control-share`              | `boolean`             | `true`              | Показывать кнопку «поделиться» + диалог.                    |
| `control.serverCount`      | `control-server-count`       | `number`              | `3`                 | Серверы в селекторе, ограничено `0`–`10`; показывается при `2`+. |
| `control.download`         | `control-download`           | `boolean`             | `true`              | Показывать кнопку загрузки (сервер всё ещё может её скрыть). |
| **events**                 |                              |                       |                     |                                                            |
| `onServerData`             | `vidix:server-data`          | `(detail) => void`    | —                   | Срабатывает с `{ serverCount }`, когда список серверов разрешён. |
| `onServerSelect`           | `vidix:server-select`        | `(detail) => void`    | —                   | Срабатывает с `{ value }`, когда пользователь выбирает сервер. |

### Astro

Обёртка Astro рендерит на сервере скелет Declarative Shadow DOM: блок 16:9 +
критический CSS присутствуют **до загрузки любого JavaScript**, поэтому сдвиг
вёрстки (CLS) при гидратации ~0.

#### Установка

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

Требуется Astro 4+ в качестве peer dependency.

#### Монтирование компонента

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

Список props такой же, как у [React](#props), за исключением того, что у Astro
нет props-событий `onServerData` / `onServerSelect`. Прикрепите собственные
слушатели в клиентском скрипте, если они нужны:

```astro
<script>
  document.querySelector("vidix-player")?.addEventListener("vidix:server-data", (event) => {
    console.log("servers:", event.detail.serverCount);
  });
</script>
```

### Svelte / Kit

#### Установка

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

Требуется Svelte 5 в качестве peer dependency.

#### Монтирование компонента

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

Список props и событий такой же, как у [React](#props) (Svelte 5 использует
callback props `onServerData` / `onServerSelect`, а не устаревший
`createEventDispatcher`).

### Ручной iframe

Ручной iframe — это обычный семантический HTML-iframe, поэтому у него только один сервер: тот, который вы выбрали на платформе Vidix.

Этот тег iframe предоставляется или генерируется платформой Vidix из загруженного вами видео — просто скопируйте его с платформы Vidix и вставьте на свой сайт:

```html
<iframe
  src="https://..."
  title="Example videos"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

---

## Продвинутые настройки

**Правила логических значений в Vanilla JS:** логические атрибуты включаются
просто написанием их имени (или `="true"`), а отключаются через `="false"`.
Пример: `control-share="false"`.

**Props — это конфигурация на момент монтирования.** Ядро читает атрибуты один
раз в `connectedCallback` (нет `observedAttributes`), поэтому изменение props
после монтирования не обновляет работающий плеер. Задайте `key` (React/Svelte)
или перемонтируйте элемент, когда конфигурацию нужно изменить:

```svelte
{#key playbackId}
  <VidixPlayer {playbackId} />
{/key}
```

**Светлая/тёмная тема**

Плеер автоматически следует теме страницы, без дополнительных атрибутов:

- Если присутствует `<html data-theme="dark">` (или класс `dark`) → тёмный
  режим.
- Если присутствует `<html data-theme="light">` (или класс `light`) → светлый
  режим.
- Если ничего нет → следует `prefers-color-scheme` системы пользователя.

**Заметки по безопасности (CSP / Trusted Types)**

Плеер разработан с учётом совместимости со строгим CSP:

- **Никакого `eval`, никаких инлайновых обработчиков событий** — безопасно при
  строгом `script-src`.
- **Стили устанавливаются через `adoptedStyleSheets`**, а не через
  инжектируемые теги `<style>` — совместимо с `style-src` без
  `'unsafe-inline'`.
- Если ваш сайт применяет `require-trusted-types-for 'script'`, добавьте имя
  политики **`vidix-player`** в ваш список разрешённых `trusted-types`. Без
  этого имени плеер не может отображаться под таким CSP.

## Устранение неполадок

- **Плеер вообще не отображается** — проверьте `playback-id` (обязательно) и
  включите `console-log="true"`, чтобы увидеть сообщения в DevTools.
- **Панель управления отсутствует** — панель управления появляется, только если
  активен хотя бы один из `control-share`, `control-server-count` (≥ 2) или
  `control-download`.
- **Тема не совпадает** — убедитесь, что нет конфликтующего `data-theme` на
  другом теге; плеер читает тему из элемента `<html>`.

---

## Прозрачность и терпимость

### Ограничение запросов: 20 запросов в минуту на IP зрителя

Мы ограничиваем каждого посетителя вашего сайта до 20× появлений видео в
минуту. 20 раз в минуту — это уже очень много — в 4–5 раз больше обычного
использования. Обычно более 20 раз в минуту — это бот или автоматизация,
атакующая ваш сайт.

Подсчёт ведётся по IP зрителя. Например, зритель A (человек), зритель B
(атакующий бот) и C (краулер поисковой системы):

- Зритель B (атакующий бот) скрапит видео в массовом порядке → бэкенд Vidix
  Player его блокирует.
- Зритель A (человек) и C (краулер поисковой системы) по-прежнему могут
  получить доступ без каких-либо помех.

Косвенно это защищает ваши видео от ботов (что обычно означает похитителей
контента), сохраняя при этом нормальную работу бэкенда Vidix Player (чтобы он
не упал из-за атакующего).

### Инфраструктура, языки бэкенда и edge

**Инфраструктура работает в Европейском союзе.** Вся обработка на бэкенде
полностью выполняется и обрабатывается в регионе Европейского союза путём
балансировки нагрузки запросов. Это одна из причин, по которым Vidix —
безопасный и быстрый выбор.

**Языки бэкенда.** Мы открыты в том, что используем сразу несколько языков
бэкенда, чтобы держать сервис оптимальным:

- **Rust** — около 60% для API.
- **Go** — около 25%, помогает Rust обрабатывать данные, так как ему нужен
  сборщик мусора и скорость его компилятора.
- **Python** — около 10% для скрытой автоматизации.
- **Shell** — остальное, для запуска инфраструктуры, cron и других нужд, чтобы
  соединения оставались активными.

**Edge-сеть.** Мы используем edge-сервисы нескольких провайдеров: один
выпускник стартапа YCombinator, который не хочет называться, Cloudflare, AWS,
Akamai, Oracle и IBM.

Пока мы не используем GCP, потому что не хотим, чтобы управлением сети
занимался ИИ (Gemini). Это можно было бы настроить, но мы пока выбираем не
использовать его, чтобы GDPR Vidix всегда мог работать без вмешательства
третьих сторон.

---

## Вклад в репозиторий

Мы были бы очень признательны за вашу помощь в разработке Vidix Player.
Пожалуйста, отправляйте pull request. Спасибо, что помогаете нам развивать эту
библиотеку компонентов!

Не уверены, с чего начать? Вот ваша карта.

### Карта кода (code-tree)

```
vidix-player/
├── packages/
│   ├── vidix-player/          основная библиотека (источник истины; TypeScript)
│   ├── vidix-player-shared/   общие хелперы prop/attribute/image для обёрток
│   ├── vidix-player-astro/    обёртка Astro (SSR-скелет, zero layout shift)
│   ├── vidix-player-react/    обёртка React (SSR-friendly, "use client")
│   └── vidix-player-svelte/   обёртка Svelte 5 (SSR-friendly, source-shipping)
├── e2e/                       тесты Playwright + фикстуры (не публикуется)
│   ├── astro-app/             страницы сравнения Astro
│   ├── react-app/             страницы сравнения React (Vite SSR)
│   ├── svelte-app/            страницы сравнения Svelte (Vite SSR)
│   ├── vanillajs-app/         страница сравнения vanilla JS (ручной QA)
│   └── tests/                 спецификации сравнения
├── biome.json                 конфигурация lint + format
├── tsconfig.base.json         базовая конфигурация TypeScript
└── pnpm-workspace.yaml        определение рабочего пространства
```

Для среды разработки вам нужен Node.js 18+ и [pnpm](https://pnpm.io):

```bash
pnpm install
pnpm build       # сборка всех пакетов в packages/*
pnpm typecheck   # проверка типов всех пакетов
pnpm lint        # biome check
pnpm test:e2e    # тесты сравнения Playwright (см. ./e2e)
```

### Тестовые страницы для каждого фреймворка (E2E)

У каждой обёртки есть страница сравнения (parity), чтобы QA и ревьюеры могли
сравнить её с ванильным ядром перед релизом:

| Страница                   | Как запустить                                                    |
| -------------------------- | ---------------------------------------------------------------- |
| Vanilla (`e2e/vanillajs-app`) | `pnpm --filter vidix-player-vanillajs-e2e run preview` → `:3713` |
| Astro (`e2e/astro-app`)    | `pnpm --filter vidix-player-astro-e2e run preview` → `:3712`      |
| React (`e2e/react-app`)    | `pnpm --filter vidix-player-react-e2e run preview` → `:3714`      |
| Svelte (`e2e/svelte-app`)  | `pnpm --filter vidix-player-svelte-e2e run preview` → `:3715`      |

Все четыре страницы рендерят два одинаковых плеера (с разными акцентом,
позицией управления и языком), чтобы ванильное ядро и каждую обёртку можно было
сравнить бок о бок. Ванильная страница использует собранное ядро точно так же,
как CDN-тег (`/dist/vidix-player.js`); страницы React и Svelte тестируют путь
SSR + гидратации (только атрибуты в серверном HTML — никакого Declarative
Shadow DOM, который ни React, ни Svelte не могут гидратировать). Автоматическое
сравнение находится в `e2e/tests`:

- `pnpm test:e2e` запускает все четыре проекта Playwright (`chromium` для
  ванили, `astro`, `react` и `svelte` для обёрток) и гарантирует:
  ваниль/Astro отправляют скелет до JavaScript (обёртка Astro через
  Declarative Shadow DOM), обёртки React и Svelte отправляют голый элемент с
  атрибутами и без DSD, геометрия сохраняет инварианты блока 16:9 + панели
  управления в каждом случае, а iframe, диалог «поделиться» и выбор сервера
  работают после гидратации.

Ванильный `csp-tt.spec.ts` — это гейт строгого CSP; обёртка Astro инлайнит
критический CSS в свой SSR-скелет, поэтому она не проверяет строгий CSP (см.
`packages/vidix-player-astro/README.md`).

> Вы можете использовать ИИ, чтобы понять код и внести исправления. Слияние происходит после того, как ваш push будет рассмотрен командой Vidix или доверенным OSS-коллаборатором.

---

## Сообщить об ошибках и уязвимостях безопасности

Нашли ошибку? Пожалуйста, [откройте issue](https://github.com/mekbrutcom/vidix-player/issues).

Нашли уязвимость безопасности? [Сообщите конфиденциально](https://mekbrut.com/contact/bug-report).

По уязвимостям безопасности **не открывайте публичный issue**. Свяжитесь с нами
по ссылке «Сообщите конфиденциально» выше или по электронной почте, указанной в
этом профиле GitHub. Мы передадим это команде безопасности, чтобы исправить как
можно скорее.

---

## Лицензия

Apache License 2.0 — см. [LICENSE](../LICENSE).
