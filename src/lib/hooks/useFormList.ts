import { useState } from "react";
import type { IFormData, IResponse } from "@/types/talent";

const useFormList = (
  formData: IResponse<IFormData[]> | IResponse<null> | undefined,
): [
  recruitId: string,
  handleChangeFormList: (e: React.ChangeEvent<HTMLSelectElement>) => void,
] => {
  const id =
    formData?.data !== null && formData?.result === "SUCCESS"
      ? formData?.data[0]?.id
      : "";

  const [recruitId, setRecruitId] = useState(`${id}`);

  const handleChangeFormList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecruitId(e.target.value);
  };

  return [recruitId, handleChangeFormList];
};
export default useFormList;
