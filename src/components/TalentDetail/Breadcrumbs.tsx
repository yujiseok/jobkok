import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs absolute -top-6 right-0 flex justify-end text-sm">
      <ul>
        {breadcrumbsData.map((breadcrumb, index) => (
          <li
            key={index}
            className={`SubHead2Semibold ${
              index === breadcrumbsData.length - 1 ? "" : "text-gray-400"
            }`}
          >
            {breadcrumb.link ? (
              <Link to={breadcrumb.link}>{breadcrumb.title}</Link>
            ) : (
              breadcrumb.title
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;

const breadcrumbsData = [
  { title: "인재 관리", link: "/talent/management" },
  { title: "채용 진행 현황", link: "/talent/status" },
  { title: "인재 상세페이지", link: "" },
];
