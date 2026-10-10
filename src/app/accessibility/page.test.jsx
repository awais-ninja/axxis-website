import { render, screen } from "@testing-library/react";
import AccessibilityPage, { metadata } from "./page";

describe("accessibility page", () => {
  test("names the design target without claiming an audit", () => {
    expect(metadata.title).toBe("Accessibility · AXXIS Works Ltd");
    expect(metadata.description).toMatch(/does not claim WCAG compliance/);
    expect(metadata.alternates).toBeUndefined();

    render(<AccessibilityPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Accessibility" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "Design target" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Known limitations" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/WCAG\) 2\.2, Level AA/)).toBeInTheDocument();
    expect(
      screen.getByText(/does not claim that the website meets that standard/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /No independent accessibility assessment has been completed/,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Skip to content/)).toBeInTheDocument();
    expect(
      screen.getAllByText(/Online enquiries are not available yet/).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "contact page" })).toHaveAttribute(
      "href",
      "/contact",
    );

    const text = document.body.textContent;
    expect(text).not.toMatch(/@/);
    expect(text).not.toMatch(/\+44/);
    expect(text).not.toMatch(/fully compliant|certified accessible/i);
  });
});
