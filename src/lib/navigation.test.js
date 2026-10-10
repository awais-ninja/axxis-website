import {
  navigationForImplementedRoutes,
  primaryNavigation,
} from "./navigation";

describe("primary navigation", () => {
  test("lists only routes that exist", () => {
    expect(primaryNavigation).toEqual([
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
    ]);
    expect(primaryNavigation.map((item) => item.href)).not.toContain(
      "/contact",
    );
  });

  test("drops every candidate when no route has been built", () => {
    expect(navigationForImplementedRoutes(undefined, new Set())).toEqual([]);
  });
});
