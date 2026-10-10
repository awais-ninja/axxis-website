import { render, screen } from "@testing-library/react";
import { SiteFooter } from "./site-footer";

describe("site footer", () => {
  test("names the company, the confirmed summary, and only existing routes", () => {
    render(<SiteFooter />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveTextContent("AXXIS Works Ltd");
    expect(footer).toHaveTextContent(
      "UK-based technology, software, IT and full-service marketing solutions company.",
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/services",
    );
    expect(
      screen.getByRole("link", { name: "Website Design & Development" }),
    ).toHaveAttribute("href", "/services/website-design-development");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
    expect(screen.getByRole("link", { name: "Accessibility" })).toHaveAttribute(
      "href",
      "/accessibility",
    );
    expect(
      screen.queryByRole("link", { name: "Cookies" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Terms" }),
    ).not.toBeInTheDocument();
    expect(footer).not.toHaveTextContent(/@|registered office|\+44/i);
  });

  test("prints the current year in the footer", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      `© ${new Date().getFullYear()} AXXIS Works Ltd`,
    );
  });

  test("follows a later copyright year supplied by the build", () => {
    const previous = process.env.NEXT_PUBLIC_COPYRIGHT_YEAR;
    process.env.NEXT_PUBLIC_COPYRIGHT_YEAR = "2027";

    try {
      render(<SiteFooter />);
      expect(screen.getByRole("contentinfo")).toHaveTextContent(
        "© 2027 AXXIS Works Ltd",
      );
    } finally {
      process.env.NEXT_PUBLIC_COPYRIGHT_YEAR = previous;
    }
  });

  test("omits a year instead of inventing one when the build did not set it", () => {
    const previous = process.env.NEXT_PUBLIC_COPYRIGHT_YEAR;
    delete process.env.NEXT_PUBLIC_COPYRIGHT_YEAR;

    try {
      render(<SiteFooter />);
      expect(screen.getByRole("contentinfo").textContent).toContain(
        "© AXXIS Works Ltd",
      );
      expect(screen.getByRole("contentinfo").textContent).not.toMatch(/© \d/);
    } finally {
      process.env.NEXT_PUBLIC_COPYRIGHT_YEAR = previous;
    }
  });
});
