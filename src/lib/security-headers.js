function scriptSources(isDevelopment) {
  const sources = ["'self'", "'unsafe-inline'"];

  if (isDevelopment) {
    sources.push("'unsafe-eval'");
  }

  return sources;
}

function connectSources(isDevelopment) {
  if (isDevelopment) {
    return ["'self'", "ws:", "wss:"];
  }

  return ["'self'"];
}

export function buildContentSecurityPolicy({ isDevelopment }) {
  const directives = [
    "default-src 'self'",
    `script-src ${scriptSources(isDevelopment).join(" ")}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self'",
    "font-src 'self'",
    `connect-src ${connectSources(isDevelopment).join(" ")}`,
    "media-src 'self'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "frame-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];

  return directives.join("; ");
}

export function buildSecurityHeaders({ isDevelopment }) {
  return [
    {
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy({ isDevelopment }),
    },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "DENY" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
    { key: "X-DNS-Prefetch-Control", value: "off" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
    // Browsers ignore this on HTTP, including local next dev and next start.
    // It applies only after the site is served over HTTPS.
    { key: "Strict-Transport-Security", value: "max-age=15552000" },
  ];
}
