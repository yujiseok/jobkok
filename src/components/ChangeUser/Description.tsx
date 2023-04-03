const Description = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <dd className={`${className} SubHead1Medium order-1 text-gray-800`}>
      {children}
    </dd>
  );
};
export default Description;
