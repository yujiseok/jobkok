import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailInfo } from "@/api/talentDetail";
import Breadcrumbs from "@components/TalentDetail/Breadcrumbs";
import ConfirmDocsBtn from "@components/TalentDetail/ConfirmDocsBtn";
import ConfirmFailBtn from "@components/TalentDetail/ConfirmFailBtn";
import ConfirmFailModal from "@components/TalentDetail/ConfirmFailModal";
import EvaluationNote from "@components/TalentDetail/EvaluationNote";
import TalentDetailHeading from "@components/TalentDetail/Heading";
import InterviewInfo from "@components/TalentDetail/InterviewInfo";
import PersonalNotiBtn from "@components/TalentDetail/PersonalNotiBtn";
import ProfileCard from "@components/TalentDetail/ProfileCard";
import Timeline from "@components/TalentDetail/Timeline";

const TalentDetail = () => {
  const { id } = useParams() as { id: string };
  const { data: talentInfo, isError } = useQuery({
    queryKey: ["talentInfo"],
    queryFn: () => getDetailInfo(id),
  });
  const navigate = useNavigate();

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
  console.log(talentInfo);
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
          <ul className="SubHead1Semibold tabs w-full justify-between">
            {DETAIL_TAB_MENU.map((menu) => (
              <li key={menu} className="tab text-lg font-bold">
                {menu}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
};
export default TalentDetail;

const DETAIL_TAB_MENU = [
  "자기소개",
  "경력",
  "최종학력",
  "자격증",
  "수상 내역",
  "어학 능력",
  "기타 이력",
  "취업 우대 사항",
];
