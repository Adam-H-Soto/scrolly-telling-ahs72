import { test, expect } from "@playwright/test";

test.describe("Wired presentation navigation", () => {
  test("/the-problem final slide has a link to /how-ai-helps", async ({ page }) => {
    await page.goto("/the-problem");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await expect(page.locator("a[href*='how-ai-helps']").first()).toBeVisible();
  });

  test("/how-ai-helps final slide has a link to /in-practice", async ({ page }) => {
    await page.goto("/how-ai-helps");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await expect(page.locator("a[href*='in-practice']").first()).toBeVisible();
  });

  test("/in-practice footer has a link to /get-started", async ({ page }) => {
    await page.goto("/in-practice");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await expect(page.locator("a[href*='get-started']").first()).toBeVisible();
  });

  test("/get-started links back to home (no dead end)", async ({ page }) => {
    await page.goto("/get-started");
    await expect(page.locator("a[href='/']").first()).toBeVisible();
  });
});
