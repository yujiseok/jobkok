import { ReactComponent as Calendar } from "@/assets/svg/calendar.svg";
import type { IKanbanBase } from "@/types/talent";
import NumberBadge from "./NumberBadge";

const KanbanHeader = ({ kanban }: { kanban: IKanbanBase }) => {
  const renderKanbanActions = () => {
    if (kanban.title === "면접") {
      return (
        <label htmlFor="modal-calendar" className="cursor-pointer">
          <Calendar />
        </label>
      );
    }

    if (kanban.title === "최종조율") {
      const isApplicantExist = kanban.applicant.length > 0;
      const buttonClassName = `cursor-pointer rounded-md border bg-gray-0 px-5 py-[0.3438rem] ${
        isApplicantExist
          ? "border-blue-500 text-blue-500"
          : "pointer-events-none border-gray-200 text-gray-200"
      }`;

      return (
        <label htmlFor="modal" className={buttonClassName}>
          채용 확정
        </label>
      );
    }

    return null;
  };

  return (
    <div className="flex items-center justify-between pr-4">
      <div className="flex items-center py-5">
        <span className="SubHead1Semibold">{kanban.title}</span>
        <NumberBadge procedure={kanban.title}>
          {kanban.applicant.length}
        </NumberBadge>
      </div>
      {renderKanbanActions()}
    </div>
  );
};

export default KanbanHeader;
