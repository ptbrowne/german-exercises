import { Box, Button } from "@mui/material";
import { DebugTable } from "../components/DebugTable";
import { ThemeChooser } from "../ThemeChooser";
import { observer } from "mobx-react-lite";
import { deckManager } from "../models/deck-manager";

const Debug = observer(() => {
  const deck = deckManager.deck;
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <ThemeChooser />
        <Button onClick={() => deck.reset()}>reset</Button>
      </Box>
      <DebugTable deck={deck} />
    </>
  );
});

export default Debug;
