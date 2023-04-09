import { ReactComponent as ArrowRight } from "@/assets/svg/chevron-right-large.svg";
import { ReactComponent as Copy } from "@/assets/svg/copy.svg";
import { ReactComponent as Trash } from "@/assets/svg/trash-gray.svg";

const FormList = () => {
  return (
    <>
      <div className="flex h-20 items-center justify-between rounded-md border border-solid border-gray-50 bg-gray-0 px-6">
        <div className="flex items-center gap-5">
          <div className="SubHead2Semibold rounded bg-blue-400 p-1.5 text-gray-0">
            타기업폼사용
          </div>
          <div className="SubHead1Semibold text-gray-800">
            아기사랑몰 웹디자이너 단기아르바이트 3개월 폼
          </div>
          <ArrowRight />
        </div>
        <div className="flex items-center gap-5 text-gray-400">
          <Copy />
          <Trash />
          <div className="SubHead2Medium">2023.03.27 02:44 수정</div>
        </div>
      </div>
    </>
  );
};

export default FormList;
