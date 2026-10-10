import {
  legalNavigation,
  navigationForImplementedRoutes,
  primaryNavigation,
} from "./navigation";

describe("primary navigation", () => {
  test("lists only routes that exist", () => {
    expect(primaryNavigation).toEqual([
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ]);
    expect(legalNavigation).toEqual([
      { href: "/privacy", label: "Privacy" },
      { href: "/accessibility", label: "Accessibility" },
    ]);
    expect(primaryNavigation.map((item) => item.href)).not.toContain(
      "/privacy",
    );
  });

  test("drops every candidate when no route has been built", () => {
    expect(navigationForImplementedRoutes(undefined, new Set())).toEqual([]);
  });
});
