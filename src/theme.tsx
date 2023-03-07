import { createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

export const themeOptions = {
  palette: {
    mode: "dark",
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#20293a",
    },
  },
  typography: {
    fontFamily: "Inter",
    button: {
      fontFamily: "Inter",
      textTransform: "none",
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 10,
  },
} satisfies ThemeOptions;

export const theme = createTheme(themeOptions);
