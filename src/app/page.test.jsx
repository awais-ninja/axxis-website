import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("homepage shell", () => {
  test("renders the company name, landmarks, and skip link", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "AXXIS Works Ltd" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Corporate website for AXXIS Works Ltd."),
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main");
  });

  test("shows the sized mark beside the company name and a current-page home link", () => {
    render(<HomePage />);

    const logo = document.querySelector("header img");
    expect(logo.getAttribute("src")).toContain("axxis-icon-256.png");
    expect(logo).toHaveAttribute("alt", "");
    expect(Number(logo.getAttribute("width"))).toBeGreaterThan(0);
    expect(Number(logo.getAttribute("height"))).toBeGreaterThan(0);

    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("link", { name: "AXXIS Works Ltd" }),
    ).toHaveAttribute("href", "/");
  });

  test("prints the current year in the footer", () => {
    render(<HomePage />);

    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      `© ${new Date().getFullYear()} AXXIS Works Ltd`,
    );
  });

  test("follows a later copyright year supplied by the build", () => {
    const previous = process.env.NEXT_PUBLIC_COPYRIGHT_YEAR;
    process.env.NEXT_PUBLIC_COPYRIGHT_YEAR = "2027";

    try {
      render(<HomePage />);
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
      render(<HomePage />);
      expect(screen.getByRole("contentinfo").textContent).toBe(
        "© AXXIS Works Ltd",
      );
    } finally {
      process.env.NEXT_PUBLIC_COPYRIGHT_YEAR = previous;
    }
  });
});
