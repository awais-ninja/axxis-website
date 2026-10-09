import { fireEvent, render, screen } from "@testing-library/react";
import { SiteMenu } from "./site-menu";

const links = [{ href: "/", label: "Home" }];

describe("site menu", () => {
  test("marks the current route and hides links that were not supplied", () => {
    render(<SiteMenu links={links} pathname="/" />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.queryByRole("link", { name: "About" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Services" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Contact" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-controls",
      "primary-menu",
    );
  });

  test("opens from the button, closes on Escape, and returns focus", () => {
    render(<SiteMenu links={links} pathname="/" />);
    const button = screen.getByRole("button", { name: "Menu" });

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(document, { key: "Tab" });
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
  });

  test("closes for an outside pointer and for a route change", () => {
    const view = render(<SiteMenu links={links} pathname="/" />);
    const button = screen.getByRole("button", { name: "Menu" });

    fireEvent.click(button);
    fireEvent.pointerDown(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    fireEvent.pointerDown(document.body);
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    fireEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    view.rerender(<SiteMenu links={links} pathname="/missing" />);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  test("ignores Escape while the menu is closed", () => {
    render(<SiteMenu links={links} pathname="/" />);
    const button = screen.getByRole("button", { name: "Menu" });

    fireEvent.keyDown(document, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
