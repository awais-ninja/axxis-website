import {
  buildContentSecurityPolicy,
  buildSecurityHeaders,
} from "./security-headers";

function header(headers, name) {
  return headers.find((item) => item.key === name)?.value;
}

describe("content security policy", () => {
  test("keeps production free of unsafe-eval and wildcard sources", () => {
    const policy = buildContentSecurityPolicy({ isDevelopment: false });

    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain("script-src 'self' 'unsafe-inline'");
    expect(policy).toContain("script-src-attr 'none'");
    expect(policy).toContain("object-src 'none'");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).not.toContain("unsafe-eval");
    expect(policy).not.toContain("*");
    expect(policy).not.toContain("upgrade-insecure-requests");
  });

  test("allows the framework development server to evaluate and open its socket", () => {
    const policy = buildContentSecurityPolicy({ isDevelopment: true });

    expect(policy).toContain("'unsafe-eval'");
    expect(policy).toContain("connect-src 'self' ws: wss:");
  });
});

describe("baseline security headers", () => {
  test("sets the documented response headers", () => {
    const headers = buildSecurityHeaders({ isDevelopment: false });
    const names = headers.map((item) => item.key);

    expect(names).toEqual([
      "Content-Security-Policy",
      "X-Content-Type-Options",
      "Referrer-Policy",
      "X-Frame-Options",
      "Permissions-Policy",
      "X-DNS-Prefetch-Control",
      "Cross-Origin-Opener-Policy",
      "Cross-Origin-Resource-Policy",
      "Strict-Transport-Security",
    ]);
    expect(header(headers, "X-Content-Type-Options")).toBe("nosniff");
    expect(header(headers, "X-Frame-Options")).toBe("DENY");
    expect(header(headers, "Referrer-Policy")).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(header(headers, "Permissions-Policy")).toBe(
      "camera=(), microphone=(), geolocation=(), payment=()",
    );
    expect(header(headers, "Strict-Transport-Security")).toBe(
      "max-age=15552000",
    );
    expect(header(headers, "Strict-Transport-Security")).not.toContain(
      "preload",
    );
    expect(header(headers, "Content-Security-Policy")).not.toContain(
      "unsafe-eval",
    );
  });

  test("uses the development policy only when asked", () => {
    const headers = buildSecurityHeaders({ isDevelopment: true });

    expect(header(headers, "Content-Security-Policy")).toContain("unsafe-eval");
  });
});
