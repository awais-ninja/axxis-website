import { render, screen } from "@testing-library/react";
import AboutPage, { metadata } from "./page";
import { services } from "@/lib/services";

describe("about page", () => {
  test("states the confirmed positioning and links to services and the enquiry section", () => {
    expect(metadata.title).toBe("About · AXXIS Works Ltd");
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "About AXXIS Works Ltd" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/UK-based technology, software, IT and full-service/),
    ).toBeInTheDocument();

    for (const service of services) {
      expect(
        screen.getByRole("link", { name: new RegExp(service.name) }),
      ).toHaveAttribute("href", `/services/${service.slug}`);
    }

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/services",
    );
    expect(
      screen.queryByRole("link", { name: "Privacy" }),
    ).not.toBeInTheDocument();
  });
});
