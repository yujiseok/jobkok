import { useState } from "react";
import { sendEmail } from "@/api/notification";
import { ReactComponent as SendingIcon } from "@/assets/svg/send.svg";
import { applicantProcedure } from "@/constants/applicantProcedure";
import useInputLength from "@/lib/hooks/useInputLength";
import type { ITalentDetail } from "@/types/talentDetail";

const PersonalNotiModal = ({
  talentInfo,
  id,
}: {
  talentInfo: ITalentDetail;
  id: string;
}) => {
  const [isAgree, setIsAgree] = useState(false);
  const [inputCount, handleInput] = useInputLength(MAX_LENGTH);
  const [noticeStep, setNoticeStep] = useState("");
  const [mailContent, setMailContent] = useState("");
  const applyIds = [Number(id)];
  const recruitId = talentInfo?.recruitId;

  const handleEmail = async () => {
    const res = await sendEmail(
      recruitId,
      applyIds,
      mailContent,
      noticeStep,
      "2023-02-20T15:59:46.803305",
    );
  };

  const handleNoticeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNoticeStep(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInput(e);
    setMailContent(e.target.value);
  };

  return (
    <>
      <input
        type="checkbox"
        id="personal-noti-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box px-8 pt-9 pb-10">
          <div className="flex items-center justify-between">
            <h3 className="Head4Semibold text-gray-800">개별 알림 보내기</h3>
            <select
              onChange={handleNoticeChange}
              value={noticeStep}
              className="select bg-blue-50 pl-5 pr-7 text-blue-500 focus:outline-transparent"
            >
              <option>전체</option>
              <option value="DOCS_PASS">서류 합격</option>
              <option value="MEET_PROPOSAL">면접 조율</option>
              <option value="FINAL_PASS">최종 합격</option>
            </select>
          </div>

          <textarea
            placeholder="입력해 주세요"
            className="Caption1Medium textarea-bordered textarea textarea-lg mt-14 min-h-[120px] w-full resize-none text-black"
            maxLength={MAX_LENGTH}
            onChange={handleTextChange}
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
            <button
              className="SubHead2Semibold h-[44px] w-[160px] cursor-pointer rounded-md bg-blue-500  text-white disabled:cursor-default disabled:bg-gray-200"
              disabled={!isAgree || !inputCount}
              onClick={handleEmail}
            >
              <label
                htmlFor="personal-noti-modal"
                className=" flex items-center justify-center gap-2"
              >
                알림 보내기
                <SendingIcon />
              </label>
            </button>
            <button className="SubHead2Semibold h-[44px] w-[160px] cursor-pointer rounded-md  border-[1px] border-blue-500  text-blue-500">
              <label htmlFor="personal-noti-modal" className="cursor-pointer">
                취소
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
