import formatDate from "@/lib/utils/formatDate";
import type { ITalentDetail } from "@/types/talentDetail";

const TalentLanguage = ({ talentInfo }: { talentInfo: ITalentDetail }) => {
  return (
    <div className="px-4 pt-8">
      <div className="flex gap-6 ">
        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">언어</div>
          <div className="h-[52px] w-[550px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.languageName}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">언어 수준</div>
          <div className="h-[52px] w-[550px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.languageLevel}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TalentLanguage;
