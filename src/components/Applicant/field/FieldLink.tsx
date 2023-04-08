import { useFormContext } from "react-hook-form";
import FieldInputBox from "@components/Applicant/FieldInputBox";
import FormBox from "@components/NewForm/FormBox";
import FormInputBox from "@components/NewForm/FormInputBox";

const FieldLink = () => {
  if (location.pathname === "/applicant/application") {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    return (
      <div className="applicant-field-box">
        <legend className="applicant-field-legend">기타 이력서</legend>
        <div className="applicant-filed-row">
          <div>
            <FieldInputBox errors={errors.applyPortfolio}>
              <label className="applicant-field-label" htmlFor="applyPortfolio">
                포트폴리오 링크
              </label>
              <input
                className="focus:outline-none"
                type="url"
                id="applyPortfolio"
                placeholder="링크를 첨부해주세요."
                {...register("applyPortfolio")}
              />
            </FieldInputBox>
          </div>
          <div>
            <FieldInputBox errors={errors.applyResume}>
              <label className="applicant-field-label" htmlFor="applyResume">
                기타 링크
              </label>
              <input
                className="focus:outline-none"
                type="url"
                id="applyResume"
                placeholder="링크를 첨부해주세요."
                {...register("applyResume")}
              />
            </FieldInputBox>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="form-field-box">
        <div className="applicant-filed-row">
          <div>
            <FormBox>
              <label className="applicant-field-label" htmlFor="applyPortfolio">
                포트폴리오 링크
              </label>
              <FormInputBox type="url" id="applyPortfolio" />
            </FormBox>
          </div>
          <div>
            <FormBox>
              <label className="applicant-field-label" htmlFor="applyResume">
                기타 링크
              </label>
              <FormInputBox type="url" id="applyResume" />
            </FormBox>
          </div>
        </div>
      </div>
    );
  }
};
export default FieldLink;
