import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailInfo } from "@/api/talentDetail";
import { ReactComponent as Back } from "@/assets/svg/backspace.svg";
import Breadcrumbs from "@components/TalentDetail/Breadcrumbs";
import ConfirmDocsModal from "@components/TalentDetail/ConfirmDocsModal";
import ConfirmFailModal from "@components/TalentDetail/ConfirmFailModal";
import EvaluationNote from "@components/TalentDetail/EvaluationNote";
import InterviewInfo from "@components/TalentDetail/InterviewInfo";
import PersonalNotiModal from "@components/TalentDetail/PersonalNotiModal";
import ProfileCard from "@components/TalentDetail/ProfileCard";
import Timeline from "@components/TalentDetail/Timeline";

const TalentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { data: talentInfo } = useQuery({
    queryKey: ["talentInfo"],
    queryFn: () => getDetailInfo(id),
    suspense: true,
  });

  return (
    <div className="relative pt-8">
      <ConfirmFailModal />
      <Breadcrumbs />
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
        <div className="SubHead2Semibold flex items-start gap-4 rounded-md">
          <label
            htmlFor="confirm-docs-modal"
            className="cursor-pointer rounded-md bg-blue-50 px-6 py-3 text-blue-500"
          >
            서류 검토
            <ConfirmDocsModal />
          </label>

          <label
            htmlFor="confirm-fail-modal"
            className="cursor-pointer rounded-md bg-error-50 px-6 py-3 text-error-400"
          >
            탈락 처리
            <ConfirmFailModal />
          </label>
          <label
            htmlFor="personal-noti-modal"
            className="cursor-pointer rounded-md bg-blue-500 px-6 py-3 text-white"
          >
            개별 알림 보내기
          </label>
          {/* 모달 */}
          <PersonalNotiModal />
        </div>
      </div>

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

      <div className="mt-12">
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
      </div>
    </div>
  );
};
export default TalentDetail;

const MAX_LENGTH = 1000;

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
