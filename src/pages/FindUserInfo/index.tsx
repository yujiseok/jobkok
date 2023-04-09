import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Back } from "@/assets/svg/arrow-back.svg";
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
    <div className="flex h-screen justify-center p-16">
      <div className="flex">
        {step !== 4 ? (
          <Back
            className="mr-28 cursor-pointer"
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
    </div>
  );
};
export default FindUserInfo;
