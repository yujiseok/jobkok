const NotiBadge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} Caption1Semibold flex justify-center rounded p-6px`}
    >
      {children}
    </div>
  );
};
export default NotiBadge;
