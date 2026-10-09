import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  test("renders an enabled button with its label", () => {
    render(<Button>Continue</Button>);

    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  test("applies an outline treatment without removing the accessible name", () => {
    render(
      <Button variant="outline" size="sm">
        Outline
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Outline" });
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button.className).toContain("border-border");
  });

  test("can be disabled", () => {
    render(<Button disabled>Wait</Button>);

    expect(screen.getByRole("button", { name: "Wait" })).toBeDisabled();
  });
});
