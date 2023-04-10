import formatDate from "@/lib/utils/formatDate";
import type { ITalentDetail } from "@/types/talentDetail";

const TalentCarrer = ({ talentInfo }: { talentInfo: ITalentDetail }) => {
  return (
    <div className="px-4 pt-8">
      <div className="flex gap-6 ">
        <div className="flex flex-1 flex-col items-start">
          <div className="Caption1Medium text-gray-300">일한 곳</div>
          <div className="h-[52px] w-[500px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.careerName}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-start">
          <div className="Caption1Medium text-gray-300">시작일</div>
          <div className="h-[52px] w-[285px] rounded-lg border bg-blue-25 px-6 py-4">
            {formatDate(talentInfo.activitesStart)}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-start">
          <div className="Caption1Medium text-gray-300">종료일</div>
          <div className="h-[52px] w-[285px] rounded-lg border bg-blue-25 px-6 py-4">
            {formatDate(talentInfo.activitesEnd)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TalentCarrer;
