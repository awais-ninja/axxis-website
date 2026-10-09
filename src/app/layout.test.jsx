import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "./layout";

describe("root layout", () => {
  test("publishes the company title and sized social image", () => {
    expect(metadata.title).toBe("AXXIS Works Ltd");
    expect(metadata.description).toBe("Corporate website for AXXIS Works Ltd.");
    expect(metadata.openGraph.images[0].url).toBe("/axxis-og-1200x630.png");
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
  });
});
