import { render, screen } from "@testing-library/react";
import RootLayout, { metadata, viewport } from "./layout";
import { site } from "@/lib/site";

describe("root layout", () => {
  test("publishes the company title and sized social image", () => {
    expect(metadata.title).toEqual({
      default: "AXXIS Works Ltd",
      template: "%s · AXXIS Works Ltd",
    });
    expect(metadata.description).toBe(site.supporting);
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.metadataBase).toBeUndefined();
    expect(metadata.alternates).toBeUndefined();
    expect(viewport).toEqual({ width: "device-width", initialScale: 1 });
    expect(metadata.openGraph.images).toBeUndefined();
    expect(metadata.icons.icon.map((icon) => icon.url)).toEqual([
      "/favicon.ico",
      "/axxis-icon-32.png",
      "/axxis-icon-192.png",
    ]);
    expect(metadata.icons.apple[0].url).toBe("/axxis-icon-180.png");
  });

  test("renders an English document around the shared shell", () => {
    render(
      <RootLayout>
        <p>Page body</p>
      </RootLayout>,
    );

    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(screen.getByText("Page body")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main");
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      document.querySelector('script[type="application/ld+json"]'),
    ).toBeNull();
  });
});
