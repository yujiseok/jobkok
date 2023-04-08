import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchApplicant } from "@/api/notification";
import { applyProcedure } from "@/constants/applyProcedure";

const useSearchTalent = (recruitId: string) => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInput = useRef<HTMLInputElement>(null);
  const applyName = searchParams.get("applyName") ?? "";

  // 이름 검색으로 찾기
  const { data: searchTalent } = useQuery({
    queryKey: ["searchTalent", applyName, recruitId, applyProcedure],
    queryFn: () => searchApplicant(applyName, recruitId),
    enabled: false,
  });

  const handleSearchBar = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();
    if (!searchInput?.current?.value) return alert("입력해주세요");
    setSearchParams({ applyName: searchInput.current.value.trim() });
    setIsSearch(true);
  };

  return { searchInput, applyName, handleSearchBar, searchTalent, isSearch };
};
export default useSearchTalent;
