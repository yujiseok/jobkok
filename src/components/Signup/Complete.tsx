import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Done } from "@/assets/svg/signup.svg";

const Complete = () => {
  return (
    <div className="flex flex-col items-center pt-24">
      <div className="Head2Semibold pb-2 text-title-gray">회원가입 완료</div>
      <p className="SubHead1Medium pb-14 text-gray-600">
        잡콕과 함께 더 효율적인 채용관리 시스템을 경험해 보세요
      </p>
      <Done />
      <div className="mt-16">
        <Link
          to="/sign-in"
          className="SubHead1Semibold h-[48px] w-[430px] rounded-lg bg-blue-500 pt-3 text-center text-gray-0"
        >
          시작하기
        </Link>
      </div>
    </div>
  );
};

export default Complete;
