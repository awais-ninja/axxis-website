import { render, screen } from "@testing-library/react";
import { SiteHeader } from "./site-header";

describe("site header", () => {
  test("shows the sized mark and only the Home route", () => {
    render(<SiteHeader />);

    const logo = document.querySelector("header img");
    expect(logo.getAttribute("src")).toContain("axxis-icon-256.png");
    expect(logo).toHaveAttribute("alt", "");
    expect(Number(logo.getAttribute("width"))).toBe(48);
    expect(Number(logo.getAttribute("height"))).toBe(48);

    expect(
      screen.getByRole("link", { name: "AXXIS Works Ltd" }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.queryByRole("link", { name: "About" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });
});
