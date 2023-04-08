import type { ITalent } from "@/types/talent";

const sortWithSlice = (data: ITalent[] | null | undefined) => {
  if (data === null || data === undefined) return;

  return data.slice(0, 9).sort((a, b) => b.score - a.score) as ITalent[];
};
export default sortWithSlice;
