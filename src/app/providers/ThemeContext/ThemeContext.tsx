import { createContext } from "react";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextProps {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  themeMode: "system",
  toggleTheme: () => {},
});
