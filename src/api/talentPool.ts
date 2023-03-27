import type { AxiosResponse } from "axios";
import type {
  IEditSuccess,
  IFailedTalent,
  IRegisteredForm,
  IStatus,
  ITalent,
  ITalentWithCount,
} from "@/types/talentPool";
import { client } from "./axios";

// jwt 인증 필요

// 인재현황
export const getStatus = async (recruitId: number) => {
  const { data }: AxiosResponse<IStatus> = await client({
    method: "GET",
    url: "/manage/status",
  });

  return data;
};

// 전체 지원자 조회
export const getAllTalent = async (recruitId: number) => {
  const { data }: AxiosResponse<ITalent[]> = await client({
    method: "GET",
    url: `manage/${recruitId}`,
  });

  return data;
};

// 단계별 인재 조회
export const getTalentByProcedure = async (
  recruitId: number,
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
  applyId: number,
  applyProcedure: string,
) => {
  const { data }: AxiosResponse<IEditSuccess> = await client({
    method: "PUT",
    url: `manage/change/${applyId}/${applyProcedure}`,
  });

  return data;
};

// 지원자 지원자 합격 처리
export const passTalent = async (applyId: number) => {
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
export const getFailedTalent = async (recruitId: number) => {
  const { data }: AxiosResponse<IFailedTalent[]> = await client({
    method: "GET",
    url: `/drop/view-applicant/${recruitId}`,
  });

  return data;
};
