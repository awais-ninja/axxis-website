import { render, screen } from "@testing-library/react";
import ServicesPage, { metadata } from "./page";
import { services } from "@/lib/services";

describe("services overview", () => {
  test("lists exactly the seven services and links each one to its page", () => {
    expect(metadata.title).toBe("Services · AXXIS Works Ltd");
    render(<ServicesPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Services" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(8);

    for (const service of services) {
      expect(
        screen.getByRole("heading", { level: 2, name: service.name }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: `View ${service.name}` }),
      ).toHaveAttribute("href", `/services/${service.slug}`);
    }

    expect(screen.queryByText("An eighth service")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
