import {
  copyrightYearFromClock,
  formatCopyright,
  referencedAssetPaths,
  resolveCopyrightYear,
  site,
} from "./site";

describe("site content", () => {
  test("names the company without a service claim", () => {
    expect(site.name).toBe("AXXIS Works Ltd");
    expect(site.description).toBe("Corporate website for AXXIS Works Ltd.");
    expect(site.summary).toBe(
      "AXXIS Works Ltd is a UK-based technology, software, IT and full-service marketing solutions company.",
    );
    expect(site.summary).not.toMatch(/@|\d{3,}|registered office/i);
  });

  test("references sized delivery assets rather than 4K masters or the damaged square", () => {
    const paths = referencedAssetPaths();

    expect(paths).toContain("/axxis-icon-256.png");
    expect(paths).toContain("/axxis-og-1200x630.png");
    expect(paths).toContain("/favicon.ico");
    expect(paths.every((path) => !path.includes("4k"))).toBe(true);
    expect(paths).not.toContain("/axxis-social-square-4k.png");
  });

  test("formats a copyright line for a given year", () => {
    expect(formatCopyright(2026)).toBe("© 2026 AXXIS Works Ltd");
  });

  test("accepts a four-digit configured year and otherwise uses the fallback", () => {
    expect(resolveCopyrightYear("2031", 2026)).toBe(2031);
    expect(resolveCopyrightYear("nope", 2026)).toBe(2026);
    expect(resolveCopyrightYear("", 2026)).toBe(2026);
  });

  test("reads the calendar year from the clock, including the next year", () => {
    expect(copyrightYearFromClock()).toBe(new Date().getFullYear());
    expect(copyrightYearFromClock(new Date(2026, 11, 31, 12))).toBe(2026);
    expect(copyrightYearFromClock(new Date(2027, 0, 1, 12))).toBe(2027);
  });
});
