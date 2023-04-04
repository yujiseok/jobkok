const RedBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="Caption1Semibold flex justify-center rounded bg-badge-red p-6px text-text-on-badge-red">
      {children}
    </div>
  );
};
export default RedBadge;
