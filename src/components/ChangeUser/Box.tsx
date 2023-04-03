const Box = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} text-gray-800" flex h-[666px] flex-col rounded-2xl border border-x-gray-50  bg-gray-0 py-[40px] px-[32px]`}
    >
      {children}
    </div>
  );
};
export default Box;
