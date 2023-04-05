import { ReactComponent as IconSelect } from "@/assets/applicant/select.svg";
import { ReactComponent as IconSelected } from "@/assets/applicant/selected.svg";

const FieldCheckbox = ({
  children,
  className,
  htmlFor,
  inputValue,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
  inputValue: boolean;
}) => {
  return (
    <label
      className={`${className} SubHead1Semibold flex h-[52px] w-fit items-center gap-1 rounded-lg border  border-gray-100 bg-gray-0 px-6  text-gray-500 ${
        inputValue && "border-blue-400"
      } `}
      htmlFor={htmlFor}
    >
      {inputValue ? <IconSelected /> : <IconSelect />}
      {children}
    </label>
  );
};
export default FieldCheckbox;
