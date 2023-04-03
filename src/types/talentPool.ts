export interface IStatus {
  state: number;
  result: string;
  data: {
    totalCount: string;
    todayCount: string;
    process: string;
    processFinish: string;
  };
}
interface ITalentBase {
  applyId?: number;
  applyName: string;
  applyPhone: string;
  applyEmail: string;
  applyProcedure: string | null;
  applyDelete: boolean;
  createdTime: string;
  pass?: boolean;
  wish: boolean;
  keywords: string[];
}

export interface ITalent extends ITalentBase {
  resumeContent: string;
  applyPortfolio: string;
  evaluation: string;
}

export interface ITalentWithCount extends ITalentBase {
  count: string;
}

export interface IFailedTalent extends ITalentBase {
  recruitId: number;
  recruitTitle: string;
  recentMessageTime: string | null;
  failApply: boolean;
}

export interface IEditSuccess {
  result: "success";
  message: "변경에 성공했습니다.";
}

export interface IRegisteredForm {
  recruitId: number;
  recruitTitle: string;
  recruitContent: string;
  recruitProcedure: string;
  createdTime: string;
}
