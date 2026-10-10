import { render, screen } from "@testing-library/react";
import { SiteHeader } from "./site-header";

describe("site header", () => {
  test("shows the sized mark and the routes that exist", () => {
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
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/services",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveClass(
      "bg-electric",
    );
    expect(
      screen.queryByRole("link", { name: "Privacy" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Accessibility" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });
});
