import { buildSecurityHeaders } from "./src/lib/security-headers.js";
import { copyrightYearFromClock } from "./src/lib/site.js";

const isDevelopment = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_COPYRIGHT_YEAR: String(copyrightYearFromClock()),
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: buildSecurityHeaders({ isDevelopment }),
      },
    ];
  },
};

export default nextConfig;
