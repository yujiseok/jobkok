const FieldLabel = ({
  children,
  className = "",
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
}) => {
  return (
    <label
      className={`${className} Caption1Medium whitespace-nowrap text-gray-600
        `}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
export default FieldLabel;
