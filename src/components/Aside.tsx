import { useState } from "react";

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);
  return (
    <aside className="drawer-side h-screen w-56 bg-slate-300">
      <h1 className="ml-4 text-3xl">Jobkok Logo</h1>
      <ul className="menu bg-base-100 bg-transparent p-4 text-base-content">
        {ASIDE_MENU.map((menu, i) =>
          menu === "인재풀" ? (
            <li key={i} className="items-start">
              <li onClick={() => setIsOpen(!isOpen)}>{menu}</li>
              {isOpen ? (
                <li
                  className="items-start bg-transparent text-sm"
                  onClick={() => setSubMenuIsOpen(!subMenuIsOpen)}
                >
                  - 인재관리
                  {subMenuIsOpen ? (
                    <li className="items-start text-xs">- 채용 진행 현황</li>
                  ) : null}
                </li>
              ) : null}
            </li>
          ) : (
            <li key={i}>
              <a>{menu}</a>
            </li>
          ),
        )}
      </ul>
    </aside>
  );
};
export default Aside;

const ASIDE_MENU = [
  "인재풀",
  "폼 링크 관리",
  "단체 알림 센터",
  "기업 정보 변경",
];
