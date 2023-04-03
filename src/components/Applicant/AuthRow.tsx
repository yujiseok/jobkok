const AuthRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${className} flex gap-3`}>{children}</div>;
};
export default AuthRow;
