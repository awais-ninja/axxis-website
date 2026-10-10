import { expect, test } from "@playwright/test";
import { services } from "../../src/lib/services.js";

const widths = [320, 375, 640, 768, 1024, 1280];

test("hero actions and all seven services stay on the page", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("banner").getByRole("link", { name: "Contact" }),
  ).toHaveAttribute("href", "/contact");
  await expect(
    page.getByRole("main").getByRole("link", { name: "Contact", exact: true }),
  ).toHaveAttribute("href", "/contact");
  await expect(
    page.getByRole("main").getByRole("link", { name: "Services" }),
  ).toHaveAttribute("href", "/services");

  for (const service of services) {
    const link = page
      .locator("#services")
      .getByRole("link", { name: service.name });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", `/services/${service.slug}`);
  }

  await expect(page.locator('a[href="/contact"]').first()).toBeVisible();
});

test("reduced motion keeps the hero and services visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Technology That Powers Business Growth.",
  );
  await expect(page.getByText("AXXIS Works").first()).toBeVisible();

  for (const service of services) {
    await expect(
      page.locator("#services").getByRole("link", { name: service.name }),
    ).toBeVisible();
  }
});

test.describe("home without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("story content is in the first document", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Technology That Powers Business Growth.",
    );
    await expect(
      page.getByText(
        "From professional websites and custom software to IT support, automation and comprehensive marketing, AXXIS Works delivers integrated solutions for modern businesses.",
      ),
    ).toBeVisible();
    await expect(
      page
        .getByRole("main")
        .getByRole("link", { name: "Contact", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("link", { name: "Services" }),
    ).toBeVisible();

    for (const service of services) {
      await expect(page.getByText(service.name).first()).toBeVisible();
    }

    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
  });
});

test("the homepage does not overflow across the review widths", async ({
  page,
}) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    );
    expect(overflows, `${width}px`).toBe(false);
  }
});
