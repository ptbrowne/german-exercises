import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { allThemes, Theme } from "./models/deck";
import { deck } from "./App";

export const ThemeChooser = ({ onChange }: { onChange: () => void }) => {
  const handleChangeTheme = (theme: Theme) => {
    deck.initializeFromTheme(theme);
    onChange();
    document.scrollingElement?.scrollTo(0, 0);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& > button + button": {
          marginTop: "0.5rem",
        },
      }}
    >
      <Typography variant="body1" sx={{ mb: 1 }}>
        Theme
      </Typography>
      {allThemes.map((theme) => {
        return (
          <Button
            variant="outlined"
            key={theme}
            onClick={() => handleChangeTheme(theme)}
          >
            {theme.replace(/-/g, " / ")}
          </Button>
        );
      })}
    </Box>
  );
};
