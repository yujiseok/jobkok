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
  applyId?: string;
  applyName: string;
  applyPhone: string;
  applyEmail: string;
  applyProcedure: string;
  pass: string;
  wish: string;
  applyDelete: string;
  keywordsSelect: any[];
}

export interface ITalent extends ITalentBase {
  resumeContent: string;
  applyPortfolio: string;
  applyProcedure: string;
  evaluation: string;
  creationTime: string;
}

export interface ITalentWithCount extends ITalentBase {
  count: string;
}

export interface IFailedTalent extends ITalentBase {
  createdTime: string;
  recentMessageTime: string;
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
