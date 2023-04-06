import { useQuery } from "@tanstack/react-query";
import { getStatus } from "@/api/talent";

const useFormStatusQuery = (recruitId: string) => {
  const { data } = useQuery({
    queryKey: ["talentStatus", recruitId],
    queryFn: () => getStatus(recruitId),
  });

  return data;
};
export default useFormStatusQuery;
