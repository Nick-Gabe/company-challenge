import { ThemeContextProvider } from "contexts";
import { ReactNode } from "react";

export const withThemeContext = (component: () => ReactNode) => () => (
  <ThemeContextProvider>{component()}</ThemeContextProvider>
);
