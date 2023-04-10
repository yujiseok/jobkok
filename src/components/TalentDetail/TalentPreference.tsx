import type { ITalentDetail } from "@/types/talentDetail";

const TalentPreference = ({ talentInfo }: { talentInfo: ITalentDetail }) => {
  return (
    <div className="px-4 pt-8">
      <div className="flex gap-6 ">
        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-0">장애</div>
          <div className="h-[52px] w-[263px] rounded-lg border bg-blue-25 px-6 py-4">
            장애
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-0">보훈</div>
          <div className="h-[52px] w-[263px] rounded-lg border bg-blue-25 px-6 py-4">
            보훈
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-0">고용 지원금</div>
          <div className="h-[52px] w-[263px] rounded-lg border bg-blue-25 px-6 py-4">
            고용 지원금
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-0">병역</div>
          <div className="h-[52px] w-[263px] rounded-lg border bg-blue-25 px-6 py-4">
            병역
          </div>
        </div>
      </div>
    </div>
  );
};
export default TalentPreference;
