import { useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import Navbar from "./Navbar";
const Layout = () => {
  const navigate = useNavigate();
  const { auth } = useAppSelector((state) => state);

  useEffect(() => {
    if (!auth.accessToken) {
      navigate("/sign-in");
    }
  }, [auth.accessToken]);

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
