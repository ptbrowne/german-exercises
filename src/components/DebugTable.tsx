import React, { useState } from "react";
import Deck from "../models/deck";
import { SuperMemoGrade } from "supermemo";
import { sortBy } from "remeda";
import { Button } from "@mui/material";
import { CURRENT_DECK } from "../App";

export const DebugTable = ({ deck }: { deck: Deck }) => {
  const [, setFi] = useState(0);

  const handleGradeIndex = (index: number, grade: SuperMemoGrade) => {
    deck.grade(index, grade);
    deck.dumpToLocalStorage(CURRENT_DECK);
    // force update
    setFi((i) => i + 1);
  };
  return (
    <table>
      <tbody>
        {sortBy(deck.cards, [(c) => c.dueDate, "asc"]).map((c, i) => {
          return (
            <tr key={c.original}>
              <td>{c.original}</td>
              <td>{c.efactor.toFixed(1)}</td>
              <td>{c.interval.toFixed(1)}</td>
              <td>
                <Button
                  variant="outlined"
                  onClick={() => handleGradeIndex(i, 0)}
                >
                  -
                </Button>
              </td>
              <td>
                <Button
                  variant="outlined"
                  onClick={() => handleGradeIndex(i, 5)}
                >
                  +
                </Button>
              </td>
              <td>{c.dueDate.slice(0, 10)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
