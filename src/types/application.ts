export interface IHandleKeyDown {
  handleKeyDown?: (event: React.KeyboardEvent<Element>) => void;
}

export interface IApplicantAuthReq {
  //기본정보(인증)
  recruitId: number;
  applyEmail: string;
}

export interface IApplicantApplyReq extends IApplicantAuthReq {
  //기본정보(인증)
  applyName: string;
  applyPhone: string;

  //추가정보

  // 자기소개
  resumeContent: string;

  // 경력
  careerName: string;
  careerStart: string;
  careerEnd: string;
  careerDetail: string;

  // 최종학력
  eduName: string;
  eduStart: string;
  eduEnd: string;
  eduMajor: string;
  eduYear: string;
  eduStatus: string;

  // 자격증
  certificateName: string;
  certificatePublisher: string;
  certificateDate: string;

  // 수상내역
  awardsName: string;
  awardsCompany: string;
  awardsDate: string;

  // 어학능력
  languageName: string;
  languageLevel: string;

  // 취업우대사항
  veteran: boolean;
  disorder: boolean;
  employment: boolean;
  militaryEnum: string;
  terms: boolean;

  // 기타이력서
  applyPortfolio: string;
  applyResume: string;

  // 나의 키워드
  keywordsReq: string;

  // 대외활동
  activitiesTitle: null;
  activitiesContent: null;
  activitiesStart: null;
  activitiesEnd: null;
}
