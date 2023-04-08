import { useFormContext } from "react-hook-form";
import { ReactComponent as IconSelect } from "@/assets/svg/check-gray.svg";
import { KEYWORDS_CHECK } from "@/constants/applicant";

const FieldKeywords = () => {
  const { register, watch } = useFormContext();
  console.log(watch());

  return (
    <div className="applicant-field-box">
      <legend className="applicant-field-legend ">나의 키워드(필수)</legend>
      <p className="applicant-field-Paragraph">
        해당되는 항목의 체크박스에 체크해주세요.
      </p>
      <div className="grid h-[108px] max-w-[820px] grid-cols-5 gap-2">
        {KEYWORDS_CHECK.map((keyword, index) => (
          <span key={index}>
            <label
              className={`SubHead2Semibold flex min-w-[137px] items-center justify-center gap-1 rounded-lg border border-gray-100 py-2.5 text-gray-500`}
              htmlFor={`keyword-${keyword}`}
            >
              <IconSelect />
              {keyword}
            </label>
            <input
              className="sr-only"
              type="checkbox"
              id={`keyword-${keyword}`}
              {...register(`keywords.${keyword}`)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
export default FieldKeywords;
