import { expect, test } from "@playwright/test";

/**
 * Classic-script (IIFE) delivery: the shell loaded with a plain `<script src>`
 * tag — exactly what the bare CDN URL serves, since the package's
 * `jsdelivr`/`unpkg` fields point at `dist/vidix-player.iife.js`.
 *
 * In the IIFE build esbuild replaces `import.meta` with an empty object, so the
 * shell cannot resolve itself from `import.meta.url`; it must fall back to
 * `document.currentScript.src`. This spec exercises the *suffix* rule
 * (`…/vidix-player.iife.js` -> sibling `vidix-player-full.js`). The
 * *package-root* rule (bare CDN URL with no filename, e.g.
 * `https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player`) can only be
 * verified after the package is published.
 */

test("iife shell upgrades and hydrates via currentScript resolution", async ({ page }) => {
  const fullBundleUrls: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("vidix-player-full")) fullBundleUrls.push(request.url());
  });

  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto("/vanillajs-app/iife.html");

  // The classic script is parser-blocking, so the synchronous skeleton is
  // already there right after goto — before the full bundle finishes loading.
  // (The page has two players; the first is the diagnostics-enabled one.)
  const player = page.locator("vidix-player").first();
  await expect(player).toBeVisible();
  expect(
    await player.evaluate((el) => !!el.shadowRoot?.querySelector(".vidix-player-wrapper")),
  ).toBe(true);

  // Full hydration: the hydrated marker and the iframe embed come from the
  // full bundle, which only exists if the shell resolved and fetched it.
  await expect
    .poll(async () =>
      player.evaluate((el) => ({
        hydrated: (el as HTMLElement & { _vidixHydrated?: boolean })._vidixHydrated === true,
        iframe: !!el.shadowRoot?.querySelector("iframe"),
      })),
    )
    .toMatchObject({ hydrated: true, iframe: true });

  // The full bundle was fetched as a sibling of the IIFE file (suffix rule),
  // not as a bare relative filename from the page origin.
  expect(fullBundleUrls.length).toBeGreaterThan(0);
  for (const url of fullBundleUrls) {
    expect(url).toContain("/dist/vidix-player-full.js");
  }
  expect(errors).toEqual([]);
});

test("iife build exposes the VidixPlayer global", async ({ page }) => {
  await page.goto("/vanillajs-app/iife.html");

  // `globalName: "VidixPlayer"` in tsup.config.iife.ts: the classic tag must
  // expose the shell's exports for consumers who want manual control. The
  // typeof check runs inside the page — evaluate results cannot carry
  // functions across the boundary.
  const defineType = await page.evaluate(() => {
    const global = (window as { VidixPlayer?: { defineVidixPlayer?: unknown } }).VidixPlayer;
    return typeof global?.defineVidixPlayer;
  });
  expect(defineType).toBe("function");
});
