import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { searchFailedTalent } from "@/api/talent";

const useSearchFailedQuery = (recruitId: string) => {
  // 검색어 없을시 에러 처리 -> 훅폼?

  const [searchParams, setSearchParams] = useSearchParams();
  const searchInput = useRef<HTMLInputElement>(null);
  const applyName = searchParams.get("applyName")!;
  const { data: searchData, refetch } = useQuery({
    queryKey: ["failSearch", applyName, recruitId],
    queryFn: () => searchFailedTalent(applyName, recruitId),
    enabled: recruitId && applyName ? true : false,
  });

  const handleSearchBar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput?.current?.value) return;
    setSearchParams({ applyName: searchInput.current.value.trim() });

    refetch();
  };

  return { searchInput, handleSearchBar, searchData };
};
export default useSearchFailedQuery;
