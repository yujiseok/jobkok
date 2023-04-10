import { Link } from "react-router-dom";
import { ReactComponent as Copy } from "@/assets/svg/copy.svg";
import formatDate from "@/lib/utils/formatDate";

const FormSlider = ({ data }: any) => {
  return (
    <Link to={`/form/new`}>
      <div className="relative h-48 flex-[0.3] rounded-xl bg-gray-0 px-4 py-6 text-gray-800 shadow-job">
        <div className="flex justify-between">
          <p className="SubHead1Semibold mb-3">{data.title}</p>
          <button className="pb-4">
            <Copy />
          </button>
        </div>

        <div className="mb-2 flex gap-1 text-gray-400">
          <span className="Caption1Semibold rounded-lg  bg-gray-50 py-1 px-2">
            경력
          </span>
          <span className="Caption1Semibold rounded-lg  bg-gray-50 py-1 px-2">
            자기소개
          </span>
          <span className="Caption1Semibold rounded-lg  bg-gray-50 py-1 px-2">
            최종학력
          </span>
          <span className="Caption1Semibold rounded-lg  bg-gray-50 py-1 px-2">
            자격증
          </span>
        </div>
        <div className="mb-10 flex gap-1 text-gray-400">
          <span className="Caption1Semibold rounded-lg bg-gray-50 py-1 px-2">
            수상내역
          </span>
          <span className="Caption1Semibold rounded-lg bg-gray-50 py-1 px-2">
            어학능력
          </span>
          <span className="Caption1Semibold rounded-lg bg-gray-50 py-1 px-2">
            기타이력
          </span>
          <span className="Caption1Semibold rounded-lg bg-gray-50 py-1 px-2 ">
            취업우대사항
          </span>
        </div>
        <div className="flex items-center justify-between">
          <time dateTime="2023.04.07" className="Caption1Medium text-gray-300">
            {formatDate(data.updateAt)}
          </time>
          <div className="Caption1Semibold mb-1 rounded-lg bg-blue-50 py-1 px-2 text-blue-400">
            {data.uploader}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default FormSlider;
