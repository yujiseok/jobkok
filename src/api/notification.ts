import type { INotibase, ISearchData } from "@/types/notification";
import type { IFormData, IResponse, ITalent } from "@/types/talent";
import { client } from "./axios";

// 채용 폼 목록 조회
// export const getRecruitForm = async () => {
//   const { data } = await client({
//     method: "GET",
//     url: "/notice",
//   });
//   return data;
// };

export const getFormData = async (status: string) => {
  const res = await client({
    method: "GET",
    url: `recruit/?status=${status}`,
  });

  const data: IResponse<IFormData[]> = res.data;

  return data;
};

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
  applyId: string,
  mailContent: string,
  noticeStep: string,
  interviewDate?: string,
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

// 지원자 검색
export const searchApplicant = async (applyName: string, recruitId: string) => {
  const res = await client({
    method: "GET",
    url: `notice/search?applyName=${applyName}&recruitId=${recruitId}`,
    data: { applyName, recruitId },
  });
  const data: ISearchData[] = res.data.data;
  return data;
};

// 전체 지원자 조회
export const getAllTalentList = async (
  recruitId: string,
  applyProcedure: string,
) => {
  const res = await client({
    method: "GET",
    url: `manage/${recruitId}`,
  });

  const data = res.data.data.content;
  console.log("data", data);

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
