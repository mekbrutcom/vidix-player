<p align="center">
  <img src="../.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# Vidix Player

Vidix Player est une bibliothèque de composants clé en main pour le lecteur vidéo de la plateforme Vidix. Elle prend en charge de nombreuses langues, un bouton de partage, une sélection automatique de serveur au nombre configurable, ainsi qu'un bouton de téléchargement qui apparaît automatiquement si vos paramètres sur la plateforme Vidix l'autorisent.
Tout se configure via des attributs HTML ou les props du framework disponibles.

Créez un compte Vidix et commencez à téléverser du contenu : [Plateforme Vidix](https://vidix.mekbrut.com)

## Langues

Cette documentation est disponible dans les langues suivantes :

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

## Table des matières

- [Pour les propriétaires de sites (y compris les développeurs)](#pour-les-propriétaires-de-sites-y-compris-les-développeurs)
  - [Utilisation sur votre site](#utilisation-sur-votre-site)
    - [Vanilla JS](#vanilla-js)
      - [Langues prises en charge](#langues-prises-en-charge)
    - [React](#react)
    - [Astro](#astro)
    - [Svelte / Kit](#svelte--kit)
    - [Iframe manuel](#iframe-manuel)
  - [Avancé](#avancé)
  - [Dépannage](#dépannage)
- [Transparence et tolérance](#transparence-et-tolérance)
- [Contribuer au dépôt](#contribuer-au-dépôt)
- [Signaler des bugs et des failles de sécurité](#signaler-des-bugs-et-des-failles-de-sécurité)

---

## Pour les propriétaires de sites (y compris les développeurs)

Vidix Player s'intègre pleinement à de nombreux frameworks. Utilisez le
composant compatible avec votre site.

### Utilisation sur votre site

### Vanilla JS

Convient au HTML natif, à PHP et à d'autres environnements qui ne tournent pas
sous Node.js / un bundler JavaScript.

#### Script hébergé

Placez ce script dans le `<head>...</head>` de la page où vous souhaitez
afficher `vidix-player` :

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>
```

#### Le composant vidix-player

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

#### Attributs

| Prop/attr                  | Requis   | Type        | Par défaut          | Description                                                                                                       |
| -------------------------- | -------- | ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `playback-id`              | **Oui**  | string      | —                   | L'ID vidéo généré depuis la mise en ligne de votre vidéo sur la plateforme Vidix, par ex. `tUVARXFmPnT`. Sans cela, le lecteur n'affiche rien. |
| `lang`                     | Non      | string      | `<html lang>`, `en` | Langue de l'interface, par ex. `id`, `en`, `es_419`, `zh_tw`, `vi`. Liste complète : [Langues prises en charge](#langues-prises-en-charge). Les valeurs inconnues retombent sur `<html lang>`, puis sur `en`. |
| `accent-color`             | Non      | string      | (par défaut du thème) | Couleur d'accentuation du lecteur. L'une de : `vidix`, `default`, `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`. Les autres valeurs sont ignorées. |
| `layout-control-position`  | Non      | string      | `bottom`            | Position de la barre de contrôle : `bottom` ou `top`.                                                            |
| `layout-control-accent`    | Non      | string      | (par défaut du thème) | Couleur d'accentuation des boutons de la barre de contrôle (bouton de partage, sélection de serveur et téléchargement). Même liste de valeurs que `accent-color`. |
| `control-share`            | Non      | boolean     | `true`              | Afficher le bouton de partage + sa boîte de dialogue. Le lien partagé est le lien de votre site, pas le lien direct de la vidéo ni le lien d'intégration. |
| `control-server-count`     | Non      | number      | `3`                 | Nombre de serveurs dans le menu de sélection de serveur. Plage `0`–`10` ; le menu apparaît à partir de `≥ 2`.       |
| `control-download`         | Non      | boolean     | `true`              | Afficher le bouton de téléchargement de la vidéo. Le bouton peut disparaître automatiquement si vous avez désactivé les téléchargements dans les paramètres de la plateforme Vidix, même si vous le mettez à `true`. |
| `metadata-video-title`     | Non      | string      | —                   | Titre de la vidéo pour l'accessibilité (étiquette `aria`) et le bouton de téléchargement.                        |
| `metadata-thumbnail-url`   | Non      | string (URL)| —                   | URL de l'image vignette/poster. Utilisée comme placeholder flou (blur-up) avant que la vidéo soit prête.           |
| `metadata-server-title`    | Non      | boolean     | `true`              | Afficher le nom/titre fourni par le serveur dans le lecteur. Mettez-le à `"false"` pour le masquer.               |
| `loading`                  | Non      | string      | (par défaut du navigateur) | Quand charger l'iframe du lecteur : `eager` (immédiatement) ou `lazy` (quand il est presque visible). Les autres valeurs sont ignorées. |
| `console-log`              | Non      | boolean     | `false`             | Mettez-le à `"true"` pour journaliser les messages de diagnostic dans la console DevTools. Activez-le si vous avez des problèmes d'intégration — ils apparaîtront clairement dans la console DevTools. |
| `role`, `aria-label`       | Non      | —           | —                   | Attributs d'accessibilité HTML standards ; transmis tels quels.                                                   |

#### Langues prises en charge

Le lecteur reconnaît **71 codes de locale** pour 37 langues. Les codes peuvent
être écrits avec des tirets ou des tirets bas (`en-GB` est traité comme
`en_gb`) et ne sont pas sensibles à la casse.

| Langue                    | Codes `lang`                                    |
| ------------------------- | ------------------------------------------------ |
| Allemand                  | `de`, `de_at`                                    |
| Anglais                   | `en`, `en_au`, `en_ca`, `en_gb`, `en_ie`, `en_in`, `en_sg`, `en_za` |
| Bulgare                   | `bg`                                             |
| Catalan                   | `ca`                                             |
| Chinois                   | `zh`, `zh_cn`, `zh_hk`, `zh_tw`                  |
| Coréen                    | `ko`                                             |
| Danois                    | `da`                                             |
| Espagnol                  | `es`, `es_419`, `es_ar`, `es_cl`, `es_co`, `es_cr`, `es_do`, `es_ec`, `es_sv`, `es_gt`, `es_hn`, `es_mx`, `es_ni`, `es_pa`, `es_pe`, `es_pr`, `es_py`, `es_us`, `es_uy`, `es_ve` |
| Estonien                  | `et`                                             |
| Filipino                  | `fil`                                            |
| Finnois                   | `fi`                                             |
| Français                  | `fr`, `fr_ca`, `fr_ch`                           |
| Grec                      | `el`                                             |
| Hindi                     | `hi`                                             |
| Hongrois                  | `hu` _(texte en anglais pour l'instant)_         |
| Indonésien                | `id`                                             |
| Islandais                 | `is`                                             |
| Italien                   | `it`                                             |
| Japonais                  | `ja`                                             |
| Letton                    | `lv`                                             |
| Lituanien                 | `lt`                                             |
| Malais                    | `ms`                                             |
| Néerlandais               | `nl`                                             |
| Norvégien                 | `no`                                             |
| Polonais                  | `pl`                                             |
| Portugais                 | `pt` _(texte en anglais pour l'instant)_, `pt_br`, `pt_pt` |
| Roumain                   | `ro`                                             |
| Russe                     | `ru`                                             |
| Serbe                     | `sr`                                             |
| Slovaque                  | `sk`                                             |
| Slovène                   | `sl`                                             |
| Suédois                   | `sv`                                             |
| Thaï                      | `th`                                             |
| Tchèque                   | `cs`                                             |
| Turc                      | `tr`                                             |
| Ukrainien                 | `uk`                                             |
| Vietnamien                | `vi`                                             |

Notes :

- Les variantes régionales sans leur propre dictionnaire (par ex. `en_gb`,
  `es_mx`, `fr_ca`) utilisent automatiquement le dictionnaire de la langue de
  base.
- Les codes qui n'ont pas encore leur propre dictionnaire (`hu`, `pt`)
  affichent temporairement du texte en anglais. Utilisez leurs variantes
  régionales (`pt_br`/`pt_pt`) pour obtenir le texte dans cette langue.
- Les codes hors de la liste ci-dessus retombent sur `<html lang>`, puis sur
  `en`.

### React

#### Installer

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

Nécessite React 18 ou 19 comme peer dependency ; le core (`@mekbrut-com/vidix-player`) et
les helpers partagés sont inclus en tant que dépendances.

#### Monter le composant

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

| Prop                       | Attribut                     | Type                  | Par défaut          | Description                                                    |
| -------------------------- | ---------------------------- | --------------------- | ------------------- | -------------------------------------------------------------- |
| `playbackId`               | `playback-id`                | `string`              | —                   | ID vidéo. Requis.                                              |
| `lang`                     | `lang`                       | `string`              | `<html lang>` / `en`| Langue de l'UI ; 71 codes de locale pris en charge — [liste complète](#langues-prises-en-charge). |
| `accentColor`              | `accent-color`               | `AccentColor`         | —                   | Couleur d'accentuation de l'UI.                                |
| `loading`                  | `loading`                    | `"eager"` \| `"lazy"` | —                   | Comportement de chargement de l'iframe/blur-up.                |
| `consoleLog`               | `console-log`                | `boolean`             | `false`             | Journalise les diagnostics `[vidix-player]` dans la console. Dev-only. |
| `lqip`                     | _wrapper-only_               | `boolean`             | `true`              | Afficher un placeholder blur-up (voir [Avancé](#avancé)).      |
| **`metadata`**             |                              |                       |                     |                                                                |
| `metadata.videoTitle`      | `metadata-video-title`       | `string`              | —                   | Titre de l'iframe, étiquette de téléchargement, texte de partage. |
| `metadata.thumbnailUrl`    | `metadata-thumbnail-url`     | `string`              | —                   | Poster utilisé comme placeholder blur-up. URL http(s) absolue. |
| `metadata.thumbnailLqip`   | _wrapper-only_               | `string`              | —                   | Placeholder explicite ; remplace `thumbnailUrl` pour le blur-up. |
| `metadata.serverTitle`     | `metadata-server-title`      | `boolean`             | `true`              | Utiliser le titre de la réponse du serveur.                    |
| **`layout`**               |                              |                       |                     |                                                                |
| `layout.controlPosition`   | `layout-control-position`    | `"bottom"` \| `"top"` | `"bottom"`          | Position de la barre de contrôle.                              |
| `layout.controlAccent`     | `layout-control-accent`      | `AccentColor`         | —                   | Couleur d'accentuation des boutons de la barre de contrôle (indépendante de `accentColor`). |
| **`control`**              |                              |                       |                     |                                                                |
| `control.share`            | `control-share`              | `boolean`             | `true`              | Afficher le bouton de partage + la boîte de dialogue.          |
| `control.serverCount`      | `control-server-count`       | `number`              | `3`                 | Serveurs dans le sélecteur, borné `0`–`10` ; affiché à `2`+.   |
| `control.download`         | `control-download`           | `boolean`             | `true`              | Afficher le bouton de téléchargement (le serveur peut encore le masquer). |
| **events**                 |                              |                       |                     |                                                                |
| `onServerData`             | `vidix:server-data`          | `(detail) => void`    | —                   | Se déclenche avec `{ serverCount }` quand la liste des serveurs est résolue. |
| `onServerSelect`           | `vidix:server-select`        | `(detail) => void`    | —                   | Se déclenche avec `{ value }` quand l'utilisateur choisit un serveur. |

### Astro

Le wrapper Astro rend côté serveur un squelette en Declarative Shadow DOM : la
boîte 16:9 + le CSS critique sont présents **avant que tout JavaScript ne se
charge**, donc le décalage de mise en page (CLS) à l'hydratation est ~0.

#### Installer

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

Requiert Astro 4+ comme peer dependency.

#### Monter le composant

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

La liste des props est la même que [React](#props), sauf qu'Astro n'a pas les
props d'événement `onServerData` / `onServerSelect`. Attachez vos propres
listeners dans un script côté client si vous en avez besoin :

```astro
<script>
  document.querySelector("vidix-player")?.addEventListener("vidix:server-data", (event) => {
    console.log("servers:", event.detail.serverCount);
  });
</script>
```

### Svelte / Kit

#### Installer

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

Requiert Svelte 5 comme peer dependency.

#### Monter le composant

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

La liste des props et événements est la même que [React](#props) (Svelte 5
utilise les callback props `onServerData` / `onServerSelect`, pas le
`createEventDispatcher` obsolète).

### Iframe manuel

Un iframe manuel est un iframe HTML sémantique classique, il n'a donc qu'un seul serveur : le serveur que vous avez choisi sur la plateforme Vidix.

Cette balise iframe est fournie ou générée par la plateforme Vidix à partir de la vidéo que vous avez mise en ligne — copiez-la simplement depuis la plateforme Vidix et intégrez-la à votre site :

```html
<iframe
  src="https://..."
  title="Example videos"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

---

## Avancé

**Règles des booléens en Vanilla JS :** les attributs booléens s'activent
simplement en écrivant leur nom (ou `="true"`), et se désactivent avec
`="false"`. Exemple : `control-share="false"`.

**Les props sont une configuration au montage.** Le core lit les attributs une
seule fois dans `connectedCallback` (il n'y a pas d'`observedAttributes`), donc
modifier les props après le montage ne met pas à jour le lecteur en cours.
Fournissez une `key` (React/Svelte) ou remontez l'élément quand la
configuration doit changer :

```svelte
{#key playbackId}
  <VidixPlayer {playbackId} />
{/key}
```

**Thème clair/sombre**

Le lecteur suit le thème de la page automatiquement, sans attribut
supplémentaire :

- Si `<html data-theme="dark">` (ou la classe `dark`) est présent → mode sombre.
- Si `<html data-theme="light">` (ou la classe `light`) est présent → mode clair.
- Si aucun des deux n'est présent → il suit le `prefers-color-scheme` du
  système de l'utilisateur.

**Notes de sécurité (CSP / Trusted Types)**

Le lecteur est conçu pour être compatible avec un CSP strict :

- **Pas d'`eval`, pas de gestionnaires d'événements en ligne** — sûr sous un
  `script-src` strict.
- **Les styles sont installés via `adoptedStyleSheets`**, pas via des balises
  `<style>` injectées — compatible avec `style-src` sans `'unsafe-inline'`.
- Si votre site applique `require-trusted-types-for 'script'`, ajoutez le nom
  de la policy **`vidix-player`** à votre allowlist `trusted-types`. Sans ce
  nom, le lecteur ne peut pas s'afficher sous ce CSP.

## Dépannage

- **Le lecteur n'apparaît pas du tout** — vérifiez `playback-id` (requis) et
  activez `console-log="true"` pour voir les messages dans DevTools.
- **La barre de contrôle est manquante** — la barre de contrôle n'apparaît que
  si au moins l'un de `control-share`, `control-server-count` (≥ 2), ou
  `control-download` est actif.
- **Le thème ne correspond pas** — assurez-vous qu'il n'y a pas de `data-theme`
  conflictuel sur une autre balise ; le lecteur lit le thème depuis l'élément
  `<html>`.

---

## Transparence et tolérance

### Limite de débit : 20 req/min par IP de spectateur

Nous limitons chaque visiteur de votre site à voir la vidéo apparaître au
maximum 20× par minute. 20 fois par minute est déjà très élevé — 4 à 5 fois
plus que l'usage habituel. En général, plus de 20 fois par minute est un bot
ou une automatisation qui attaque votre site.

Le comptage est basé sur l'IP du spectateur. Par exemple, le spectateur A (un
humain), le spectateur B (un bot attaquant), et C (un crawler de moteur de
recherche) :

- Le spectateur B (le bot attaquant) scrape pour récupérer des vidéos en masse
  → le backend de Vidix Player le bloque.
- Le spectateur A (un humain) et C (un crawler de moteur de recherche) peuvent
  toujours accéder sans aucune perturbation.

Indirectement, cela protège vos vidéos des bots (ce qui signifie généralement
des voleurs de contenu), tout en gardant le backend de Vidix Player en
fonctionnement normal (pour qu'il ne tombe pas à cause d'un attaquant).

### Infrastructure, langages du backend et edge

**L'infrastructure tourne dans l'Union européenne.** Tout le traitement du
backend s'exécute et est géré entièrement dans la région de l'Union européenne
en répartissant la charge des requêtes. C'est une des raisons pour lesquelles
Vidix est un choix sûr et rapide.

**Langages du backend.** Nous sommes transparents sur le fait que nous
utilisons plusieurs langages du backend à la fois pour garder ce service
optimal :

- **Rust** — environ 60% pour l'API.
- **Go** — environ 25%, aide Rust à traiter les données car il a besoin d'un
  garbage collector et de la vitesse de son compilateur.
- **Python** — environ 10% pour l'automatisation en coulisses.
- **Shell** — le reste, pour faire tourner l'infrastructure, le cron et
  d'autres besoins afin que les connexions restent actives.

**Réseau edge.** Nous utilisons des services edge de plusieurs fournisseurs :
un diplômé de startup YCombinator qui préfère ne pas être nommé, Cloudflare,
AWS, Akamai, Oracle et IBM.

Nous n'utilisons pas GCP pour le moment car nous ne voulons pas que la gestion
du réseau soit touchée par l'IA (Gemini). Ça pourrait être configuré, mais nous
choisissons de ne pas l'utiliser pour l'instant, pour que le GDPR de Vidix
puisse toujours fonctionner sans interférence de tiers.

---

## Contribuer au dépôt

Nous apprécierions grandement votre aide pour développer Vidix Player. Merci
d'envoyer un pull request. Merci de nous aider à développer cette bibliothèque
de composants !

Pas sûr de par où commencer à contribuer ? Voici votre carte.

### Carte du code (code-tree)

```
vidix-player/
├── packages/
│   ├── vidix-player/          librairie core (source de vérité ; TypeScript)
│   ├── vidix-player-shared/   helpers de prop/attribut/image partagés pour les wrappers
│   ├── vidix-player-astro/    wrapper Astro (squelette SSR, zero layout shift)
│   ├── vidix-player-react/    wrapper React (SSR-friendly, "use client")
│   └── vidix-player-svelte/   wrapper Svelte 5 (SSR-friendly, source-shipping)
├── e2e/                       tests Playwright + fixtures (non publié)
│   ├── astro-app/             pages de parité Astro
│   ├── react-app/             pages de parité React (Vite SSR)
│   ├── svelte-app/            pages de parité Svelte (Vite SSR)
│   ├── vanillajs-app/         page de parité vanilla JS (QA manuel)
│   └── tests/                 specs de parité
├── biome.json                 config lint + format
├── tsconfig.base.json         config TypeScript de base
└── pnpm-workspace.yaml        définition du workspace
```

Pour l'environnement de développement, vous avez besoin de Node.js 18+ et de
[pnpm](https://pnpm.io) :

```bash
pnpm install
pnpm build       # build de tous les packages dans packages/*
pnpm typecheck   # typecheck de tous les packages
pnpm lint        # biome check
pnpm test:e2e    # tests de parité Playwright (voir ./e2e)
```

### Pages de test par framework (E2E)

Chaque wrapper a une page de parité pour que QA et les relecteurs puissent la
comparer au core vanilla avant la release :

| Page                        | Comment l'exécuter                                               |
| --------------------------- | ---------------------------------------------------------------- |
| Vanilla (`e2e/vanillajs-app`) | `pnpm --filter vidix-player-vanillajs-e2e run preview` → `:3713` |
| Astro (`e2e/astro-app`)     | `pnpm --filter vidix-player-astro-e2e run preview` → `:3712`      |
| React (`e2e/react-app`)     | `pnpm --filter vidix-player-react-e2e run preview` → `:3714`      |
| Svelte (`e2e/svelte-app`)   | `pnpm --filter vidix-player-svelte-e2e run preview` → `:3715`      |

Les quatre pages rendent les deux mêmes lecteurs (accentuation, position des
contrôles et langue différentes) pour que le core vanilla et chaque wrapper
puissent être comparés côte à côte. La page vanilla utilise le core déjà
construit exactement comme la balise CDN (`/dist/vidix-player.js`) ; les pages
React et Svelte testent la voie SSR + hydratation (attributs uniquement dans le
HTML serveur — pas de Declarative Shadow DOM, que ni React ni Svelte ne peuvent
hydrater). La parité automatique est dans `e2e/tests` :

- `pnpm test:e2e` exécute les quatre projets Playwright (`chromium` pour
  vanilla, `astro`, `react` et `svelte` pour les wrappers) et s'assure que :
  vanilla/Astro livrent le squelette avant le JavaScript (le wrapper Astro via
  Declarative Shadow DOM), les wrappers React et Svelte livrent l'élément nu
  avec ses attributs et sans DSD, la géométrie maintient les invariants de la
  boîte 16:9 + barre de contrôle dans chaque cas, et l'iframe, la boîte de
  dialogue de partage et la sélection de serveur fonctionnent tous après
  l'hydratation.

Le `csp-tt.spec.ts` de vanilla est le gate strict-CSP ; le wrapper Astro inline
le CSS critique dans son squelette SSR, il ne vérifie donc pas le CSP strict
(voir `packages/vidix-player-astro/README.md`).

> Vous pouvez utiliser l'IA pour comprendre le code et faire des corrections. Le merge se fait après que votre push soit revu par l'équipe Vidix ou un collaborateur OSS de confiance.

---

## Signaler des bugs et des failles de sécurité

Vous avez trouvé un bug ? Merci d'[ouvrir un issue](placeholder-link).

Vous avez trouvé une faille de sécurité ? [Signalez-la en privé](placeholder-link).

Pour les failles de sécurité, **n'ouvrez pas d'issue public**. Contactez-nous
via le lien « Signalez-la en privé » ci-dessus ou via l'email listé sur ce
profil GitHub. Nous le transmettrons à l'équipe de sécurité pour le corriger
le plus vite possible.

---

## Licence

Apache License 2.0 — voir [LICENSE](../LICENSE).
