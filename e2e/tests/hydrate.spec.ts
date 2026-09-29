import { expect, test } from "@playwright/test";

/**
 * Hydration parity: after the full bundle loads, the interactive surface must be
 * present — iframe embed, control buttons, share dialog — and the player element
 * must expose the hydrated marker.
 */

test("hydration installs iframe + control buttons + share dialog", async ({ page }) => {
  const player = page.locator("vidix-player");

  await page.goto("/fixtures/vanilla.html");

  await expect
    .poll(async () =>
      player.evaluate((el) => ({
        hydrated: (el as HTMLElement & { _vidixHydrated?: boolean })._vidixHydrated === true,
        iframe: !!el.shadowRoot?.querySelector("iframe"),
        shareDialog: !!el.shadowRoot?.querySelector("vidix-share-dialog"),
        buttons: el.shadowRoot?.querySelectorAll("button").length ?? 0,
      })),
    )
    .toMatchObject({
      hydrated: true,
      iframe: true,
      shareDialog: true,
    });

  const state = await player.evaluate((el) => ({
    buttons: el.shadowRoot?.querySelectorAll("button").length ?? 0,
    serverSelect: !!el.shadowRoot?.querySelector(".vidix-control-server"),
    download: !!el.shadowRoot?.querySelector(".vidix-control-download"),
  }));

  expect(state.serverSelect).toBe(true);
  expect(state.download).toBe(true);
  expect(state.buttons).toBeGreaterThanOrEqual(2);
});

test("server select dropdown opens and lists options", async ({ page }) => {
  await page.goto("/fixtures/vanilla.html");

  const trigger = page.locator("vidix-player").locator(".vidix-control-server");
  await expect(trigger).toBeVisible();
  await trigger.click();

  // Dropdown is rendered imperatively into the shadow root; options come from the
  // demo API. We only assert the listbox machinery opens, not specific server data.
  await expect
    .poll(async () =>
      page
        .locator("vidix-player")
        .evaluate((el) => (el.shadowRoot?.querySelector("[role='listbox']") ?? null) !== null),
    )
    .toBe(true);
});
