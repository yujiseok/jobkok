const FieldBox = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} flex flex-col gap-6 rounded-lg border border-gray-50 bg-gray-0 px-[42px] py-8
      `}
    >
      {children}
    </div>
  );
};
export default FieldBox;
