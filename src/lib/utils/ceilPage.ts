import { LIMIT } from "@/constants/pagination";

const ceilPage = (length: number) => {
  return Math.ceil(length / LIMIT);
};
export default ceilPage;
