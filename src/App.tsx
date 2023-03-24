import { RouterProvider } from "react-router-dom";
import Aside from "@components/Aside";
import router from "./router";
const App = () => {
  return (
    <>
      <Aside />
      <RouterProvider router={router} />
    </>
  );
};
export default App;
