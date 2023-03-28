import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { applicantSubmit, emailAuth, submitApply } from "@/api/applicant";

const ApplicantAuth = () => {
  const navigate = useNavigate();
  const [isToggled, setToggle] = useState(false);
  const handleSubmitBtn = () => {
    navigate("/applicant/application?");
    // 지원서 등록 api
  };

  return (
    <div className="my-10 mx-auto w-8/12 flex-col content-center">
      {/* 추후 api 값 조회하여 출력으로 변경 */}
      <section className="mb-10">
        <h1 className="mb-5 text-center text-xl font-bold">
          아기사랑 파트타이머 직원 채용
        </h1>
        <ul>
          <li className="flex gap-5 ">
            <span>지원서 접수 마감일</span>
            <p>23/03/30</p>
          </li>
          <li className="flex gap-5">
            <span>면접 가능 기간</span>
            <p>2023/03/31 ~ 2023/04/01</p>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-l mb-5 font-bold">지원자 기본 정보</h2>
        <form className="flex-col gap-5">
          <div>
            <label htmlFor="name">이름(필수)</label>
            <input
              className="ml-3 border-2 border-solid border-gray-600"
              type="text"
              id="name"
              placeholder="이름을 작성해주세요"
            />
          </div>
          <div>
            <label htmlFor="tel">전화번호(필수)</label>
            <input
              className="ml-3 border-2 border-solid border-gray-600"
              type="tel"
              id="tel"
              placeholder="010-1234-5678"
            />
          </div>
          <div>
            <label htmlFor="email">이메일(필수)</label>
            <input
              className="ml-3 border-2 border-solid border-gray-600"
              type="email"
              id="email"
              placeholder="이메일 주소를 작성해주세요."
            />
            <button
              type="button"
              onClick={() => setToggle(!isToggled)}
              className="bg-slate-300"
            >
              인증받기
            </button>
          </div>
          {isToggled ? (
            <>
              <label>인증번호</label>
              <input type="number" placeholder="인증번호를 입력해주세요." />
              <button type="button" onClick={() => setToggle(!isToggled)}>
                완료
              </button>
            </>
          ) : null}
          <button
            type="submit"
            className="bg-slate-300"
            onClick={handleSubmitBtn}
          >
            지원서 작성
          </button>
        </form>
      </section>
    </div>
  );
};
export default ApplicantAuth;
