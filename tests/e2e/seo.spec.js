import { expect, test } from "@playwright/test";
import { services } from "../../src/lib/services.js";

const routes = [
  ["/", "AXXIS Works Ltd · Technology That Powers Business Growth."],
  ["/about", "About · AXXIS Works Ltd"],
  ["/services", "Services · AXXIS Works Ltd"],
  ...services.map((service) => [
    `/services/${service.slug}`,
    `${service.name} · AXXIS Works Ltd`,
  ]),
  ["/contact", "Contact · AXXIS Works Ltd"],
  ["/accessibility", "Accessibility · AXXIS Works Ltd"],
  ["/privacy", "Privacy · AXXIS Works Ltd"],
];

test("pages have unique titles and stay out of the index", async ({ page }) => {
  const titles = [];
  const descriptions = [];

  for (const [path, title] of routes) {
    const response = await page.goto(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()["x-robots-tag"], path).toBe("noindex, nofollow");
    await expect(page).toHaveTitle(title);
    titles.push(await page.title());
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    descriptions.push(description);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    expect(await page.content(), path).not.toMatch(
      /https?:\/\/(localhost|127\.0\.0\.1)/,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/i,
    );
    expect(await page.locator("h1").count(), path).toBe(1);
  }

  expect(new Set(titles).size).toBe(titles.length);
  expect(new Set(descriptions).size).toBe(descriptions.length);
  expect(descriptions.join("\n")).not.toMatch(/@|\+44|registered office/i);
});

test("sitemap and robots stay local-safe while indexing is closed", async ({
  page,
}) => {
  const sitemap = await page.goto("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const sitemapText = await sitemap.text();
  expect(sitemapText).not.toMatch(/localhost|127\.0\.0\.1/i);
  expect(sitemapText).not.toContain("/privacy");
  expect(sitemapText).not.toMatch(/<lastmod>|<changefreq>|<priority>/);

  const robots = await page.goto("/robots.txt");
  expect(robots.status()).toBe(200);
  const robotsText = await robots.text();
  expect(robotsText).toMatch(/Allow:\s*\//);
  expect(robotsText).not.toMatch(/Disallow:\s*\//);
  expect(robotsText).not.toMatch(/localhost|Sitemap:/i);

  const asset = await page.request.get("/axxis-icon-256.png");
  expect(asset.status()).toBe(200);
  expect(asset.headers()["x-robots-tag"]).toBeUndefined();
  expect(await page.locator('script[type="application/ld+json"]').count()).toBe(
    0,
  );
});

test("unknown and unpublished routes stay unavailable", async ({ page }) => {
  for (const path of [
    "/cookies",
    "/terms",
    "/work",
    "/insights",
    "/faq",
    "/services/websites",
  ]) {
    const response = await page.goto(path);
    expect(response.status(), path).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeVisible();
  }

  await page.goto("/");
  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href")),
    );
  for (const href of hrefs) {
    expect(href).not.toMatch(/^\/(cookies|terms|work|insights|faq)(\/|$)/);
  }
});

test.describe("seo metadata without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the home title and noindex directive are in the first document", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(
      "AXXIS Works Ltd · Technology That Powers Business Growth.",
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/i,
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Technology That Powers Business Growth.",
    );
  });
});
