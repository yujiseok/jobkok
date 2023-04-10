import type { UseMutateFunction } from "@tanstack/react-query";
import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { ReactComponent as ArchiveTickBlue } from "@/assets/svg/archive-tick-blue.svg";
import { ReactComponent as ArchiveTick } from "@/assets/svg/archive-tick.svg";
import { ReactComponent as ChevronRight } from "@/assets/svg/chevron-right.svg";
import { ReactComponent as HeartMemoji } from "@/assets/svg/heart-memoji.svg";
import formatDate from "@/lib/utils/formatDate";
import type { ITalent } from "@/types/talent";
import PreferentialBadge from "./PreferentialBadge";

export const KanbanBoard = ({
  talent,
  index,
  likeMutate,
}: {
  talent: ITalent;
  index: number;
  likeMutate: UseMutateFunction<any, unknown, string, unknown>;
}) => {
  return (
    <Draggable
      key={talent.applyId}
      draggableId={talent.applyId?.toString() as string}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className={`rounded-xl bg-gray-0 px-4 py-5 shadow-job  ${
            snapshot.isDragging ? "bg-gray-50/95" : "bg-gray-0"
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <div className="flex items-center justify-between">
            <Link
              to={`/talent/detail/${talent.applyId}`}
              className="flex items-center gap-2"
            >
              <div className="rounded-md bg-blue-50">
                <HeartMemoji />
              </div>
              <span className="SubHead1Semibold">{talent.applyName}</span>
              <ChevronRight />
            </Link>

            <button onClick={() => likeMutate(talent.applyId)}>
              {talent.wish ? (
                <ArchiveTickBlue />
              ) : (
                <ArchiveTick className="text-gray-300" />
              )}
            </button>
          </div>
          <div className="Caption1Semibold flex gap-6px pt-4 pb-8">
            <PreferentialBadge>
              우대사항 <span>2</span>/<span>5</span>
            </PreferentialBadge>
            <PreferentialBadge>
              키워드 <span>{talent.keywordList.length}</span>/<span>5</span>
            </PreferentialBadge>
          </div>
          <div className="flex items-center justify-between">
            <time
              className="Caption1Medium text-gray-300"
              dateTime={new Date().toLocaleDateString()}
            >
              {formatDate(talent.createdTime)}
            </time>

            {/* <InterviewBadge>
              면접 D-16 20:00 예정
            </InterviewBadge> */}
          </div>
        </div>
      )}
    </Draggable>
  );
};
