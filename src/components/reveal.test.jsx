import { render, screen } from "@testing-library/react";
import { Reveal } from "./reveal";

function renderReveal({ reduce, intersects, index = 0 }) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches:
      reduce &&
      (query.includes("reduce") || query === "(prefers-reduced-motion)"),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  window.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }

    observe() {
      this.callback([{ isIntersecting: intersects }]);
    }

    unobserve() {}

    disconnect() {}

    takeRecords() {
      return [];
    }
  };

  return render(
    <Reveal index={index}>
      <p>Story copy</p>
    </Reveal>,
  );
}

describe("reveal", () => {
  test("keeps story content visible when motion is reduced", () => {
    renderReveal({ reduce: true, intersects: true });
    expect(screen.getByText("Story copy")).toBeVisible();
  });

  test("keeps story content visible when it is not in view yet", () => {
    const view = renderReveal({ reduce: false, intersects: false });
    expect(screen.getByText("Story copy")).toBeVisible();
    view.unmount();
  });

  test("reveals story content without hiding it", () => {
    const view = renderReveal({
      reduce: false,
      intersects: true,
      index: 2,
    });
    expect(screen.getByText("Story copy")).toBeVisible();
    view.unmount();
  });
});
