import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("homepage", () => {
  test("states the company name and the current public description", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "AXXIS Works Ltd" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Corporate website for AXXIS Works Ltd."),
    ).toBeInTheDocument();
  });
});
