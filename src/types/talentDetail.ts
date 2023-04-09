export interface ITalentBase {
  state: string;
  result: string;
}

export interface ITalentDetail {
  recruitId: string;
  applyName: string;
  applyPhone: string;
  applyEmail: string;
  resumeContent: string;
  applyPortfolio: string;
  applyProcedure: string;
  evaluation: string;
  pass: string;
  creationTime: string;
  applyDelete: string;
  keywords: string[];
  wish: string;
  careerName: string;
  careerStart: string;
  careerEnd: string;
  careerDetail: string;
  eduName: string;
  eduYear: string;
  eduMajor: string;
  eduStatus: string;
  eduStart: string;
  eduEnd: string;
  languageName: string;
  languageLevel: string;
  // languageDate: string;
  // militaryStart: string;
  // militaryEnd: string;
  // militaryDivision: string;
  // militaryCategory: string;
  // militaryClass: string;
  // militaryExemption: any;
  certificateName: string;
  certificateDate: string;
  certificatePublisher: string;
  // activitesTitle: string;
  // activitesContent: string;
  // activitesStart: string;
  // activitesEnd: string;
  awardsName: string;
  awardsDate: string;
  awardsCompany: string;
  applyResume: string;
  disorder: boolean;
  veteran: boolean;
  employment: boolean;
  militaryEnum: string;
  terms: boolean;
}
export interface IAddComment extends ITalentBase {
  message: string;
}
