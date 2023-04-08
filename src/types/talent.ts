export interface IResponse<T> {
  state: number;
  result: string;
  message?: string;
  data: T;
}

export interface IFormData {
  id: number;
  uploader: any;
  title: string;
  contents: string;
  keywordStandard: string;
  resumeTitle: string;
  recruitUrl: string;
  ongoing: boolean;
  procedure: string;
  docsStart: string;
  docsEnd: string;
  meetStart: string;
  meetEnd: string;
  confirmStart: string;
  confirmEnd: string;
}

export interface IStatus {
  totalCount: number;
  todayCount: number;
  process: string;
  processFinish: string;
}

export interface ITalentBase {
  applyId?: string;
  applyName: string;
  applyPhone: string;
  applyEmail: string;
  applyProcedure: string | null;
  applyDelete: boolean;
  createdTime: string;
  pass?: boolean;
  wish: boolean;
  keywords: string[];
  keywordList: string[];
  score: number;
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

export type ProcedureType = "서류제출" | "면접" | "최종조율";

export type ProcedureStyle = Record<
  ProcedureType,
  { bgColor: string; textColor: string }
>;

export interface IKanbanBase {
  title: ProcedureType;
  applicant: ITalent[];
}
