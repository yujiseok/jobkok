import { useParams } from "react-router-dom";
import { assortFailTalent } from "@/api/talentDetail";
import { ReactComponent as Trash } from "@/assets/svg/modal-trash.svg";

const ConfirmFailModal = () => {
  const { id } = useParams() as { id: string };
  const failTalent = async () => {
    const res = await assortFailTalent(id);
    console.log(res);
  };
  return (
    <>
      <input type="checkbox" id="confirm-fail-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box flex flex-col p-10">
          <div className="flex justify-center">
            <Trash />
          </div>
          <p className="SubHead1Semibold mx-auto mt-6 mb-8 text-gray-800">
            해당 인재를 탈락 처리 하시겠습니까?
          </p>

          <div className="modal-action mt-0 flex justify-center gap-1">
            <button
              type="submit"
              className="SubHead2Semibold w-[130px] cursor-pointer  rounded-md bg-blue-500 px-[2.1875rem] py-[10px] text-white"
              onClick={failTalent}
            >
              <label htmlFor="confirm-fail-modal" className="cursor-pointer">
                탈락 처리
              </label>
            </button>

            <button className="SubHead2Semibold w-[130px] cursor-pointer rounded-md border-[1px] border-blue-500 px-[2.1875rem]  py-[10px] text-blue-500">
              <label htmlFor="confirm-fail-modal" className="cursor-pointer">
                취소
              </label>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ConfirmFailModal;
