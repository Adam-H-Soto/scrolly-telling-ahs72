import { test, expect } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

test.describe("Wired reduced motion", () => {
  test("TimelineStat displays final value immediately without animation", async ({ page }) => {
    await page.goto("/how-ai-helps");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.85));
    await page.waitForTimeout(200);
    const statValue = page.locator(".timeline-stat__value").first();
    const text = await statValue.textContent();
    expect(Number(text)).toBeGreaterThan(0);
  });

  test("IntegrationDiagram shows both columns under reduced motion", async ({ page }) => {
    await page.goto("/how-ai-helps");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 5));
    await page.waitForTimeout(200);
    await expect(page.locator(".integration-diagram__before").first()).toBeVisible();
    await expect(page.locator(".integration-diagram__after").first()).toBeVisible();
  });

  test("homepage renders without animation errors", async ({ page }) => {
    await page.goto("/");
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    expect(errors).toHaveLength(0);
  });
});
