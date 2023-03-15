import type { Router as RemixRouter } from "@remix-run/router/dist/router";
import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/Home";

const router: RemixRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
