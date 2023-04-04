const AsideHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h4 className={`${className} Head4Semibold mb-4 text-gray-900`}>
      {children}
    </h4>
  );
};
export default AsideHeading;
