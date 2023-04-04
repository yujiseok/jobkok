export interface INotiBase {
  state: number;
  result: string;
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

export interface ITalentList extends INotiBase {
  message?: string;
  data: {
    recruitId: number;
    recruitTitle: string;
    applyId: number;
    applyName: string;
    applyPhone: string;
    applyEmail: string;
    applyProcedure: string;
    applyDelete: boolean;
    failApply: boolean;
    wish: boolean;
    createdTime: string;
    recentMessageTime: string;
    keywords: string[];
  };
}

export interface ISendingList extends INotiBase {
  message?: string;
  data: {
    mailId: number;
    mailContent: string;
    noticeStep: string;
    createdTime: string;
    applyName: string;
    applyPhone: string;
    applyEmail: string;
    applyProcedure: string;
  };
}
