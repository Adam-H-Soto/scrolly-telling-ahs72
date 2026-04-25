import { test, expect } from "@playwright/test";

test.describe("Wired visualization rendering", () => {
  test("IntegrationDiagram renders Before and After columns on /how-ai-helps", async ({ page }) => {
    await page.goto("/how-ai-helps");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 5));
    await page.waitForTimeout(500);
    await expect(page.locator(".integration-diagram__before").first()).toBeVisible();
    await expect(page.locator(".integration-diagram__after").first()).toBeVisible();
  });

  test("TimelineStat renders a numeric value on /how-ai-helps", async ({ page }) => {
    await page.goto("/how-ai-helps");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.85));
    await page.waitForTimeout(600);
    const statValue = page.locator(".timeline-stat__value").first();
    await expect(statValue).toBeVisible();
  });

  test("FlowChart renders at least 5 step nodes on /in-practice", async ({ page }) => {
    await page.goto("/in-practice");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3));
    await page.waitForTimeout(500);
    const steps = page.locator(".flow-chart__step");
    await expect(steps).toHaveCount(7);
  });

  test("no visualization error cards on any page", async ({ page }) => {
    const pages = ["/", "/the-problem", "/how-ai-helps", "/in-practice", "/get-started"];
    for (const path of pages) {
      await page.goto(path);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(200);
      const errors = page.locator("[data-viz-error='true']");
      await expect(errors).toHaveCount(0);
    }
  });
});
