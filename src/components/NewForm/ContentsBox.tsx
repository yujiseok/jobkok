const ContentsBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} flex max-w-[1152px] items-center rounded-lg border-[1.5px] border-gray-50 bg-gray-0 py-6 px-8`}
    >
      {children}
    </div>
  );
};
export default ContentsBox;
