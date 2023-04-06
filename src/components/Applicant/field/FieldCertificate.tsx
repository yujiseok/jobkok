import { useFormContext } from "react-hook-form";
import FieldInputBox from "@components/Applicant/FieldInputBox";

const FieldCertificate = ({ handleKeyDown }: any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="applicant-field-box">
      <legend className="applicant-field-legend">자격증</legend>
      <div className="applicant-filed-row">
        <FieldInputBox errors={errors.certificateName}>
          <label className="applicant-field-label" htmlFor="certificateName">
            자격증 이름
          </label>
          <input
            className="max-w-[160px] bg-transparent focus:outline-none"
            type="text"
            id="certificateName"
            maxLength={20}
            placeholder="자격증 이름을 알려주세요."
            {...register("certificateName")}
          />
        </FieldInputBox>
        <FieldInputBox errors={errors.certificatePublisher}>
          <label
            className="applicant-field-label"
            htmlFor="certificatePublisher"
          >
            발생처
          </label>
          <input
            className="max-w-[140px] bg-transparent focus:outline-none "
            type="text"
            id="certificatePublisher"
            maxLength={20}
            placeholder="발행처를 알려주세요."
            {...register("certificatePublisher")}
          />
        </FieldInputBox>
        <FieldInputBox errors={errors.certificateDate}>
          <label className="applicant-field-label" htmlFor="certificateDate">
            취득일
          </label>
          <input
            className="max-w-[120px] bg-transparent focus:outline-none "
            type="date"
            id="certificateDate"
            onKeyDown={handleKeyDown}
            {...register("certificateDate")}
          />
        </FieldInputBox>
      </div>
    </div>
  );
};
export default FieldCertificate;
