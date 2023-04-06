import { useQuery } from "@tanstack/react-query";
import { getAllTalentList } from "@/api/notification";

const useGetTalentQuery = (recruitId: string, applyProcedure: string) => {
  const { data } = useQuery({
    queryKey: ["allTalentList", recruitId, applyProcedure],
    queryFn: () =>
      getAllTalentList(recruitId as string, applyProcedure as string),
    suspense: true,
  });
  return data;
};
export default useGetTalentQuery;
