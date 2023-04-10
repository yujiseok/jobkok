import formatDate from "@/lib/utils/formatDate";
import type { ITalentDetail } from "@/types/talentDetail";

const TalentCertificate = ({ talentInfo }: { talentInfo: ITalentDetail }) => {
  return (
    <div className="px-4 pt-8">
      <div className="flex gap-6 ">
        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">자격증 이름</div>
          <div className="h-[52px] w-[506px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.certificateName}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">자격증 발행처</div>
          <div className="h-[52px] w-[285px] rounded-lg border bg-blue-25 px-6 py-4">
            {talentInfo.certificatePublisher}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="Caption1Medium text-gray-300">자격증 취득일</div>
          <div className="h-[52px] w-[285px] rounded-lg border bg-blue-25 px-6 py-4">
            {formatDate(talentInfo.certificateDate)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TalentCertificate;
