import { render } from "@testing-library/react";
import { OrganizationJsonLd } from "./organization-json-ld";

describe("organization json-ld", () => {
  test("renders nothing while the production origin is unconfirmed", () => {
    const { container } = render(<OrganizationJsonLd data={null} />);

    expect(container.querySelector("script")).toBeNull();
  });

  test("serializes only the confirmed organization fields", () => {
    const { container } = render(
      <OrganizationJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AXXIS Works Ltd",
          url: "https://www.example.com",
        }}
      />,
    );
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(script.textContent).toContain("AXXIS Works Ltd");
    expect(script.textContent).not.toMatch(/telephone|streetAddress|sameAs/);
  });
});
