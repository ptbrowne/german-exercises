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
  Typography,
} from "@mui/material";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Stack from "./Stack";
import { scaleThreshold } from "d3";
import { observer } from "mobx-react-lite";

export const DebugTable = observer(({ deck }: { deck: Deck }) => {
  const [, setFi] = useState(0);

  const scale = scaleThreshold<number, string>()
    .domain([2.4, 2.8, 3.5])
    .range(["🍃", "🌱", "🪴", "🌳"]);

  const handleGradeIndex = (index: number, grade: SuperMemoGrade) => {
    deck.grade(index, grade);
    // force update
    setFi((i) => i + 1);
  };

  return (
    <Table>
      <TableBody>
        {deck.cards.length}
        {sortBy(deck.cards, [(c) => c.dueDate, "desc"]).map((c, i) => {
          return (
            <TableRow key={c.original}>
              <TableCell sx={{ textAlign: "center" }}>
                <span style={{ fontSize: "2.5rem" }}>{scale(c.efactor)}</span>
                <Typography variant="caption" color="textSecondary">
                  {c.efactor.toFixed(1)}
                </Typography>
              </TableCell>
              <TableCell>
                {c.original}
                <br></br>
                <Typography variant="caption">
                  next {formatDistanceToNow(c.dueDate, { addSuffix: true })}
                  {"  ·  "}
                  {c.repetition} repetition{c.repetition > 1 ? "s" : ""}
                </Typography>
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
});
