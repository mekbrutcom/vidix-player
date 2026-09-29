import { expect, test } from "@playwright/test";

/**
 * Astro wrapper parity.
 *
 * Mirrors the vanilla specs (shell.spec.ts / hydrate.spec.ts) against the
 * `vidix-player-astro` component, proving the wrapper's SSR + hydration path is
 * equivalent to the core:
 *
 *  - the raw HTML contains the Declarative Shadow DOM skeleton (critical CSS +
 *    16:9 box) *before* JavaScript runs, which is what keeps CLS at ~0;
 *  - geometry holds at whatever width the container gives (the host is
 *    `width: 100%; max-width: 100vw`, so there is no fixed pixel target): the
 *    video box keeps 16:9 and the host height is that box plus the control bar;
 *  - the interactive surface appears: iframe, controls, share dialog, server
 *    select.
 *
 * Runs against the `astro` project's own preview server (port 3712).
 */

const PLAYER = "vidix-player";

/** Measures the geometry invariants of a player element. */
function measure(el: HTMLElement) {
  const sr = el.shadowRoot;
  const wrapper = sr?.querySelector(".vidix-player-wrapper");
  const control = sr?.querySelector(".vidix-player-control");
  const rect = el.getBoundingClientRect();
  const gap = Number.parseFloat(getComputedStyle(el).gap || "0");

  return {
    w: Math.round(rect.width),
    h: Math.round(rect.height),
    wrapperW: Math.round(wrapper?.getBoundingClientRect().width ?? 0),
    wrapperH: Math.round(wrapper?.getBoundingClientRect().height ?? 0),
    controlH: Math.round(control?.getBoundingClientRect().height ?? 0),
    gap: Math.round(gap),
  };
}

test("SSR HTML ships the DSD skeleton before JavaScript", async ({ page }) => {
  const html = await page.goto("/").then((res) => res?.text() ?? "");

  // The host element + its declarative shadow root are in the document itself,
  // so the box renders on first paint with no JS.
  expect(html).toContain(`<${PLAYER}`);
  expect(html).toContain(`shadowrootmode="open"`);

  // The critical CSS is inlined inside the template, and the skeleton control
  // bar is present pre-hydration.
  expect(html).toContain(":host {");
  expect(html).toContain("vidix-player-wrapper is-loading");
  expect(html).toContain("vidix-control-server");

  // The thumbnail is passed through raw: the core validates it itself, so the
  // attribute must stay a plain image URL (no proxy transform).
  expect(html).toContain(
    'metadata-thumbnail-url="https://files.vidstack.io/sprite-fight/poster.webp"',
  );

  // The full player is bundled into the page, not fetched from the demo CDN.
  expect(html).toContain('<script type="module" src="/_astro/');
});

test("skeleton reserves the 16:9 box before hydration, without JS layout shift", async ({
  page,
}) => {
  // Block the hoisted client bundle so the shell-only (pre-JS) state is
  // observable — the geometry must already be final.
  await page.route("**/_astro/*.js", (route) => route.abort());

  await page.goto("/");

  const player = page.locator(PLAYER).first();
  await expect(player).toBeVisible();

  const geometry = await player.evaluate((el) => {
    const sr = el.shadowRoot;
    const wrapper = sr?.querySelector(".vidix-player-wrapper");
    const control = sr?.querySelector(".vidix-player-control");
    const rect = el.getBoundingClientRect();
    const gap = Number.parseFloat(getComputedStyle(el).gap || "0");

    return {
      w: Math.round(rect.width),
      h: Math.round(rect.height),
      wrapperW: Math.round(wrapper?.getBoundingClientRect().width ?? 0),
      wrapperH: Math.round(wrapper?.getBoundingClientRect().height ?? 0),
      controlH: Math.round(control?.getBoundingClientRect().height ?? 0),
      gap: Math.round(gap),
      hasWrapper: !!wrapper,
      hasControl: !!control,
      hasIframe: !!sr?.querySelector("iframe"),
    };
  });

  expect(geometry.hasWrapper).toBe(true);
  expect(geometry.hasControl).toBe(true);
  // Nothing has hydrated yet.
  expect(geometry.hasIframe).toBe(false);
  // The video box keeps its 16:9 ratio at whatever width the container gives.
  expect(Math.abs(geometry.wrapperH - geometry.wrapperW * (9 / 16))).toBeLessThanOrEqual(1);
  // Host height = box + control bar + the host gap; nothing unaccounted for.
  expect(geometry.h).toBe(geometry.wrapperH + geometry.controlH + geometry.gap);
});

