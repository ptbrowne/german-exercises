import React from "react";
import { Box, Drawer, Divider, Typography } from "@mui/material";
import { useUIStore } from "../hooks/useStore";
import { ThemeChooser } from "../ThemeChooser";
import { Link as RRLink } from "react-router-dom";
import { Link } from "@mui/material";
import refinedOtter from "../assets/polyglotter.png";

export const DrawerMenu = () => {
  const { isDrawerOpen, closeDrawer, debug, setDebug } = useUIStore((s) => s);
  const handleClickLink = () => {
    closeDrawer();
  };
  return (
    <Drawer
      open={isDrawerOpen}
      onClose={closeDrawer}
      anchor="right"
      sx={{ minWidth: 200 }}
    >
      <Box
        sx={{
          p: 2,
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            "& > a + a": { marginTop: 2 },
            "& > a": { display: "block" },
          }}
        >
          <Link
            underline="hover"
            component={RRLink}
            to="/"
            onClick={handleClickLink}
          >
            Train
          </Link>
          <Link
            underline="hover"
            component={RRLink}
            to="/debug"
            onClick={handleClickLink}
          >
            Progress
          </Link>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Box
            component="img"
            sx={{
              filter: "grayscale(0.5)",
              transition: "filter 1s ease",
              "&:hover": { filter: "grayscale(0)" },
            }}
            width={100}
            src={refinedOtter}
          />
          <Typography
            variant="body2"
            fontWeight={400}
            display="block"
            sx={{ mb: 1 }}
          >
            Polyglotter v0.0.1
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};
