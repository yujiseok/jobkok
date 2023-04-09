import { useForm, useFormContext } from "react-hook-form";
import { ReactComponent as IconSelected } from "@/assets/svg/check-blue.svg";
import { ReactComponent as IconSelect } from "@/assets/svg/check-gray.svg";
import { KEYWORDS_CHECK } from "@/constants/applicant";

const FieldKeywords = () => {
  if (location.pathname.slice(0, 10) === "/applicant") {
    // const { register, watch } = useFormContext();
    // const keywordsReq = watch().keywords || {};
    const { register, watch } = useForm();
    const keywordsReq = watch().keywords || {};

    return (
      <div className="applicant-field-box mb-[52px] items-center gap-0">
        <legend className="applicant-field-legend mb-3 text-black">
          추천인재키워드
        </legend>
        <p className="SubHead2Medium mb-8 text-gray-400">
          10개 중 최대 5개 선택 가능합니다.
        </p>
        <div className="grid h-[108px] max-w-[820px] grid-cols-5 gap-2">
          {KEYWORDS_CHECK.map((keyword, index) => (
            <span key={index}>
              <label
                className={`SubHead1Semibold flex min-w-[137px] items-center justify-center gap-1 rounded-lg border py-2.5  ${
                  keywordsReq[keyword]
                    ? "border-gray-0 bg-blue-400 text-blue-25"
                    : "border-gray-100 bg-gray-0 text-gray-200"
                }`}
                htmlFor={`keywords-${keyword}`}
              >
                {keyword}
              </label>
              <input
                className="sr-only"
                type="checkbox"
                id={`keywords-${keyword}`}
                {...register(`keywords[${keyword}]`)}
              />
            </span>
          ))}
        </div>
      </div>

      // <div className="applicant-field-box">
      //   <legend className="applicant-field-legend ">나의 키워드(필수)</legend>
      //   <p className="applicant-field-Paragraph">
      //     해당되는 항목의 체크박스에 체크해주세요.
      //   </p>
      //   <div className="grid h-[108px] max-w-[820px] grid-cols-5 gap-2">
      //     {KEYWORDS_CHECK.map((keyword, index) => (
      //       <span key={index}>
      //         <label
      //           className={`SubHead2Semibold flex min-w-[137px] items-center justify-center gap-1 rounded-lg border py-2.5 text-gray-500 ${
      //             keywordsReq[keyword] ? "border-blue-500" : "border-gray-100"
      //           }`}
      //           htmlFor={`keywords-${keyword}`}
      //         >
      //           {keywordsReq[keyword] ? <IconSelected /> : <IconSelect />}
      //           {keyword}
      //         </label>
      //         <input
      //           className="sr-only"
      //           type="checkbox"
      //           id={`keywords-${keyword}`}
      //           {...register(`keywords[${keyword}]`)}
      //         />
      //       </span>
      //     ))}
      //   </div>
      // </div>
    );
  } else {
    const { register, watch } = useForm();
    const keywordsReq = watch().keywords || {};

    return (
      <div className="applicant-field-box mb-[52px] items-center gap-0">
        <legend className="applicant-field-legend mb-3 text-black">
          추천인재키워드
        </legend>
        <p className="SubHead2Medium mb-8 text-gray-400">
          10개 중 최대 5개 선택 가능합니다.
        </p>
        <div className="grid h-[108px] max-w-[820px] grid-cols-5 gap-2">
          {KEYWORDS_CHECK.map((keyword, index) => (
            <span key={index}>
              <label
                className={`SubHead1Semibold flex min-w-[137px] items-center justify-center gap-1 rounded-lg border py-2.5  ${
                  keywordsReq[keyword]
                    ? "border-gray-0 bg-blue-400 text-blue-25"
                    : "border-gray-100 bg-gray-0 text-gray-200"
                }`}
                htmlFor={`keywords-${keyword}`}
              >
                {keyword}
              </label>
              <input
                className="sr-only"
                type="checkbox"
                id={`keywords-${keyword}`}
                {...register(`keywords[${keyword}]`)}
              />
            </span>
          ))}
        </div>
      </div>
    );
  }
};
export default FieldKeywords;
