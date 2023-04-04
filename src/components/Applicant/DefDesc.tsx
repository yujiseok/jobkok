const DefDesc = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <dd className={`${className} SubHead2Medium text-gray-600`}>{children}</dd>
  );
};
export default DefDesc;
