import usePagination from "@/lib/hooks/usePagination";
import makeString from "@/lib/utils/makeString";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const { page, handleClick } = usePagination();

  return (
    <nav className="mt-12 flex justify-center gap-14">
      <button
        disabled={page === 0}
        onClick={() => {
          handleClick(makeString(page - 1));
        }}
      >
        Prev
      </button>

      <ul className="flex gap-8">
        {Array(totalPages)
          .fill(null)
          .map((_, i) => {
            return (
              <li key={i}>
                <button
                  onClick={() => handleClick(makeString(i))}
                  className={`${i === page ? "text-blue-500" : ""}`}
                >
                  {i + 1}
                </button>
              </li>
            );
          })}
      </ul>

      <button
        disabled={page === totalPages - 1}
        onClick={() => {
          handleClick(makeString(page + 1));
        }}
      >
        Next
      </button>
    </nav>
  );
};
export default Pagination;
