import { expect, test } from "@playwright/test";

/**
 * Parity with the labs baseline (scaffold-design): the shell must render the
 * 16:9 skeleton synchronously, before the full bundle finishes loading.
 *
 * Geometry is asserted structurally rather than against a fixed pixel size:
 * the host is `width: 100%; max-width: 100vw`, so the player follows its
 * container. What must hold at any width is (a) the video box keeps 16:9 and
 * (b) the host height is exactly that box plus the control chrome — no slack,
 * no overflow. That is the CLS guarantee.
 */

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

test("shell renders skeleton synchronously before full bundle loads", async ({ page }) => {
  // Delay the full bundle so the shell-only state is observable.
  await page.route("**/vidix-player-full.js", (route) => setTimeout(() => route.continue(), 1200));

  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto("/fixtures/vanilla.html");

  // The 16:9 wrapper exists and has a non-trivial height immediately.
  const player = page.locator("vidix-player");
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
    };
  });

  expect(geometry.hasWrapper).toBe(true);
  expect(geometry.hasControl).toBe(true);
  // The video box keeps its 16:9 ratio at whatever width the container gives.
  expect(Math.abs(geometry.wrapperH - geometry.wrapperW * (9 / 16))).toBeLessThanOrEqual(1);
  // Host height = box + control bar + the host gap; nothing unaccounted for.
  expect(geometry.h).toBe(geometry.wrapperH + geometry.controlH + geometry.gap);
  expect(errors).toEqual([]);
});

test("full bundle hydrates the shell without changing outer size", async ({ page }) => {
  // Delay the bundle so the pre-hydration size is captured first.
  await page.route("**/vidix-player-full.js", (route) => setTimeout(() => route.continue(), 1200));

  const player = page.locator("vidix-player");

  await page.goto("/fixtures/vanilla.html");
  await expect(player).toBeVisible();

  const before = await player.evaluate(measure);

  await expect
    .poll(async () => player.evaluate((el) => !!el.shadowRoot?.querySelector("iframe")))
    .toBe(true);

  const after = await player.evaluate(measure);

  // The full render swaps shadow content in place — the outer box is untouched.
  expect(after.h).toBe(before.h);
  expect(after.w).toBe(before.w);
  // And the invariants still hold afterwards.
  expect(Math.abs(after.wrapperH - after.wrapperW * (9 / 16))).toBeLessThanOrEqual(1);
  expect(after.h).toBe(after.wrapperH + after.controlH + after.gap);
});
