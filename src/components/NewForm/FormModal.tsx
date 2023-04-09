import { useNavigate } from "react-router-dom";
import { ReactComponent as IconModalConfirm } from "@/assets/svg/modal-confirm.svg";
import { ReactComponent as IconModalDelete } from "@/assets/svg/modal-trash.svg";

const FormModal = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  // 뒤로가기 : 폼링크 관리 페이지로 이동
  const handleBackBtn = () => {
    navigate("/form");
  };

  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal">
        <label className="relative grid w-[680px] place-items-center rounded-lg bg-gray-0 pt-10 pb-[3.75rem] shadow-job2">
          {id === "delete-madal" ? <IconModalDelete /> : <IconModalConfirm />}
          <p className="SubHead1Semibold pt-6 pb-8 text-gray-800">
            {id === "delete-madal"
              ? "폼을 삭제합니다. 삭제하시겠습니까?"
              : "폼 내용이 저장되지 않았습니다. 폼 링크 관리로 이동하시겠습니까?"}
          </p>
          <div className="modal-action mt-0">
            <label
              htmlFor={id}
              className="SubHead2Semibold cursor-pointer rounded-lg bg-blue-500 px-[3.75rem] py-[0.7188rem] text-gray-0 shadow-blue"
              onClick={handleBackBtn}
            >
              확인
            </label>
            <label
              htmlFor={id}
              className="SubHead2Semibold cursor-pointer rounded-lg bg-gray-0 px-[3.75rem] py-[0.7188rem] text-blue-500 shadow-blue"
            >
              취소
            </label>
          </div>
        </label>
      </label>
    </>
  );
};
export default FormModal;
