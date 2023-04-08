import { useFormContext } from "react-hook-form";
import { TERMS_APPLY } from "@/constants/applicant";
import FieldCheckbox from "@components/Applicant/FieldCheckbox";

const FieldTermAgree = () => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="applicant-field-box">
      <legend className="applicant-field-legend">약관동의</legend>
      <p className="applicant-field-Paragraph">
        지원하려면 약관동의가 필요합니다.
      </p>
      <FieldCheckbox
        className={`SubHead2Semibold h-[86px] w-full gap-3 py-4 text-gray-600`}
        htmlFor="requiredAgree"
        inputValue={watch().requiredAgree}
        errors={errors.requiredAgree}
        content={TERMS_APPLY[0].title}
      >
        <p className="SubHead2Medium h-[54px] max-w-[500px] overflow-auto text-gray-300">
          {TERMS_APPLY[0].description}
        </p>
      </FieldCheckbox>
      <FieldCheckbox
        className={`SubHead2Semibold h-[86px] w-full gap-3 py-4 text-gray-600 `}
        htmlFor="optionalAgree"
        inputValue={watch().optionalAgree}
        errors={errors.optionalAgree}
        content={TERMS_APPLY[1].title}
      >
        <p className="SubHead2Medium h-[54px] max-w-[500px] overflow-auto text-gray-300">
          {TERMS_APPLY[1].description}
        </p>
      </FieldCheckbox>
      <FieldCheckbox
        className={`SubHead2Semibold h-[86px] w-full gap-3 py-4 text-gray-600 `}
        htmlFor="consignAgree"
        inputValue={watch().consignAgree}
        errors={errors.consignAgree}
        content={TERMS_APPLY[2].title}
      >
        <p className="SubHead2Medium h-[54px] max-w-[500px] overflow-auto text-gray-300">
          {TERMS_APPLY[2].description}
        </p>
      </FieldCheckbox>
    </div>
  );
};
export default FieldTermAgree;
