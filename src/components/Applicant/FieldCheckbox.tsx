import { useFormContext } from "react-hook-form";
import { ReactComponent as IconSelected } from "@/assets/svg/check-round-full-blue.svg";
import { ReactComponent as IconSelect } from "@/assets/svg/check-round-line-gray.svg";

const FieldCheckbox = ({
  children,
  className,
  htmlFor,
  inputValue,
  content,
}: {
  children?: React.ReactNode;
  className?: string;
  htmlFor: string;
  inputValue: boolean;
  content: string;
}) => {
  const { register } = useFormContext();
  return (
    <label
      className={`${className} SubHead1Semibold flex h-[52px] w-fit items-center rounded-lg border bg-gray-0 px-6  text-gray-500 ${
        inputValue ? "border-blue-400" : "border-x-gray-100"
      } `}
      htmlFor={htmlFor}
    >
      <div className="flex items-center gap-1">
        <span className="mr-2 min-w-[20px]">
          {inputValue ? <IconSelected /> : <IconSelect />}
        </span>
        <span className="min-w-[102px]">{content}</span>
      </div>
      <input
        className="sr-only"
        type="checkbox"
        id={htmlFor}
        {...register(htmlFor)}
      />
      {children}
    </label>
  );
};
export default FieldCheckbox;
