import type { AxiosResponse } from "axios";
import { client } from "./axios";

// 채용폼 상세조회
export const getRecuitFormDetail = async (recruit_id: number) => {
  const { data }: AxiosResponse = await client({
    method: "GET",
    url: `/recruit/${recruit_id}`,
  });

  return data;
};
