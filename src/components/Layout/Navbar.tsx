import { Link } from "react-router-dom";
import { ReactComponent as NavProfile } from "@/assets/svg/nav-profile.svg";
const Navbar = () => {
  return (
    <nav className="min-h-16 fixed top-0 z-20 w-full bg-white">
      <div className="min-h-16 mx-auto flex max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-16 ">
          <Link to="/" className="text-2xl">
            <h2 className="Head3Semibold text-blue-400">Jobkok</h2>
          </Link>
          <ul className="SubHead1Medium flex cursor-pointer gap-12">
            {NavItems.map((item) =>
              item.name === "인재 관리" ? (
                <div key={item.name} className="dropdown-hover dropdown">
                  <li tabIndex={0}>
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
                    <ul className="dropdown-content menu rounded-box w-52 bg-white p-2 shadow">
                      <li>
                        <Link to="/talent/status">채용 진행 현황</Link>
                      </li>
                    </ul>
                  </li>
                </div>
              ) : (
                <li key={item.name}>
                  <Link to={item.href}>{item.name}</Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="dropdown-hover SubHead1Medium dropdown relative flex items-center gap-4">
          <NavProfile />
          <div className="dropdown flex items-center">
            <p>잡콕 미술학원</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </div>
          <ul className="dropdown-content menu rounded-box absolute top-7 flex w-52 bg-white p-2 shadow before:bg-error-400">
            <li>
              <Link to="/change-user-info">기업 정보 변경 </Link>
            </li>
            <li>
              <a>로그아웃</a>
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
