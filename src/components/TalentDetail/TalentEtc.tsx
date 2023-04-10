import type { ITalentDetail } from "@/types/talentDetail";

const TalentEtc = ({ talentInfo }: { talentInfo: ITalentDetail }) => {
  return (
    <div className="px-4 pt-8">
      <div className="flex gap-6 ">
        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">포트폴리오 링크</div>
          <div className="h-[52px] w-[550px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.applyPortfolio}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">기타 링크</div>
          <div className="h-[52px] w-[550px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.applyResume}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TalentEtc;
