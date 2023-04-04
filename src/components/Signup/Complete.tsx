import React from "react";
import { useNavigate } from "react-router-dom";

const Complete = () => {
  const navigate = useNavigate();

  const clickButton = () => {
    navigate(`/sign-in`, { replace: true });
  };
  return (
    <div className="mt-32 flex flex-col items-center">
      <div className="Head2Semibold mb-2 text-title-gray">회원가입 완료</div>
      <p className="SubHead1Medium mb-14 text-gray-600">
        잡콕과 함께 더 효율적인 채용관리 시스템을 경험해 보세요
      </p>
      <p className="mb-16">이미지 삽입예정</p>
      <button
        className="SubHead1Semibold my-5 mb-12 h-[48px] w-[430px] self-center rounded-lg bg-blue-500 text-gray-0"
        type="submit"
        onClick={clickButton}
      >
        시작하기
      </button>
    </div>
  );
};

export default Complete;
