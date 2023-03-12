import { createBrowserRouter } from "react-router-dom";
import App from "./App";
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
        element: <Questions />,
      },
      {
        path: "debug",
        element: <Debug />,
      },
      {
        path: "edit",
        element: <EditManualTheme />,
      },
      {
        path: "playground",
        element: <Playground />,
      },
    ],
  },
]);

export default router;
