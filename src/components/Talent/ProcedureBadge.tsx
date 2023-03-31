import { ReactComponent as Smile } from "@/assets/svg/smile.svg";

// 분기처리 해야함

const ProcedureBadge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} Caption2Semibold rounded-lg bg-badge-red px-[0.375rem] py-1 text-text-on-badge-red`}
    >
      <div className="flex items-center gap-[0.125rem]">
        <Smile /> {children}
      </div>
    </div>
  );
};
export default ProcedureBadge;
