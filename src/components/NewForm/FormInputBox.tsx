const FormInputBox = ({
  className,
  type,
  id,
}: {
  className?: string;
  type: React.HTMLInputTypeAttribute | undefined;
  id: string;
}) => {
  return (
    <input
      className={`${className} bg-blue-25 focus:outline-none`}
      type={type}
      id={id}
      placeholder="텍스트 입력 불가"
      readOnly
      onFocus={(event) => event.target.blur()}
    />
  );
};
export default FormInputBox;
