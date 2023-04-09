import type { ITalentDetail } from "@/types/talentDetail";
import ConfirmDocsModal from "@components/TalentDetail/ConfirmDocsModal";

const ConfirmDocsBtn = ({ talentInfo }: { talentInfo: ITalentDetail }) => {
  console.log(talentInfo);
  if (talentInfo.checkApply !== null) {
    return (
      <button className="cursor-default rounded-md bg-gray-100 px-6 py-3 text-blue-500">
        서류 검토 완료
      </button>
    );
  }
  return (
    <label
      htmlFor="confirm-docs-modal"
      className="cursor-pointer rounded-md bg-blue-50 px-6 py-3 text-blue-500"
    >
      서류 검토
      <ConfirmDocsModal />
    </label>
  );
};
export default ConfirmDocsBtn;
