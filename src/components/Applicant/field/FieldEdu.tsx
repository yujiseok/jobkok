import { useFormContext } from "react-hook-form";
import { EDULEVEL_OPTION, EDUSTATUS_OPTION } from "@/constants/applicant";
import type { IHandleKeyDown } from "@/types/application";
import FieldInputBox from "@components/Applicant/FieldInputBox";
import FormBox from "@components/NewForm/FormBox";
import FormInputBox from "@components/NewForm/FormInputBox";
import FormSelectBox from "@components/NewForm/FormSelectBox";

const FieldEdu = ({ handleKeyDown }: IHandleKeyDown) => {
  if (location.pathname.slice(0, 10) === "/applicant") {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    // 지원서 작성
    return (
      <div className="applicant-field-box">
        <legend className="applicant-field-legend">최종학력</legend>
        <div className="applicant-filed-row">
          <FieldInputBox errors={errors.eduName}>
            <label className="applicant-field-label" htmlFor="eduName">
              학교명
            </label>
            <input
              className="max-w-[200px] bg-transparent focus:outline-none"
              type="text"
              id="eduName"
              maxLength={20}
              placeholder="학교명을 입력해주세요."
              {...register("eduName")}
            />
          </FieldInputBox>
          <FieldInputBox errors={errors.eduMajor}>
            <label className="applicant-field-label" htmlFor="eduMajor">
              전공
            </label>
            <input
              className="max-w-[190px] bg-transparent focus:outline-none"
              type="text"
              id="eduMajor"
              maxLength={20}
              placeholder="전공을 입력해주세요."
              {...register("eduMajor")}
            />
          </FieldInputBox>
          <FieldInputBox errors={errors.eduYear}>
            <label className="sr-only" htmlFor="eduYear">
              년제
            </label>
            <select
              className="max-w-[160px] focus:outline-none"
              id="eduYear"
              {...register("eduYear")}
            >
              {EDULEVEL_OPTION.map((level) => {
                return (
                  <option key={level.value} value={level.value}>
                    {level.keywords}
                  </option>
                );
              })}
            </select>
          </FieldInputBox>
          <FieldInputBox errors={errors.eduStatus}>
            <label className="sr-only" htmlFor="eduStatus">
              졸업상태
            </label>
            <select
              className="max-w-[160px] focus:outline-none"
              id="eduStatus"
              {...register("eduStatus")}
            >
              {EDUSTATUS_OPTION.map((status) => {
                return (
                  <option key={status.value} value={status.value}>
                    {status.keywords}
                  </option>
                );
              })}
            </select>
          </FieldInputBox>
          <FieldInputBox errors={errors.eduStart}>
            <label className="applicant-field-label" htmlFor="eduStart">
              입학날짜
            </label>
            <input
              className="max-w-[120px] focus:outline-none"
              type="date"
              id="eduStart"
              onKeyDown={handleKeyDown}
              {...register("eduStart")}
            />
          </FieldInputBox>
          <FieldInputBox errors={errors.eduEnd}>
            <label className="applicant-field-label" htmlFor="eduEnd">
              졸업날짜
            </label>
            <input
              className="max-w-[120px] focus:outline-none"
              type="date"
              id="eduEnd"
              onKeyDown={handleKeyDown}
              {...register("eduEnd")}
            />
          </FieldInputBox>
        </div>
      </div>
    );
  } else {
    // 채용폼 작성
    return (
      <div className="form-field-box">
        <div className="applicant-filed-row">
          <FormBox>
            <label className="applicant-field-label" htmlFor="eduName">
              학교명
            </label>
            <FormInputBox className="max-w-[200px]" type="text" id="eduName" />
          </FormBox>
          <FormBox>
            <label className="applicant-field-label" htmlFor="eduMajor">
              전공
            </label>
            <FormInputBox className="max-w-[190px]" type="text" id="eduMajor" />
          </FormBox>
          <FormBox>
            <label className="sr-only " htmlFor="eduYear">
              년제
            </label>
            <FormSelectBox className="max-w-[160px]" id="eduYear">
              {EDULEVEL_OPTION.map((level) => {
                return (
                  <option key={level.value} value={level.value}>
                    {level.keywords}
                  </option>
                );
              })}
            </FormSelectBox>
          </FormBox>
          <FormBox>
            <label className="sr-only" htmlFor="eduStatus">
              졸업상태
            </label>
            <FormSelectBox className="max-w-[160px]" id="eduStatus">
              {EDUSTATUS_OPTION.map((status) => {
                return (
                  <option key={status.value} value={status.value}>
                    {status.keywords}
                  </option>
                );
              })}
            </FormSelectBox>
          </FormBox>
          <FormBox>
            <label className="applicant-field-label" htmlFor="eduStart">
              입학날짜
            </label>
            <FormInputBox
              className="max-w-[120px]e"
              type="date"
              id="eduStart"
            />
          </FormBox>
          <FormBox>
            <label className="applicant-field-label" htmlFor="eduEnd">
              졸업날짜
            </label>
            <FormInputBox className="max-w-[120px]" type="date" id="eduEnd" />
          </FormBox>
        </div>
      </div>
    );
  }
};
export default FieldEdu;
