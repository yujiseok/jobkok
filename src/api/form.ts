import type { AxiosResponse } from "axios";
import type { IFormReq, IFormRes, IResponse } from "@/types/form";
import { client } from "./axios";

// 채용폼 상세조회
export const getRecuitFormDetail = async (recruitId: number) => {
  const { data }: AxiosResponse = await client.get(`/recruit/${recruitId}`);

  console.log(data);
  return data as IResponse<IFormRes>;
};

// 채용폼 목록검색
export const searchRecuitForm = async (status: boolean, title: string) => {
  const { data }: AxiosResponse = await client.get(
    `/recruit/search?status=${status}&title=${title}`,
  );

  console.log(data);
  return data as IResponse<IFormRes>;
};

// 채용폼 등록
export const newRecuitForm = async (value: IFormReq) => {
  const { data }: AxiosResponse = await client.post(`/recruit`, value);

  return data as IResponse<IFormRes>;
};

// 채용폼 수정
export const editRecuitForm = async (value: IFormReq) => {
  const { data }: AxiosResponse = await client.put(`/recruit`, value);

  console.log(data);
  return data as IResponse<IFormRes>;
};

// 채용폼 삭제
export const delRecuitForm = async (recruitId: number) => {
  const { data }: AxiosResponse = await client.put(
    `/recruit/delete/${recruitId}`,
  );

  console.log(data);
  return data as IResponse<IFormRes>;
};
