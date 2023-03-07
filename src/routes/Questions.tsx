import React, { useRef, useState, useEffect } from "react";
import { SuperMemoGrade } from "supermemo";
import { Box, Button, Typography } from "@mui/material";
import { makeHoles } from "../models/sentences";
import { helperRules, prepositionToDeclinations } from "../models/prepositions";
import Deck from "../models/deck";
import { useCardIndexStore, useStore } from "../hooks/useStore";
import { CURRENT_DECK } from "../App";
import { detectPrepositions } from "../models/sentences";
import { HelperRule } from "../models/prepositions";
import Stack from "../components/Stack";
import { ThemeChooser } from "../ThemeChooser";

const formatHelperRule = (helperRule: HelperRule) => {
  return (
    <ul className="helper-rule">
      {Object.entries(helperRule).map((caseRule) => {
        return (
          <li key={caseRule[0]}>
            {caseRule[0]}: {caseRule[1]}
          </li>
        );
      })}
    </ul>
  );
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Questions = ({ deck }: { deck: Deck }) => {
  const { index, setIndex } = useCardIndexStore((s) => ({
    index: s.cardIndex,
    setIndex: s.setCardIndex,
  }));
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const [showResponse, setShowResponse] = useState(false);
  const currentSentence = deck.cards?.[index];

  const handleGrade = (grade: SuperMemoGrade) => {
    deck.grade(index, grade);
    deck.saveToLocalStorage(CURRENT_DECK);
  };

  const handleNext: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    if (showResponse) {
      handleGrade(5);
      setIndex(deck.getNewIndex());
      setShowResponse(false);
    } else {
      setShowResponse(true);
    }
  };

  return (
    <Box component="form" sx={{ my: 5 }} onSubmit={handleNext}>
      {currentSentence ? (
        <div className="question">
          <Typography variant="body1" gutterBottom>
            {makeHoles(currentSentence.original)}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {showResponse ? currentSentence.original : null}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {showResponse ? currentSentence.translation : null}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {showResponse
              ? detectPrepositions(currentSentence.original).map((p) => (
                  <div className="preposition" key={p}>
                    {p}: {prepositionToDeclinations[p]}
                    {helperRules[p as keyof typeof helperRules] ? (
                      <div>
                        {formatHelperRule(
                          helperRules[p as keyof typeof helperRules]
                        )}
                      </div>
                    ) : null}
                  </div>
                ))
              : null}
          </Typography>
        </div>
      ) : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          "& > .MuiButtonBase-root + .MuiButtonBase-root": {
            marginLeft: 1,
          },
        }}
      >
        <ThemeChooser />
        <Stack direction="row">
          {showResponse ? (
            <Button
              variant="outlined"
              type="submit"
              onClick={() => handleGrade(0)}
            >
              again
            </Button>
          ) : null}
          <Button variant="contained" type="submit" ref={nextButtonRef}>
            {showResponse ? "got it!" : "show answer"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Questions;
