import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { putResetPassword } from "@/api/auth";
import { ReactComponent as Dot } from "@/assets/svg/blue-end-dot.svg";
import { ReactComponent as Eyeclose } from "@/assets/svg/eye-close.svg";
import { ReactComponent as Eyeopen } from "@/assets/svg/eye-open.svg";
import { PW_REGEX } from "@/constants/signup";
import type { IShowPw } from "@pages/SignIn";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const schema = z
  .object({
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상 20자 이하로 입력해 주세요.")
      .max(20, "비밀번호는 8자 이상 20자 이하로 입력해 주세요.")
      .regex(PW_REGEX, "올바른 비밀번호 형식을 입력해 주세요."),
    confirmPassword: z
      .string()
      .min(8, "비밀번호는 8자 이상 20자 이하로 입력해 주세요.")
      .max(20, "비밀번호는 8자 이상 20자 이하로 입력해 주세요.")
      .regex(PW_REGEX, "올바른 비밀번호 형식을 입력해 주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type User = z.infer<typeof schema>;

const EditPassword = ({ setStep }: Props) => {
  const [InputValue, setInputValue] = useState("");
  const [showPw, setShowPw] = useState<IShowPw>({
    type: "password",
    visible: false,
  });
  const navigate = useNavigate();

  const handleToggle = (e: any) => {
    e.preventDefault();
    setShowPw(() => {
      if (!showPw.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<User>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const onSubmit = () => {
    console.log("submit");
  };

  useEffect(() => {
    const useremail = localStorage.getItem("useremail");
    console.log(useremail);
    if (useremail !== null) {
      setInputValue(useremail);
    }
  }, []);

  const handleClick = async () => {
    const res = await putResetPassword(
      InputValue,
      getValues("password"),
      getValues("confirmPassword"),
    );
    if (res.state === 200) {
      localStorage.removeItem("useremail");
      navigate(`/sign-in`, { replace: true });
    } else {
      return alert("비밀번호를 확인해 주세요");
    }
  };

  return (
    <>
      <button className="mb-4 mt-12">
        <Dot />
      </button>
      <p className="Head2Semibold mb-2 text-title-gray">비밀번호 재설정</p>
      <p className="SubHead1Medium mb-20 text-gray-600">
        비밀번호를 잊어버렸다면, 인증을 통해 재설정 하실 수 있어요
      </p>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="password" className="Caption1Medium mb-1 text-gray-300">
          비밀번호 재설정
        </label>
        <div className="mb-6">
          <div className="flex">
            <div
              className={`mr-3 flex h-[51px] w-[430px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                errors.password
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                id="password"
                type={showPw.type}
                placeholder="재설정할 비밀번호를 입력해 주세요"
                className="SubHead1Medium w-[365px] outline-none"
                maxLength={20}
                {...register("password", {
                  required: true,
                })}
              />
              <button className="ml-auto" onClick={handleToggle}>
                {getValues("password") ? (
                  showPw.visible ? (
                    <Eyeopen />
                  ) : (
                    <Eyeclose />
                  )
                ) : null}
              </button>
            </div>
          </div>
          <span className="Caption1Medium text-gray-400">
            8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합
          </span>
        </div>
        <label
          htmlFor="check-password"
          className="Caption1Medium mb-1 text-gray-300"
        >
          비밀번호 확인
        </label>
        <div className="mb-16">
          <div className="flex">
            <div
              className={`mr-3 flex h-[51px] w-[430px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                errors.confirmPassword
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                id="check-password"
                placeholder="비밀번호를 다시 한번 입력해 주세요"
                className="SubHead1Medium w-[365px] outline-none"
                type={showPw.type}
                maxLength={20}
                {...register("confirmPassword", {
                  required: true,
                })}
              />
              <button className="ml-auto" onClick={handleToggle}>
                {getValues("confirmPassword") ? (
                  showPw.visible ? (
                    <Eyeopen />
                  ) : (
                    <Eyeclose />
                  )
                ) : null}
              </button>
            </div>
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="Caption1Medium text-error-400">
            {errors?.password?.message || errors?.confirmPassword?.message}
          </span>
        </div>
        <button
          className="SubHead1Semibold my-5 mb-12 h-[48px] w-[430px] self-center rounded-lg bg-blue-50 text-blue-400"
          onClick={handleClick}
          disabled={isSubmitting && isDirty}
        >
          재설정 완료하기
        </button>
      </form>
    </>
  );
};

export default EditPassword;
