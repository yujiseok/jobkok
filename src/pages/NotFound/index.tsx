import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-12">
      <h1 className="Head2Semibold">이런! 잘못된 경로입니다.</h1>
      <Link
        to="/"
        className="rounded-md bg-blue-400 py-4 px-8 text-gray-0 shadow-blue"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};
export default NotFound;
