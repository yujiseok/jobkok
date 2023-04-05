import type { AxiosResponse } from "axios";
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
export const getFormList = async (status: string) => {
  const res = await client({
    method: "GET",
    url: `recruit/?status=${status}`,
  });

  const data: IResponse<IFormData[]> = res.data;

  return data;
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
  console.log(recruitId);
  const res = await client({
    method: "GET",
    url: `manage/${recruitId}`,
  });

  const data: IResponse<ITalent[]> = res.data;

  return data;
};

// 단계별 인재 조회
export const getTalentByProcedure = async (
  recruitId: string,
  applyProcedure: string,
) => {
  const { data }: AxiosResponse<ITalentWithCount[]> = await client({
    method: "GET",
    url: `manage/${recruitId}/${applyProcedure}`,
  });

  return data;
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
export const getRegisteredForm = async () => {
  const { data }: AxiosResponse<IRegisteredForm> = await client({
    method: "GET",
    url: "drop/home",
  });

  return data;
};

// 탈락 인재 조회
export const getFailedTalent = async (recruitId: string) => {
  const { data }: AxiosResponse<IFailedTalent[]> = await client({
    method: "GET",
    url: `/drop/view-applicant/${recruitId}`,
  });

  return data;
};
