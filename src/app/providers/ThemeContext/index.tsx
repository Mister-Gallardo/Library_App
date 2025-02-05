import React, { useEffect, useMemo, useState, ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(
    () => (localStorage.getItem("app-theme") as "light" | "dark" | "system") || "system"
  );

  useEffect(() => {
    localStorage.setItem("app-theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );
  };

  const prefersDarkMode = useMemo(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    []
  );

  const theme = useMemo(() => {
    const mode =
      themeMode === "system" ? (prefersDarkMode ? "dark" : "light") : themeMode;

    return createTheme({
      palette: {
        mode,
        background: {
          default: mode === "dark" ? "#1a1d29" : "#f0f4f8",
        },
        text: {
          primary: mode === "dark" ? "#f0f0f0" : "#333",
        },
      },
    });
  }, [themeMode, prefersDarkMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
