import React from "react";
import { Box, Button, Typography, Select, MenuItem } from "@mui/material";
import { allThemes, Theme } from "./models/deck";
import { deck } from "./App";
import { useStore } from "./hooks/useStore";

export const ThemeChooser = ({ onChange }: { onChange?: () => void }) => {
  const handleChangeTheme = (theme: Theme) => {
    deck.initializeFromTheme(theme);
    setTheme(theme);
    onChange?.();
    document.scrollingElement?.scrollTo(0, 0);
    closeDrawer();
  };
  const { closeDrawer, theme, setTheme } = useStore((s) => s);
  return (
    <Select
      size="small"
      value={theme}
      onChange={(ev) => handleChangeTheme(ev.target.value as Theme)}
    >
      {allThemes.map((theme) => {
        return (
          <MenuItem key={theme} value={theme}>
            {theme.replace(/-/g, " / ")}
          </MenuItem>
        );
      })}
    </Select>
  );
};
