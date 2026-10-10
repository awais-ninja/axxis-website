import { expect, test } from "@playwright/test";
import { services } from "../../src/lib/services.js";

const widths = [320, 375, 640, 768, 1024, 1280];
const routes = [
  "/about",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
];

test("about, services, and every service page are distinct documents", async ({
  page,
}) => {
  const titles = [];

  for (const route of routes) {
    const response = await page.goto(route);
    expect(response.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    titles.push(await page.title());
    await expect(
      page.getByRole("banner").getByRole("link", { name: "About" }),
    ).toBeVisible();
    await expect(
      page.getByRole("banner").getByRole("link", { name: "Contact" }),
    ).toBeVisible();
  }

  expect(new Set(titles).size).toBe(titles.length);
});

test("an unknown service slug returns the shell 404", async ({ page }) => {
  const response = await page.goto("/services/websites");
  expect(response.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
});

test("a homepage service card opens its detail page", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("#services")
    .getByRole("link", { name: "Custom Software Development" })
    .click();
  await expect(page).toHaveURL(/\/services\/custom-software-development$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Custom Software Development",
  );
});

test("the enquiry link on a service page can take keyboard focus", async ({
  page,
}) => {
  await page.goto("/services/it-support-solutions");
  const enquiry = page.getByRole("link", {
    name: "Contact AXXIS Works about IT Support & Solutions",
  });
  await enquiry.focus();
  await expect(enquiry).toBeFocused();
});

test("business pages do not overflow across the review widths", async ({
  page,
}) => {
  const samples = [
    "/about",
    "/services",
    "/services/digital-marketing-advertising",
  ];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of samples) {
      await page.goto(route);
      const overflows = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1,
      );
      expect(overflows, `${route} at ${width}px`).toBe(false);
    }
  }
});

test("reduced motion keeps a service page readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/services/business-automation-integrations");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Business Automation & Integrations",
  );
  await expect(
    page.getByRole("link", { name: /Contact AXXIS Works about/ }),
  ).toBeVisible();
});

test.describe("service page without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the confirmed scope is in the first document", async ({ page }) => {
    await page.goto("/services/website-maintenance-support");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Website Maintenance & Support",
    );
    await expect(
      page
        .getByRole("main")
        .getByText(/ongoing technical support/)
        .first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Contact AXXIS Works about/ }),
    ).toBeVisible();
  });
});
