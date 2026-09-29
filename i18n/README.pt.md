<p align="center">
  <img src="../.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# Vidix Player

O Vidix Player é uma biblioteca de componentes pronta para usar para o reprodutor de vídeo da plataforma Vidix. Ele suporta muitos idiomas, um botão de compartilhamento, seleção automática de servidor com quantidade configurável e um botão de download que aparece automaticamente se as suas configurações da plataforma Vidix o permitirem.
Tudo pode ser configurado a partir de atributos HTML ou das props do framework disponíveis.

Crie uma conta Vidix e comece a enviar conteúdo: [Plataforma Vidix](https://vidix.mekbrut.com)

## Idiomas

Esta documentação está disponível nos seguintes idiomas:

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

## Sumário

- [Para proprietários de sites (incluindo desenvolvedores)](#para-proprietários-de-sites-incluindo-desenvolvedores)
  - [Como usar no seu site](#como-usar-no-seu-site)
    - [Vanilla JS](#vanilla-js)
      - [Idiomas suportados](#idiomas-suportados)
    - [React](#react)
    - [Astro](#astro)
    - [Svelte / Kit](#svelte--kit)
    - [Iframe manual](#iframe-manual)
  - [Avançado](#avançado)
  - [Solução de problemas](#solução-de-problemas)
- [Transparência e tolerância](#transparência-e-tolerância)
- [Contribuir para o repositório](#contribuir-para-o-repositório)
- [Relatar bugs e vulnerabilidades de segurança](#relatar-bugs-e-vulnerabilidades-de-segurança)

---

## Para proprietários de sites (incluindo desenvolvedores)

O Vidix Player se integra completamente a muitos frameworks. Use o componente
compatível com o seu site.

### Como usar no seu site

### Vanilla JS

Adequado para HTML nativo, PHP e outros ambientes que não rodam em
Node.js / um empacotador JavaScript.

#### Script hospedado

Coloque este script dentro do `<head>...</head>` da página onde você quer
mostrar o `vidix-player`:

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>
```

#### O componente vidix-player

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

| Prop/attr                  | Obrigatório | Tipo        | Padrão              | Descrição                                                                                                        |
| -------------------------- | ----------- | ----------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `playback-id`              | **Sim**     | string      | —                   | O ID do vídeo gerado a partir do upload do seu vídeo na plataforma Vidix, p. ex. `tUVARXFmPnT`. Sem isso o reprodutor não renderiza nada. |
| `lang`                     | Não         | string      | `<html lang>`, `en` | Idioma da interface, p. ex. `id`, `en`, `es_419`, `zh_tw`, `vi`. Lista completa: [Idiomas suportados](#idiomas-suportados). Valores desconhecidos caem para `<html lang>`, depois `en`. |
| `accent-color`             | Não         | string      | (padrão do tema)    | Cor de destaque do reprodutor. Um de: `vidix`, `default`, `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`. Outros valores são ignorados. |
| `layout-control-position`  | Não         | string      | `bottom`            | Posição da barra de controle: `bottom` ou `top`.                                                                 |
| `layout-control-accent`    | Não         | string      | (padrão do tema)    | Cor de destaque dos botões da barra de controle (botão de compartilhar, seleção de servidor e download). Mesma lista de valores que `accent-color`. |
| `control-share`            | Não         | boolean     | `true`              | Mostrar o botão de compartilhar + seu diálogo. O link compartilhado é o link do seu site, não o link direto do vídeo nem o link de incorporação. |
| `control-server-count`     | Não         | number      | `3`                 | Número de servidores no menu de seleção de servidor. Intervalo `0`–`10`; o menu aparece a partir de `≥ 2`.        |
| `control-download`         | Não         | boolean     | `true`              | Mostrar o botão de download do vídeo. O botão pode desaparecer automaticamente se você desativou os downloads nas configurações da plataforma Vidix, mesmo que você o defina como `true`. |
| `metadata-video-title`     | Não         | string      | —                   | Título do vídeo para acessibilidade (rótulo `aria`) e o botão de download.                                       |
| `metadata-thumbnail-url`   | Não         | string (URL)| —                   | URL da imagem thumbnail/poster. Usada como placeholder borrado (blur-up) antes de o vídeo estar pronto.           |
| `metadata-server-title`    | Não         | boolean     | `true`              | Mostrar o nome/título fornecido pelo servidor no reprodutor. Defina como `"false"` para ocultá-lo.               |
| `loading`                  | Não         | string      | (padrão do navegador) | Quando carregar o iframe do reprodutor: `eager` (imediatamente) ou `lazy` (quando quase visível). Outros valores são ignorados. |
| `console-log`              | Não         | boolean     | `false`             | Defina como `"true"` para registrar mensagens de diagnóstico no console do DevTools. Ative se você tiver problemas de integração — eles aparecerão com clareza no console do DevTools. |
| `role`, `aria-label`       | Não         | —           | —                   | Atributos de acessibilidade HTML padrão; passados como estão.                                                    |

#### Idiomas suportados

O reprodutor reconhece **71 códigos de locale** em 37 idiomas. Os códigos podem
ser escritos com hifens ou sublinhados (`en-GB` é tratado igual a `en_gb`) e
não diferenciam maiúsculas de minúsculas.

| Idioma                   | Códigos `lang`                                    |
| ------------------------ | ------------------------------------------------- |
| Alemão                   | `de`, `de_at`                                     |
| Búlgaro                  | `bg`                                              |
| Catalão                  | `ca`                                              |
| Checo                    | `cs`                                              |
| Chinês                   | `zh`, `zh_cn`, `zh_hk`, `zh_tw`                   |
| Coreano                  | `ko`                                              |
| Dinamarquês              | `da`                                              |
| Eslovaco                 | `sk`                                              |
| Esloveno                 | `sl`                                              |
| Espanhol                 | `es`, `es_419`, `es_ar`, `es_cl`, `es_co`, `es_cr`, `es_do`, `es_ec`, `es_sv`, `es_gt`, `es_hn`, `es_mx`, `es_ni`, `es_pa`, `es_pe`, `es_pr`, `es_py`, `es_us`, `es_uy`, `es_ve` |
| Estoniano                | `et`                                              |
| Filipino                 | `fil`                                             |
| Finlândês                | `fi`                                              |
| Francês                  | `fr`, `fr_ca`, `fr_ch`                            |
| Grego                    | `el`                                              |
| Hindi                    | `hi`                                              |
| Holandês                 | `nl`                                              |
| Húngaro                  | `hu` _(texto em inglês por enquanto)_             |
| Indonésio                | `id`                                              |
| Inglês                   | `en`, `en_au`, `en_ca`, `en_gb`, `en_ie`, `en_in`, `en_sg`, `en_za` |
| Islandês                 | `is`                                              |
| Italiano                 | `it`                                              |
| Japonês                  | `ja`                                              |
| Letão                    | `lv`                                              |
| Lituano                  | `lt`                                              |
| Malaio                   | `ms`                                              |
| Norueguês                | `no`                                              |
| Polonês                  | `pl`                                              |
| Português                | `pt` _(texto em inglês por enquanto)_, `pt_br`, `pt_pt` |
| Romeno                   | `ro`                                              |
| Russo                    | `ru`                                              |
| Sérvio                   | `sr`                                              |
| Sueco                    | `sv`                                              |
| Tailandês                | `th`                                              |
| Turco                    | `tr`                                              |
| Ucraniano                | `uk`                                              |
| Vietnamita               | `vi`                                              |

Notas:

- Variantes regionais sem seu próprio dicionário (p. ex. `en_gb`, `es_mx`,
  `fr_ca`) usam automaticamente o dicionário do idioma base.
- Códigos que ainda não têm seu próprio dicionário (`hu`, `pt`) mostram
  temporariamente texto em inglês. Use suas variantes regionais
  (`pt_br`/`pt_pt`) para obter o texto naquele idioma.
- Códigos fora da lista acima caem para `<html lang>`, depois para `en`.

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

Requer React 18 ou 19 como peer dependency; o core (`@mekbrut-com/vidix-player`) e os
helpers compartilhados vêm como dependências.

#### Montar o componente

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

| Prop                       | Atributo                     | Tipo                  | Padrão              | Descrição                                                    |
| -------------------------- | ---------------------------- | --------------------- | ------------------- | ------------------------------------------------------------ |
| `playbackId`               | `playback-id`                | `string`              | —                   | ID do vídeo. Obrigatório.                                    |
| `lang`                     | `lang`                       | `string`              | `<html lang>` / `en`| Idioma da UI; 71 códigos de locale suportados — [lista completa](#idiomas-suportados). |
| `accentColor`              | `accent-color`               | `AccentColor`         | —                   | Cor de destaque da UI.                                       |
| `loading`                  | `loading`                    | `"eager"` \| `"lazy"` | —                   | Comportamento de carregamento do iframe/blur-up.             |
| `consoleLog`               | `console-log`                | `boolean`             | `false`             | Registra diagnósticos do `[vidix-player]` no console. Apenas dev. |
| `lqip`                     | _wrapper-only_               | `boolean`             | `true`              | Mostrar um placeholder blur-up (veja [Avançado](#avançado)). |
| **`metadata`**             |                              |                       |                     |                                                              |
| `metadata.videoTitle`      | `metadata-video-title`       | `string`              | —                   | Título do iframe, rótulo de download, texto de compartilhamento. |
| `metadata.thumbnailUrl`    | `metadata-thumbnail-url`     | `string`              | —                   | Poster usado como placeholder blur-up. URL http(s) absoluta. |
| `metadata.thumbnailLqip`   | _wrapper-only_               | `string`              | —                   | Placeholder explícito; sobrescreve `thumbnailUrl` para o blur-up. |
| `metadata.serverTitle`     | `metadata-server-title`      | `boolean`             | `true`              | Usar o título da resposta do servidor.                       |
| **`layout`**               |                              |                       |                     |                                                              |
| `layout.controlPosition`   | `layout-control-position`    | `"bottom"` \| `"top"` | `"bottom"`          | Posição da barra de controle.                                |
| `layout.controlAccent`     | `layout-control-accent`      | `AccentColor`         | —                   | Cor de destaque dos botões da barra de controle (independente de `accentColor`). |
| **`control`**              |                              |                       |                     |                                                              |
| `control.share`            | `control-share`              | `boolean`             | `true`              | Mostrar o botão de compartilhar + diálogo.                   |
| `control.serverCount`      | `control-server-count`       | `number`              | `3`                 | Servidores no seletor, limitado a `0`–`10`; mostrado a partir de `2`+. |
| `control.download`         | `control-download`           | `boolean`             | `true`              | Mostrar o botão de download (o servidor ainda pode ocultá-lo). |
| **events**                 |                              |                       |                     |                                                              |
| `onServerData`             | `vidix:server-data`          | `(detail) => void`    | —                   | Dispara com `{ serverCount }` quando a lista de servidores é resolvida. |
| `onServerSelect`           | `vidix:server-select`        | `(detail) => void`    | —                   | Dispara com `{ value }` quando o usuário escolhe um servidor. |

### Astro

O wrapper do Astro renderiza um esqueleto Declarative Shadow DOM no servidor: a
caixa 16:9 + o CSS crítico estão presentes **antes que qualquer JavaScript seja
carregado**, então o deslocamento de layout (CLS) na hidratação é ~0.

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

Requer Astro 4+ como peer dependency.

#### Montar o componente

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

A lista de props é a mesma do [React](#props), exceto que o Astro não tem as
props de evento `onServerData` / `onServerSelect`. Anexe seus próprios
listeners em um script do lado do cliente se precisar:

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

Requer Svelte 5 como peer dependency.

#### Montar o componente

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

A lista de props e eventos é a mesma do [React](#props) (Svelte 5 usa as
callback props `onServerData` / `onServerSelect`, não o `createEventDispatcher`
obsoleto).

### Iframe manual

Um iframe manual é um iframe HTML semântico comum, então ele tem apenas um servidor: o servidor que você escolheu na plataforma Vidix.

Essa tag de iframe é fornecida ou gerada pela plataforma Vidix a partir do vídeo que você enviou — basta copiá-la da plataforma Vidix e incorporá-la no seu site:

```html
<iframe
  src="https://..."
  title="Example videos"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

---

## Avançado

**Regras de booleanos no Vanilla JS:** atributos booleanos são ativados
apenas escrevendo seu nome (ou `="true"`), e desativados com `="false"`.
Exemplo: `control-share="false"`.

**Props são configuração no momento da montagem.** O core lê os atributos uma
vez no `connectedCallback` (não há `observedAttributes`), então mudar as props
depois da montagem não atualiza o reprodutor em execução. Forneça uma `key`
(React/Svelte) ou remonte o elemento quando a configuração precisar mudar:

```svelte
{#key playbackId}
  <VidixPlayer {playbackId} />
{/key}
```

**Tema claro/escuro**

O reprodutor segue o tema da página automaticamente, sem atributos adicionais:

- Se `<html data-theme="dark">` (ou a classe `dark`) estiver presente → modo
  escuro.
- Se `<html data-theme="light">` (ou a classe `light`) estiver presente → modo
  claro.
- Se nenhum estiver presente → segue o `prefers-color-scheme` do sistema do
  usuário.

**Notas de segurança (CSP / Trusted Types)**

O reprodutor é projetado para ser compatível com CSP estrito:

- **Sem `eval`, sem manipuladores de eventos inline** — seguro sob um
  `script-src` estrito.
- **Os estilos são instalados via `adoptedStyleSheets`**, não com tags
  `<style>` injetadas — compatível com `style-src` sem `'unsafe-inline'`.
- Se o seu site aplica `require-trusted-types-for 'script'`, adicione o nome
  da política **`vidix-player`** à sua allowlist de `trusted-types`. Sem esse
  nome, o reprodutor não pode ser renderizado sob esse CSP.

## Solução de problemas

- **O reprodutor não aparece** — verifique o `playback-id` (obrigatório) e
  ative `console-log="true"` para ver as mensagens no DevTools.
- **A barra de controle está faltando** — a barra de controle só aparece se
  pelo menos um de `control-share`, `control-server-count` (≥ 2), ou
  `control-download` estiver ativo.
- **O tema não corresponde** — certifique-se de que não há um `data-theme`
  conflitante em outra tag; o reprodutor lê o tema do elemento `<html>`.

---

## Transparência e tolerância

### Limite de requisições: 20 por minuto por IP do espectador

Limitamos cada visitante do seu site a ver o vídeo aparecer no máximo 20× por
minuto. 20 vezes por minuto já é muito — de 4 a 5 vezes maior que o uso
típico. Normalmente, mais de 20 vezes por minuto é um bot ou uma automação
atacando seu site.

A contagem é baseada no IP do espectador. Por exemplo, o espectador A (um
humano), o espectador B (um bot atacante), e C (um rastreador de motor de
busca:

- O espectador B (o bot atacante) faz scraping para obter vídeos em massa → o
  backend do Vidix Player o bloqueia.
- O espectador A (um humano) e C (um rastreador de motor de busca) ainda podem
  acessar sem nenhuma interrupção.

Indiretamente, isso protege seus vídeos de bots (o que geralmente significa
ladrões de conteúdo), mantendo o backend do Vidix Player funcionando
normalmente (para que não caia por causa de um atacante).

### Infraestrutura, linguagens do backend e edge

**A infraestrutura roda na União Europeia.** Todo o processamento do backend
roda e é tratado completamente na região da União Europeia balanceando a carga
das requisições. Essa é uma das razões pelas quais a Vidix é uma escolha
segura e rápida.

**Linguagens do backend.** Somos abertos sobre o fato de que usamos várias
linguagens de backend ao mesmo tempo para manter este serviço ótimo:

- **Rust** — cerca de 60% para a API.
- **Go** — cerca de 25%, ajudando o Rust a processar dados porque precisa de
  um garbage collector e da velocidade do seu compilador.
- **Python** — cerca de 10% para automação nos bastidores.
- **Shell** — o resto, para rodar a infraestrutura, o cron e outras
  necessidades para que as conexões se mantenham ativas.

**Rede edge.** Usamos serviços edge de vários provedores: um graduado de
startup da YCombinator que prefere não ser nomeado, Cloudflare, AWS, Akamai,
Oracle e IBM.

Não usamos GCP no momento porque não queremos que o gerenciamento da rede seja
tocado por IA (Gemini). Poderia ser configurado, mas escolhemos não usar por
agora, para que o GDPR da Vidix sempre possa funcionar sem interferência de
terceiros.

---

## Contribuir para o repositório

Agradeceríamos muito sua ajuda no desenvolvimento do Vidix Player. Por favor,
envie um pull request. Obrigado por nos ajudar a desenvolver esta biblioteca
de componentes!

Não tem certeza de por onde começar a contribuir? Aqui está seu mapa.

### Mapa do código (code-tree)

```
vidix-player/
├── packages/
│   ├── vidix-player/          biblioteca core (fonte da verdade; TypeScript)
│   ├── vidix-player-shared/   helpers de prop/atributo/imagem compartilhados para wrappers
│   ├── vidix-player-astro/    wrapper Astro (esqueleto SSR, zero layout shift)
│   ├── vidix-player-react/    wrapper React (SSR-friendly, "use client")
│   └── vidix-player-svelte/   wrapper Svelte 5 (SSR-friendly, source-shipping)
├── e2e/                       testes Playwright + fixtures (não publicado)
│   ├── astro-app/             páginas de paridade Astro
│   ├── react-app/             páginas de paridade React (Vite SSR)
│   ├── svelte-app/            páginas de paridade Svelte (Vite SSR)
│   ├── vanillajs-app/         página de paridade vanilla JS (QA manual)
│   └── tests/                 specs de paridade
├── biome.json                 config de lint + format
├── tsconfig.base.json         config base do TypeScript
└── pnpm-workspace.yaml        definição do workspace
```

Para o ambiente de desenvolvimento você precisa do Node.js 18+ e do
[pnpm](https://pnpm.io):

```bash
pnpm install
pnpm build       # build de todos os pacotes em packages/*
pnpm typecheck   # typecheck de todos os pacotes
pnpm lint        # biome check
pnpm test:e2e    # testes de paridade Playwright (veja ./e2e)
```

### Páginas de teste por framework (E2E)

Cada wrapper tem uma página de paridade para que QA e revisores possam
compará-la com o core vanilla antes do lançamento:

| Página                      | Como rodar                                                       |
| --------------------------- | ---------------------------------------------------------------- |
| Vanilla (`e2e/vanillajs-app`) | `pnpm --filter vidix-player-vanillajs-e2e run preview` → `:3713` |
| Astro (`e2e/astro-app`)     | `pnpm --filter vidix-player-astro-e2e run preview` → `:3712`      |
| React (`e2e/react-app`)     | `pnpm --filter vidix-player-react-e2e run preview` → `:3714`      |
| Svelte (`e2e/svelte-app`)   | `pnpm --filter vidix-player-svelte-e2e run preview` → `:3715`      |

As quatro páginas renderizam os mesmos dois reprodutores (destaque, posição de
controle e idioma diferentes) para que o core vanilla e cada wrapper possam ser
comparados lado a lado. A página vanilla usa o core já construído exatamente
como a tag CDN (`/dist/vidix-player.js`); as páginas React e Svelte testam o
caminho SSR + hidratação (apenas atributos no HTML do servidor — sem
Declarative Shadow DOM, que nem React nem Svelte conseguem hidratar). A
paridade automática está em `e2e/tests`:

- `pnpm test:e2e` roda os quatro projetos do Playwright (`chromium` para
  vanilla, `astro`, `react` e `svelte` para os wrappers) e garante que:
  vanilla/Astro enviem o esqueleto antes do JavaScript (o wrapper do Astro via
  Declarative Shadow DOM), os wrappers do React e do Svelte enviem o elemento
  pelado com atributos e sem DSD, a geometria mantenha as invariâncias da caixa
  16:9 + barra de controle em cada caso, e o iframe, o diálogo de
  compartilhamento e a seleção de servidor funcionem todos depois da
  hidratação.

O `csp-tt.spec.ts` do vanilla é o gate de strict-CSP; o wrapper do Astro faz
inline do CSS crítico no seu esqueleto SSR, então ele não verifica CSP estrito
(veja `packages/vidix-player-astro/README.md`).

> Você pode usar IA para entender o código e fazer correções. O merge acontece depois que seu push for revisado pela equipe da Vidix ou por um colaborador OSS confiável.

---

## Relatar bugs e vulnerabilidades de segurança

Encontrou um bug? Por favor [abra um issue](placeholder-link).

Encontrou uma vulnerabilidade de segurança? [Relate em privado](placeholder-link).

Para vulnerabilidades de segurança, **não abra um issue público**. Entre em
contato conosco através do link "Relate em privado" acima ou através do email
listado neste perfil do GitHub. Nós o encaminharemos para a equipe de
segurança para corrigi-lo o mais rápido possível.

---

## Licença

Apache License 2.0 — veja [LICENSE](../LICENSE).
