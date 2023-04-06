import { useFormContext } from "react-hook-form";
import { MILITARY_OPTION, TERMS_SENSITIVE } from "@/constants/applicant";
import FieldCheckbox from "@components/Applicant/FieldCheckbox";
import FieldInputBox from "@components/Applicant/FieldInputBox";

const FieldPreference = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="applicant-field-box">
      <legend className="applicant-field-legend">취업우대사항</legend>
      <p className="applicant-field-Paragraph">
        본인이 해당하는 항목을 선택해주세요.
      </p>
      <div className="applicant-filed-row">
        <FieldCheckbox htmlFor="veterans" inputValue={watch().veterans}>
          국가보훈
          <input
            className="sr-only"
            type="checkbox"
            id="veterans"
            {...register("veterans")}
          />
        </FieldCheckbox>
        <FieldCheckbox htmlFor="disability" inputValue={watch().disability}>
          장애
          <input
            className="sr-only"
            type="checkbox"
            id="disability"
            {...register("disability")}
          />
        </FieldCheckbox>
        <FieldCheckbox htmlFor="subsidy" inputValue={watch().subsidy}>
          고용지원금
          <input
            className="sr-only"
            type="checkbox"
            id="subsidy"
            {...register("subsidy")}
          />
        </FieldCheckbox>
        <FieldInputBox errors={errors.military}>
          <label className="sr-only" htmlFor="military">
            병역사항
          </label>
          <select
            className="focus:outline-none"
            id="military"
            {...register("military")}
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
        htmlFor="sensitiveAgree"
        inputValue={watch().sensitiveAgree}
      >
        민감정보 제공 안내
        <input
          className="sr-only"
          type="checkbox"
          id="sensitiveAgree"
          {...register("sensitiveAgree")}
        />
        <p className="SubHead2Medium ml-6 h-[54px] max-w-[540px] overflow-auto text-gray-300">
          {TERMS_SENSITIVE}
        </p>
      </FieldCheckbox>
    </div>
  );
};
export default FieldPreference;
