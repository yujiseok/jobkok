const DescriptionList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <dl className={`${className} flex flex-col gap-1`}>{children}</dl>;
};
export default DescriptionList;
