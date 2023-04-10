import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { OnDragEndResponder } from "react-beautiful-dnd";
import { editTalentByProcedure } from "@/api/talent";
import type { IKanbanBase } from "@/types/talent";

type UseDnD = (kanbanData: IKanbanBase[]) => { onDragEnd: OnDragEndResponder };

const useDnD: UseDnD = (kanbanData) => {
  // const queryClient = useQueryClient();
  // const { mutate } = useMutation(
  //   (variables: { applyId: string; applyProcedure: string }) =>
  //     editTalentByProcedure(variables.applyId, variables.applyProcedure),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["allTalent"]);
  //     },
  //   },
  // );

  const onDragEnd: OnDragEndResponder = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = kanbanData.findIndex(
        (e) => e.title === source.droppableId,
      );
      const destinationColIndex = kanbanData.findIndex(
        (e) => e.title === destination.droppableId,
      );

      const sourceCol = kanbanData[sourceColIndex];
      const destinationCol = kanbanData[destinationColIndex];

      const sourceApplicant = [...sourceCol.applicant];
      const destinationApplicant = [...destinationCol.applicant];

      const [removed] = sourceApplicant.splice(source.index, 1);
      destinationApplicant.splice(destination.index, 0, removed);

      kanbanData[sourceColIndex].applicant = sourceApplicant;
      kanbanData[destinationColIndex].applicant = destinationApplicant;

      await editTalentByProcedure(removed.applyId, destinationCol.title);
    } else {
      const sourceColIndex = kanbanData.findIndex(
        (e) => e.title === source.droppableId,
      );

      const col = kanbanData[sourceColIndex];
      const copiedItems = [...col.applicant];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      kanbanData[sourceColIndex].applicant = copiedItems;
    }
  };

  return { onDragEnd };
};
export default useDnD;
