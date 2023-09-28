import { render, screen, act } from "@testing-library/react";
import { ThemeContext, ThemeContextProvider } from "contexts";
import { describe, test, beforeEach, expect } from "vitest";

describe("Theme context", () => {
  beforeEach(() => {
    render(
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {({ switchTheme, theme, isDark }) => (
            <button onClick={switchTheme} data-isdark={isDark}>
              {theme.name}
            </button>
          )}
        </ThemeContext.Consumer>
      </ThemeContextProvider>,
    );
  });
  test("should start theme as light", () => {
    const button = screen.getByRole("button");
    expect(button.textContent).toBe("light");
    expect(button.dataset.isdark).toBe("false");
  });
  test("should be able to switch themes", () => {
    const button = screen.getByRole("button");
    act(() => button.click());
    expect(button.textContent).toBe("dark");
    expect(button.dataset.isdark).toBe("true");
  });
  test("should get theme based on localStorage", () => {
    localStorage.theme = "dark";
    const button = screen.getByRole("button");
    expect(button.textContent).toBe("dark");
    expect(button.dataset.isdark).toBe("true");
  });
});
