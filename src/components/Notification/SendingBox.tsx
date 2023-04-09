import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { sendEmail, setProcedure } from "@/api/notification";
import { ReactComponent as Profile } from "@/assets/svg/heart-memoji.svg";
import { ReactComponent as SendingIcon } from "@/assets/svg/send.svg";
import useFormList from "@/lib/hooks/useFormList";
import useFormListQuery from "@/lib/hooks/useFormListQuery";
import type { ISelectedTalent } from "@/types/notification";

const SendingBox = ({
  selectedTalent,
  applyName,
  noticeStep,
  recruitId,
}: {
  selectedTalent: ISelectedTalent[];
  applyName: string;
  noticeStep: string;
  recruitId: string;
}) => {
  const formData = useFormListQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const applyProcedure = searchParams.get("applyProcedure") ?? "전체";
  const [defaultMsg, setDefaultMsg] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const handleNotiChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      applyProcedure,
      noticeStep: e.target.value,
      applyName,
    });
    const stepMsg = await setProcedure(recruitId, e.target.value);
    setDefaultMsg(stepMsg);
  };

  //선택된 인재 id만 배열로
  const applyIdsArray: number[] = selectedTalent.map((item) => item.applyId);

  const onSubmit = async (data: FormValues) => {
    if (noticeStep === ("all" || null)) return alert("단계를 선택해주세요");
    if (data.mailContent === "") return alert("내용을 입력해주세요");
    const res = await sendEmail(
      recruitId,
      applyIdsArray,
      data.mailContent,
      noticeStep,
      "2023-02-20T15:59:46.803305",
    );
    alert("메일 전송에 성공했습니다");
  };

  return (
    <>
      <div className="mb-12 mt-12 flex  items-center justify-between">
        <h2 className="Head3Semibold">알림 보내기</h2>

        <select
          className="rounded-md bg-blue-50 py-[10px] pr-5 pl-6 text-blue-500 focus:outline-transparent"
          onChange={handleNotiChange}
          value={noticeStep}
        >
          <option>전체</option>
          <option value="DOCS_PASS">서류 합격</option>
          <option value="MEET_PROPOSAL">면접 조율</option>
          <option value="FINAL_PASS">최종 합격</option>
        </select>
      </div>

      <div className="mb-6 flex items-center rounded-md bg-blue-25 py-4 px-4">
        <p className=" SubHead1Semibold mr-8 py-[11px] text-gray-800">
          받는 사람
        </p>
        <div className="flex items-center gap-4 rounded-md px-2">
          {selectedTalent?.map((item) => (
            <div
              key={item.applyId}
              className="flex items-center gap-4 rounded-lg border border-gray-50 bg-gray-0 py-[5px] px-2"
            >
              <Profile className="rounded-md bg-gray-50 " />
              <p className="SubHead1Medium text-gray-900">{item.applyName}</p>
            </div>
          ))}
        </div>
        <p className="Head4Semibold ml-6 text-gray-600">님</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="feedback-note flex-1 rounded-md border-2 border-gray-50 bg-white px-5 py-4"
      >
        <textarea
          disabled={isSubmitting}
          placeholder="절차를 선택하시면 기본 메세지가 제공됩니다."
          className="SubHead1Medium textarea-bordered textarea textarea-lg min-h-[300px] w-full resize-none"
          maxLength={MAX_LENGTH}
          // onChange={handleInput}
          defaultValue={defaultMsg}
          {...register("mailContent")}
        ></textarea>
        <div className="BodyBody3 mt-2 text-gray-300">
          <span>{watch().mailContent?.length.toLocaleString()}</span>
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
        <div className="flex justify-center">
          <button
            disabled={!isAgree}
            className="SubHead2Semibold flex items-center gap-2 rounded-md bg-blue-500 px-14 py-3 text-white disabled:bg-gray-200"
          >
            알림 보내기
            <SendingIcon />
          </button>
        </div>
      </form>
    </>
  );
};
export default SendingBox;

const MAX_LENGTH = 1000;
type FormValues = {
  mailContent: string;
};
