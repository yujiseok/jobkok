const InfoList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <li className={`${className} flex h-[38px] items-center gap-4`}>
      {children}
    </li>
  );
};
export default InfoList;
