import type { ITalentDetail } from "@/types/talentDetail";
import PersonalNotiModal from "./PersonalNotiModal";

const PersonalNotiBtn = ({
  talentInfo,
  id,
}: {
  talentInfo: ITalentDetail;
  id: string;
}) => {
  return (
    <label
      htmlFor="personal-noti-modal"
      className="cursor-pointer rounded-md bg-blue-500 px-6 py-3 text-white"
    >
      개별 알림 보내기
      <PersonalNotiModal talentInfo={talentInfo!} id={id} />
    </label>
  );
};
export default PersonalNotiBtn;
