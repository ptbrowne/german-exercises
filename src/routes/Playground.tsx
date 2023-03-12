import { Box } from "@mui/material";
import { useState } from "react";
import Amazing, { useAmazingRef } from "../components/Amazing";
import { Point } from "../components/Point";

export default () => {
  const [tadaCount, setTadaCount] = useState(0);
  return (
    <>
      <button
        onClick={() => {
          setTadaCount((c) => c + 1);
        }}
      >
        +1
      </button>
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          bottom: "2rem",
          fontSize: "2rem",
        }}
      >
        {Array(tadaCount)
          .fill(null)
          .map((x, i) => (
            <Point>{(i + 1) % 3 === 0 ? "💫" : "⭐️"}</Point>
          ))}
      </Box>
    </>
  );
};
