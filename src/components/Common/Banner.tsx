const Banner = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <section
      className={`${className} absolute top-16 left-0 w-full bg-blue-400 py-12 text-gray-0`}
    >
      {children}
    </section>
  );
};
export default Banner;
