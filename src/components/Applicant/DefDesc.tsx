const DefDesc = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${className} SubHead2Medium text-gray-600`}>
      {children}
    </div>
  );
};
export default DefDesc;
