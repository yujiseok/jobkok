import type { AxiosResponse } from "axios";
import { client } from "./axios";

// 지원자 등록
// 임시작성, api 필요함
export const applicantSubmit = async (
  name: string,
  phonenumber: string,
  email: string,
) => {
  const { data }: AxiosResponse = await client({
    method: "GET",
    url: `/view/user_validation`,
    data: {
      applyName: name,
      applyPhone: phonenumber,
      applyEmail: email,
    },
  });

  return data;
};

// 지원자 이메일 인증
export const emailAuth = async (applyEmail: string) => {
  const { data }: AxiosResponse = await client({
    method: "GET",
    url: `/view/user_validation`,
    data: {
      applyEmail: applyEmail,
    },
  });

  return data;
};

// 지원서 등록
// 임시 작성
export const submitApply = async () => {
  const { data }: AxiosResponse = await client({
    method: "GET",
    url: `/view/user_validation`,
    data: {
      careerName: "회사",
      careerStart: "2023-03-26T17:07:23.668771300",
      careerEnd: "2023-03-26T17:07:23.668771300",
      careerDetail: "1년간 근무했음",

      eduName: "땡땡학교",
      eduStart: "2023-03-26T17:07:23.668771300",
      eduEnd: "2023-03-26T17:07:23.668771300",
      eduMajor: "컴공",
      eduYear: "대학2,3년제",
      eduStatus: "졸업",

      resumeContent: "안녕핫빈디가가",

      certificateName: "정보처리기사자격증",
      certificateDate: "2023-03-26T17:07:23.668771300",
      certificatePublisher: "몰라요",

      //취업우대

      applyPortfolio: "https://portfolio.portfolio",
      applyResume: "https://resume.resume",

      languageName: "영어",
      languageLevel: "AL",

      awardsName: "테스트 입상",
      awardsDate: "2023-03-26T17:07:23.668771300",
      awardsCompany: "테스트기관",

      keywordsReq: [
        true,
        false,
        false,
        true,
        false,
        true,
        false,
        true,
        false,
        false,
      ],
    },
  });

  return data;
};
