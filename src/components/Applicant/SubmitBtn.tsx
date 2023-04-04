const SubmitBtn = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} SubHead1Semibold shadow-[0 0 18px 0 rgba(83, 120, 230, 0.18)] h-[56px] rounded-lg bg-blue-500 py-2.5 px-6 text-center text-gray-0`}
    >
      {children}
    </div>
  );
};
export default SubmitBtn;
