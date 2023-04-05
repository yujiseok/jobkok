import { ReactComponent as Smile } from "@/assets/svg/smile.svg";

// 분기처리 해야함
// 서류제출 - 면접진행 - 최종조율
const ProcedureBadge = ({
  children,
  procedure,
}: {
  children: React.ReactNode;
  procedure: string | null;
}) => {
  return (
    <div
      className={`${
        procedure === "서류전형"
          ? "bg-badge-red text-text-on-badge-red"
          : procedure === "면접진행"
          ? "bg-badge-purple text-text-on-badge-purple"
          : "bg-badge-blue text-text-on-badge-blue"
      } Caption2Semibold rounded-lg  px-[0.375rem] py-1 `}
    >
      <div className="flex items-center gap-[0.125rem]">
        <Smile /> {children}
      </div>
    </div>
  );
};
export default ProcedureBadge;
