import { ReactComponent as Smile } from "@/assets/svg/smile.svg";

const InterviewBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="Caption1Semibold flex items-center gap-[0.125rem] rounded-lg bg-badge-red px-[0.375rem] py-1 text-text-on-badge-red">
      <Smile /> {children}
    </div>
  );
};
export default InterviewBadge;
