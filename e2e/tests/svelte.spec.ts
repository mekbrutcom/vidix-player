import { expect, test } from "@playwright/test";

/**
 * Svelte wrapper parity.
 *
 * Mirrors the vanilla (shell.spec.ts), Astro (astro.spec.ts) and React
 * (react.spec.ts) specs against the `vidix-player-svelte` component, proving
 * the Svelte SSR + hydration path is equivalent to the core — with one
 * documented difference shared with the React wrapper:
 *
 *  - Svelte cannot emit Declarative Shadow DOM (sveltejs/svelte#13271 /
 *    sveltejs/kit#9903, both still open), so the SSR HTML is the bare
 *    `<vidix-player>` element with attributes only.
 *    There is no pre-JS skeleton, so the "geometry before hydration" spec does
 *    not apply here; what must hold is that hydration itself installs the same
 *    surface (16:9 box, controls, iframe, share dialog, server select) at the
 *    same geometry, with no hydration mismatch.
 *
 * Runs against the `svelte` project's own server (port 3715, Vite SSR output).
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

/** A hydrated player element, as tracked by the core. */
type HydratedPlayer = HTMLElement & { _vidixHydrated?: boolean };

test("SSR HTML ships the bare element with attributes and no Declarative Shadow DOM", async ({
  page,
}) => {
  const html = await page.goto("/").then((res) => res?.text() ?? "");

  // The host element is in the document with its attributes — the shadow root
  // is built by `connectedCallback` on the client, not by the server.
  expect(html).toContain(`<${PLAYER}`);
  expect(html).toContain('playback-id="vod-1_parameter_server"');
  expect(html).toContain('lang="id"');
  expect(html).toContain('accent-color="green"');
  expect(html).toContain('layout-control-position="bottom"');
  expect(html).toContain('control-server-count="3"');

  // Not an accidental DSD: no template, no skeleton, no
  // inlined critical CSS in the server output.
  expect(html).not.toContain("shadowrootmode");
  expect(html).not.toContain(":host {");

  // The thumbnail is passed through raw — the core validates it itself, so the
  // attribute must stay a plain image URL (no proxy transform).
  expect(html).toContain(
    'metadata-thumbnail-url="https://files.vidstack.io/sprite-fight/poster.webp"',
  );

  // The client bundle is wired in and hashed; the full player ships inside it
  // instead of being fetched from the demo CDN.
  expect(html).toContain('<script type="module" crossorigin src="/assets/');
});

test("hydration installs the iframe, controls, and share dialog without console errors", async ({
  page,
}) => {
  // The gate for the pattern: identical SSR/client attributes must hydrate
  // cleanly. A mismatch surfaces as a console error mentioning hydration.
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" && /hydrat/i.test(m.text())) consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => pageErrors.push(String(e)));

  const player = page.locator(PLAYER).first();

  await page.goto("/");

  await expect
    .poll(async () =>
      player.evaluate((el) => ({
        hydrated: (el as HydratedPlayer)._vidixHydrated === true,
        iframe: !!el.shadowRoot?.querySelector("iframe"),
        shareDialog: !!el.shadowRoot?.querySelector("vidix-share-dialog"),
      })),
    )
    .toMatchObject({ hydrated: true, iframe: true, shareDialog: true });

  const state = await player.evaluate((el) => ({
    buttons: el.shadowRoot?.querySelectorAll("button").length ?? 0,
    serverSelect: !!el.shadowRoot?.querySelector(".vidix-control-server"),
    download: !!el.shadowRoot?.querySelector(".vidix-control-download"),
    // A real iframe `src` means the API call resolved and the LQIP did its job.
    iframeSrc: el.shadowRoot?.querySelector("iframe")?.getAttribute("src") || "",
  }));

  expect(state.serverSelect).toBe(true);
  expect(state.download).toBe(true);
  expect(state.buttons).toBeGreaterThanOrEqual(2);
  expect(state.iframeSrc.length).toBeGreaterThan(0);

  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("hydration keeps the 16:9 box and the host geometry invariants", async ({ page }) => {
  const player = page.locator(PLAYER).first();

  await page.goto("/");

  await expect
    .poll(async () => player.evaluate((el) => !!el.shadowRoot?.querySelector("iframe")))
    .toBe(true);

  const after = await player.evaluate(measure);

  // The video box keeps its 16:9 ratio at whatever width the container gives.
  expect(Math.abs(after.wrapperH - after.wrapperW * (9 / 16))).toBeLessThanOrEqual(1);
  // Host height = box + control bar + the host gap; nothing unaccounted for.
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

  // Svelte emits no SSR skeleton, so the localized share label only exists once
  // the full render has landed.
  await expect
    .poll(async () =>
      page
        .locator(PLAYER)
        .first()
        .evaluate((el) => !!el.shadowRoot?.querySelector("vidix-share-dialog")),
    )
    .toBe(true);

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
  expect(locales[0].shareLabel).not.toBe(locales[1].shareLabel);
  expect(locales[0].shareLabel).not.toBeNull();
});

test("consoleLog={false} stays silent and the onServerData event prop fires", async ({ page }) => {
  // Dedicated single-player page: the log lines carry no player identity, so a
  // two-player page cannot attribute them. Here any `[vidix-player]` line is a
  // failure, and the single player makes the event prop attributable too.
  const messages: string[] = [];
  page.on("console", (m) => {
    if (m.text().includes("[vidix-player]")) messages.push(m.text());
  });

  await page.goto("/silent/");

  // The event prop (not just the element's own event) surfaces the server count.
  // The player dispatches `vidix:server-data` once per API resolution, so the
  // listener is registered before the element connects and the iframe loading
  // below is the observable proof the event already fired.
  await expect
    .poll(async () =>
      page.evaluate(() => (window as Window & { __vidixServerData?: number }).__vidixServerData),
    )
    .toBe(3);

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
