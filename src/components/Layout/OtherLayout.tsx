import { Outlet, ScrollRestoration } from "react-router-dom";
import { ReactComponent as Logo } from "@/assets/svg/white-logo.svg";
const OtherLayout = () => {
  return (
    <>
      <main className="flex">
        <div className="h-screen w-[64%] min-w-[580px]">
          <Outlet />
        </div>
        <div className="relative w-[36%] min-w-[430px]">
          <img
            className="h-screen w-screen"
            src="/src/assets/png/intro_banner_nologo_3x.png"
            alt="잡콕 로고 및 배너"
          />
          <div className="absolute top-1/2 left-[92px] translate-y-[-50%]">
            <p className="Head4Medium mb-[49px] text-gray-0">
              인재는 두배로, 채용 시간은 절반으로
            </p>
            <Logo />
          </div>
        </div>
      </main>
      <ScrollRestoration />
    </>
  );
};
export default OtherLayout;
