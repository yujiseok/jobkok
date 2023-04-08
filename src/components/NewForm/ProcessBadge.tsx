const ProcessBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="SubHead2Semibold h-[28px] w-[84px] rounded border border-gray-50 bg-gray-0 py-1 px-1.5 text-center text-blue-400">
      {children}
    </span>
  );
};
export default ProcessBadge;
