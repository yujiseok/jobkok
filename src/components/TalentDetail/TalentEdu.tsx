import type { ITalentDetail } from "@/types/talentDetail";

const TalentEdu = ({ talentInfo }: { talentInfo: ITalentDetail }) => {
  return (
    <div className="px-4 pt-8">
      <div className="flex gap-6 ">
        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">학교명</div>
          <div className="h-[52px] w-[506px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.eduName}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">년제</div>
          <div className="h-[52px] w-[285px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.eduYear}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">졸업상태</div>
          <div className="h-[52px] w-[285px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.eduStatus}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start">
        <div className="Caption1Medium text-gray-300"> 전공 지원자 작성 칸</div>
        <div className="h-[52px] w-full rounded-lg border bg-blue-25 px-6 py-4">
          {talentInfo.keywords}
        </div>
      </div>
    </div>
  );
};

export default TalentEdu;
