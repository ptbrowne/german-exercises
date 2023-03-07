import React, { useRef, useState } from "react";
import { SuperMemoGrade } from "supermemo";
import { Box, Button, Typography } from "@mui/material";
import { makeHoles } from "../models/sentences";
import { helperRules, prepositionToDeclinations } from "../models/prepositions";
import Deck from "../models/deck";
import { useStore } from "../hooks/useStore";
import { CURRENT_DECK } from "../App";
import { detectPrepositions } from "../models/sentences";
import { HelperRule } from "../models/prepositions";

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

const Questions = ({ deck }: { deck: Deck }) => {
  const { index, setIndex } = useStore((s) => ({
    index: s.cardIndex,
    setIndex: s.setCardIndex,
  }));
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const [showResponse, setShowResponse] = useState(false);
  const currentSentence = deck.cards?.[index];

  const highlightBackground = (className: "good" | "bad") => {
    const html = document.querySelector("html");
    if (html) {
      html.classList.add(className);
    }
    setTimeout(() => {
      html?.classList.remove(className);
    }, 500);
  };

  const handleGrade = (grade: SuperMemoGrade) => {
    highlightBackground(grade === 0 ? "bad" : "good");
    deck.grade(index, grade);
    deck.dumpToLocalStorage(CURRENT_DECK);
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
    <form onSubmit={handleNext}>
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
          justifyContent: "flex-end",
          "& > .MuiButtonBase-root + .MuiButtonBase-root": {
            marginLeft: 1,
          },
        }}
      >
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
      </Box>
    </form>
  );
};

export default Questions;
