import type { ITalentDetail } from "@/types/talentDetail";

const TalentResume = ({ talentInfo }: { talentInfo: ITalentDetail }) => {
  return (
    <div className="form-field-box">
      <div className="applicant-field-textarea-div border-gray-100 bg-blue-25">
        <div className="h-full w-full resize-none bg-blue-25 py-4 focus:outline-none">
          <p> {talentInfo.resumeContent}</p>
        </div>
      </div>
    </div>
  );
};
export default TalentResume;
