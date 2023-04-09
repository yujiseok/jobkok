import { useFormContext } from "react-hook-form";
import { ReactComponent as IconSelected } from "@/assets/svg/check-blue.svg";
import { ReactComponent as IconSelectError } from "@/assets/svg/check-error.svg";
import { ReactComponent as IconSelect } from "@/assets/svg/check-gray.svg";

const FieldCheckbox = ({
  children,
  className,
  htmlFor,
  inputValue,
  content,
  errors,
}: {
  children?: React.ReactNode;
  className?: string;
  htmlFor: string;
  inputValue?: boolean;
  content: string;
  errors?: any;
}) => {
  const { register } = useFormContext();
  return (
    <label
      className={`${className} SubHead1Semibold flex h-[52px] w-fit items-center rounded-lg border bg-gray-0 px-6  text-gray-500 ${
        inputValue
          ? "border-blue-400"
          : errors
          ? " border-error-400"
          : "border-gray-100"
      } `}
      htmlFor={htmlFor}
    >
      <div className="flex items-center gap-1">
        <span className="mr-2 min-w-[20px]">
          {inputValue ? (
            <IconSelected />
          ) : errors ? (
            <IconSelectError />
          ) : (
            <IconSelect />
          )}
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
