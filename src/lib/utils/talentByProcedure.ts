import type { IKanbanBase, IResponse, ITalent } from "@/types/talent";

const talentToProcedure = (
  talentData: IResponse<null> | IResponse<ITalent[]> | undefined,
) => {
  const base: IKanbanBase[] = [
    { title: "서류제출", applicant: [] },
    { title: "면접", applicant: [] },
    { title: "최종조율", applicant: [] },
  ];

  talentData?.data?.forEach((applicant) => {
    const { applyProcedure } = applicant;
    const match = base.find((item) => item.title === applyProcedure);
    if (match) {
      match.applicant.push(applicant);
    }
  });

  return base;
};

export default talentToProcedure;
