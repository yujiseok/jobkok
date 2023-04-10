import { Link } from "react-router-dom";
import { ReactComponent as ArrowRight } from "@/assets/svg/chevron-right-large.svg";
import { ReactComponent as Copy } from "@/assets/svg/copy.svg";
import { ReactComponent as LinkIcon } from "@/assets/svg/link.svg";
import { ReactComponent as Trash } from "@/assets/svg/trash-gray.svg";
import formatDateTime from "@/lib/utils/formatDateTime";

const FormList = ({ data }: any) => {
  return (
    <>
      <div className="mb-1 flex h-20 items-center justify-between rounded-md border border-solid border-gray-50 bg-gray-0 px-6">
        <Link to={`/form/edit/${data.id}`}>
          <div className="flex items-center gap-5">
            <div className="SubHead2Semibold rounded bg-blue-400 p-1.5 text-gray-0">
              {data.type === true ? "SELF" : "타기업폼사용"}
            </div>
            <div className="SubHead1Semibold w-[250px] text-gray-800">
              {data.title}
            </div>
            <ArrowRight />
          </div>
        </Link>
        <div className="flex items-center gap-5 text-gray-400">
          {!data.recruidUrl && (
            <button>
              <LinkIcon />
            </button>
          )}
          <button>
            <Copy />
          </button>
          <button>
            <Trash />
          </button>
          <div className="SubHead2Medium">
            {formatDateTime(data.updateAt)} 수정
          </div>
        </div>
      </div>
    </>
  );
};

export default FormList;
