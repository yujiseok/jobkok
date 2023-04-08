import type { OnDragEndResponder } from "react-beautiful-dnd";
import { editTalentByProcedure } from "@/api/talent";
import type { IKanbanBase } from "@/types/talent";

type UseDnD = (dndData: IKanbanBase[]) => { onDragEnd: OnDragEndResponder };

const useDnD: UseDnD = (dndData) => {
  // const [data, setData] = useState(dndData);
  const onDragEnd: OnDragEndResponder = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = dndData.findIndex(
        (e) => e.title === source.droppableId,
      );
      const destinationColIndex = dndData.findIndex(
        (e) => e.title === destination.droppableId,
      );

      const sourceCol = dndData[sourceColIndex];
      const destinationCol = dndData[destinationColIndex];

      const sourceApplicant = [...sourceCol.applicant];
      const destinationApplicant = [...destinationCol.applicant];

      const [removed] = sourceApplicant.splice(source.index, 1);
      destinationApplicant.splice(destination.index, 0, removed);

      dndData[sourceColIndex].applicant = sourceApplicant;
      dndData[destinationColIndex].applicant = destinationApplicant;

      const res = await editTalentByProcedure(
        removed.applyId as string,
        destinationCol.title,
      );
    } else {
      const sourceColIndex = dndData.findIndex(
        (e) => e.title === source.droppableId,
      );

      const col = dndData[sourceColIndex];
      const copiedItems = [...col.applicant];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      dndData[sourceColIndex].applicant = copiedItems;
    }
  };

  // useEffect(() => {
  //   setData(dndData);
  // }, [dndData]);

  return { onDragEnd };
};
export default useDnD;
