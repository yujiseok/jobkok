import type { IKanban, IResponse, ITalent } from "@/types/talent";

const talentByProcedure = (talentData: IResponse<ITalent[]>): IKanban[] => {
  return Object.entries(
    talentData.data.reduce((acc, apply) => {
      if (!acc[apply.applyProcedure!]) {
        acc[apply.applyProcedure!] = [];
      }
      acc[apply.applyProcedure!].push(apply);

      return acc;
    }, {} as IKanban),
  )
    .map(([title, applicant]) => ({
      title,
      id: title,
      applicant,
    }))
    .sort((a, b) => {
      const order = ["서류제출", "면접진행", "최종조율"];

      return order.indexOf(a.title) - order.indexOf(b.title);
    });
};
export default talentByProcedure;
