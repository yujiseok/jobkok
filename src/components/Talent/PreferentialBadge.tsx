const PreferentialBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded bg-blue-50 p-1 text-text-on-badge-blue-50">
      {children}
    </div>
  );
};
export default PreferentialBadge;
