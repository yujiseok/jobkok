import { useQuery } from "@tanstack/react-query";
import { getAllTalent } from "@/api/talent";
import type { ITalent } from "@/types/talent";

const useAllTalentQuery = (recruitId: string, applyProcedure: string) => {
  const filteredData = (data: ITalent[], step: string) => {
    console.log(data);
    data.filter((item) => item.applyProcedure === step);
  };

  const { data } = useQuery({
    queryKey: ["allTalent", recruitId, applyProcedure],
    queryFn: () => getAllTalent(recruitId),
    suspense: true,
    select:
      !applyProcedure || applyProcedure === "all"
        ? undefined
        : (data) => ({ data: filteredData(data.data, applyProcedure) }),
  });

  return data?.data;
};
export default useAllTalentQuery;
