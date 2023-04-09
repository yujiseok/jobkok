import { useQuery } from "@tanstack/react-query";
import { getTalentByProcedure } from "@/api/talent";

const useTalentByProcedureQuery = (
  recruitId: string,
  applyProcedure: string,
) => {
  const { data: talentByProcedure, refetch: talentByProcedureRefetch } =
    useQuery({
      queryKey: ["procedure", recruitId, applyProcedure],
      queryFn: () => getTalentByProcedure(recruitId, applyProcedure),
      enabled: applyProcedure === "전체인재" ? false : true,
    });

  return { talentByProcedure, talentByProcedureRefetch };
};
export default useTalentByProcedureQuery;
