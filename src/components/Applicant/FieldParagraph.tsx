const FieldParagraph = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`${className} SubHead2Medium text-gray-600
          `}
    >
      {children}
    </p>
  );
};
export default FieldParagraph;
