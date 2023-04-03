import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Tick } from "@/assets/svg/archive-tick.svg";
import { ReactComponent as Back } from "@/assets/svg/backspace.svg";
import { ReactComponent as Profile } from "@/assets/svg/profile-detail.svg";

import useInputLength from "@/lib/hooks/useInputLength";
import type { ITalentDetail } from "@/types/talentDetail";

const data: ITalentDetail = {
  state: "200",
  result: "success",
  data: {
    recruitId: "1",
    applyName: "홍길동",
    applyPhone: "010-1111-1111",
    applyEmail: "applyTest@test.com",
    resumeContent: "저는 홍길동 입니다 !",
    applyPortfolio: "https://portfolio.portfolio",
    applyProcedure: "면접",
    evaluation: "나쁘지 않음",
    pass: "false",
    creationTime: "2023-03-21T13:04:30",
    applyDelete: "false",
    keywordSelect: ["센스 있어요"],
    wish: "true",
    careerName: "패스트캠퍼스",
    careerStart: "2022-01-01T00:00:00",
    careerEnd: "2023-01-01T00:00:00",
    careerDetail: "패캠 매니저 역할 수행했습니다.",
    eduName: "패캠대",
    eduYear: "4",
    eduMajor: "컴퓨터공학과",
    eduStatus: "졸업",
    eduStart: "2014-03-02T00:00:00",
    eduEnd: "2020-02-16T00:00:00",
    languageName: "영어",
    languageLevel: "중",
    languageDate: "2021-09-25T00:00:00",
    militaryStart: "2015-02-26T00:00:00",
    militaryEnd: "2017-02-25T00:00:00",
    militaryDivision: "만기제대",
    militaryCategory: "육군",
    militaryClass: "병장",
    militaryExemption: null,
    certificateName: "정보처리기사",
    certificateDate: "2022-05-25T00:00:00",
    certificatePublisher: "한국산업인력공단",
    activitesTitle:
      "패스트 캠퍼스 메가바이트 스쿨: 핀테크 서비스 백엔드 개발자 양성과정",
    activitesContent: "자바 및 스프링 교육",
    activitesStart: "2022-09-13T00:00:00",
    activitesEnd: "2023-04-14T00:00:00",
    awardsName: "패캠 해커톤 금상",
    awardsDate: "2023-01-20T00:00:00",
    awardsCompany: "패스트캠퍼스",
  },
};

