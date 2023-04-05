import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs flex justify-end pb-10 pt-4 text-sm">
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
