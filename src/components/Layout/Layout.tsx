import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto mt-16 max-w-7xl pb-96">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
};
export default Layout;
