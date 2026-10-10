export const site = {
  name: "AXXIS Works Ltd",
  description: "Corporate website for AXXIS Works Ltd.",
  headline: "Technology That Powers Business Growth.",
  supporting:
    "From professional websites and custom software to IT support, automation and comprehensive marketing, AXXIS Works delivers integrated solutions for modern businesses.",
  summary:
    "AXXIS Works Ltd is a UK-based technology, software, IT and full-service marketing solutions company.",
  logo: {
    src: "/axxis-icon-256.png",
    width: 256,
    height: 256,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/axxis-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/axxis-icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/axxis-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  ogImage: {
    url: "/axxis-og-1200x630.png",
    width: 1200,
    height: 630,
    alt: "AXXIS Works Ltd",
  },
};

export function formatCopyright(year) {
  return `© ${year} AXXIS Works Ltd`;
}

export function copyrightYearFromClock(now = new Date()) {
  return now.getFullYear();
}

export function resolveCopyrightYear(configuredValue, fallbackYear) {
  const parsed = Number(configuredValue);

  if (Number.isInteger(parsed) && parsed >= 2000 && parsed <= 9999) {
    return parsed;
  }

  return fallbackYear;
}

export function referencedAssetPaths() {
  return [
    site.logo.src,
    site.ogImage.url,
    ...site.icons.icon.map((icon) => icon.url),
    ...site.icons.apple.map((icon) => icon.url),
  ];
}
