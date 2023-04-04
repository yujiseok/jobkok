const DefTerm = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <dt className={`${className} Caption1Medium text-gray-600`}>{children}</dt>
  );
};
export default DefTerm;