test("hydration installs iframe + controls + share dialog at the same size", async ({ page }) => {
  const player = page.locator(PLAYER).first();

  await page.goto("/");

  await expect
    .poll(async () =>
      player.evaluate((el) => ({
        hydrated: (el as HTMLElement & { _vidixHydrated?: boolean })._vidixHydrated === true,
        iframe: !!el.shadowRoot?.querySelector("iframe"),
        shareDialog: !!el.shadowRoot?.querySelector("vidix-share-dialog"),
      })),
    )
    .toMatchObject({ hydrated: true, iframe: true, shareDialog: true });

  const state = await player.evaluate((el) => ({
    buttons: el.shadowRoot?.querySelectorAll("button").length ?? 0,
    serverSelect: !!el.shadowRoot?.querySelector(".vidix-control-server"),
    download: !!el.shadowRoot?.querySelector(".vidix-control-download"),
    // The blur-up placeholder is removed once server data lands (see core's
    // player/server-data.ts), so a real iframe `src` is the "fully loaded"
    // signal — the LQIP already did its job.
    iframeSrc: el.shadowRoot?.querySelector("iframe")?.getAttribute("src") || "",
  }));

  expect(state.serverSelect).toBe(true);
  expect(state.download).toBe(true);
  expect(state.buttons).toBeGreaterThanOrEqual(2);
  expect(state.iframeSrc.length).toBeGreaterThan(0);
  // The invariants still hold after the content swap — same box, richer content.
  const after = await player.evaluate(measure);
  expect(Math.abs(after.wrapperH - after.wrapperW * (9 / 16))).toBeLessThanOrEqual(1);
  expect(after.h).toBe(after.wrapperH + after.controlH + after.gap);
});

test("server select dropdown opens and lists options", async ({ page }) => {
  await page.goto("/");

  const trigger = page.locator(PLAYER).first().locator(".vidix-control-server");
  await expect(trigger).toBeVisible();
  await trigger.click();

  // The dropdown is rendered imperatively into the shadow root; we only assert
  // the listbox machinery opens, not specific server data.
  await expect
    .poll(async () =>
      page
        .locator(PLAYER)
        .first()
        .evaluate((el) => (el.shadowRoot?.querySelector("[role='listbox']") ?? null) !== null),
    )
    .toBe(true);
});

test("the share dialog shows the thumbnail on every player", async ({ page }) => {
  // Regression: a proxy-transformed `metadata-thumbnail-url` (no image
  // extension) used to be rejected by the core, leaving the first player's
  // `.vidix-modal-thumb` empty. The attribute must stay a raw image URL.
  await page.goto("/");

  for (const player of await page.locator(PLAYER).all()) {
    await expect
      .poll(() => player.evaluate((el) => !!el.shadowRoot?.querySelector("iframe")))
      .toBe(true);

    await player.locator(".vidix-share-page").click();
    await expect
      .poll(() =>
        player.evaluate(
          (el) =>
            (el.shadowRoot?.querySelector(".vidix-modal-thumb img")?.getAttribute("src") ?? "") !==
            "",
        ),
      )
      .toBe(true);
    await page.keyboard.press("Escape");
  }
});

test("the second player renders with a different locale and layout", async ({ page }) => {
  // Mirrors scaffold-design: player 1 is id/bottom, player 2 is es/top.
  await page.goto("/");

  // The share button's `aria-label` is hydration-stable: both the SSR skeleton
  // and the full render use the same `sharePage` key, unlike the label span,
  // which loses its class on hydration.
  const locales = await page.locator(PLAYER).evaluateAll((els) =>
    els.map((el) => ({
      lang: el.getAttribute("lang"),
      position: el.getAttribute("layout-control-position"),
      shareLabel:
        el.shadowRoot?.querySelector(".vidix-share-page")?.getAttribute("aria-label") ?? null,
    })),
  );

  expect(locales).toHaveLength(2);
  expect(locales[0].lang).toBe("id");
  expect(locales[1].lang).toBe("es");
  expect(locales[0].position).toBe("bottom");
  expect(locales[1].position).toBe("top");
  // SSR locale resolution already picked the right dictionaries.
  expect(locales[0].shareLabel).not.toBe(locales[1].shareLabel);
  expect(locales[0].shareLabel).not.toBeNull();
});

test("console-log={false} stays silent", async ({ page }) => {
  // Dedicated single-player page: the log lines carry no player identity, so a
  // two-player page cannot attribute them. Here any `[vidix-player]` line is a
  // failure.
  const messages: string[] = [];
  page.on("console", (m) => {
    if (m.text().includes("[vidix-player]")) messages.push(m.text());
  });

  await page.goto("/silent/");
  await expect
    .poll(async () =>
      page
        .locator(PLAYER)
        .first()
        .evaluate((el) => !!el.shadowRoot?.querySelector("iframe")),
    )
    .toBe(true);

  expect(messages).toEqual([]);
});
