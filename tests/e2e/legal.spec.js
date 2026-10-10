import { expect, test } from "@playwright/test";

const widths = [320, 375, 640, 768, 1024, 1280];

async function overflows(page) {
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
}

test("privacy and accessibility are provisional public pages", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (request) => {
    requests.push({ url: request.url(), method: request.method() });
  });

  const privacy = await page.goto("/privacy");
  expect(privacy.status()).toBe(200);
  expect(privacy.headers()["set-cookie"]).toBeUndefined();
  await expect(page).toHaveTitle("Privacy · AXXIS Works Ltd");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy");
  await expect(page.getByRole("main")).toContainText(
    "not a complete privacy notice",
  );
  await expect(page.getByRole("main")).toContainText(
    "Online enquiries are not available yet",
  );
  await expect(page.getByRole("main")).toContainText(
    "does not send, store, or email",
  );
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Privacy" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Contact" }),
  ).toBeVisible();
  await expect(
    page.getByRole("contentinfo").getByRole("link", { name: "Privacy" }),
  ).toHaveAttribute("href", "/privacy");

  const accessibility = await page.goto("/accessibility");
  expect(accessibility.status()).toBe(200);
  expect(accessibility.headers()["set-cookie"]).toBeUndefined();
  await expect(page).toHaveTitle("Accessibility · AXXIS Works Ltd");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Accessibility",
  );
  await expect(page.getByRole("main")).toContainText("WCAG) 2.2, Level AA");
  await expect(page.getByRole("main")).toContainText(
    "does not claim that the site meets WCAG 2.2 AA",
  );
  await expect(page.getByRole("main")).toContainText(
    "No independent accessibility assessment has been completed",
  );
  await expect(page.getByRole("main")).toContainText(
    "Online enquiries are not available yet",
  );
  await expect(
    page.getByRole("contentinfo").getByRole("link", { name: "Accessibility" }),
  ).toHaveAttribute("href", "/accessibility");

  for (const path of ["/privacy", "/accessibility"]) {
    await page.goto(path);
    const text = await page.locator("main").innerText();
    expect(text, path).not.toMatch(/@/);
    expect(text, path).not.toMatch(/\+44/);
    expect(text, path).not.toMatch(/fully compliant|legally complete/i);
  }

  const thirdParty = requests.filter((request) => {
    return new URL(request.url).host !== "127.0.0.1:3000";
  });
  expect(thirdParty).toEqual([]);
  expect(requests.filter((request) => request.method === "POST")).toEqual([]);

  const stored = await page.evaluate(
    () =>
      window.localStorage.length +
      window.sessionStorage.length +
      document.cookie.length,
  );
  expect(stored).toBe(0);
});

test("footer legal links resolve and absent routes stay 404", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Privacy" })
    .click();
  await expect(page).toHaveURL(/\/privacy$/);

  await page.goto("/");
  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Accessibility" })
    .click();
  await expect(page).toHaveURL(/\/accessibility$/);

  const contact = await page.goto("/contact");
  expect(contact.status()).toBe(200);
  await expect(page.getByRole("status")).toHaveText(
    "Online enquiries are not available yet. Please check back soon.",
  );

  const service = await page.goto("/services/website-design-development");
  expect(service.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Website Design & Development",
  );

  for (const path of ["/cookies", "/terms", "/this-page-does-not-exist"]) {
    const response = await page.goto(path);
    expect(response.status(), path).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeVisible();
    await expect(
      page.getByRole("banner").getByRole("link", { name: "Contact" }),
    ).toBeVisible();
  }
});

test("keyboard can open a privacy section", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/privacy");

  const link = page.getByRole("link", { name: "Status of this notice" });
  await link.focus();
  await expect(link).toBeFocused();
  const outlineWidth = await link.evaluate(
    (element) => getComputedStyle(element).outlineWidth,
  );
  expect(outlineWidth).not.toBe("0px");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/privacy#status$/);
  await expect(
    page.getByRole("heading", { name: "Status of this notice" }),
  ).toBeVisible();
});

test("legal pages do not overflow across the review widths", async ({
  page,
}) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/privacy", "/accessibility"]) {
      await page.goto(path);
      expect(await overflows(page), `${path} ${width}px`).toBe(false);
    }
  }
});

test("reduced motion keeps the legal notices visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 720 });

  await page.goto("/privacy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy");
  await expect(page.getByText(/Provisional/)).toBeVisible();

  await page.goto("/accessibility");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Accessibility",
  );
  await expect(page.getByText(/reduce motion/)).toBeVisible();
});

test.describe("legal pages without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("both notices are in the first document", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy");
    await expect(
      page.getByText(/Online enquiries are not available yet/),
    ).toBeVisible();
    await expect(page.getByText(/not a complete privacy notice/)).toBeVisible();

    await page.goto("/accessibility");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Accessibility",
    );
    await expect(page.getByText(/WCAG\) 2\.2, Level AA/)).toBeVisible();
    await expect(
      page.getByText(
        /No independent accessibility assessment has been completed/,
      ),
    ).toBeVisible();
  });
});
