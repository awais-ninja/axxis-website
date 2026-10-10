import { render, screen } from "@testing-library/react";
import NotFound, { metadata } from "./not-found";

describe("not found", () => {
  test("explains the missing address and links to Home and Contact", () => {
    expect(metadata.title).toBe("Page not found · AXXIS Works Ltd");
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("That address is not part of this website."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
