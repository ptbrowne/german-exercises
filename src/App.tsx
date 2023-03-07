import React, { useState } from "react";
import {
  Box,
  Button,
  ThemeProvider,
  IconButton,
  CssBaseline,
} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";

import { dumpExamples } from "./models/sentences";
import Deck from "./models/deck";
import { theme } from "./theme";
import { useStore } from "./hooks/useStore";
import { DrawerMenu } from "./components/DrawerMenu";
import { Outlet } from "react-router-dom";

export const CURRENT_DECK = "current";
export const deck = new Deck();
deck.initializeFromLocalStorage(CURRENT_DECK);

if (deck.cards.length === 0) {
  deck.initializeFromTheme("health-kids");
  deck.dumpToLocalStorage(CURRENT_DECK);
}

export default function App() {
  const { openDrawer, debug } = useStore((s) => s);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          color: "white",
        }}
      >
        <IconButton onClick={openDrawer}>
          <MoreVert />
        </IconButton>
        <DrawerMenu />
      </Box>

      <Box className="App" sx={{ my: 4 }}>
        <div className="fullscreen">
          <Outlet />
        </div>
      </Box>
    </ThemeProvider>
  );
}