import { useState } from "react";
import { ReactComponent as SendingIcon } from "@/assets/svg/send.svg";
import { applicantProcedure } from "@/constants/applicantProcedure";
import useInputLength from "@/lib/hooks/useInputLength";

const PersonalNotiModal = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [inputCount, handleInput] = useInputLength(MAX_LENGTH);

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box px-8 pt-9 pb-10">
          <div className="flex items-center justify-between">
            <h3 className="Head4Semibold text-gray-800">개별 알림 보내기</h3>
            <select className="select bg-blue-50 px-3 text-blue-500 focus:outline-transparent">
              <option disabled>단계를 선택하세요</option>
              {applicantProcedure.map((procedure, i) => (
                <option key={i}>{procedure}</option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="입력해 주세요"
            className="Caption1Medium textarea-bordered textarea textarea-lg mt-14 min-h-[120px] w-full resize-none"
            maxLength={MAX_LENGTH}
            onChange={handleInput}
          ></textarea>
          <div className="BodyBody3 mt-2 text-gray-300">
            <span>{inputCount.toLocaleString()}</span>
            <span>/{MAX_LENGTH.toLocaleString()}자</span>
          </div>

          <div className="form-control mt-16 mb-6">
            <div className="flex justify-center gap-4">
              <input
                type="checkbox"
                className="h-5 w-5 border-gray-400 checked:bg-blue-500"
                onClick={() => setIsAgree(!isAgree)}
              />

              <span className="label-text">
                알림을 보내면 취소가 불가능함을 인지합니다
              </span>
            </div>
          </div>

          <div className="modal-action flex justify-center">
            <button type="submit">
              <label
                htmlFor="my-modal"
                // disabled={!isAgree || !inputCount}
                className="SubHead2Semibold flex cursor-pointer items-center gap-2 rounded-md bg-blue-500 px-14 py-3 text-white disabled:bg-gray-200"
              >
                알림 보내기
                <SendingIcon />
              </label>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default PersonalNotiModal;

const MAX_LENGTH = 1000;
