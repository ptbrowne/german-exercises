import React from "react";
import { Select, MenuItem } from "@mui/material";
import { allThemes, Theme } from "./models/deck";
import { useUIStore } from "./hooks/useStore";
import { observer } from "mobx-react-lite";
import { deckManager } from "./models/deck-manager";

export const ThemeChooser = observer(
  ({ onChange }: { onChange?: () => void }) => {
    const { closeDrawer } = useUIStore((s) => s);
    const handleChangeTheme = (theme: Theme) => {
      deckManager.theme = theme;
      onChange?.();
      document.scrollingElement?.scrollTo(0, 0);
      closeDrawer();
    };
    return (
      <Select
        size="small"
        value={deckManager.theme}
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
  }
);
