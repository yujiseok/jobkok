import { useSearchParams } from "react-router-dom";
import { LIMIT } from "@/constants/pagination";

type HandleClick = (page: string) => void;

interface UsePagination {
  page: number;
  offset: number;
  handleClick: HandleClick;
}

const usePagination = (): UsePagination => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page =
    !searchParams.get("page") || 0 ? 0 : Number(searchParams.get("page"));
  const filter = searchParams.get("filter") as string;

  const handleClick: HandleClick = (page) =>
    setSearchParams({
      filter,
      page,
    });
  const offset = (page - 1) * LIMIT;

  return { page, offset, handleClick };
};

export default usePagination;
