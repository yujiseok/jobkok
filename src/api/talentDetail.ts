import type { AxiosResponse } from "axios";
import type { ITalentDetail } from "@/types/talentDetail";
import { client } from "./axios";

// 인재 상세 정보 조회
export const getDetailInfo = async (applyId: number) => {
  const { data } = await client({
    method: "GET",
    url: `/apply/${applyId}`,
  });
  return data;
};

// 인재 코멘트 등록
export const addComment = async (applyId: number, evaluation: string) => {
  const { data } = await client({
    method: "PUT",
    url: `/apply/note/${applyId}`,
    data: evaluation,
  });
  return data;
};

// 탈락 인재 보관함으로 이동
export const assortFailTalent = async (applyId: number) => {
  const { data } = await client({
    method: "PUT",
    url: `apply/drop/${applyId}`,
  });
  return data;
};

// 인재 찜하기
export const assortLikeTalent = async (applyId: number) => {
  const { data } = await client({
    method: "PUT",
    url: `apply/wish/${applyId}`,
  });
  return data;
};
