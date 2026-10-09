import { fireEvent, render, screen } from "@testing-library/react";
import RootError from "./error";

describe("route error", () => {
  test("offers a retry and Home without showing the error details", () => {
    const reset = vi.fn();
    render(
      <RootError
        error={{ message: "database password leaked", digest: "secret" }}
        reset={reset}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/password leaked/)).not.toBeInTheDocument();
    expect(screen.queryByText("secret")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledOnce();
  });
});
