import { procedureColors } from "@/constants/badgeStyle";
import type { ProcedureType } from "@/types/talent";

const NumberBadge = ({
  children,
  procedure,
}: {
  children: React.ReactNode;
  procedure: ProcedureType;
}) => {
  if (!procedure) return null;

  const { bgColor, textColor } = procedureColors[procedure];

  return (
    <div
      className={`${bgColor} ${textColor} Caption2Semibold ml-2 grid  min-w-[1.25rem]  place-items-center rounded-md px-[0.375rem] py-1`}
    >
      {children}
    </div>
  );
};
export default NumberBadge;
