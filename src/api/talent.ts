import type { QueryFunctionContext } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import ceilPage from "@/lib/utils/ceilPage";
import type {
  IEditSuccess,
  IFailedTalent,
  IFormData,
  IRegisteredForm,
  IResponse,
  IStatus,
  ITalent,
  ITalentWithCount,
} from "@/types/talent";
import { client } from "./axios";

// jwt 인증 필요

// 채용폼 목록조회
export const getFormList = async () => {
  try {
    const res = await client({
      method: "GET",
      url: "/recruit/?status=true",
    });

    const data: IResponse<IFormData[]> = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const data: IResponse<null> = error.response?.data;

      return data;
    }
  }
};

// 인재현황
export const getStatus = async (recruitId: string) => {
  const res = await client({
    method: "GET",
    url: `/manage/status/${recruitId}`,
  });

  const data: IStatus = res.data.data;

  return data;
};

// 전체 지원자 조회
export const getAllTalent = async (recruitId: string) => {
  try {
    const res = await client({
      method: "GET",
      url: `manage/${recruitId}`,
    });

    const data: IResponse<ITalent[]> = res.data;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const data: IResponse<null> = error.response?.data;

      return data;
    }
  }
};

// 단계별 인재 조회
export const getTalentByProcedure = async (
  recruitId: string,
  applyProcedure: string,
) => {
  try {
    const res = await client({
      method: "GET",
      url: `manage/${recruitId}/${applyProcedure}`,
    });

    const data: IResponse<ITalentWithCount[]> = res.data;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const data: IResponse<null> = error.response?.data;

      return data;
    }
  }
};

// 지원자 채용단계 변경
export const editTalentByProcedure = async (
  applyId: string,
  applyProcedure: string,
) => {
  const res = await client({
    method: "PUT",
    url: `manage/change/${applyId}/${applyProcedure}`,
  });

  return res.data as IResponse<IEditSuccess>;
};

// 지원자 지원자 합격 처리
export const passTalent = async (applyId: string) => {
  const { data }: AxiosResponse<IEditSuccess> = await client({
    method: "PUT",
    url: `manage/pass/${applyId}`,
  });

  return data;
};

// 등록 채용폼 조회
export const getRegisteredForm = async (page: string) => {
  const { data }: AxiosResponse<IRegisteredForm> = await client({
    method: "GET",
    url: `drop/home?size=10&page=${page}`,
  });

  return data;
};

// 탈락 인재 조회
export const getFailedTalent = async ({ queryKey }: QueryFunctionContext) => {
  try {
    const [_, recruitId, page, filter] = queryKey;

    const res = await client({
      method: "GET",
      url: `/drop/view-applicant/${recruitId}?size=10&page=${page}`,
    });

    const totalPages: number = res.data.data.totalPages;

    const data: IFailedTalent[] = res.data.data.content;

    if (filter === "wish") {
      const filteredData = data.filter((item) => item.wish === true);

      return { filteredData, totalPages: ceilPage(filteredData.length) };
    }

    if (filter === "applyDelete") {
      const filteredData = data.filter((item) => item.applyDelete === true);

      return { filteredData, totalPages: ceilPage(filteredData.length) };
    }

    return { data, totalPages };
  } catch (error) {
    if (error instanceof AxiosError) {
      const data: IResponse<null> = error.response?.data;
      return data;
    }
  }
};

// 탈락 인재 검색
export const searchFailedTalent = async (
  applyName: string,
  recruitId: string,
) => {
  const res = await client({
    method: "GET",
    url: `drop/view-applicant/search?applyName=${applyName}&recruitId=${recruitId}`,
  });

  // 데이터 타입을 다시 정해야?
  const data: IFailedTalent[] = res.data.data.content;

  return data;
};
