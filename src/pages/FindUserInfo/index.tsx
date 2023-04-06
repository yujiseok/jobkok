import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Back } from "@/assets/svg/arrow-back.svg";
import { ReactComponent as Banner } from "@/assets/svg/jobkok-banner.svg";
import AuthCode from "@components/FindUserInfo/AuthCode";
import AuthEmail from "@components/FindUserInfo/AuthEmail";
import EditPassword from "@components/FindUserInfo/EditPassword";

const FindUserInfo = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  if (step === 0) {
    navigate("/sign-in");
  }

  return (
    <div className="flex h-screen bg-gray-0">
      <div className="my-[68px] ml-[64px] mr-[195px] flex w-4/5 justify-center">
        {step !== 4 ? (
          <Back
            className="mr-44 cursor-pointer"
            onClick={() => {
              setStep(step - 1);
            }}
          />
        ) : null}
        <div>
          {step === 1 && <AuthEmail setStep={setStep} />}
          {step === 2 && <AuthCode setStep={setStep} />}
          {step === 3 && <EditPassword setStep={setStep} />}
        </div>
      </div>
      <div>
        <Banner />
      </div>
    </div>
  );
};
export default FindUserInfo;
