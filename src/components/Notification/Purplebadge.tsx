const PurpleBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="Caption1Semibold flex justify-center rounded bg-badge-purple p-6px text-text-on-badge-purple">
      {children}
    </div>
  );
};
export default PurpleBadge;
