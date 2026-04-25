import { test, expect } from "@playwright/test";

test.describe("Wired homepage", () => {
  test("cold open slide is visible on load", async ({ page }) => {
    await page.goto("/");
    const slide1 = page.locator("[data-slide-index='0']");
    await expect(slide1).toBeVisible();
    await expect(slide1).toContainText("Every app is an island");
  });

  test("scrolling past slide 2 reveals stat grid", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 3));
    await page.waitForTimeout(500);
    const statGrid = page.locator(".stat-grid").first();
    await expect(statGrid).toBeVisible();
  });

  test("slide 5 'the shift' contains accent text about AI", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 9));
    await page.waitForTimeout(300);
    await expect(page.locator("[data-slide-index='4']")).toContainText("Then AI learned");
  });

  test("homepage has a link to the-problem page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("a[href*='the-problem']").first()).toBeVisible();
  });

  test("page title matches Wired branding", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Wired/);
  });
});
