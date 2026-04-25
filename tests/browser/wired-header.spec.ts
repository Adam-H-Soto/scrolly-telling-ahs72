import { test, expect } from "@playwright/test";

test.describe("Wired header scroll behavior", () => {
  test("header is transparent on page load", async ({ page }) => {
    await page.goto("/in-practice");
    const header = page.locator("header").first();
    const bg = await header.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    expect(bg).toMatch(/rgba\(0,\s*0,\s*0,\s*0\)|transparent/);
  });

  test("header gains background after scrolling past 60px", async ({ page }) => {
    await page.goto("/in-practice");
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(400);
    const header = page.locator("header").first();
    const bg = await header.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    expect(bg).not.toMatch(/rgba\(0,\s*0,\s*0,\s*0\)|transparent/);
  });

  test("all 4 nav links are visible at 1280px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/in-practice");
    const links = ["The Problem", "How AI Helps", "In Practice", "Get Started"];
    for (const label of links) {
      await expect(page.locator(`nav >> text="${label}"`).first()).toBeVisible();
    }
  });
});
