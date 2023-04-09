import type { ISearchData } from "@/types/notification";
import { client } from "./axios";

// 인재 목록 조회
export const getTalentList = async (recruitId: string) => {
  const { data } = await client({
    method: "GET",
    url: `notice/${recruitId}`,
  });
  return data;
};

// 이메일 전송
export const sendEmail = async (
  recruitId: string,
  applyIds: number[],
  mailContent: string,
  noticeStep: string,
  interviewDate?: string,
) => {
  const { data } = await client({
    method: "POST",
    url: "/notice/send",
    data: {
      recruitId,
      applyIds,
      mailContent,
      noticeStep,
      interviewDate,
    },
  });
  return data;
};

// 지원자 검색
export const searchApplicant = async (applyName: string, recruitId: string) => {
  const res = await client({
    method: "GET",
    url: `notice/search?applyName=${applyName}&recruitId=${recruitId}`,
    data: { applyName, recruitId },
  });
  const data: ISearchData[] = res.data;
  return data;
};

//절차 선택
export const setProcedure = async (recruitId: string, noticeStep: string) => {
  // console.log(noticeStep);
  const { data } = await client({
    method: "POST",
    url: "/notice/select",
    data: { recruitId, noticeStep },
  });
  console.log(data.data);
  return data.data;
};
