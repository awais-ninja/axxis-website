import { render, screen } from "@testing-library/react";
import ServicePage, { generateMetadata, generateStaticParams } from "./page";
import { marketingCapabilities } from "@/lib/service-content";
import { services } from "@/lib/services";

describe("service pages", () => {
  test("builds only the seven allow-listed slugs", () => {
    expect(generateStaticParams().map((item) => item.slug)).toEqual(
      services.map((service) => service.slug),
    );
  });

  test("uses the service name in metadata and does not invent a canonical host", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "seo-search-marketing" }),
    });

    expect(metadata.title).toBe("SEO & Search Marketing · AXXIS Works Ltd");
    expect(metadata.description).toMatch(/Technical SEO/);
    expect(metadata.alternates).toBeUndefined();

    const missing = await generateMetadata({
      params: Promise.resolve({ slug: "websites" }),
    });
    expect(missing.title).toBe("Page not found · AXXIS Works Ltd");
  });

  test("returns not found for an unknown slug", async () => {
    await expect(
      ServicePage({ params: Promise.resolve({ slug: "websites" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  test("keeps each page on its own scope", async () => {
    const website = await ServicePage({
      params: Promise.resolve({ slug: "website-design-development" }),
    });
    const { unmount } = render(website);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Website Design & Development",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/online shop/)).toBeInTheDocument();
    expect(screen.queryByText(/Google Ads and PPC/)).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Website Maintenance & Support" }),
    ).toHaveAttribute("href", "/services/website-maintenance-support");
    expect(
      screen.getByRole("link", {
        name: "Contact AXXIS Works about Website Design & Development",
      }),
    ).toHaveAttribute("href", "/contact");
    unmount();

    const marketing = await ServicePage({
      params: Promise.resolve({ slug: "digital-marketing-advertising" }),
    });
    render(marketing);

    for (const capability of marketingCapabilities) {
      expect(
        screen.getByRole("heading", { level: 2, name: capability.name }),
      ).toBeInTheDocument();
    }

    const childLinks = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(
      childLinks.some((href) =>
        href.startsWith("/services/digital-marketing-advertising/"),
      ),
    ).toBe(false);
  });
});
