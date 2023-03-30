import { LayoutGroup } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <LayoutGroup>
      <nav className="min-h-16 fixed top-0 z-20 w-full bg-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4 ">
            <Link to="/" className="text-2xl">
              <h2>Jobkok</h2>
            </Link>
            <ul className="flex cursor-pointer gap-8">
              {NavItems.map((item) =>
                item.name === "인재 관리" ? (
                  <li
                    key={item.name}
                    tabIndex={0}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <Link to={item.href} className="flex">
                      {item.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                      </svg>
                    </Link>
                    {isOpen ? (
                      <ul className="absolute mt-6 rounded-md bg-base-100 p-2 shadow">
                        <li>
                          <Link to="/talent/status">채용 진행 현황</Link>
                        </li>
                      </ul>
                    ) : null}
                  </li>
                ) : (
                  <li key={item.name}>
                    <Link to={item.href}>{item.name}</Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="avatar mx-12 flex cursor-pointer items-center gap-2"
          >
            <div className="relative h-16 overflow-hidden rounded-full">
              <img src="https://static.wanted.co.kr/open_profile/avatar/7e2e5de776434647748ff9a0da9b6ae3bf9be13eeb40db398aa794817aa6fb5c" />
            </div>
            <p>
              잡콕 미술학원
              {isProfileOpen ? (
                <ul className="absolute mt-6 rounded-md bg-base-100 p-2 shadow">
                  <li>
                    <Link to="/change-user-info">기업 정보 변경</Link>
                  </li>
                  <li>로그아웃</li>
                </ul>
              ) : null}
            </p>
          </div>
        </div>
      </nav>
    </LayoutGroup>
  );
};
export default Navbar;
const NavItems = [
  { name: "인재 관리", href: "/talent/management" },
  { name: "탈락 인재 보관함", href: "/talent/fail" },
  { name: "폼 링크 관리", href: "/form" },
  { name: "알림 센터", href: "/notification" },
];
