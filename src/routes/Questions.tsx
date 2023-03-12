import React, { useRef, useState, useEffect, FormEvent } from "react";
import { SuperMemoGrade } from "supermemo";
import { Box, Button, Typography } from "@mui/material";
import { makeHoles } from "../models/sentences";
import { helperRules, prepositionToDeclinations } from "../models/prepositions";
import Deck, { Card, Round } from "../models/deck";
import { useCardIndexStore, useUIStore } from "../hooks/useStore";
import { detectPrepositions } from "../models/sentences";
import { HelperRule } from "../models/prepositions";
import Stack from "../components/Stack";
import { ThemeChooser } from "../ThemeChooser";
import Amazing, { useAmazingRef } from "../components/Amazing";
import { deckManager } from "../models/deck-manager";
import { Point } from "../components/Point";

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

const useRound = ({
  deck,
  onGrade,
  onRoundCompleted,
}: {
  deck: Deck;
  onGrade: () => void;
  onRoundCompleted: () => void;
}) => {
  const makeRound = () => {
    const round = deck.getRound(5);
    round.onRoundCompleted = () => {
      onRoundCompleted();
      setRound(null);
    };
    return round;
  };

  const [round, setRound] = useState<Round | null>(null);

  const currentCard = round?.currentCard;

  const handleGrade = (grade: SuperMemoGrade) => {
    round?.onGrade(grade);
    onGrade();
  };

  const handleStartRound = () => {
    setRound(makeRound());
  };

  return {
    start: handleStartRound,
    currentCard,
    round,
    handleGrade,
  };
};

const Questions = () => {
  const deck = deckManager.deck;
  const [showResponse, setShowResponse] = useState(false);

  const onGrade = () => {
    setShowResponse(false);
  };

  const startRef = useAmazingRef();

  const { start, currentCard, round, handleGrade } = useRound({
    deck,
    onGrade,
    onRoundCompleted: () => {
      startRef.current();
      deckManager.increaseTodayRoundCount();
    },
  });

  const handleShowAnswer = (ev: FormEvent | MouseEvent) => {
    ev.preventDefault();
    setShowResponse(true);
  };

  const roundCount = deckManager.todayRoundCount;

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
        <>
          <Box sx={{ mb: 2 }}>
            Theme: <ThemeChooser />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={start}
              sx={{ mb: 2 }}
            >
              Start round
            </Button>
          </Box>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "& > .MuiButtonBase-root + .MuiButtonBase-root": {
            marginLeft: 1,
          },
        }}
      >
        {round ? (
          <>
            <Typography variant="caption" gutterBottom display="block">
              Card(s) remaining: {round.cards.length}
            </Typography>
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
          </>
        ) : null}
      </Box>
      <Box sx={{ position: "fixed", bottom: "2rem" }}>
        {Array(roundCount)
          .fill(null)
          .map((_x, i) => {
            return <Point>{(i + 1) % 3 === 0 ? "💫" : "⭐️"}</Point>;
          })}
      </Box>
    </Box>
  );
};

export default Questions;
