import { createBrowserRouter } from "react-router-dom";
import App, { deck } from "./App";
import Debug from "./routes/Debug";
import EditManualTheme from "./routes/EditManualTheme";
import Playground from "./routes/Playground";
import Questions from "./routes/Questions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Questions deck={deck} />,
      },
      {
        path: "debug",
        element: <Debug deck={deck} />,
      },
      {
        path: "edit",
        element: <EditManualTheme deck={deck} />,
      },
      {
        path: "playground",
        element: <Playground />,
      },
    ],
  },
]);

export default router;
