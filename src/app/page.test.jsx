import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

describe("homepage", () => {
  test("renders the hero, seven services, story, and in-page actions", () => {
    render(<HomePage />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent(site.headline);
    expect(title.nextElementSibling).toHaveTextContent(site.supporting);
    expect(title).not.toHaveClass("shiny-text");

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "#enquiry",
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "#services",
    );

    for (const service of services) {
      const link = screen.getByRole("link", { name: service.name });
      expect(link).toHaveAttribute("href", `#${service.slug}`);
      expect(link.getAttribute("href")).not.toContain("/services/");
    }

    expect(
      screen.getByRole("heading", { name: "Care and IT" }),
    ).toBeInTheDocument();
    expect(document.getElementById("enquiry")).toBeInTheDocument();
  });
});
