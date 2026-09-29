<p align="center">
  <img src="../.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# Vidix Player

Vidix Player es una biblioteca de componentes lista para usar para el reproductor de vídeo de la plataforma Vidix. Soporta muchos idiomas, un botón para compartir, selección automática de servidor con cantidad configurable, y un botón de descarga que aparece automáticamente si la configuración de tu plataforma Vidix lo permite.
Todo se puede configurar desde atributos HTML o las props del framework disponibles.

Crea una cuenta de Vidix y empieza a subir contenido: [Plataforma Vidix](https://vidix.mekbrut.com)

## Idiomas

Esta documentación está disponible en los siguientes idiomas:

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

## Tabla de contenidos

- [Para propietarios de sitios (incluidos desarrolladores)](#para-propietarios-de-sitios-incluidos-desarrolladores)
  - [Cómo usarlo en tu sitio](#cómo-usarlo-en-tu-sitio)
    - [Vanilla JS](#vanilla-js)
      - [Idiomas soportados](#idiomas-soportados)
    - [React](#react)
    - [Astro](#astro)
    - [Svelte / Kit](#svelte--kit)
    - [Iframe manual](#iframe-manual)
  - [Avanzado](#avanzado)
  - [Solución de problemas](#solución-de-problemas)
- [Transparencia y tolerancia](#transparencia-y-tolerancia)
- [Contribuir al repositorio](#contribuir-al-repositorio)
- [Informar de bugs y vulnerabilidades de seguridad](#informar-de-bugs-y-vulnerabilidades-de-seguridad)

---

## Para propietarios de sitios (incluidos desarrolladores)

Vidix Player se integra completamente con muchos frameworks. Usa el componente
que sea compatible con tu sitio.

### Cómo usarlo en tu sitio

### Vanilla JS

Adecuado para HTML nativo, PHP y otros entornos que no se ejecutan en
Node.js / un empaquetador de JavaScript.

#### Script alojado

Coloca este script dentro del `<head>...</head>` de la página donde quieras
mostrar `vidix-player`:

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>
```

#### El componente vidix-player

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

#### Atributos

| Prop/attr                  | Requerido | Tipo        | Por defecto         | Descripción                                                                                                       |
| -------------------------- | --------- | ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `playback-id`              | **Sí**    | string      | —                   | El ID de vídeo generado a partir de la subida de tu vídeo en la plataforma Vidix, p. ej. `tUVARXFmPnT`. Sin esto el reproductor no renderiza nada. |
| `lang`                     | No        | string      | `<html lang>`, `en` | Idioma de la interfaz, p. ej. `id`, `en`, `es_419`, `zh_tw`, `vi`. Lista completa: [Idiomas soportados](#idiomas-soportados). Los valores desconocidos pasan a `<html lang>`, luego a `en`. |
| `accent-color`             | No        | string      | (predeterminado del tema) | Color de acento del reproductor. Uno de: `vidix`, `default`, `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`. Otros valores se ignoran. |
| `layout-control-position`  | No        | string      | `bottom`            | Posición de la barra de control: `bottom` o `top`.                                                                |
| `layout-control-accent`    | No        | string      | (predeterminado del tema) | Color de acento de los botones de la barra de control (botón de compartir, selección de servidor y descarga). Misma lista de valores que `accent-color`. |
| `control-share`            | No        | boolean     | `true`              | Mostrar el botón de compartir + su diálogo. El enlace compartido es el enlace de tu sitio, no el enlace directo del vídeo ni el del embebido. |
| `control-server-count`     | No        | number      | `3`                 | Número de servidores en el menú de selección de servidor. Rango `0`–`10`; el menú aparece a partir de `≥ 2`.       |
| `control-download`         | No        | boolean     | `true`              | Mostrar el botón de descarga del vídeo. El botón puede desaparecer automáticamente si desactivaste las descargas en la configuración de la plataforma Vidix, incluso si lo pones a `true`. |
| `metadata-video-title`     | No        | string      | —                   | Título del vídeo para accesibilidad (etiqueta `aria`) y para el botón de descarga.                                |
| `metadata-thumbnail-url`   | No        | string (URL)| —                   | URL de la imagen thumbnail/poster. Se usa como placeholder blur-up antes de que el vídeo esté listo.              |
| `metadata-server-title`    | No        | boolean     | `true`              | Mostrar el nombre/título proporcionado por el servidor en el reproductor. Ponlo a `"false"` para ocultarlo.        |
| `loading`                  | No        | string      | (predeterminado del navegador) | Cuándo cargar el iframe del reproductor: `eager` (inmediatamente) o `lazy` (cuando esté casi visible). Otros valores se ignoran. |
| `console-log`              | No        | boolean     | `false`             | Ponlo a `"true"` para registrar mensajes de diagnóstico en la consola de DevTools. Actívalo si tienes problemas de integración — se verán con claridad en la consola de DevTools. |
| `role`, `aria-label`       | No        | —           | —                   | Atributos de accesibilidad HTML estándar; se pasan tal cual.                                                      |

#### Idiomas soportados

El reproductor reconoce **71 códigos de locale** en 37 idiomas. Los códigos se
pueden escribir con guiones o guiones bajos (`en-GB` se trata igual que
`en_gb`) y no distinguen mayúsculas de minúsculas.

| Idioma                    | Códigos `lang`                                 |
| ------------------------- | ---------------------------------------------- |
| Alemán                    | `de`, `de_at`                                  |
| Búlgaro                   | `bg`                                           |
| Catalán                   | `ca`                                           |
| Checo                     | `cs`                                           |
| Chino                     | `zh`, `zh_cn`, `zh_hk`, `zh_tw`                |
| Coreano                   | `ko`                                           |
| Danés                     | `da`                                           |
| Eslovaco                  | `sk`                                           |
| Esloveno                  | `sl`                                           |
| Español                   | `es`, `es_419`, `es_ar`, `es_cl`, `es_co`, `es_cr`, `es_do`, `es_ec`, `es_sv`, `es_gt`, `es_hn`, `es_mx`, `es_ni`, `es_pa`, `es_pe`, `es_pr`, `es_py`, `es_us`, `es_uy`, `es_ve` |
| Estonio                   | `et`                                           |
| Filipino                  | `fil`                                          |
| Finés                     | `fi`                                           |
| Francés                   | `fr`, `fr_ca`, `fr_ch`                         |
| Griego                    | `el`                                           |
| Hindi                     | `hi`                                           |
| Holandés                  | `nl`                                           |
| Húngaro                   | `hu` _(texto en inglés por ahora)_             |
| Indonesio                 | `id`                                           |
| Inglés                    | `en`, `en_au`, `en_ca`, `en_gb`, `en_ie`, `en_in`, `en_sg`, `en_za` |
| Islandés                  | `is`                                           |
| Italiano                  | `it`                                           |
| Japonés                   | `ja`                                           |
| Letón                     | `lv`                                           |
| Lituano                   | `lt`                                           |
| Malayo                    | `ms`                                           |
| Noruego                   | `no`                                           |
| Polaco                    | `pl`                                           |
| Portugués                 | `pt` _(texto en inglés por ahora)_, `pt_br`, `pt_pt` |
| Rumano                    | `ro`                                           |
| Ruso                      | `ru`                                           |
| Serbio                    | `sr`                                           |
| Sueco                     | `sv`                                           |
| Tailandés                 | `th`                                           |
| Turco                     | `tr`                                           |
| Ucraniano                 | `uk`                                           |
| Vietnamita                | `vi`                                           |

Notas:

- Las variantes regionales sin su propio diccionario (p. ej. `en_gb`, `es_mx`,
  `fr_ca`) usan automáticamente el diccionario del idioma base.
- Los códigos que aún no tienen su propio diccionario (`hu`, `pt`) muestran
  texto en inglés temporalmente. Usa sus variantes regionales (`pt_br`/`pt_pt`)
  para obtener el texto en ese idioma.
- Los códigos fuera de la lista anterior pasan a `<html lang>`, luego a `en`.

### React

#### Instalar

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

Requiere React 18 o 19 como peer dependency; el core (`@mekbrut-com/vidix-player`) y los
helpers compartidos se incluyen como dependencias.

#### Montar el componente

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

| Prop                       | Atributo                     | Tipo                  | Por defecto         | Descripción                                                    |
| -------------------------- | ---------------------------- | --------------------- | ------------------- | -------------------------------------------------------------- |
| `playbackId`               | `playback-id`                | `string`              | —                   | ID de vídeo. Obligatorio.                                      |
| `lang`                     | `lang`                       | `string`              | `<html lang>` / `en`| Idioma de la UI; 71 códigos de locale soportados — [lista completa](#idiomas-soportados). |
| `accentColor`              | `accent-color`               | `AccentColor`         | —                   | Color de acento de la UI.                                      |
| `loading`                  | `loading`                    | `"eager"` \| `"lazy"` | —                   | Comportamiento de carga del iframe/blur-up.                    |
| `consoleLog`               | `console-log`                | `boolean`             | `false`             | Registra diagnósticos de `[vidix-player]` en la consola. Solo dev. |
| `lqip`                     | _wrapper-only_               | `boolean`             | `true`              | Mostrar un placeholder blur-up (ver [Avanzado](#avanzado)).    |
| **`metadata`**             |                              |                       |                     |                                                                |
| `metadata.videoTitle`      | `metadata-video-title`       | `string`              | —                   | Título del iframe, etiqueta de descarga, texto de share.       |
| `metadata.thumbnailUrl`    | `metadata-thumbnail-url`     | `string`              | —                   | Poster usado como placeholder blur-up. URL http(s) absoluta.   |
| `metadata.thumbnailLqip`   | _wrapper-only_               | `string`              | —                   | Placeholder explícito; sobrescribe `thumbnailUrl` para el blur-up. |
| `metadata.serverTitle`     | `metadata-server-title`      | `boolean`             | `true`              | Usar el título de la respuesta del servidor.                   |
| **`layout`**               |                              |                       |                     |                                                                |
| `layout.controlPosition`   | `layout-control-position`    | `"bottom"` \| `"top"` | `"bottom"`          | Posición de la barra de control.                               |
| `layout.controlAccent`     | `layout-control-accent`      | `AccentColor`         | —                   | Color de acento de los botones de la barra de control (independiente de `accentColor`). |
| **`control`**              |                              |                       |                     |                                                                |
| `control.share`            | `control-share`              | `boolean`             | `true`              | Mostrar el botón de compartir + diálogo.                       |
| `control.serverCount`      | `control-server-count`       | `number`              | `3`                 | Servidores en el selector, limitado `0`–`10`; se muestra a `2`+. |
| `control.download`         | `control-download`           | `boolean`             | `true`              | Mostrar el botón de descarga (el servidor todavía puede ocultarlo). |
| **events**                 |                              |                       |                     |                                                                |
| `onServerData`             | `vidix:server-data`          | `(detail) => void`    | —                   | Se dispara con `{ serverCount }` cuando se resuelve la lista de servidores. |
| `onServerSelect`           | `vidix:server-select`        | `(detail) => void`    | —                   | Se dispara con `{ value }` cuando el usuario elige un servidor. |

### Astro

El wrapper de Astro renderiza un esqueleto Declarative Shadow DOM en el
servidor: la caja 16:9 + el CSS crítico están presentes **antes de que se
cargue cualquier JavaScript**, por lo que el desplazamiento de layout (CLS) al
hidratar es ~0.

#### Instalar

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

Requiere Astro 4+ como peer dependency.

#### Montar el componente

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

La lista de props es la misma que [React](#props), excepto que Astro no tiene
las props de evento `onServerData` / `onServerSelect`. Adjunta tus propios
listeners en un script del lado del cliente si los necesitas:

```astro
<script>
  document.querySelector("vidix-player")?.addEventListener("vidix:server-data", (event) => {
    console.log("servers:", event.detail.serverCount);
  });
</script>
```

### Svelte / Kit

#### Instalar

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

Requiere Svelte 5 como peer dependency.

#### Montar el componente

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

La lista de props y eventos es la misma que [React](#props) (Svelte 5 usa las
callback props `onServerData` / `onServerSelect`, no el `createEventDispatcher`
obsoleto).

### Iframe manual

Un iframe manual es un iframe semántico HTML normal, por lo que solo tiene un servidor: el servidor que elegiste en la plataforma Vidix.

La plataforma Vidix proporciona o genera esta etiqueta iframe a partir del vídeo que subiste — simplemente cópiala de la plataforma Vidix y embebe en tu sitio:

```html
<iframe
  src="https://..."
  title="Example videos"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

---

## Avanzado

**Reglas de booleanos en Vanilla JS:** los atributos booleanos se activan con
solo escribir su nombre (o `="true"`), y se desactivan con `="false"`. Ejemplo:
`control-share="false"`.

**Las props son configuración en el momento del montaje.** El core lee los
atributos una sola vez en `connectedCallback` (no hay `observedAttributes`),
así que cambiar las props después del montaje no actualiza el reproductor en
marcha. Proporciona una `key` (React/Svelte) o vuelve a montar el elemento
cuando la configuración deba cambiar:

```svelte
{#key playbackId}
  <VidixPlayer {playbackId} />
{/key}
```

**Tema claro/oscuro**

El reproductor sigue el tema de la página automáticamente, sin atributos
adicionales:

- Si `<html data-theme="dark">` (o la clase `dark`) está presente → modo oscuro.
- Si `<html data-theme="light">` (o la clase `light`) está presente → modo claro.
- Si ninguno está presente → sigue el `prefers-color-scheme` del sistema del
  usuario.

**Notas de seguridad (CSP / Trusted Types)**

El reproductor está diseñado para ser compatible con CSP estricto:

- **Sin `eval`, sin manejadores de eventos en línea** — seguro bajo un
  `script-src` estricto.
- **Los estilos se instalan vía `adoptedStyleSheets`**, no con etiquetas
  `<style>` inyectadas — compatible con `style-src` sin `'unsafe-inline'`.
- Si tu sitio aplica `require-trusted-types-for 'script'`, añade el nombre de
  la policy **`vidix-player`** a tu allowlist de `trusted-types`. Sin ese
  nombre, el reproductor no puede renderizarse bajo ese CSP.

## Solución de problemas

- **El reproductor no aparece en absoluto** — comprueba `playback-id`
  (obligatorio) y activa `console-log="true"` para ver los mensajes en
  DevTools.
- **Falta la barra de control** — la barra de control solo aparece si al menos
  uno de `control-share`, `control-server-count` (≥ 2), o `control-download`
  está activo.
- **El tema no coincide** — asegúrate de que no hay un `data-theme` conflictivo
  en otra etiqueta; el reproductor lee el tema del elemento `<html>`.

---

## Transparencia y tolerancia

### Límite de peticiones: 20 req/min por IP del espectador

Limitamos a cada visitante de tu sitio a ver el vídeo aparecer como máximo
20× por minuto. 20 veces por minuto ya es mucho — de 4 a 5 veces mayor que el
uso habitual. Normalmente, más de 20 veces por minuto es un bot o una
automatización atacando tu sitio.

El conteo se basa en la IP del espectador. Por ejemplo, el espectador A (un
humano), el espectador B (un bot atacante), y C (un crawler de un motor de
búsqueda):

- El espectador B (el bot atacante) hace scraping para obtener vídeos en masa
  → el backend de Vidix Player lo bloquea.
- El espectador A (un humano) y C (un crawler de un motor de búsqueda) siguen
  pudiendo acceder sin ninguna interrupción.

Indirectamente, esto protege tus vídeos de los bots (lo que normalmente
significa ladrones de contenido), manteniendo el backend de Vidix Player
funcionando con normalidad (para que no se caiga por culpa de un atacante).

### Infraestructura, lenguajes del backend y edge

**La infraestructura se ejecuta en la Unión Europea.** Todo el procesamiento
del backend se ejecuta y gestiona completamente en la región de la Unión
Europea mediante balanceo de carga de las peticiones. Esta es una de las
razones por las que Vidix es una opción segura y rápida.

**Lenguajes del backend.** Somos abiertos sobre el hecho de que usamos varios
lenguajes del backend a la vez para mantener este servicio óptimo:

- **Rust** — aproximadamente el 60% para la API.
- **Go** — aproximadamente el 25%, ayudando a Rust a procesar datos porque
  necesita un garbage collector y la velocidad de su compilador.
- **Python** — aproximadamente el 10% para automatización entre bastidores.
- **Shell** — el resto, para ejecutar la infraestructura, el cron y otras
  necesidades para que las conexiones se mantengan activas.

**Red edge.** Usamos servicios edge de varios proveedores: un graduado de
startup de YCombinator que prefiere no ser nombrado, Cloudflare, AWS, Akamai,
Oracle e IBM.

Por el momento no usamos GCP porque no queremos que la gestión de la red sea
tocada por IA (Gemini). Se podría configurar, pero elegimos no usarlo por
ahora, para que el GDPR de Vidix siempre pueda funcionar sin interferencia de
terceros.

---

## Contribuir al repositorio

Agradeceríamos mucho tu ayuda en el desarrollo de Vidix Player. Por favor,
envía un pull request. ¡Gracias por ayudarnos a desarrollar esta biblioteca de
componentes!

¿No estás seguro de por dónde empezar a contribuir? Aquí tienes tu mapa.

### Mapa del código (code-tree)

```
vidix-player/
├── packages/
│   ├── vidix-player/          librería core (fuente de la verdad; TypeScript)
│   ├── vidix-player-shared/   helpers de prop/atributo/imagen compartidos para wrappers
│   ├── vidix-player-astro/    wrapper Astro (esqueleto SSR, zero layout shift)
│   ├── vidix-player-react/    wrapper React (SSR-friendly, "use client")
│   └── vidix-player-svelte/   wrapper Svelte 5 (SSR-friendly, source-shipping)
├── e2e/                       tests Playwright + fixtures (no publicado)
│   ├── astro-app/             páginas de paridad Astro
│   ├── react-app/             páginas de paridad React (Vite SSR)
│   ├── svelte-app/            páginas de paridad Svelte (Vite SSR)
│   ├── vanillajs-app/         página de paridad vanilla JS (QA manual)
│   └── tests/                 specs de paridad
├── biome.json                 config de lint + format
├── tsconfig.base.json         config base de TypeScript
└── pnpm-workspace.yaml        definición del workspace
```

Para el entorno de desarrollo necesitas Node.js 18+ y
[pnpm](https://pnpm.io):

```bash
pnpm install
pnpm build       # build de todos los paquetes en packages/*
pnpm typecheck   # typecheck de todos los paquetes
pnpm lint        # biome check
pnpm test:e2e    # tests de paridad Playwright (ver ./e2e)
```

### Páginas de prueba por framework (E2E)

Cada wrapper tiene una página de paridad para que QA y revisores puedan
compararla con el core vanilla antes del lanzamiento:

| Página                      | Cómo ejecutar                                                    |
| --------------------------- | ---------------------------------------------------------------- |
| Vanilla (`e2e/vanillajs-app`) | `pnpm --filter vidix-player-vanillajs-e2e run preview` → `:3713` |
| Astro (`e2e/astro-app`)     | `pnpm --filter vidix-player-astro-e2e run preview` → `:3712`      |
| React (`e2e/react-app`)     | `pnpm --filter vidix-player-react-e2e run preview` → `:3714`      |
| Svelte (`e2e/svelte-app`)   | `pnpm --filter vidix-player-svelte-e2e run preview` → `:3715`      |

Las cuatro páginas renderizan los dos mismos reproductores (con diferente
accent, posición de control e idioma) para que el core vanilla y cada wrapper
se puedan comparar lado a lado. La página vanilla usa el core ya construido
exactamente como la etiqueta CDN (`/dist/vidix-player.js`); las páginas de
React y Svelte prueban la ruta SSR + hidratación (solo atributos en el HTML
del servidor — sin Declarative Shadow DOM, que ni React ni Svelte pueden
hidratar). La paridad automática está en `e2e/tests`:

- `pnpm test:e2e` ejecuta los cuatro proyectos de Playwright (`chromium` para
  vanilla, `astro`, `react` y `svelte` para los wrappers) y asegura:
  vanilla/Astro envían el esqueleto antes que el JavaScript (el wrapper de
  Astro vía Declarative Shadow DOM), los wrappers de React y Svelte envían el
  elemento pelado con atributos y sin DSD, la geometría mantiene las
  invariantes de la caja 16:9 + barra de control en cada caso, y el iframe,
  el diálogo de share y la selección de servidor funcionan todos después de
  la hidratación.

El `csp-tt.spec.ts` de vanilla es la gate de strict-CSP; el wrapper de Astro
inlinea el CSS crítico en su esqueleto SSR, así que no comprueba el CSP
estricto (ver `packages/vidix-player-astro/README.md`).

> Puedes usar IA para entender el código y hacer arreglos. El merge se hace después de que tu push sea revisado por el equipo de Vidix o un colaborador OSS de confianza.

---

## Informar de bugs y vulnerabilidades de seguridad

¿Encontraste un bug? Por favor [abre un issue](placeholder-link).

¿Encontraste una vulnerabilidad de seguridad? [Infórmala de forma privada](placeholder-link).

Para vulnerabilidades de seguridad, **no abras un issue público**. Contáctanos
a través del enlace "Infórmala de forma privada" de arriba o a través del
email listado en este perfil de GitHub. Lo reenviaremos al equipo de seguridad
para arreglarlo lo antes posible.

---

## Licencia

Apache License 2.0 — ver [LICENSE](../LICENSE).
