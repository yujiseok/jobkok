export interface INotibase {
  state: number;
  result: string;
  message: string;
  data: any[];
  error: any[];
}

export interface ISearchData {
  applyDelete: boolean;
  applyEmail: string;
  applyId: number;
  applyName: string;
  applyPhone: string;
  applyProcedure: string;
  createdTime: string;
  failApply: boolean;
  keywords: string[];
  recentMessageTime: string;
  recruitId: number;
  recruitTitle: string;
  wish: boolean;
}
export interface IRecruitForm {
  recruitId: number;
  recruitTitle: string;
  recruitProcedure: string;
  recruitClose: boolean;
  createdTime: string;
}

export interface ISendEmail {
  recruitId: number;
  applyId: number;
  mailContent: string;
  noticeStep: string;
  interviewDate: string;
}

export interface ISelectedTalent {
  applyDelete: boolean;
  applyEmail: string;
  applyId: number;
  applyName: string;
  applyPhone: string;
  applyProcedure: string;
  keywordList: string[];
  keywords: string;
  pass: boolean;
  score: number;
  wish: boolean;
}
