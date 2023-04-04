const AuthLabel = ({
  children,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
}) => {
  return (
    <label
      className={`${className} Caption1Medium text-gray-300`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
export default AuthLabel;
