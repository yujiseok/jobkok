export const WhiteContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-48 flex-1 rounded-xl bg-gray-0 shadow-job">
      <div className="SubHead1Semibold grid place-items-center gap-3 py-[38px] text-center text-gray-600">
        {children}
      </div>
    </div>
  );
};
