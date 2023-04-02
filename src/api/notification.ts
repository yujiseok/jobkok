import type { AxiosResponse } from "axios";
import type { IRecruitForm, ITalentList } from "@/types/notification";
import { client } from "./axios";

// 채용 폼 목록 조회
export const getRecruitForm = async () => {
  const { data }: AxiosResponse<IRecruitForm> = await client({
    method: "GET",
    url: "/notice",
  });
  return data;
};

// 인재 목록 조회
export const getTalentList = async (recruitId: number) => {
  const { data }: AxiosResponse<ITalentList> = await client({
    method: "GET",
    url: `notice/${recruitId}`,
  });
  return data;
};

// 이메일 전송
export const sendEmail = async (
  recruitId: number,
  applyId: number,
  mailContent: string,
  noticeStep: string,
  interviewDate: string,
) => {
  const { data } = await client({
    method: "POST",
    url: "/notice/send",
    data: {
      recruitId,
      applyId,
      mailContent,
      noticeStep,
      interviewDate,
    },
  });
  return data;
};
