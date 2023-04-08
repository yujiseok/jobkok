const EditTypeBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="SubHead2Semibold h-[28px] w-[84px] rounded bg-blue-400 p-1.5 text-center text-blue-25">
      {children}
    </span>
  );
};
export default EditTypeBadge;
