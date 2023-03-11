import React from "react";
import { Box, Button, Typography, Select, MenuItem } from "@mui/material";
import { allThemes, Theme } from "./models/deck";
import { deck } from "./App";
import { DeckStore, useCurrentDeckStore, useUIStore } from "./hooks/useStore";

export const ThemeChooser = ({ onChange }: { onChange?: () => void }) => {
  const { closeDrawer } = useUIStore((s) => s);
  const { currentDeck, setCurrentDeck } = useCurrentDeckStore((s) => s);
  const handleChangeTheme = (theme: Theme) => {
    deck.initializeFromTheme(theme);
    setCurrentDeck(theme);
    onChange?.();
    document.scrollingElement?.scrollTo(0, 0);
    closeDrawer();
  };
  return (
    <Select
      size="small"
      value={currentDeck}
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
