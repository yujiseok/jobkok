import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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
  const { data: talentInfo } = useQuery({
    queryKey: ["talentInfo"],
    queryFn: () => getDetailInfo(id),
    suspense: true,
  });

  return (
    <section className="relative pt-8">
      <ConfirmFailModal />
      <Breadcrumbs />
      <section className="flex justify-between">
        <TalentDetailHeading />
        <div className="SubHead2Semibold flex items-start gap-4 rounded-md">
          <ConfirmDocsBtn />
          <ConfirmFailBtn />
          <PersonalNotiBtn />
        </div>
      </section>

      <section className="applicant-container mt-12 flex gap-5">
        <div className="applicant-left flex-[0.6]">
          <ProfileCard id={id} />
          <Timeline />
        </div>
        <div className=" flex flex-[0.4] flex-col gap-4">
          <InterviewInfo id={id} />
          <EvaluationNote id={id} />
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
