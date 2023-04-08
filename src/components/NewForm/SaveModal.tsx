import { Link } from "react-router-dom";
import { handleCopyClipBoard } from "@/lib/utils/copyClipboard";
import type { IFormResponseData } from "@/types/form";

interface IProps {
  setIsSaveModal: React.Dispatch<React.SetStateAction<boolean>>;
  apiData?: IFormResponseData;
}
const SaveModal = ({ setIsSaveModal, apiData }: IProps) => {
  const handleCopyBtn = () => {
    handleCopyClipBoard("https://jobkok.netlify.app/talent/management");
    setIsSaveModal(false);
  };

  console.log(apiData);

  return (
    <>
      <div
        className={`fixed left-1/2 top-1/4 flex h-[302px] w-[680px] max-w-[680px] translate-x-[-50%] flex-col items-center justify-between bg-gray-50 pt-10 pb-[60px] text-center text-gray-800 shadow-job2`}
      >
        <div>
          <p className="mb-8">
            {apiData.contents}으로 지원서 링크생성이 완료되었습니다.
          </p>
          <p className="mb-8 rounded-lg border border-gray-100 py-3 px-5">
            {apiData.recruitUrl}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="height-10 SubHead2Semibold w-[144px] rounded-lg bg-blue-500 py-2.5 px-6 text-gray-0"
            onClick={handleCopyBtn}
          >
            복사
          </button>
          <Link
            className="height-10 SubHead2Semibold w-[144px] rounded-lg border border-blue-500 bg-gray-0 py-2.5 px-6 text-blue-500"
            to={"https://jobkok.netlify.app/talent/management"}
          >
            이동
          </Link>
        </div>
      </div>
    </>
  );
};
export default SaveModal;
