import { Button, Box, Typography } from "@mui/material";
import Deck from "../models/deck";
import { dumpExamples } from "../models/sentences";

const EditManualTheme = ({ deck }: { deck: Deck }) => {
  const handleEdit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    if (!form) {
      return;
    }
    const textarea: HTMLTextAreaElement | null =
      form?.querySelector("[name=sentences]");
    if (!textarea) {
      return;
    }
    deck.initializeFromSentences(textarea.value);
  };

  return (
    <form onSubmit={handleEdit}>
      <Typography variant="h4" gutterBottom>
        Edit manually
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Add your own sentences
      </Typography>
      <textarea
        defaultValue={dumpExamples(deck.cards)}
        name="sentences"
        style={{ width: "100%", minHeight: 200 }}
      ></textarea>
      <Box sx={{ mt: 1, "& > button + button": { ml: 1 } }}>
        <Button variant="contained" type="submit">
          ok
        </Button>
        <Button variant="outlined" type="submit">
          cancel
        </Button>
      </Box>
    </form>
  );
};

export default EditManualTheme;
