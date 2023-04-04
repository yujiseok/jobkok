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
    // 쿠키에 토큰이 없을 때, 접속 페이지로 보내기
    if (
      !localStorage.getItem("token") &&
      pathname !== "/sign-in" &&
      pathname !== "/sign-up"
    ) {
      navigate("/sign-in");
    }
    // 쿠키에 토큰이 있을 때, 접속/회원가입/로그인으로 이동 막기
    else if (
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
