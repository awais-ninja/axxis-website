import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { legalNavigation, primaryNavigation } from "@/lib/navigation";
import { serviceHref, services } from "@/lib/services";
import { site } from "@/lib/site";
import {
  buildRobots,
  buildSitemapEntries,
  canonicalUrl,
  documentRobotsHeaderRules,
  indexablePaths,
  organizationStructuredData,
  pageMetadata,
  rootMetadata,
  serializeJsonLd,
  titleTemplate,
} from "./seo";

const approved = {
  NEXT_PUBLIC_SITE_URL: "https://www.example.com",
  NEXT_PUBLIC_ALLOW_INDEXING: "true",
  AXXIS_VERIFIED_PRODUCTION: "true",
};

const closedWithOrigin = {
  NEXT_PUBLIC_SITE_URL: "https://www.example.com",
  NEXT_PUBLIC_ALLOW_INDEXING: "true",
  NODE_ENV: "production",
};

describe("technical seo", () => {
  test("keeps titles, descriptions, and indexable paths distinct", () => {
    expect(titleTemplate).toBe("%s · AXXIS Works Ltd");
    const pages = [
      pageMetadata({
        title: { absolute: `${site.name} · ${site.headline}` },
        description: site.supporting,
        path: "/",
      }),
      pageMetadata({
        title: "About",
        description: site.summary,
        path: "/about",
      }),
      pageMetadata({
        title: "Services",
        description:
          "Seven services from AXXIS Works Ltd: websites, custom software, maintenance, IT support, search, marketing, and automation.",
        path: "/services",
      }),
      ...services.map((service) =>
        pageMetadata({
          title: service.name,
          description: service.scope,
          path: `/services/${service.slug}`,
        }),
      ),
      pageMetadata({
        title: "Contact",
        description:
          "Contact AXXIS Works Ltd. Online enquiries are not available yet.",
        path: "/contact",
      }),
      pageMetadata({
        title: "Accessibility",
        description:
          "How the AXXIS Works Ltd website approaches accessibility. This page does not claim WCAG compliance.",
        path: "/accessibility",
      }),
    ];
    const titles = pages.map((page) => JSON.stringify(page.title));
    const descriptions = pages.map((page) => page.description);

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(indexablePaths).not.toContain("/privacy");
    expect(indexablePaths).toHaveLength(12);
  });

  test("sets metadataBase only for an approved production deployment", () => {
    expect(rootMetadata({}).metadataBase).toBeUndefined();
    expect(rootMetadata(closedWithOrigin).metadataBase).toBeUndefined();
    expect(rootMetadata(approved).metadataBase.href).toBe(
      "https://www.example.com/",
    );
    expect(rootMetadata({}).openGraph.images).toBeUndefined();
    expect(rootMetadata(approved).openGraph.images[0].url).toBe(
      "/axxis-og-1200x630.png",
    );
    expect(rootMetadata(approved).robots).toEqual({
      index: true,
      follow: true,
    });
  });

  test("omits canonical URLs until production indexing is approved", () => {
    expect(canonicalUrl("/about", {})).toBeNull();
    expect(
      canonicalUrl("/about", {
        NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
        NEXT_PUBLIC_ALLOW_INDEXING: "true",
        AXXIS_VERIFIED_PRODUCTION: "true",
      }),
    ).toBeNull();
    expect(canonicalUrl("/about", closedWithOrigin)).toBeNull();
    expect(
      pageMetadata(
        { title: "About", description: "x", path: "/about" },
        closedWithOrigin,
      ).alternates,
    ).toBeUndefined();
    expect(
      pageMetadata({ title: "About", description: "x", path: "/about" })
        .alternates,
    ).toBeUndefined();

    const configured = indexablePaths.map((path) =>
      pageMetadata({ title: "Page", description: "x", path }, approved),
    );
    expect(configured.map((page) => page.alternates.canonical)).toEqual(
      indexablePaths.map((path) =>
        path === "/"
          ? "https://www.example.com/"
          : `https://www.example.com${path}`,
      ),
    );
    expect(configured.every((page) => page.robots.index)).toBe(true);
    expect(
      configured.map((page) => page.alternates.canonical).join("\n"),
    ).not.toMatch(/localhost|127\.0\.0\.1/);
  });

  test("keeps privacy and unpublished routes out of the index", () => {
    const privacy = pageMetadata(
      { title: "Privacy", description: "x", path: "/privacy" },
      approved,
    );
    expect(privacy.robots).toEqual({ index: false, follow: false });
    expect(privacy.alternates.canonical).toBe(
      "https://www.example.com/privacy",
    );

    const missing = pageMetadata(
      {
        title: "Page not found",
        description: "x",
        path: "/404",
        indexable: false,
      },
      approved,
    );
    expect(missing.robots).toEqual({ index: false, follow: false });
    expect(missing.alternates).toBeUndefined();
  });

  test("emits sitemap and robots only for an approved production origin", () => {
    expect(buildSitemapEntries({})).toEqual([]);
    expect(buildSitemapEntries(closedWithOrigin)).toEqual([]);
    expect(buildRobots(closedWithOrigin).sitemap).toBeUndefined();
    expect(documentRobotsHeaderRules(closedWithOrigin)).toHaveLength(7);
    expect(sitemap()).toEqual([]);
    expect(buildRobots({})).toEqual({
      rules: { userAgent: "*", allow: "/" },
    });
    expect(robots().sitemap).toBeUndefined();
    expect(JSON.stringify(buildRobots({}))).not.toMatch(/localhost/);

    const entries = buildSitemapEntries(approved);
    expect(entries.map((entry) => entry.url)).toEqual(
      indexablePaths.map((path) => `https://www.example.com${path}`),
    );
    expect(entries.some((entry) => entry.url.endsWith("/privacy"))).toBe(false);
    expect(entries.some((entry) => "lastModified" in entry)).toBe(false);
    expect(buildRobots(approved).sitemap).toBe(
      "https://www.example.com/sitemap.xml",
    );
  });

  test("sends the noindex header to documents and leaves assets alone", () => {
    const closed = documentRobotsHeaderRules({});
    expect(closed.map((rule) => rule.source)).toEqual([
      "/",
      "/about",
      "/services",
      "/services/:slug",
      "/contact",
      "/accessibility",
      "/privacy",
    ]);
    expect(closed[0].headers).toEqual([
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ]);
    expect(closed.some((rule) => rule.source.includes("_next"))).toBe(false);

    expect(
      documentRobotsHeaderRules(approved).map((rule) => rule.source),
    ).toEqual(["/privacy"]);
  });

  test("publishes one structured-data graph only for approved production", () => {
    expect(organizationStructuredData({})).toBeNull();
    expect(organizationStructuredData(closedWithOrigin)).toBeNull();

    const data = organizationStructuredData(approved);
    const serialized = serializeJsonLd(data);
    const parsed = JSON.parse(serialized);

    expect(parsed["@graph"].map((node) => node["@type"])).toEqual([
      "Organization",
      "WebSite",
    ]);
    expect(serialized).toContain("AXXIS Works Ltd");
    expect(serialized).toContain("https://www.example.com/axxis-icon-256.png");
    expect(serialized).not.toMatch(
      /address|telephone|sameAs|rating|LocalBusiness|Review|FAQPage/i,
    );
    expect(serializeJsonLd({ name: "<script>" })).toBe(
      '{"name":"\\u003cscript>"}',
    );
    expect(JSON.parse(serializeJsonLd({ name: "<script>" })).name).toBe(
      "<script>",
    );
  });

  test("does not link the shell at unpublished routes", () => {
    const hrefs = [
      ...primaryNavigation.map((item) => item.href),
      ...legalNavigation.map((item) => item.href),
      ...services.map((service) => serviceHref(service.slug)),
    ];

    for (const href of ["/cookies", "/terms", "/work", "/insights", "/faq"]) {
      expect(hrefs).not.toContain(href);
    }
  });
});
