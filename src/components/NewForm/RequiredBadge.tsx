const RequiredBadge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`${className} SubHead2Semibold rounded bg-blue-50 p-1.5 text-blue-400`}
    >
      {children}
    </span>
  );
};
export default RequiredBadge;
