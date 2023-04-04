import { ReactComponent as IconSelect } from "@/assets/applicant/select.svg";

const FieldCheckbox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`${className} flex h-[52px] w-fit items-center gap-1 rounded-lg border border-gray-100 bg-gray-0 px-6`}
    >
      <IconSelect />
      {children}
    </span>
  );
};
export default FieldCheckbox;
