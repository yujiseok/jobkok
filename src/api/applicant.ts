import type { AxiosResponse } from "axios";
import { client } from "./axios";

// 지원자 이메일 인증
export const emailAuth = async (recurit_id: number, applyEmail: string) => {
  const { data }: AxiosResponse = await client({
    method: "GET",
    url: `/view/${recurit_id}/user_validation`,
    data: {
      applyEmail: applyEmail,
    },
  });

  return data;
};

// 지원자 이메일 중복확인
export const emailDuplicatecheck = async (applyEmail: string) => {
  const { data }: AxiosResponse = await client({
    method: "GET",
    url: `/view/check?email=${applyEmail}`,
  });

  return data;
};

// 지원서 등록
export const submitApply = async () => {
  const { data }: AxiosResponse = await client({
    method: "POST",
    url: `/view/submit`,
    data: {
      recruitId: "2",
      applyName: "아나",
      applyPhone: "010-1111-1111",
      applyEmail: "applyTest5@test.com",
      applyPortfolio: "https://portfolio.portfolio",
      applyResume: "https://이력서서",
      resumeContent: "안녕하세요요",
      // string 값으로 전달
      keywordsReq: [
        false,
        false,
        true,
        true,
        false,
        true,
        false,
        true,
        false,
        true,
      ],

      eduName: "땡땡학교",
      eduStart: "2023-03-26T17:07:23.668771300",
      eduEnd: "2023-03-26T17:07:23.668771300",
      eduMajor: "컴공",
      eduYear: "대학원",
      eduStatus: "졸업",

      careerName: "테스트경력",
      careerStart: "2023-03-26T17:07:23.668771300",
      careerEnd: "2023-03-26T17:07:23.668771300",
      careerDetail: "1년간 근무했음",

      activitiesTitle: "테스트트",
      activitiesContent: "인턴 6개월",
      activitiesStart: "2023-03-26T17:07:23.668771300",
      activitiesEnd: "2023-03-26T17:07:23.668771300",

      certificateName: "정보처리기사자격증",
      certificateDate: "2023-03-26T17:07:23.668771300",
      certificatePublisher: "몰라요",

      languageName: "영어",
      languageLevel: "중",

      awardsName: "테스트 입상",
      awardsDate: "2023-03-26T17:07:23.668771300",
      awardsCompany: "테스트기관",

      militaryStart: "2023-03-26T17:07:23.668771300",
      militaryEnd: "2023-03-26T17:07:23.668771300",
      militaryDivision: "육군",
      militaryCategory: "만기전역",
      militaryClass: "병장",
      militaryExemption: "없음",
    },
  });

  return data;
};
