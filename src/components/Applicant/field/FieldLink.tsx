import { useFormContext } from "react-hook-form";
import FieldInputBox from "@components/Applicant/FieldInputBox";

const FieldLink = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="applicant-field-box">
      <legend className="applicant-field-legend">기타 이력서</legend>
      <div className="applicant-filed-row">
        <div>
          <FieldInputBox errors={errors.portfolio}>
            <label className="applicant-field-label" htmlFor="portfolio">
              포트폴리오 링크
            </label>
            <input
              className="focus:outline-none"
              type="url"
              id="portfolio"
              placeholder="링크를 첨부해주세요."
              {...register("portfolio")}
            />
          </FieldInputBox>
          <p className="mt-2 text-sm text-error-400">
            {errors.portfolio?.message}
          </p>
        </div>
        <div>
          <FieldInputBox errors={errors.link}>
            <label className="applicant-field-label" htmlFor="link">
              기타 링크
            </label>
            <input
              className="focus:outline-none"
              type="url"
              id="link"
              placeholder="링크를 첨부해주세요."
              {...register("link")}
            />
          </FieldInputBox>
          <p className="mt-2 text-sm text-error-400">{errors.link?.message}</p>
        </div>
      </div>
    </div>
  );
};
export default FieldLink;
