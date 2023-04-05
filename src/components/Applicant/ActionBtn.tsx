const ActionBtn = ({
  children,
  className,
  type,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`${className} SubHead1Semibold rounded-md bg-blue-50 py-2.5 px-6 text-blue-500`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default ActionBtn;
