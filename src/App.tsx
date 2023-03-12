import React, { useState } from "react";
import {
  Box,
  Button,
  ThemeProvider,
  IconButton,
  CssBaseline,
} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";

import { theme } from "./theme";
import { useUIStore } from "./hooks/useStore";
import { DrawerMenu } from "./components/DrawerMenu";
import { Outlet } from "react-router-dom";

export default function App() {
  const { openDrawer } = useUIStore((s) => s);

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

      <Box
        className="App"
        sx={{ my: 4, mx: "auto", px: 2, maxWidth: 600, height: "100%" }}
      >
        <div className="fullscreen">
          <Outlet />
        </div>
      </Box>
    </ThemeProvider>
  );
}
