// 분기처리 해야함

const FailProcedureBadge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} Caption2Semibold inline-block rounded-lg bg-badge-red p-2 text-text-on-badge-red`}
    >
      <div className="flex items-center gap-[0.125rem]">{children}</div>
    </div>
  );
};
export default FailProcedureBadge;
