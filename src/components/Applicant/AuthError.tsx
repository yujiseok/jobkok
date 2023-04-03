const AuthError = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={`${className} h-[20px] pt-1 text-sm text-error-400`}>
      {children}
    </p>
  );
};
export default AuthError;
