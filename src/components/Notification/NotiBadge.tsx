const NotiBadge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} Caption2Semibold rounded-sm px-[0.375rem] py-[0.375rem]`}
    >
      {children}
    </div>
  );
};
export default NotiBadge;
