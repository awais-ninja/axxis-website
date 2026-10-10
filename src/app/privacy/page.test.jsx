import { render, screen } from "@testing-library/react";
import PrivacyPage, { metadata } from "./page";

describe("privacy page", () => {
  test("states a provisional notice and the closed enquiry form", () => {
    expect(metadata.title).toBe("Privacy · AXXIS Works Ltd");
    expect(metadata.description).toMatch(/not a complete privacy notice/);
    expect(metadata.alternates).toBeUndefined();

    render(<PrivacyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Privacy" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "Online enquiries" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "On this page" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "contact page" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(
      screen.getByText(/Online enquiries are not available yet/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not send, store, or email/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/not a complete privacy notice/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Provisional/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Information Commissioner's Office" }),
    ).toHaveAttribute("href", "https://ico.org.uk");

    const text = document.body.textContent;
    expect(text).not.toMatch(/@/);
    expect(text).not.toMatch(/\+44/);
    expect(text).not.toMatch(/legally complete|fully compliant/i);
    expect(text).not.toMatch(/we do not process any personal data/i);
  });
});
