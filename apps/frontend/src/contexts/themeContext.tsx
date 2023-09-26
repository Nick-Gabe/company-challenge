import { FC, PropsWithChildren, createContext, useState } from "react";

const themes = {
  dark: {
    name: "dark",
    icon: "assets/moon.svg",
  },
  light: {
    name: "light",
    icon: "assets/sun.svg",
  },
};

type Themes = keyof typeof themes;

type ThemeContext = {
  theme: (typeof themes)["dark"];
  switchTheme: () => void;
  isDark: boolean;
};

export const ThemeContext = createContext({} as ThemeContext);

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState(
    themes[(localStorage.getItem("theme") || "light") as Themes],
  );

  const switchTheme = () => {
    const newTheme = theme.name === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(themes[newTheme]);
  };

  const isDark = theme.name === "dark";

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
