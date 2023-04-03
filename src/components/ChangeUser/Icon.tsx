const Icon = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`${className} flex h-9 w-9 items-center justify-center rounded-md bg-blue-50`}
    >
      {children}
    </span>
  );
};
export default Icon;
