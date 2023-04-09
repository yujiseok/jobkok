import { useFormContext } from "react-hook-form";
import { MILITARY_OPTION, TERMS_SENSITIVE } from "@/constants/applicant";
import FieldCheckbox from "@components/Applicant/FieldCheckbox";
import FieldInputBox from "@components/Applicant/FieldInputBox";
import FormBox from "@components/NewForm/FormBox";
import FormInputBox from "@components/NewForm/FormInputBox";

const FieldPreference = () => {
  if (location.pathname.slice(0, 10) === "/applicant") {
    const { register, watch } = useFormContext();

    // 지원서 작성
    return (
      <div className="applicant-field-box">
        <legend className="applicant-field-legend">취업우대사항</legend>
        <p className="applicant-field-Paragraph">
          본인이 해당하는 항목을 선택해주세요.
        </p>
        <div className="applicant-filed-row">
          <FieldCheckbox
            htmlFor="veteran"
            inputValue={watch().veteran}
            content="국가보훈"
          ></FieldCheckbox>
          <FieldCheckbox
            htmlFor="disorder"
            inputValue={watch().disorder}
            content="장애"
          />
          <FieldCheckbox
            htmlFor="employment"
            inputValue={watch().employment}
            content="고용지원금"
          />
          <FieldInputBox>
            <label className="sr-only" htmlFor="militaryEnum">
              병역사항
            </label>
            <select
              className="focus:outline-none"
              id="militaryEnum"
              {...register("militaryEnum")}
            >
              {MILITARY_OPTION.map((status) => {
                return (
                  <option key={status.value} value={status.value}>
                    {status.keywords}
                  </option>
                );
              })}
            </select>
          </FieldInputBox>
        </div>
        <FieldCheckbox
          className="SubHead2Semibold h-[86px] w-full text-gray-600"
          htmlFor="terms"
          inputValue={watch().terms}
          content="민감정보 제공 안내"
        >
          <p className="SubHead2Medium ml-6 h-[54px] max-w-[540px] overflow-auto text-gray-300">
            {TERMS_SENSITIVE}
          </p>
        </FieldCheckbox>
      </div>
    );
  } else {
    // 채용폼 작성
    return (
      <div className="form-field-box">
        <p className="applicant-field-Paragraph">
          본인이 해당하는 항목을 선택해주세요.
        </p>
        <div className="applicant-filed-row">
          <label
            className="SubHead1Semibold flex h-[52px] w-fit items-center rounded-lg border bg-gray-0 px-6  text-gray-500"
            htmlFor="veteran"
          >
            국가보훈
          </label>
          <label
            className="SubHead1Semibold flex h-[52px] w-fit items-center rounded-lg border bg-gray-0 px-6  text-gray-500"
            htmlFor="disorder"
          >
            장애
          </label>
          <label
            className="SubHead1Semibold flex h-[52px] w-fit items-center rounded-lg border bg-gray-0 px-6  text-gray-500"
            htmlFor="employment"
          >
            고용지원금
          </label>
          <FieldInputBox>
            <label className="sr-only" htmlFor="militaryEnum">
              병역사항
            </label>
            <select className="focus:outline-none" id="militaryEnum">
              {MILITARY_OPTION.map((status) => {
                return (
                  <option key={status.value} value={status.value}>
                    {status.keywords}
                  </option>
                );
              })}
            </select>
          </FieldInputBox>
        </div>
        <label
          className="SubHead2Semibold h-[86px]w-full flex items-center rounded-lg border bg-gray-0 px-6  text-gray-600"
          htmlFor="terms"
        >
          <p className="SubHead2Medium ml-6 h-[54px] max-w-[540px] overflow-auto text-gray-300">
            {TERMS_SENSITIVE}
          </p>
        </label>
      </div>
    );
  }
};
export default FieldPreference;
