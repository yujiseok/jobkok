import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs absolute -top-6 right-0 flex justify-end text-sm">
      <ul>
        <li className="SubHead2Semibold text-gray-400">
          <Link to="/talent/management">인재 관리</Link>
        </li>
        <li className="SubHead2Semibold text-gray-400">
          <Link to="/talent/status">채용 진행 현황</Link>
        </li>
        <li className="SubHead2Semibold">인재 상세페이지</li>
      </ul>
    </div>
  );
};
export default Breadcrumbs;
