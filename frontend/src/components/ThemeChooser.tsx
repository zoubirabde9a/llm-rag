"use client";
import React from "react";
import { useThemeContext } from "./ClientThemeProvider";
import { ThemeName, THEME_NAMES, THEME_LABELS } from "../themes";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function ThemeChooser() {
  const { themeName, setThemeName } = useThemeContext();
  return (
    <Box sx={{ width: 220, mx: "auto", my: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="theme-select-label">Theme</InputLabel>
        <Select
          labelId="theme-select-label"
          value={themeName}
          label="Theme"
          onChange={e => setThemeName(e.target.value as ThemeName)}
        >
          {THEME_NAMES.map(name => (
            <MenuItem key={name} value={name}>
              {THEME_LABELS[name]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
} 