import React from "react";
import { Link } from "react-router-dom";

const Complete = () => {
  return (
    <div className="mt-32 flex flex-col items-center">
      <div className="Head2Semibold mb-2 text-title-gray">회원가입 완료</div>
      <p className="SubHead1Medium mb-14 text-gray-600">
        잡콕과 함께 더 효율적인 채용관리 시스템을 경험해 보세요
      </p>
      <p className="mb-16">이미지 삽입예정</p>
      <Link
        to="/sign-in"
        className="SubHead1Semibold my-5 mb-12 h-[48px] w-[430px] self-center rounded-lg bg-blue-500 text-gray-0"
      >
        시작하기
      </Link>
    </div>
  );
};

export default Complete;
