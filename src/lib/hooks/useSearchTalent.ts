import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

const useSearchTalent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInput = useRef<HTMLInputElement>(null);
  const applyName = searchParams.get("applyName") ?? "";

  const handleSearchBar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput?.current?.value) return;
    setSearchParams({ applyName: searchInput.current.value.trim() });
  };

  return { searchInput, applyName, handleSearchBar };
};
export default useSearchTalent;
