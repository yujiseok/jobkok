const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h4 className={`${className} text-2xl font-semibold`}>{children}</h4>;
};
export default Heading;
