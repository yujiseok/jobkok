import { Link } from "react-router-dom";
import { ReactComponent as IconModalConfirm } from "@/assets/svg/modal-confirm.svg";
import { handleCopyClipBoard } from "@/lib/utils/copyClipboard";
import type { IFormRes } from "@/types/form";

interface IProps {
  setIsSaveModal: React.Dispatch<React.SetStateAction<boolean>>;
  apiData?: IFormRes;
}
const SaveModal = ({ setIsSaveModal, apiData }: IProps) => {
  const handleCopyBtn = () => {
    handleCopyClipBoard(apiData ? apiData.recruitUrl : "");
    setIsSaveModal(false);
  };

  return (
    <div
      className={`fixed left-0 top-0 flex h-screen w-full items-center justify-center  bg-black bg-opacity-70 py-[40px] text-center `}
    >
      <div className="grid w-[680px] place-items-center items-center rounded-lg bg-gray-0 py-[40px] shadow-job2">
        <div className="flex flex-col items-center">
          <IconModalConfirm className="mb-6" />
          <p className="SubHead1Semibold mb-8 text-gray-800">
            {apiData?.contents}의 지원서 링크생성이 완료되었습니다.
          </p>
          <p className="mb-8 rounded-lg border border-gray-100 py-3 px-5 text-gray-300">
            {apiData?.recruitUrl}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="SubHead2Semibold cursor-pointer rounded-lg bg-blue-500 px-[3.75rem] py-[0.7188rem] text-gray-0 shadow-blue"
            onClick={handleCopyBtn}
          >
            복사
          </button>
          <Link
            className="SubHead2Semibold cursor-pointer rounded-lg bg-gray-0 px-[3.75rem] py-[0.7188rem] text-blue-500 shadow-blue"
            to={apiData ? apiData.recruitUrl : ""}
          >
            이동
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SaveModal;
