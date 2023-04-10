import type { UseMutateFunction } from "@tanstack/react-query";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useDnD from "@/lib/hooks/useDnD";
import talentToProcedure from "@/lib/utils/talentByProcedure";
import type { IKanbanBase, IResponse, ITalent } from "@/types/talent";
import { KanbanBoard } from "./KanbanBoard";
import KanbanHeader from "./KanbanHeader";

const Kanban = ({
  allTalent,
  likeMutate,
}: {
  allTalent: IResponse<null> | IResponse<ITalent[]> | undefined;
  likeMutate: UseMutateFunction<any, unknown, string, unknown>;
}) => {
  if (allTalent?.data === null || allTalent === undefined) return <></>;

  const kanbanData: IKanbanBase[] = talentToProcedure(allTalent);
  const { onDragEnd } = useDnD(kanbanData);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex items-start justify-between gap-6">
        {kanbanData.map((kanban) => (
          <Droppable key={kanban.title} droppableId={kanban.title}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 ${
                  kanban.applicant.length ? "pb-12" : "pb-0"
                }`}
              >
                <KanbanHeader kanban={kanban} />

                <div className="flex max-h-[54.75rem] flex-col gap-4 overflow-y-auto overflow-x-hidden py-1 pr-3">
                  {kanban.applicant.map((talent: ITalent, index: number) => (
                    <KanbanBoard
                      key={talent.applyId}
                      talent={talent}
                      index={index}
                      likeMutate={likeMutate}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
export default Kanban;
