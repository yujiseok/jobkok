import { Link } from "react-router-dom";
import { ReactComponent as ArchiveTickBlue } from "@/assets/svg/archive-tick-blue.svg";
import { ReactComponent as ArchiveTick } from "@/assets/svg/archive-tick.svg";
import { ReactComponent as ChevronRight } from "@/assets/svg/chevron-right.svg";
import formatDate from "@/lib/utils/formatDate";
import shuffle from "@/lib/utils/shuffle";
import type { ITalent } from "@/types/talent";
import KeywordBadge from "./KeywordBadge";
import ProcedureBadge from "./ProcedureBadge";

const Slider = ({ talent, i }: { talent: ITalent; i: number }) => {
  return (
    <>
      <div className="relative h-48 rounded-xl bg-gray-0 px-4 py-6 shadow-job">
        <div className="mb-3 flex justify-between">
          <Link
            to={`/talent/detail/${talent.applyId}`}
            className="flex items-center gap-6px"
          >
            <div className="SubHead1Semibold">{talent.applyName}</div>
            <ProcedureBadge procedure={talent.applyProcedure}>
              {talent.applyProcedure}
            </ProcedureBadge>
            <ChevronRight className="ml-1" />
          </Link>
          <div>
            <button>
              {talent.wish ? (
                <ArchiveTickBlue />
              ) : (
                <ArchiveTick className="text-gray-300" />
              )}
            </button>
          </div>
        </div>
        <div className="flex max-w-[200px] flex-wrap gap-6px">
          {talent?.keywordList?.map((keyword) => (
            <KeywordBadge key={keyword}>{keyword}</KeywordBadge>
          ))}
        </div>
        <time
          dateTime={talent.createdTime}
          className="Caption1Medium absolute bottom-5 text-gray-300"
        >
          {formatDate(talent.createdTime)}
        </time>
        <img
          src={`/assets/svg/thumbs-${randomNumber[i]}.svg`}
          alt={`thumbs-${randomNumber[i]}`}
          className="absolute bottom-0 right-1"
        />
      </div>
    </>
  );
};
const randomNumber = shuffle(9);

export default Slider;