const TalentDetail = () => {
  const [inputCount, handleInput] = useInputLength(MAX_LENGTH);
  const navigate = useNavigate();
  return (
    <>
      <div className="breadcrumbs flex justify-end pb-16 pt-7 text-sm">
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

      <div className="flex justify-between">
        <div>
          <div className="relative mb-3 flex items-center gap-6">
            <Back className="cursor-pointer" onClick={() => navigate(-1)} />
            <h2 className="Head2Semibold">인재 상세페이지</h2>
          </div>
          <p className="Head4Semibold ml-9 text-gray-500">
            인재 상세 정보를 확인하고 한 곳에서 채용 및 탈락 처리를 할 수
            있습니다.
          </p>
        </div>
        <div className="flex items-start gap-4">
          <button className="SubHead2Semibold cursor-pointer rounded-md bg-error-50 px-6 py-3 text-error-400">
            탈락 처리
          </button>
          <button className="SubHead2Semibold cursor-pointer rounded-md bg-blue-500 px-6 py-3 text-white">
            개별 알림 보내기
          </button>
        </div>
      </div>

      <section className="applicant-container mt-12 flex gap-5">
        <div className="applicant-left flex-[0.6]">
          <div className="info-container flex gap-10 rounded-md border-2 border-gray-50 bg-white p-8">
            <div className="applicant-avatar avatar">
              <div className="rounded-xl">
                <Profile className="bg-blue-50" />
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="applicant-detail flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <p className="Head4Semibold mb-1 mr-[0.625rem]">
                      {data.data.applyName}
                    </p>
                    <Tick className="cursor-pointer" />
                  </div>
                  <p className="SubHead2Medium text-gray-600">
                    {data.data.applyPhone}
                  </p>
                  <p className="SubHead2Medium text-gray-600">
                    {data.data.applyEmail}
                  </p>
                </div>
                <button className="SubHead2Semibold cursor-pointer rounded-md bg-blue-50 px-6 py-3 text-blue-400">
                  채용 확정
                </button>
              </div>
              <div className="badge-container mt-10 flex max-w-[280px] flex-wrap gap-x-2 gap-y-6px">
                <div className="SubHead2Semibold rounded-sm bg-gray-200 p-1 text-blue-25">
                  # {data.data.keywordSelect}
                </div>
                <div className="SubHead2Semibold rounded-sm bg-gray-200 p-1 text-blue-25">
                  # {data.data.keywordSelect}
                </div>
                <div className="SubHead2Semibold rounded-sm bg-gray-200 p-1 text-blue-25">
                  # {data.data.keywordSelect}
                </div>
                <div className="SubHead2Semibold rounded-sm bg-gray-200 p-1 text-blue-25">
                  # {data.data.keywordSelect}
                </div>
                <div className="SubHead2Semibold rounded-sm bg-gray-200 p-1 text-blue-25">
                  # {data.data.keywordSelect}
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-container mt-4 rounded-md border-2 border-gray-50 bg-white p-10">
            <p className="Head4Semibold pb-2">타임라인</p>
            <p className="SubHead2Medium pb-12 text-gray-400">
              인재의 채용 절차단계를 확인해보세요
            </p>
            <ul className="steps w-full ">
              <li className="step after:!bg-blue-400 after:!text-gray-0 ">
                <p>최초 접수</p>
                <p>2022.02.04</p>
              </li>
              <li className=" step before:!bg-blue-400 after:!bg-blue-400 after:!text-gray-0">
                <p>서류 합격</p>
                <p>2022.02.04</p>
              </li>
              <li className="step">
                <p> 면접</p>
                <br />
              </li>
              <li className="step">
                <p> 최종 합격</p>
                <br />
              </li>
            </ul>
          </div>
        </div>

        <div className=" flex flex-[0.4] flex-col gap-4">
          <div className="interview-container flex justify-between rounded-md border-2 border-gray-50 bg-white px-5 py-4">
            <p className="SubHead1Semibold">면접 관련 정보</p>
            <div className="interview-time-container flex gap-4">
              <div className="flex items-center gap-3">
                <span className="Caption1Medium text-gray-400">면접 날짜</span>
                <span className="BodyBody2">미정</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="Caption1Medium text-gray-400">면접 시간</span>
                <span className="BodyBody2">미정</span>
              </div>
            </div>
            <button className="SubHead2Medium cursor-pointer text-gray-400">
              수정하기
            </button>
          </div>

          <div className="feedback-note flex-1 rounded-md border-2 border-gray-50 bg-white p-7">
            <p className="SubHead1Semibold">평가노트</p>
            <p className="my-3 text-gray-400">
              인재의 전반적인 평가와 인상을 작성해보세요
            </p>
            <textarea
              placeholder="입력해 주세요"
              className="Caption1Medium textarea-bordered textarea textarea-lg min-h-[120px] w-full resize-none"
              maxLength={MAX_LENGTH}
              onChange={handleInput}
            ></textarea>
            <div className="Caption1Medium text-gray-300">
              <span>{inputCount.toLocaleString()}</span>
              <span>/{MAX_LENGTH.toLocaleString()}자</span>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-12">
        <p className="Head4Semibold">지원서 내용</p>
        <p className="SubHead2Medium mt-2 text-gray-400">
          인재가 작성하지 않은 우대사항 항목은 숨김 처리되며, 필요시 열어볼 수
          있습니다.
        </p>
        <div className="min-h-28 mt-11 rounded-md border bg-white px-11 py-4 pb-20">
          <ul className="SubHead1Semibold tabs w-full justify-between">
            <li className="tab text-lg font-bold">자기소개</li>
            <li className="tab text-lg font-bold">경력</li>
            <li className="tab text-lg font-bold">최종학력</li>
            <li className="tab text-lg font-bold">자격증</li>
            <li className="tab text-lg font-bold">수상내역</li>
            <li className="tab text-lg font-bold">어학능력</li>
            <li className="tab text-lg font-bold">기타이력</li>
            <li className="tab text-lg font-bold">취업우대사항</li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default TalentDetail;

const MAX_LENGTH = 1000;
