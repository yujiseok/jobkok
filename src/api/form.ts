import type { AxiosResponse } from "axios";
import type {
  IFormRequestData,
  IFormResponseData,
  IResponse,
} from "@/types/form";
import { client } from "./axios";

// 채용폼 전체목록 조회
export const getRecuitFormAll = async (ongoing: boolean) => {
  const { data }: AxiosResponse = await client({
    method: "GET",
    url: `/recruit/?status=${ongoing}`,
  });

  return data as IResponse<IFormResponseData>;
};

// 채용폼 상세조회
export const getRecuitFormDetail = async (recruitId: number) => {
  const { data }: AxiosResponse = await client({
    method: "GET",
    url: `/recruit/${recruitId}`,
  });

  return data as IResponse<IFormResponseData>;
};

// 채용폼 목록검색
export const searchRecuitForm = async (status: boolean, title: string) => {
  const { data }: AxiosResponse = await client({
    method: "GET",
    url: `/recruit/search?status=${status}&title=${title}`,
  });

  return data as IResponse<IFormResponseData>;
};

// 채용폼 등록
export const newRecuitForm = async (value: IResponse<IFormRequestData[]>) => {
  const { data }: AxiosResponse = await client({
    method: "POST",
    url: `/recruit`,
    data: { value },
  });

  return data as IResponse<IFormResponseData>;
};

// 채용폼 수정
export const editRecuitForm = async (value: IResponse<IFormRequestData[]>) => {
  const { data }: AxiosResponse = await client({
    method: "PUT",
    url: `/recruit`,
    data: { value },
  });

  return data as IResponse<IFormResponseData>;
};

// 채용폼 삭제
export const delRecuitForm = async (recruitId: number) => {
  const { data }: AxiosResponse = await client({
    method: "PUT",
    url: `/recruit/delete/${recruitId}`,
  });

  return data as IResponse<IFormResponseData>;
};
