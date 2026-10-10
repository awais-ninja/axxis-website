import { expect, test } from "@playwright/test";
import { buildContentSecurityPolicy } from "../../src/lib/security-headers.js";

const widths = [320, 375, 640, 768, 1024, 1280];

async function overflows(page) {
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
}

test("unknown URLs return 404 inside the shell", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");

  expect(response.status()).toBe(404);
  expect(response.headers()["content-security-policy"]).toBe(
    buildContentSecurityPolicy({ isDevelopment: false }),
  );
  expect(response.headers()["content-security-policy"]).not.toContain(
    "unsafe-eval",
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(
    page.getByRole("main").getByRole("link", { name: "Home" }),
  ).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: "Contact" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "About" })).toHaveCount(0);
});

test("keyboard reaches the skip link and the mobile menu does not trap focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();

  const menu = page.getByRole("button", { name: "Menu" });
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");

  const home = page.getByRole("banner").getByRole("link", { name: "Home" });
  await home.focus();
  await page.keyboard.press("Tab");
  await expect(menu).not.toBeFocused();

  await home.focus();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();

  await menu.click();
  await page.getByRole("main").click({ position: { x: 8, y: 8 } });
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("the shell does not overflow and the menu follows the 640px breakpoint", async ({
  page,
}) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Technology That Powers Business Growth.",
    );
    expect(await overflows(page), `${width}px home`).toBe(false);

    const menu = page.getByRole("button", { name: "Menu" });
    if (width < 640) {
      await expect(menu, `${width}px menu`).toBeVisible();
    } else {
      await expect(menu, `${width}px menu`).toBeHidden();
      await expect(
        page.getByRole("banner").getByRole("link", { name: "Home" }),
      ).toBeVisible();
    }
  }

  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/this-page-does-not-exist");
  expect(await overflows(page)).toBe(false);
});

test("focus on the navy header is visible and every link resolves", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto("/");

  const home = page.getByRole("banner").getByRole("link", { name: "Home" });
  await home.focus();
  const outlineWidth = await home.evaluate(
    (element) => getComputedStyle(element).outlineWidth,
  );
  expect(outlineWidth).not.toBe("0px");

  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href")),
    );
  const paths = [...new Set(hrefs.filter((href) => href.startsWith("/")))];
  expect(paths).toEqual(["/"]);

  for (const path of paths) {
    const response = await page.request.get(path);
    expect(response.status(), path).toBe(200);
  }
});
