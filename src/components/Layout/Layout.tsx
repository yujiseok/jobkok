import { useEffect } from "react";
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      pathname !== "/sign-in" &&
      pathname !== "/sign-up"
    ) {
      navigate("/sign-in");
    } else if (
      localStorage.getItem("token") &&
      (pathname === "/sign-in" || pathname === "/sign-up")
    ) {
      navigate("/");
    }
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto mt-16 max-w-7xl px-4 pb-64 pt-16">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
};
export default Layout;
