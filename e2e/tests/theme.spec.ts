import { expect, test } from "@playwright/test";

/**
 * Theme parity: auto theme from prefers-color-scheme, and reactivity to
 * document-level theme changes (data-theme / class on <html>).
 */

test("defaults to light theme", async ({ page }) => {
  await page.goto("/fixtures/vanilla.html");

  const theme = await page.locator("vidix-player").evaluate((el) => el.getAttribute("data-theme"));

  expect(theme).toBe("light");
});

test("follows prefers-color-scheme: dark", async ({ page, browser }) => {
  const context = await browser.newContext({
    colorScheme: "dark",
    viewport: { width: 1024, height: 768 },
  });
  const darkPage = await context.newPage();
  await darkPage.goto("/fixtures/vanilla.html");

  const theme = await darkPage
    .locator("vidix-player")
    .evaluate((el) => el.getAttribute("data-theme"));

  expect(theme).toBe("dark");
  await context.close();
  await page.close();
});

test("reacts to document-level data-theme change", async ({ page }) => {
  await page.goto("/fixtures/vanilla.html");

  await page.evaluate(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  });

  await expect
    .poll(async () => page.locator("vidix-player").evaluate((el) => el.getAttribute("data-theme")))
    .toBe("dark");
});
