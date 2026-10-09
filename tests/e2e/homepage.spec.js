import { expect, test } from "@playwright/test";
import { buildContentSecurityPolicy } from "../../src/lib/security-headers.js";

test("homepage shell, brand images, and security headers", async ({ page }) => {
  const cspViolations = [];
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /content security policy/i.test(message.text())
    ) {
      cspViolations.push(message.text());
    }
  });

  const response = await page.goto("/");
  expect(response.status()).toBe(200);

  const headers = response.headers();
  expect(headers["content-security-policy"]).toBe(
    buildContentSecurityPolicy({ isDevelopment: false }),
  );
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-powered-by"]).toBeUndefined();

  await expect(
    page.getByRole("heading", { level: 1, name: "AXXIS Works Ltd" }),
  ).toBeVisible();
  await expect(
    page.getByText("Corporate website for AXXIS Works Ltd."),
  ).toBeVisible();

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();

  const logo = page.locator("header img");
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute("src", /axxis-icon-256\.png/);
  await expect
    .poll(async () => logo.evaluate((image) => image.naturalWidth))
    .toBeGreaterThan(0);

  for (const asset of [
    "/axxis-icon-256.png",
    "/axxis-icon-32.png",
    "/axxis-icon-192.png",
    "/axxis-icon-180.png",
    "/axxis-og-1200x630.png",
    "/favicon.ico",
  ]) {
    const assetResponse = await page.request.get(asset);
    expect(assetResponse.status(), asset).toBe(200);
    expect(assetResponse.headers()["x-content-type-options"], asset).toBe(
      "nosniff",
    );
  }

  expect(cspViolations).toEqual([]);
});

test("homepage fits a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "AXXIS Works Ltd" }),
  ).toBeVisible();

  const overflows = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  expect(overflows).toBe(false);
});
