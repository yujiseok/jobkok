import { useForm } from "react-hook-form";
import { ReactComponent as Search } from "@/assets/svg/search.svg";
import useSearchTalent from "@/lib/hooks/useSearchTalent";

const TalentSearchBar = ({ recruitId }: { recruitId: string }) => {
  const { handleSubmit } = useForm();
  const { searchInput, handleSearchBar } = useSearchTalent(recruitId);

  return (
    <form
      onSubmit={handleSearchBar}
      className="SubHead1Medium mx-6 mt-6 mb-6 flex justify-between rounded-md bg-blue-25  text-gray-400"
    >
      <label htmlFor="searchBar" className="w-full py-4 px-6 ">
        <input
          id="searchBar"
          placeholder="인재를 검색해보세요"
          className="w-full bg-transparent focus:outline-none"
          ref={searchInput}
        />
      </label>
      <button type="submit" className="mr-6">
        <Search />
      </button>
    </form>
  );
};
export default TalentSearchBar;
