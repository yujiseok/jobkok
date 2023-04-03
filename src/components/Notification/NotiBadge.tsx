const NotiBadge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} Caption2Semibold flex justify-center rounded-2xl py-6px`}
    >
      {children}
    </div>
  );
};
export default NotiBadge;
