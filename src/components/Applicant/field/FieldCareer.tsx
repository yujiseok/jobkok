import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";
import type { IHandleKeyDown } from "@/types/application";
import FieldInputBox from "@components/Applicant/FieldInputBox";
import FormBox from "@components/NewForm/FormBox";
import FormInputBox from "@components/NewForm/FormInputBox";

const FieldCareer = ({ handleKeyDown }: IHandleKeyDown) => {
  const location = useLocation();

  if (location.pathname.slice(0, 10) === "/applicant") {
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
              className="max-w-[210px] focus:outline-none"
              type="text"
              id="careerName"
              maxLength={50}
              placeholder="가장 관련있는 경력을 적어주세요."
              {...register("careerName")}
            />
          </FieldInputBox>
          <FieldInputBox errors={errors.careerStart}>
            <label className="applicant-field-label" htmlFor="careerStart">
              시작일
            </label>
            <input
              className="max-w-[120px] focus:outline-none"
              type="date"
              id="careerStart"
              onKeyDown={handleKeyDown}
              {...register("careerStart")}
            />
          </FieldInputBox>
          <FieldInputBox errors={errors.careerEnd}>
            <label className="applicant-field-label" htmlFor="careerEnd">
              마감일
            </label>
            <input
              className="max-w-[120px] focus:outline-none"
              type="date"
              id="careerEnd"
              onKeyDown={handleKeyDown}
              {...register("careerEnd")}
            />
          </FieldInputBox>
        </div>
        <div
          className={`applicant-field-textarea-div ${
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
          {watch().careerDetail === undefined
            ? 0
            : watch().careerDetail?.length}
          /1000자(공백포함)
        </div>
      </div>
    );
  } else {
    return (
      <div className="form-field-box">
        <div className="applicant-filed-row">
          <FormBox>
            <label className="applicant-field-label" htmlFor="careerName">
              일한곳
            </label>
            <FormInputBox
              className="max-w-[210px]"
              type="text"
              id="careerName"
            />
          </FormBox>
          <FormBox>
            <label className="applicant-field-label" htmlFor="careerStart">
              시작일
            </label>
            <FormInputBox
              className="max-w-[120px]"
              type="date"
              id="careerStart"
            />
          </FormBox>
          <FormBox>
            <label className="applicant-field-label" htmlFor="careerEnd">
              마감일
            </label>
            <FormInputBox
              className="max-w-[120px]"
              type="date"
              id="careerEnd"
            />
          </FormBox>
        </div>
        <div className="applicant-field-textarea-div border-gray-100 bg-blue-25">
          <label className="applicant-field-label w-20" htmlFor="careerDetail">
            상세 내용
          </label>
          <FormInputBox
            className="h-full w-full resize-none bg-blue-25 py-4 focus:outline-none"
            type="text"
            id="careerDetail"
          ></FormInputBox>
        </div>
        <div className="Caption1Medium mt-[-16px] text-gray-400">
          0/1000자(공백포함)
        </div>
      </div>
    );
  }
};
export default FieldCareer;
