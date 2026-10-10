import { fireEvent, render, screen } from "@testing-library/react";
import { ServiceBento } from "./service-bento";

describe("service bento", () => {
  test("moves one shared spotlight across the card under the pointer", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes("hover"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    render(<ServiceBento />);
    const card = document.querySelector("[data-service-card]");
    fireEvent.pointerMove(card.parentElement, { clientX: 1, clientY: 1 });
    fireEvent.pointerMove(card, { clientX: 40, clientY: 24 });

    expect(card.style.getPropertyValue("--spot-x")).toBe("40px");
    expect(card.style.getPropertyValue("--spot-y")).toBe("24px");
    expect(screen.getAllByRole("link")).toHaveLength(7);
  });
});
