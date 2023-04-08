import { useFormContext } from "react-hook-form";
import { LANGUAGELEVEL_OPTION } from "@/constants/applicant";
import FieldInputBox from "../FieldInputBox";

const FieldLanguage = () => {
  if (location.pathname === "/applicant/application") {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    return (
      <div className="applicant-field-box">
        <legend className="applicant-field-legend">어학능력</legend>
        <div className="applicant-filed-row">
          <FieldInputBox errors={errors.languageName}>
            <label className="applicant-field-label" htmlFor="languageName">
              언어
            </label>
            <input
              className="focus:outline-none"
              type="text"
              id="languageName"
              maxLength={20}
              placeholder="언어를 입력해주세요."
              {...register("languageName")}
            />
          </FieldInputBox>
          <FieldInputBox errors={errors.languageLevel}>
            <label className="sr-only" htmlFor="languageLevel">
              수준
            </label>
            <select
              className="focus:outline-none"
              id="languageLevel"
              {...register("languageLevel")}
            >
              {LANGUAGELEVEL_OPTION.map((level) => {
                return (
                  <option key={level.value} value={level.value}>
                    {level.keywords}
                  </option>
                );
              })}
            </select>
          </FieldInputBox>
        </div>
      </div>
    );
  } else {
    return (
      <div className="applicant-field-box">
        <div className="applicant-filed-row">
          <FieldInputBox>
            <label className="applicant-field-label" htmlFor="languageName">
              언어
            </label>
            <input
              className="focus:outline-none"
              type="text"
              id="languageName"
              maxLength={20}
              placeholder="언어를 입력해주세요."
            />
          </FieldInputBox>
          <FieldInputBox>
            <label className="sr-only" htmlFor="languageLevel">
              수준
            </label>
            <select className="focus:outline-none" id="languageLevel">
              {LANGUAGELEVEL_OPTION.map((level) => {
                return (
                  <option key={level.value} value={level.value}>
                    {level.keywords}
                  </option>
                );
              })}
            </select>
          </FieldInputBox>
        </div>
      </div>
    );
  }
};
export default FieldLanguage;
