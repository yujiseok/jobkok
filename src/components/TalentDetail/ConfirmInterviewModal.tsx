import { useParams } from "react-router-dom";
import { ReactComponent as Confirm } from "@/assets/svg/modal-confirm.svg";
import useSetInterviewMutate from "@/lib/hooks/useSetInterviewMutate";

const ConfirmInterviewModal = ({
  interviewDate,
  interviewTime,
  setIsEditing,
}: {
  interviewDate: string;
  interviewTime: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { id } = useParams() as { id: string };
  const { setInterviewMutate } = useSetInterviewMutate();

  const handleInterview = () => {
    setInterviewMutate({ id, interviewDate, interviewTime });
    setIsEditing(false);
  };

  return (
    <>
      <input
        type="checkbox"
        id="confirm-interview-modal"
        className="modal-toggle"
      />
      <div className="modal ">
        <div className="modal-box flex flex-col p-10">
          <div className="flex justify-center">
            <Confirm />
          </div>
          <p className="SubHead1Semibold mx-auto mt-6 mb-8 text-gray-800">
            면접 일정을 확정하시겠습니까?
          </p>

          <div className="modal-action mt-0 flex justify-center gap-1">
            <button
              type="submit"
              className="SubHead2Semibold w-[130px] cursor-pointer  rounded-md bg-blue-500 px-[2.1875rem] py-[10px] text-white"
            >
              <label
                htmlFor="confirm-interview-modal"
                className="cursor-pointer"
                onClick={handleInterview}
              >
                일정 확정
              </label>
            </button>

            <button className="SubHead2Semibold w-[130px] cursor-pointer rounded-md border-[1px] border-blue-500 px-[2.1875rem]  py-[10px] text-blue-500">
              <label
                htmlFor="confirm-interview-modal"
                className="cursor-pointer"
              >
                취소
              </label>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ConfirmInterviewModal;
