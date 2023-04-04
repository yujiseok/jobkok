const BlueBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="Caption1Semibold flex justify-center rounded bg-badge-blue p-6px text-text-on-badge-blue">
      {children}
    </div>
  );
};
export default BlueBadge;
