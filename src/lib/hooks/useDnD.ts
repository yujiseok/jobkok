import { useState } from "react";
import type { OnDragEndResponder } from "react-beautiful-dnd";
import { editTalentByProcedure } from "@/api/talent";
import type { IKanban } from "@/types/talent";

// 실제 데이터로 처리 해야함
// 현재 목데이터

interface IDnDData {
  id: string;
  title: string;
  tasks: {
    id: string;
    title: string;
  }[];
}

type UseDnD = (
  dndData: IKanban[],
) => [data: IKanban[], onDragEnd: OnDragEndResponder];

const useDnD: UseDnD = (dndData) => {
  const [data, setData] = useState(dndData);

  const onDragEnd: OnDragEndResponder = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId,
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceApplicant = [...sourceCol.applicant];
      const destinationApplicant = [...destinationCol.applicant];

      const [removed] = sourceApplicant.splice(source.index, 1);
      destinationApplicant.splice(destination.index, 0, removed);

      data[sourceColIndex].applicant = sourceApplicant;
      data[destinationColIndex].applicant = destinationApplicant;
      // applyId
      console.log(removed.applyId);

      // procedure
      console.log(destinationCol.title);
      setData(data);

      const res = await editTalentByProcedure(
        removed.applyId as string,
        destinationCol.title,
      );

      console.log(res);
    }
    // else {
    //   const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);

    //   const col = data[sourceColIndex];
    //   const copiedItems = [...col.applicant];
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);

    //   data[sourceColIndex].applicant = copiedItems;
    //   setData(data);
    // }
  };

  return [data, onDragEnd];
};
export default useDnD;
