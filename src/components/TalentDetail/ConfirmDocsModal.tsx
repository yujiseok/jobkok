import { useParams } from "react-router-dom";
import { checkApplication } from "@/api/talentDetail";
import { ReactComponent as Confirm } from "@/assets/svg/modal-confirm.svg";

const ConfirmDocsModal = () => {
  const { id } = useParams() as { id: string };
  const checkTalent = async () => {
    const res = await checkApplication(id);
    console.log(res);
  };

  return (
    <>
      <input type="checkbox" id="confirm-docs-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box flex flex-col p-10">
          <div className="flex justify-center">
            <Confirm />
          </div>
          <p className="SubHead1Semibold mx-auto mt-6 mb-8 text-gray-800">
            해당 인재의 서류를 검토 처리 하시겠습니까?
          </p>

          <div className="modal-action mt-0 flex justify-center gap-1">
            <button
              type="submit"
              className="SubHead2Semibold w-[150px] cursor-pointer  rounded-md bg-blue-500 px-[2.1875rem] py-[10px] text-white"
              onClick={checkTalent}
            >
              <label htmlFor="confirm-docs-modal" className="cursor-pointer">
                서류 검토 처리
              </label>
            </button>

            <button className="SubHead2Semibold w-[150px] cursor-pointer rounded-md border-[1px] border-blue-500 px-[2.1875rem]  py-[10px] text-blue-500">
              <label htmlFor="confirm-docs-modal" className="cursor-pointer">
                취소
              </label>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ConfirmDocsModal;
