const AsideBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} flex flex-col rounded-lg border-[1.5px]  border-gray-50 bg-gray-0 px-[24px]`}
    >
      {children}
    </div>
  );
};
export default AsideBox;
