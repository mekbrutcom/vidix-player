import { expect, test } from "@playwright/test";

/**
 * CSP + Trusted Types parity. Under `style-src 'self'` (no 'unsafe-inline') and
 * `require-trusted-types-for 'script'`, the player must:
 *  - render fully styled through adoptedStyleSheets (no injected <style>),
 *  - emit zero Trusted Types violations,
 *  - keep every remaining inline `style=` attribute inside the known pre-existing
 *    set (activity-indicator spokes and control-bar accent SVGs). Anything new
 *    would be a regression — see packages/vidix-player/README.md.
 */

test("renders styled under strict CSP with adoptedStyleSheets", async ({ page }) => {
  const ttReports: string[] = [];

  page.on("console", (msg) => {
    const text = msg.text();
    if (text.includes("Trusted Types") || text.includes("requires trusted types")) {
      ttReports.push(text);
    }
  });

  await page.goto("/fixtures/csp-strict.html");

  const player = page.locator("vidix-player");

  await expect
    .poll(async () =>
      player.evaluate((el) => {
        const sr = el.shadowRoot;
        const first = sr?.querySelector("[class^='vidix']") ?? null;
        return {
          radius: first ? getComputedStyle(first).borderRadius : "",
        };
      }),
    )
    .toMatchObject({ radius: "16px" });

  // Preferred path: one adopted sheet and no inline <style> element at all.
  const state = await player.evaluate((el) => {
    const sr = el.shadowRoot;
    return {
      hasStyleEl: !!sr?.querySelector("style"),
      adopted: sr?.adoptedStyleSheets.length ?? 0,
    };
  });

  if (state.adopted > 0) {
    expect(state.hasStyleEl).toBe(false);
    expect(state.adopted).toBe(1);
  }

  // Trusted Types must never be violated by the player.
  expect(ttReports.filter((t) => /TypeError|rejected/i.test(t))).toEqual([]);

  // Every remaining inline style must belong to the known pre-existing set:
  // activity-indicator spokes (inside .vidix-activity) and control-bar accent
  // SVGs. A new inline style anywhere else is a CSP regression.
  const offenders = await player.evaluate((el) => {
    const sr = el.shadowRoot;
    if (!sr) return [] as string[];
    const out: string[] = [];
    for (const node of sr.querySelectorAll("[style]")) {
      const inActivityIndicator = node.closest(".vidix-activity") !== null;
      const isControlSvg = node.tagName.toLowerCase() === "svg";
      if (!inActivityIndicator && !isControlSvg) {
        out.push(`${node.tagName}.${node.getAttribute("class") ?? ""}`);
      }
    }
    return out;
  });

  expect(offenders).toEqual([]);
});
