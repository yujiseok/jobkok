const FieldInputBox = ({
  children,
  className,
  errors,
}: {
  children: React.ReactNode;
  className?: string;
  errors?: any;
}) => {
  return (
    <span
      className={`${className} flex h-[52px] items-center gap-4 rounded-lg border bg-gray-0 px-4 ${
        errors ? " border-error-400" : " border-gray-100"
      }`}
    >
      {children}
    </span>
  );
};
export default FieldInputBox;
