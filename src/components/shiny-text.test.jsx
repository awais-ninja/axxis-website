import { render, screen } from "@testing-library/react";
import { ShinyText } from "./shiny-text";

function mockMotion(matches) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

describe("ShinyText", () => {
  test("renders a solid white eyebrow when motion is reduced", () => {
    mockMotion(true);
    render(<ShinyText>AXXIS Works</ShinyText>);

    const eyebrow = screen.getByText("AXXIS Works");
    expect(eyebrow).toHaveClass("text-white");
    expect(eyebrow).not.toHaveClass("shiny-text");
  });

  test("uses the sheen only when motion is allowed", () => {
    mockMotion(false);
    render(<ShinyText>AXXIS Works</ShinyText>);

    expect(screen.getByText("AXXIS Works")).toHaveClass("shiny-text");
  });
});
