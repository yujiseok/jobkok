import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchApplicant } from "@/api/notification";
import useSelectForm from "./useSelectForm";

const useSearchTalent = (recruitId: string) => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInput = useRef<HTMLInputElement>(null);
  const applyName = searchParams.get("applyName") ?? "";

  // 이름 검색으로 찾기
  const { data: searchTalent } = useQuery({
    queryKey: ["searchTalent", applyName, recruitId],
    queryFn: () => searchApplicant(applyName, recruitId),
  });

  const handleSearchBar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput?.current?.value) return;
    setSearchParams({ applyName: searchInput.current.value.trim() });
    setIsSearch(true);
  };

  return { searchInput, applyName, handleSearchBar, searchTalent, isSearch };
};
export default useSearchTalent;
