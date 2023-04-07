export interface IResponse<T> {
  state: number;
  result: string;
  message?: string;
  data: T;
}

// 채용폼 요청
export interface IFormRequestData {
  type: boolean;
  title: string;
  contents: string;
  keywordStandard: string;
  resumeTitle: "센스있어요, 꼼꼼해요, 잘 웃어요, 원칙적이에요, 습득력이 좋아요";
  ongoing: boolean;
  docsStart: string;
  docsEnd: string;
  meetStart: string;
  meetEnd: string;
}

// 채용폼 반환
export interface IFormResponseData {
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
