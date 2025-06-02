"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import themes, { ThemeName } from "../themes";

interface ThemeContextType {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ClientThemeProvider");
  return ctx;
}

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with a default theme
  const [themeName, setThemeName] = useState<ThemeName>("classicLight");
  const [mounted, setMounted] = useState(false);

  // Only access localStorage after component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeName") as ThemeName;
    if (savedTheme && Object.keys(themes).includes(savedTheme)) {
      setThemeName(savedTheme);
    }
    setMounted(true);
  }, []);

  // Save theme preference
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("themeName", themeName);
    }
  }, [themeName, mounted]);

  const theme = useMemo(() => themes[themeName], [themeName]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
} 