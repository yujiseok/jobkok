import { Outlet, ScrollRestoration } from "react-router-dom";
const OtherLayout = () => {
  return (
    <>
      <main className="mx-auto max-w-7xl">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
};
export default OtherLayout;
