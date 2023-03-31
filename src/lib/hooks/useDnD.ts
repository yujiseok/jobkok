import { useState } from "react";
import type { OnDragEndResponder } from "react-beautiful-dnd";

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
  dndData: IDnDData[],
) => [data: IDnDData[], onDragEnd: OnDragEndResponder];

const useDnD: UseDnD = (dndData) => {
  const [data, setData] = useState(dndData);

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId,
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      setData(data);
    } else {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);

      const col = data[sourceColIndex];
      const copiedItems = [...col.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = copiedItems;
      setData(data);
    }
  };

  return [data, onDragEnd];
};
export default useDnD;
