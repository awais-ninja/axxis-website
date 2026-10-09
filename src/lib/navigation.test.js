import {
  navigationForImplementedRoutes,
  primaryNavigation,
} from "./navigation";

describe("primary navigation", () => {
  test("lists only routes that exist", () => {
    expect(primaryNavigation).toEqual([{ href: "/", label: "Home" }]);
    expect(primaryNavigation.map((item) => item.href)).not.toEqual(
      expect.arrayContaining([
        "/about",
        "/services",
        "/contact",
        "/services/website-design-development",
      ]),
    );
  });

  test("drops every candidate when no route has been built", () => {
    expect(navigationForImplementedRoutes(undefined, new Set())).toEqual([]);
  });
});
