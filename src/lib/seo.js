import { services } from "./services.js";
import { site } from "./site.js";
import { isSearchIndexingEnabled, readSiteOrigin } from "./site-origin.js";

export const titleTemplate = "%s · AXXIS Works Ltd";

export function rootMetadata(env = process.env) {
  const origin = isSearchIndexingEnabled(env) ? readSiteOrigin(env) : null;

  return {
    ...(origin ? { metadataBase: new URL(origin) } : {}),
    title: {
      default: site.name,
      template: titleTemplate,
    },
    description: site.supporting,
    robots: robotsDirective("/", env),
    icons: site.icons,
    openGraph: {
      title: site.name,
      description: site.supporting,
      ...(origin ? { images: [site.ogImage] } : {}),
    },
  };
}

export const indexablePaths = [
  "/",
  "/about",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
  "/contact",
  "/accessibility",
];

const closedDocumentSources = [
  "/",
  "/about",
  "/services",
  "/services/:slug",
  "/contact",
  "/accessibility",
  "/privacy",
];

export function canonicalUrl(path, env = process.env) {
  const origin = isSearchIndexingEnabled(env) ? readSiteOrigin(env) : null;
  if (!origin) {
    return null;
  }

  return new URL(path, origin).href;
}

export function robotsDirective(path, env = process.env, indexable = true) {
  if (!indexable || path === "/privacy" || !isSearchIndexingEnabled(env)) {
    return { index: false, follow: false };
  }

  return { index: true, follow: true };
}

export function pageMetadata(
  { title, description, path, indexable = true },
  env = process.env,
) {
  const metadata = {
    title,
    description,
    robots: robotsDirective(path, env, indexable),
  };
  const canonical = indexable ? canonicalUrl(path, env) : null;

  if (canonical) {
    metadata.alternates = { canonical };
  }

  return metadata;
}

export function buildSitemapEntries(env = process.env) {
  if (!isSearchIndexingEnabled(env)) {
    return [];
  }

  return indexablePaths.map((path) => ({
    url: canonicalUrl(path, env),
  }));
}

export function buildRobots(env = process.env) {
  const robots = {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
  const sitemap = canonicalUrl("/sitemap.xml", env);

  if (isSearchIndexingEnabled(env) && sitemap) {
    robots.sitemap = sitemap;
  }

  return robots;
}

export function documentRobotsHeaderRules(env = process.env) {
  const sources = isSearchIndexingEnabled(env)
    ? ["/privacy"]
    : closedDocumentSources;

  return sources.map((source) => ({
    source,
    headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
  }));
}

export function organizationStructuredData(env = process.env) {
  const origin = isSearchIndexingEnabled(env) ? readSiteOrigin(env) : null;
  if (!origin) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: site.name,
        url: origin,
        logo: new URL(site.logo.src, origin).href,
      },
      {
        "@type": "WebSite",
        name: site.name,
        url: origin,
      },
    ],
  };
}

export function serializeJsonLd(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}
