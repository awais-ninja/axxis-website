import { expect, test } from "@playwright/test";
import { services } from "../../src/lib/services.js";

const widths = [320, 375, 640, 768, 1024, 1280];

test("the contact page is a closed preview", async ({ page }) => {
  const posts = [];
  page.on("request", (request) => {
    if (request.method() === "POST") {
      posts.push(request.url());
    }
  });

  const response = await page.goto("/contact");
  expect(response.status()).toBe(200);
  await expect(page).toHaveTitle("Contact · AXXIS Works Ltd");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Contact");
  await expect(page.getByRole("status")).toHaveText(
    "Online enquiries are not available yet. Please check back soon.",
  );

  const service = page.getByLabel("Service of interest (optional)");
  for (const item of services) {
    await expect(service.locator("option", { hasText: item.name })).toHaveCount(
      1,
    );
  }

  const button = page.getByRole("button", { name: "Enquiry unavailable" });
  await expect(button).toBeDisabled();
  await button.click({ force: true });
  await expect(page).toHaveURL(/\/contact$/);
  expect(posts).toEqual([]);

  const stored = await page.evaluate(
    () =>
      window.localStorage.length +
      window.sessionStorage.length +
      document.cookie.length,
  );
  expect(stored).toBe(0);
});

test("home, about, and a service page link to contact", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("main")
    .getByRole("link", { name: "Contact", exact: true })
    .click();
  await expect(page).toHaveURL(/\/contact$/);

  await page.goto("/about");
  await page
    .getByRole("main")
    .getByRole("link", { name: "Contact AXXIS Works" })
    .click();
  await expect(page).toHaveURL(/\/contact$/);

  await page.goto("/services/seo-search-marketing");
  await page
    .getByRole("link", {
      name: "Contact AXXIS Works about SEO & Search Marketing",
    })
    .click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("the mobile menu reaches Contact from the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/contact");

  const menu = page.getByRole("button", { name: "Menu" });
  await menu.focus();
  await page.keyboard.press("Enter");
  const contact = page
    .getByRole("banner")
    .getByRole("link", { name: "Contact" });
  await expect(contact).toBeVisible();
  await contact.focus();
  await expect(contact).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
});

test("contact does not overflow across the review widths", async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/contact");
    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    );
    expect(overflows, `${width}px`).toBe(false);
  }
});

test("reduced motion keeps the unavailable status visible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/contact");
  await expect(page.getByRole("status")).toBeVisible();
  await expect(page.getByLabel("Full name (required)")).toBeDisabled();
});

test.describe("contact without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the unavailable status is in the first document", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Contact");
    await expect(
      page.getByText(/Online enquiries are not available yet/),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Enquiry unavailable" }),
    ).toBeDisabled();
  });
});
