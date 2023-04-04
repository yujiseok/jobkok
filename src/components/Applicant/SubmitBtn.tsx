const SubmitBtn = ({
  children,
  className,
  type,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`${className} SubHead1Semibold h-[56px] rounded-lg bg-blue-500 py-2.5 px-6 text-center text-gray-0 shadow-blue`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default SubmitBtn;
