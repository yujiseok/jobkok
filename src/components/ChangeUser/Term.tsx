const Term = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <dt className={`${className} Caption1Medium order-2 text-gray-300`}>
      {children}
    </dt>
  );
};
export default Term;
