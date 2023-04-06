import { useQuery } from "@tanstack/react-query";
import { getFailedTalent } from "@/api/talent";

// 전체, 찜된, 영구삭제 별로
const useFailedTalentQuery = (
  recruitId: string,
  page: number,
  filter: string,
) => {
  const { data } = useQuery({
    queryKey: ["fail", recruitId, page, filter],
    queryFn: getFailedTalent,
    // keepPreviousData: true,
  });

  const failedTalent = data?.data;
  const totalPages = data?.totalPages;

  return { failedTalent, totalPages };
};
export default useFailedTalentQuery;
