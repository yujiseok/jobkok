const DefTerm = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${className} Caption1Medium text-gray-600`}>
      {children}
    </div>
  );
};
export default DefTerm;
