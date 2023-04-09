import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { postLogout } from "@/api/auth";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { ReactComponent as ChevronDown } from "@/assets/svg/chevron-down.svg";
import { ReactComponent as NavProfile } from "@/assets/svg/nav-profile.svg";
import { ReactComponent as Logo } from "@/assets/svg/newlogo.svg";
import { signOut } from "@/features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);
  const handleLogout = async () => {
    const res = await postLogout();
    if (res.state === 200) {
      dispatch(signOut());
      navigate("/sign-in");
    }
  };

  const { pathname } = useLocation();
  return (
    <nav className="min-h-16 fixed top-0 z-20 w-full bg-white">
      <div className="min-h-16 mx-auto flex max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-16">
          <Link to="/talent/management">
            <Logo />
          </Link>
          <ul className="SubHead1Medium flex cursor-pointer items-center gap-12">
            {NavItems.map((item) =>
              item.name === "인재 관리" ? (
                <div key={item.name} className="dropdown-hover dropdown">
                  <li tabIndex={0}>
                    <Link
                      to={item.href}
                      className={`${
                        pathname.includes(item.href.split("/")[1]) &&
                        pathname.split("/")[2] !== "fail"
                          ? "text-blue-400"
                          : ""
                      } flex  items-center`}
                    >
                      {item.name}
                      <ChevronDown />
                    </Link>
                    <ul className="dropdown-content menu rounded-box w-52 bg-white p-2 shadow">
                      <li>
                        <Link
                          to="/talent/status"
                          className="hover:bg-gray-0 hover:text-gray-900 active:bg-gray-0"
                        >
                          채용 진행 현황
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>
              ) : (
                <li key={item.name}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-blue-400" : ""
                    }
                    to={item.href}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="dropdown-hover SubHead1Medium dropdown relative flex items-center gap-4">
          <NavProfile />
          <div className="dropdown flex items-center">
            <p>{auth.companyName}</p>
            <ChevronDown />
          </div>
          <ul className="dropdown-content menu rounded-box absolute top-9 flex w-52 bg-white p-2 shadow">
            <li>
              <Link
                to="/change-user-info"
                className="hover:bg-gray-0 hover:text-gray-900 active:bg-gray-0"
              >
                기업 정보 변경
              </Link>
            </li>
            <li>
              <a
                className="hover:bg-gray-0 hover:text-gray-900 active:bg-gray-0"
                onClick={handleLogout}
              >
                로그아웃
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
const NavItems = [
  { name: "인재 관리", href: "/talent/management" },
  { name: "탈락 인재 보관함", href: "/talent/fail" },
  { name: "폼 링크 관리", href: "/form" },
  { name: "알림 센터", href: "/notification" },
];
