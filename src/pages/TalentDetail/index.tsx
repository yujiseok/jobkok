import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailInfo } from "@/api/talentDetail";
import TalentResume from "@components/NewForm/TalentResume";
import Breadcrumbs from "@components/TalentDetail/Breadcrumbs";
import ConfirmDocsBtn from "@components/TalentDetail/ConfirmDocsBtn";
import ConfirmFailBtn from "@components/TalentDetail/ConfirmFailBtn";
import ConfirmFailModal from "@components/TalentDetail/ConfirmFailModal";
import EvaluationNote from "@components/TalentDetail/EvaluationNote";
import TalentDetailHeading from "@components/TalentDetail/Heading";
import InterviewInfo from "@components/TalentDetail/InterviewInfo";
import PersonalNotiBtn from "@components/TalentDetail/PersonalNotiBtn";
import ProfileCard from "@components/TalentDetail/ProfileCard";
import TalentAwards from "@components/TalentDetail/TalentAwards";
import TalentCarrer from "@components/TalentDetail/TalentCarrer";
import TalentCertificate from "@components/TalentDetail/TalentCertificate";
import TalentEdu from "@components/TalentDetail/TalentEdu";
import TalentEtc from "@components/TalentDetail/TalentEtc";
import TalentLanguage from "@components/TalentDetail/TalentLanguage";
import TalentPreference from "@components/TalentDetail/TalentPreference";
import Timeline from "@components/TalentDetail/Timeline";

const TalentDetail = () => {
  const { id } = useParams() as { id: string };
  const { data: talentInfo, isError } = useQuery({
    queryKey: ["talentInfo"],
    queryFn: () => getDetailInfo(id),
  });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const ADD_INFO = [
    { title: "자기소개", content: <TalentResume talentInfo={talentInfo} /> },
    { title: "경력", content: <TalentCarrer talentInfo={talentInfo} /> },
    { title: "최종학력", content: <TalentEdu talentInfo={talentInfo} /> },
    { title: "자격증", content: <TalentCertificate talentInfo={talentInfo} /> },
    { title: "수상내역", content: <TalentAwards talentInfo={talentInfo} /> },
    { title: "어학능력", content: <TalentLanguage talentInfo={talentInfo} /> },
    { title: "기타이력서", content: <TalentEtc talentInfo={talentInfo} /> },
    {
      title: "취업우대사항",
      content: <TalentPreference talentInfo={talentInfo} />,
    },
  ];

  if (talentInfo.status === 400 || isError) {
    return (
      <>
        <input
          type="checkbox"
          checked={true}
          id="confirm"
          className="modal-toggle"
        />
        <label htmlFor="confirm" className="modal">
          <label className="relative grid w-[680px] place-items-center rounded-lg bg-gray-0 pt-10 pb-[3.75rem] shadow-job2">
            <img src="/assets/images/folder.webp" alt="폴더" />
            <p className="SubHead1Semibold pt-6 pb-8 text-gray-800">
              인재가 존재하지 않습니다.
            </p>
            <div className="modal-action mt-0">
              <label
                htmlFor="confirm"
                className="SubHead2Semibold cursor-pointer rounded-lg bg-blue-500 px-[3.75rem] py-[0.7188rem] text-gray-0 shadow-blue"
                onClick={() => navigate("/")}
              >
                확인
              </label>
            </div>
          </label>
        </label>
      </>
    );
  }
  return (
    <section className="relative pt-8">
      <ConfirmFailModal />
      <Breadcrumbs />
      <section className="flex justify-between">
        <TalentDetailHeading />
        <div className="SubHead2Semibold flex items-start gap-4 rounded-md">
          <ConfirmDocsBtn talentInfo={talentInfo} />
          <ConfirmFailBtn />
          <PersonalNotiBtn talentInfo={talentInfo} id={id} />
        </div>
      </section>

      <section className="applicant-container mt-12 flex gap-5">
        <div className="applicant-left flex-[0.6]">
          <ProfileCard id={id} talentInfo={talentInfo} />
          <Timeline talentInfo={talentInfo} />
        </div>
        <div className=" flex flex-[0.4] flex-col gap-4">
          <InterviewInfo talentInfo={talentInfo} />
          <EvaluationNote id={id} talentInfo={talentInfo} />
        </div>
      </section>

      <section className="mt-12">
        <p className="Head4Semibold">지원서 내용</p>
        <p className="SubHead2Medium mt-2 text-gray-400">
          인재가 작성하지 않은 우대사항 항목은 숨김 처리되며, 필요시 열어볼 수
          있습니다.
        </p>

        <div className="min-h-28 mt-11 rounded-md border bg-white px-11 py-4 pb-20">
          <ul className="flex h-[66px] p-0">
            {ADD_INFO.map((field, index) => {
              return (
                <li
                  className={`SubHead1Semibold flex flex-1 cursor-pointer items-center justify-center border-t-0 border-r-0 border-l-0 ${
                    activeTab === index
                      ? "border-b-[0.143rem] border-blue-500 text-blue-500"
                      : "border-b-dashed border-b-2 border-blue-50 text-gray-400"
                  }`}
                  key={field.title}
                  onClick={() => setActiveTab(index)}
                >
                  {field.title}
                </li>
              );
            })}
          </ul>
          <div>{ADD_INFO[activeTab].content}</div>
        </div>
      </section>
    </section>
  );
};
export default TalentDetail;
