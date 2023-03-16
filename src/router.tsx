import type { Router as RemixRouter } from "@remix-run/router/dist/router";
import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/Home";
import Test from "@pages/Test";

const router: RemixRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

export default router;
