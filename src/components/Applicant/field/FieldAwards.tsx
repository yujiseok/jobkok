import { useFormContext } from "react-hook-form";
import type { IHandleKeyDown } from "@/types/application";
import FieldInputBox from "../FieldInputBox";

const FieldAwards = ({ handleKeyDown }: IHandleKeyDown) => {
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
            className="max-w-[150px] bg-transparent focus:outline-none"
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
            className="max-w-[160px] bg-transparent focus:outline-none"
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
};
export default FieldAwards;
