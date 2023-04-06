import { useFormContext } from "react-hook-form";
import FieldInputBox from "@components/Applicant/FieldInputBox";

const FieldCareer = ({ handleKeyDown }: any) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="applicant-field-box">
      <legend className="applicant-field-legend">경력(필수)</legend>
      <div className="applicant-filed-row">
        <FieldInputBox errors={errors.careerName}>
          <label className="applicant-field-label" htmlFor="careerName">
            일한곳
          </label>
          <input
            className="max-w-[214px] focus:outline-none"
            type="text"
            id="careerName"
            maxLength={50}
            placeholder="가장 관련있는 경력을 적어주세요."
            {...register("careerName")}
          />
        </FieldInputBox>
        <FieldInputBox errors={errors.careerPeriodStart}>
          <label className="applicant-field-label" htmlFor="careerPeriodStart">
            시작일
          </label>
          <input
            className="max-w-[120px] focus:outline-none"
            type="date"
            id="careerPeriodStart"
            onKeyDown={handleKeyDown}
            {...register("careerPeriodStart")}
          />
        </FieldInputBox>
        <FieldInputBox errors={errors.careerPeriodEnd}>
          <label className="applicant-field-label" htmlFor="careerPeriodEnd">
            마감일
          </label>
          <input
            className="max-w-[120px] focus:outline-none"
            type="date"
            id="careerPeriodEnd"
            onKeyDown={handleKeyDown}
            {...register("careerPeriodEnd")}
          />
        </FieldInputBox>
      </div>
      <div
        className={`flex h-[272px] items-center gap-4 rounded-lg border bg-gray-0 px-6 ${
          errors.careerDetail ? " border-error-400" : " border-gray-100"
        }`}
      >
        <label className="applicant-field-label w-20" htmlFor="careerDetail">
          상세 내용
        </label>
        <textarea
          className="h-full w-full resize-none py-4 focus:outline-none"
          id="careerDetail"
          placeholder="경력이 한개 이상일 경우, 일한 곳, 일한 기간, 상세 내용을 함께 적어주세요."
          maxLength={1000}
          {...register("careerDetail")}
        ></textarea>
      </div>
      <div className="Caption1Medium mt-[-16px] text-gray-400">
        {watch().careerDetail?.length}
        /1000자(공백포함)
      </div>
    </div>
  );
};
export default FieldCareer;
