const FormBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`${className} flex h-[52px] items-center gap-4 rounded-lg border border-gray-100 bg-blue-25 px-4`}
    >
      {children}
    </span>
  );
};
export default FormBox;
