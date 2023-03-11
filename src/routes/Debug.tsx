import { Box, Button } from "@mui/material";
import { DebugTable } from "../components/DebugTable";
import Deck from "../models/deck";
import { ThemeChooser } from "../ThemeChooser";

const Debug = ({ deck }: { deck: Deck }) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <ThemeChooser />
        <Button onClick={() => deck.reset()}>reset</Button>
      </Box>
      <DebugTable deck={deck} />;
    </>
  );
};

export default Debug;
