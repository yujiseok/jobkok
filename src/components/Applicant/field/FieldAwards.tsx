import { useFormContext } from "react-hook-form";
import type { IHandleKeyDown } from "@/types/application";
import FieldInputBox from "@components/Applicant/FieldInputBox";
import FormBox from "@components/NewForm/FormBox";
import FormInputBox from "@components/NewForm/FormInputBox";

const FieldAwards = ({ handleKeyDown }: IHandleKeyDown) => {
  if (location.pathname === "/applicant/application") {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    return (
      <div className="applicant-field-box">
        <legend className="applicant-field-legend">수상내역</legend>
        <div className="applicant-filed-row">
          <FieldInputBox errors={errors.awardsName}>
            <label className="applicant-field-label" htmlFor="awardsName">
              수상명
            </label>
            <input
              className="max-w-[150px]"
              type="text"
              id="awardsName"
              maxLength={20}
              placeholder="수상명을 작성해주세요."
              {...register("awardsName")}
            />
          </FieldInputBox>
          <FieldInputBox errors={errors.awardsCompany}>
            <label className="applicant-field-label" htmlFor="awardsCompany">
              수여기관
            </label>
            <input
              className="max-w-[160px]"
              type="text"
              id="awardsCompany"
              maxLength={20}
              placeholder="수여기관을 입력해주세요."
              {...register("awardsCompany")}
            />
          </FieldInputBox>
          <FieldInputBox errors={errors.awardsDate}>
            <label className="applicant-field-label" htmlFor="awardsDate">
              수상일
            </label>
            <input
              className="max-w-[120px] bg-transparent  focus:outline-none"
              type="date"
              id="awardsDate"
              onKeyDown={handleKeyDown}
              {...register("awardsDate")}
            />
          </FieldInputBox>
        </div>
      </div>
    );
  } else {
    return (
      <div className="form-field-box">
        <div className="applicant-filed-row">
          <FormBox>
            <label className="applicant-field-label" htmlFor="awardsName">
              수상명
            </label>
            <FormInputBox
              className="max-w-[150px]"
              type="text"
              id="awardsName"
            />
          </FormBox>
          <FormBox>
            <label className="applicant-field-label" htmlFor="awardsCompany">
              수여기관
            </label>
            <FormInputBox
              className="max-w-[160px]"
              type="text"
              id="awardsCompany"
            />
          </FormBox>
          <FormBox>
            <label className="applicant-field-label" htmlFor="awardsDate">
              수상일
            </label>
            <FormInputBox
              className="max-w-[120px]"
              type="date"
              id="awardsDate"
            />
          </FormBox>
        </div>
      </div>
    );
  }
};
export default FieldAwards;
