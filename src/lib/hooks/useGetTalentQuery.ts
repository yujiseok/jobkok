import { useQuery } from "@tanstack/react-query";
import { getAllTalent } from "@/api/talent";
import type { ITalent } from "@/types/talent";

const useGetTalentQuery = (
  recruitId: string,
  applyProcedure: string,
  applyName: string,
) => {
  const filteredData = (data: ITalent[], step: string) => {
    let test = data;
    if (data) test = data.filter((item) => item.applyProcedure === step);
    return test;
  };

  const selectTalent = async () => {
    const test = await getAllTalent(recruitId);
    console.log(test);
  };

  const { data } = useQuery({
    queryKey: ["allTalent", recruitId, applyProcedure, applyName],
    queryFn: () => getAllTalent(recruitId),
    // queryFn: selectTalent,
    suspense: true,
    select:
      !applyProcedure || applyProcedure === "전체"
        ? undefined
        : (data) => ({
            data: filteredData(data?.data as ITalent[], applyProcedure),
          }),
  });
  return data?.data;
};
export default useGetTalentQuery;
