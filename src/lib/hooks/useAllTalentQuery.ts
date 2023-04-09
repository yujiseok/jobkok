import { useQuery } from "@tanstack/react-query";
import { getAllTalent } from "@/api/talent";

const useAllTalentQuery = (recruitId: string) => {
  const { data: allTalent, refetch: allTalentRefetch } = useQuery({
    queryKey: ["allTalent", recruitId],
    queryFn: () => getAllTalent(recruitId),
    enabled: recruitId ? true : false,
  });

  return { allTalent, allTalentRefetch };
};
export default useAllTalentQuery;
