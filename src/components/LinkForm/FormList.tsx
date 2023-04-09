import { Link } from "react-router-dom";
import { ReactComponent as ArrowRight } from "@/assets/svg/chevron-right-large.svg";
import { ReactComponent as Copy } from "@/assets/svg/copy.svg";
import { ReactComponent as Trash } from "@/assets/svg/trash-gray.svg";

const FormList = ({ data }: any) => {
  return (
    <>
      <Link to={`/form/edit/${data.id}`}>
        <div className="mb-1 flex h-20 items-center justify-between rounded-md border border-solid border-gray-50 bg-gray-0 px-6">
          <div className="flex items-center gap-5">
            <div className="SubHead2Semibold rounded bg-blue-400 p-1.5 text-gray-0">
              {data.type === true ? "SELF" : "타기업폼사용"}
            </div>
            <div className="SubHead1Semibold w-[250px] text-gray-800">
              {data.title}
            </div>
            <ArrowRight />
          </div>
          <div className="flex items-center gap-5 text-gray-400">
            <Copy />
            <Trash />
            <div className="SubHead2Medium">2023.03.27 02:44 수정</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default FormList;
