export interface IResponse<T> {
  state: number;
  result: string;
  message?: string;
  data: T;
}

// 채용폼 요청
export interface IFormReq {
  type: boolean;
  title: string;
  contents: string;
  keywordStandard: string;
  resumeTitle: string;
  ongoing: boolean;
  docsStart: string;
  docsEnd: string;
  meetStart: string;
  meetEnd: string;
  confirmStart: string;
  confirmEnd: string;
}

// 채용폼 반환
export interface IFormRes {
  id: number;
  uploader: string;
  type: boolean;
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
  updateAt: string;
}
