const NumberBadge = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <div
      className={`${
        id === "서류 검토"
          ? "bg-badge-red text-text-on-badge-red"
          : id === "면접 진행"
          ? "bg-badge-purple text-text-on-badge-purple"
          : "bg-badge-blue text-text-on-badge-blue"
      } Caption2Semibold ml-2 grid  min-w-[1.25rem]  place-items-center rounded-md px-[0.375rem] py-1`}
    >
      {children}
    </div>
  );
};
export default NumberBadge;
