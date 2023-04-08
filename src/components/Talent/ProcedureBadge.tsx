import { ReactComponent as Smile } from "@/assets/svg/smile.svg";
import { procedureColors } from "@/constants/badgeStyle";
import type { ProcedureType } from "@/types/talent";

const ProcedureBadge = ({
  children,
  procedure,
}: {
  children: React.ReactNode;
  procedure: ProcedureType;
}) => {
  const { bgColor, textColor } = procedureColors[procedure];
  return (
    <div
      className={`${bgColor} ${textColor} Caption2Semibold rounded-lg  px-[0.375rem] py-1 `}
    >
      <div className="flex items-center gap-[0.125rem]">
        <Smile /> {children}
      </div>
    </div>
  );
};
export default ProcedureBadge;
