import { Outlet } from "react-router-dom";
import Aside from "./Aside";

const Layout = () => {
  return (
    <div className="flex">
      <Aside />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
