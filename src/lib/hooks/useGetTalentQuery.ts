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

  const { data } = useQuery({
    queryKey: ["allTalent", recruitId, applyProcedure, applyName],
    queryFn: () => getAllTalent(recruitId),
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
