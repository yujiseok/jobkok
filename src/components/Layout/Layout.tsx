import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
};
export default Layout;
