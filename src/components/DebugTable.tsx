import React, { useState } from "react";
import Deck from "../models/deck";
import { SuperMemoGrade } from "supermemo";
import { sortBy } from "remeda";
import {
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from "@mui/material";
import { CURRENT_DECK } from "../App";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Stack from "./Stack";
import { scaleThreshold } from "d3";

export const DebugTable = ({ deck }: { deck: Deck }) => {
  const [, setFi] = useState(0);

  const scale = scaleThreshold<number, string>()
    .domain([1, 3.5, 4])
    .range(["🔴", "🟠", "🟢"]);

  const handleGradeIndex = (index: number, grade: SuperMemoGrade) => {
    deck.grade(index, grade);
    deck.dumpToLocalStorage(CURRENT_DECK);
    // force update
    setFi((i) => i + 1);
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>sentence</TableCell>
          <TableCell>learned</TableCell>
          <TableCell>interval</TableCell>
          <TableCell>due date</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortBy(deck.cards, [(c) => c.dueDate, "asc"]).map((c, i) => {
          return (
            <TableRow key={c.original}>
              <TableCell>{c.original}</TableCell>
              <TableCell>{scale(c.efactor)}</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                {formatDistanceToNow(c.dueDate, { addSuffix: true })}
              </TableCell>
              <TableCell>
                <Stack>
                  <Button
                    variant="outlined"
                    onClick={() => handleGradeIndex(i, 0)}
                  >
                    -
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleGradeIndex(i, 5)}
                  >
                    +
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
