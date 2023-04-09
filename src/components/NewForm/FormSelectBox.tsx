const FormSelectBox = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id: string;
}) => {
  return (
    <select
      className={`${className} bg-blue-25 text-gray-400 focus:outline-none`}
      id={id}
      disabled
      onFocus={(event) => event.target.blur()}
    >
      {children}
    </select>
  );
};
export default FormSelectBox;
