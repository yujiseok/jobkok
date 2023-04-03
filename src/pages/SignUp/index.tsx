import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Back } from "@/assets/svg/arrow-back.svg";
import { ReactComponent as Banner } from "@/assets/svg/jobkok-banner.svg";
import Complete from "@components/Signup/Complete";
import Email from "@components/Signup/Email";
import Password from "@components/Signup/Password";
import Phone from "@components/Signup/Phone";
import UserInfo from "@components/Signup/UserInfo";

const SignUp = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [step, setStep] = useState<number>(1);
  if (step === 0) {
    navigate("/sign-in");
  }

  return (
    <div className="flex h-screen bg-gray-0">
      <div className="my-[68px] ml-[64px] mr-[195px] flex w-4/5 justify-center">
        {step !== 5 ? (
          <Back
            className="mr-44 cursor-pointer"
            onClick={() => {
              setStep(step - 1);
            }}
          />
        ) : null}

        <div>
          {step === 1 && <Email setStep={setStep} />}
          {step === 2 && <Password setStep={setStep} />}
          {step === 3 && <Phone setStep={setStep} />}
          {step === 4 && <UserInfo setStep={setStep} />}
          {step === 5 && <Complete />}
        </div>
      </div>
      <div>
        <Banner />
      </div>
    </div>
  );
};
export default SignUp;
