const AuthEnter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${className} flex flex-col gap-1`}>{children}</div>;
};
export default AuthEnter;
