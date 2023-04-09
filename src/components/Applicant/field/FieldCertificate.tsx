import { useFormContext } from "react-hook-form";
import type { IHandleKeyDown } from "@/types/application";
import FieldInputBox from "@components/Applicant/FieldInputBox";
import FormBox from "@components/NewForm/FormBox";
import FormInputBox from "@components/NewForm/FormInputBox";

const FieldCertificate = ({ handleKeyDown }: IHandleKeyDown) => {
  if (location.pathname.slice(0, 10) === "/applicant") {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    // 지원서 작성
    return (
      <div className="applicant-field-box">
        <legend className="applicant-field-legend">자격증</legend>
        <div className="applicant-filed-row">
          <FieldInputBox errors={errors.certificateName}>
            <label className="applicant-field-label" htmlFor="certificateName">
              자격증 이름
            </label>
            <input
              className="max-w-[160px] focus:outline-none"
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
              className="max-w-[140px] focus:outline-none"
              type="text"
              id="certificatePublisher"
              maxLength={20}
              placeholder="발행처를 알려주세요."
              {...register("certificatePublisher")}
            />
          </FieldInputBox>
          <FieldInputBox errors={errors.certificateDate}>
            <label className="applicant-field-label " htmlFor="certificateDate">
              취득일
            </label>
            <input
              className="max-w-[120px] focus:outline-none"
              type="date"
              id="certificateDate"
              onKeyDown={handleKeyDown}
              {...register("certificateDate")}
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
            <label className="applicant-field-label" htmlFor="certificateName">
              자격증 이름
            </label>
            <FormInputBox
              className="max-w-[160px]"
              type="text"
              id="certificateName"
            />
          </FormBox>
          <FormBox>
            <label
              className="applicant-field-label"
              htmlFor="certificatePublisher"
            >
              발생처
            </label>
            <FormInputBox
              className="max-w-[140px] "
              type="text"
              id="certificatePublisher"
            />
          </FormBox>
          <FormBox>
            <label className="applicant-field-label" htmlFor="certificateDate">
              취득일
            </label>
            <FormInputBox
              className="max-w-[120px] "
              type="date"
              id="certificateDate"
            />
          </FormBox>
        </div>
      </div>
    );
  }
};
export default FieldCertificate;
