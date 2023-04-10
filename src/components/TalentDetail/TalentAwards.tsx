import formatDate from "@/lib/utils/formatDate";
import type { ITalentDetail } from "@/types/talentDetail";

const TalentAwards = ({ talentInfo }: { talentInfo: ITalentDetail }) => {
  return (
    <div className="px-4 pt-8">
      <div className="flex gap-6 ">
        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">수상명</div>
          <div className="h-[52px] w-[506px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.awardsName}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">수여기관</div>
          <div className="h-[52px] w-[285px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.awardsCompany}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">수상 공모일</div>
          <div className="h-[52px] w-[285px] rounded-lg border bg-blue-25 px-6 py-4">
            {formatDate(talentInfo.awardsDate)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TalentAwards;
