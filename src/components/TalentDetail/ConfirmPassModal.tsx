import { ReactComponent as Confirm } from "@/assets/svg/modal-confirm.svg";
import useApplyPassMutate from "@/lib/hooks/useApplyPassMutate";
import type { ITalentDetail } from "@/types/talentDetail";

const ConfirmPassModal = ({
  talentInfo,
  id,
}: {
  talentInfo: ITalentDetail;
  id: string;
}) => {
  const { applyPassMutate } = useApplyPassMutate();
  const handlePassApplicant = () => {
    if (talentInfo.applyProcedure !== "최종조율")
      return alert("해당 대상자가 아닙니다!");
    applyPassMutate(id);
  };
  console.log(talentInfo);
  return (
    <>
      <input type="checkbox" id="confirm-pass-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box flex flex-col p-10">
          <div className="flex justify-center">
            <Confirm />
          </div>
          <p className="SubHead1Semibold mx-auto mt-6 mb-8 text-gray-800">
            해당 인재를 채용 확정 하시겠습니까?
          </p>

          <div className="modal-action mt-0 flex justify-center gap-1">
            <button
              type="submit"
              className="SubHead2Semibold w-[130px] cursor-pointer  rounded-md bg-blue-500 px-[2.1875rem] py-[10px] text-white"
              onClick={handlePassApplicant}
            >
              <label htmlFor="confirm-pass-modal" className="cursor-pointer">
                채용 확정
              </label>
            </button>

            <button className="SubHead2Semibold w-[130px] cursor-pointer rounded-md border-[1px] border-blue-500 px-[2.1875rem]  py-[10px] text-blue-500">
              <label htmlFor="confirm-pass-modal" className="cursor-pointer">
                취소
              </label>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ConfirmPassModal;
