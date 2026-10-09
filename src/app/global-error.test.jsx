import { fireEvent, render, screen } from "@testing-library/react";
import GlobalError from "./global-error";

describe("global error", () => {
  test("keeps an English document and hides internal error details", () => {
    const reset = vi.fn();
    render(
      <GlobalError
        error={{ message: "stack trace token", digest: "hidden-digest" }}
        reset={reset}
      />,
    );

    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
    expect(screen.queryByText(/stack trace token/)).not.toBeInTheDocument();
    expect(screen.queryByText("hidden-digest")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledOnce();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
