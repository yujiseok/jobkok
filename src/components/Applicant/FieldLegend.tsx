const FieldLegend = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} Head4Semibold text-gray-900
        `}
    >
      {children}
    </div>
  );
};
export default FieldLegend;
