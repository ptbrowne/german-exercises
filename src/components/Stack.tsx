import { useTheme, Box, BoxProps } from "@mui/material";

const Stack = ({
  direction = "row",
  spacing = 1,
  children,
  ...props
}: {
  direction?: "row" | "column";
  spacing?: number;
  children: React.ReactNode;
} & BoxProps) => {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        flexDirection: direction,
        // not() is there to increase specificity
        "& > *:not(html) + *": {
          [direction === "row" ? "ml" : "mt"]: spacing,
        },

        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Stack;
