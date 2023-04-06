import { useState } from "react";

const useFormList = (
  id: number,
): [
  recruitId: string,
  handleChangeFormList: (e: React.ChangeEvent<HTMLSelectElement>) => void,
] => {
  const [recruitId, setRecruitId] = useState(`${id}` ?? "");

  const handleChangeFormList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecruitId(e.target.value);
  };

  return [recruitId, handleChangeFormList];
};
export default useFormList;
