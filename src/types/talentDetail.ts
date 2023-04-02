export interface ITalentDetail {
  state: string;
  result: string;
  data: {
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
    keywordSelect: string;
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
    languageDate: string;
    militaryStart: string;
    militaryEnd: string;
    militaryDivision: string;
    militaryCategory: string;
    militaryClass: string;
    militaryExemption: any;
    certificateName: string;
    certificateDate: string;
    certificatePublisher: string;
    activitesTitle: string;
    activitesContent: string;
    activitesStart: string;
    activitesEnd: string;
    awardsName: string;
    awardsDate: string;
    awardsCompany: string;
  };
}

export interface ITalent {
  state: number;
  result: string;
}

export interface IAddComment extends ITalent {
  message: string;
}
