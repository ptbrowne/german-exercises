import React, { useRef, useState, useEffect, FormEvent } from "react";
import { SuperMemoGrade } from "supermemo";
import { Box, Button, Typography } from "@mui/material";
import { makeHoles } from "../models/sentences";
import { helperRules, prepositionToDeclinations } from "../models/prepositions";
import Deck, { Card, Round } from "../models/deck";
import {
  getCurrentDeck,
  useCardIndexStore,
  useUIStore,
} from "../hooks/useStore";
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

const removeItemAtIndex = <T,>(arr: T[], i: number) => {
  if (i < 0 || i >= arr.length) {
    return arr;
  }
  return [...arr.slice(0, i), ...arr.slice(i + 1)];
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
  const [showResponse, setShowResponse] = useState(false);
  const [round, setRound] = useState<Round | null>(null);
  const currentRoundItem = round?.[index];
  const currentCard = currentRoundItem?.card;

  const handleGrade = (grade: SuperMemoGrade) => {
    if (currentRoundItem?.index === undefined || !round) {
      return;
    }
    const newCard = deck.grade(currentRoundItem?.index, grade);
    deck.saveToLocalStorage();
    console.log(newCard, round, grade);
    if (grade === 5 && newCard && round) {
      // Remove card from round
      const newRound = removeItemAtIndex(round, index);
      setRound(newRound);
      const newIndex = index % (newRound.length - 1);
      console.log({ newIndex });
      setIndex(newIndex);
    } else {
      setIndex((index + 1) % (round?.length - 1));
    }
    setShowResponse(false);
  };

  const handleShowAnswer = (ev: FormEvent | MouseEvent) => {
    ev.preventDefault();
    setShowResponse(true);
  };

  const handleStartRound = () => {
    setRound(deck.getRound());
    setIndex(0);
  };

  return (
    <Box component="form" sx={{ my: 8 }}>
      {currentCard ? (
        <div className="question">
          <Typography variant="body1" gutterBottom>
            {makeHoles(currentCard.original)}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {showResponse ? currentCard.original : null}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {showResponse ? currentCard.translation : null}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {showResponse
              ? detectPrepositions(currentCard.original).map((p) => (
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
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStartRound}
            sx={{ mb: 2 }}
          >
            Start round
          </Button>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          "& > .MuiButtonBase-root + .MuiButtonBase-root": {
            marginLeft: 1,
          },
        }}
      >
        {round ? (
          <Typography variant="caption" gutterBottom display="block">
            Card(s) remaining: {round.length}
          </Typography>
        ) : (
          <div>
            Theme: <ThemeChooser />
          </div>
        )}
        {round ? (
          <Stack direction="row">
            {showResponse ? (
              <Button variant="outlined" onClick={() => handleGrade(0)}>
                again
              </Button>
            ) : null}
            {showResponse ? (
              <Button variant="contained" onClick={() => handleGrade(5)}>
                got it
              </Button>
            ) : null}
            {showResponse ? null : (
              <Button
                variant="contained"
                onClick={(ev) => handleShowAnswer(ev)}
              >
                show answer
              </Button>
            )}
          </Stack>
        ) : null}
      </Box>
    </Box>
  );
};

export default Questions;
