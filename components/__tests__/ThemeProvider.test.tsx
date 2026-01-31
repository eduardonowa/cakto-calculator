/// <reference types="jest" />
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../ThemeProvider";

describe("ThemeProvider", () => {
  it("renders children", () => {
    render(
      <ThemeProvider>
        <span data-testid="child">Child content</span>
      </ThemeProvider>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Child content");
  });
});
