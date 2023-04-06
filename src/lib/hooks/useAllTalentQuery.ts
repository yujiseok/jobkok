import { useQuery } from "@tanstack/react-query";
import { getAllTalent } from "@/api/talent";

const useAllTalentQuery = (recruitId: string) => {
  const { data } = useQuery({
    queryKey: ["allTalent", recruitId],
    queryFn: () => getAllTalent(recruitId as string),
    suspense: true,
  });
  return data?.data;
};
export default useAllTalentQuery;
