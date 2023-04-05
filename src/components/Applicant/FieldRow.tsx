const FieldRow = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${className} flex flex-wrap gap-1.5`}>{children}</div>
  );
};
export default FieldRow;
