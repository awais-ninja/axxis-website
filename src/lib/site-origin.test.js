import {
  isSearchIndexingEnabled,
  isVerifiedProductionDeployment,
  parseProductionOrigin,
  readSiteOrigin,
} from "./site-origin";

describe("production origin", () => {
  test("accepts a bare https origin", () => {
    expect(parseProductionOrigin("https://www.example.com")).toBe(
      "https://www.example.com",
    );
    expect(parseProductionOrigin("  https://example.co.uk/  ")).toBe(
      "https://example.co.uk",
    );
  });

  test("rejects missing, local, preview-shaped, and malformed values", () => {
    for (const value of [
      undefined,
      "",
      "   ",
      "not a url",
      "ftp://example.com/",
      "http://www.example.com/",
      "https://user:pass@example.com/",
      "https://example.com/path",
      "https://example.com/?q=1",
      "https://example.com/#section",
      "https://example.com:8443/",
      "http://localhost:3000",
      "https://localhost/",
      "https://127.0.0.1/",
      "https://app.localhost/",
      "https://printer.local/",
      "https://192.168.0.10/",
      "https://10.1.2.3/",
      "https://172.16.0.1/",
      "https://[::1]/",
      "https://metadata.google.internal/",
      "https://example/",
      "https://.example.com/",
      "https://example.com./",
      "https://ex..ample.com/",
    ]) {
      expect(parseProductionOrigin(value), String(value)).toBeNull();
    }
  });

  test("reads the public site URL and ignores localhost", () => {
    expect(
      readSiteOrigin({ NEXT_PUBLIC_SITE_URL: "http://localhost:3000" }),
    ).toBeNull();
    expect(
      readSiteOrigin({ NEXT_PUBLIC_SITE_URL: "https://www.example.com" }),
    ).toBe("https://www.example.com");
  });

  test("requires origin, indexing approval, and a verified production deployment", () => {
    const origin = { NEXT_PUBLIC_SITE_URL: "https://www.example.com" };
    const indexing = {
      ...origin,
      NEXT_PUBLIC_ALLOW_INDEXING: "true",
    };

    expect(isVerifiedProductionDeployment({})).toBe(false);
    expect(isVerifiedProductionDeployment({ NODE_ENV: "production" })).toBe(
      false,
    );
    expect(
      isVerifiedProductionDeployment({ AXXIS_VERIFIED_PRODUCTION: "yes" }),
    ).toBe(false);
    expect(isSearchIndexingEnabled(origin)).toBe(false);
    expect(
      isSearchIndexingEnabled({
        ...origin,
        NEXT_PUBLIC_ALLOW_INDEXING: "yes",
        AXXIS_VERIFIED_PRODUCTION: "true",
      }),
    ).toBe(false);
    expect(
      isSearchIndexingEnabled({
        NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
        NEXT_PUBLIC_ALLOW_INDEXING: "true",
        AXXIS_VERIFIED_PRODUCTION: "true",
        NODE_ENV: "production",
      }),
    ).toBe(false);
    expect(isSearchIndexingEnabled(indexing)).toBe(false);
    expect(
      isSearchIndexingEnabled({
        ...indexing,
        NODE_ENV: "production",
      }),
    ).toBe(false);
    expect(
      isSearchIndexingEnabled({
        ...indexing,
        AXXIS_VERIFIED_PRODUCTION: "true",
      }),
    ).toBe(true);
  });
});
