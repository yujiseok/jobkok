const AsideHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h4 className={`${className} SubHead1Semibold text-gray-800`}>
      {children}
    </h4>
  );
};
export default AsideHeading;
