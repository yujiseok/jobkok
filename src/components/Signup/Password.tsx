import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";
import { ReactComponent as Bluelogo } from "@/assets/svg/blue-logo.svg";
import { ReactComponent as Arrow } from "@/assets/svg/chevron-right.svg";
import { ReactComponent as Eyeclose } from "@/assets/svg/eye-close.svg";
import { ReactComponent as Eyeopen } from "@/assets/svg/eye-open.svg";
import { ReactComponent as Check } from "@/assets/svg/round-check.svg";
import { PW_REGEX } from "@/constants/signup";
import { fillPassword } from "@/features/signUpSlice";
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

type NewUser = z.infer<typeof schema>;

const Password = ({ setStep }: Props) => {
  const [showPw, setShowPw] = useState<IShowPw>({
    type: "password",
    visible: false,
  });
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<NewUser>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: NewUser) => {
    dispatch(fillPassword(data.password));
    setStep(3);
  };

  const handleToggle = (e: any) => {
    e.preventDefault();
    setShowPw(() => {
      if (!showPw.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  return (
    <>
      <button className="pb-[52px]">
        <Bluelogo />
      </button>
      <p className="Head2Semibold pb-2 text-title-gray">회원가입</p>
      <p className="SubHead1Medium pb-12 text-gray-600">
        이제 비밀번호를 설정할게요.
      </p>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="Caption1Medium pb-1 text-gray-300">
          비밀번호 설정
        </label>
        {/* 비밀번호 입력칸 */}
        <div className="pb-20">
          <div className="flex flex-col">
            <div
              className={`flex h-[51px] w-[430px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                errors.password
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                type={showPw.type}
                placeholder="설정할 비밀번호를 입력해 주세요"
                className="SubHead1Medium w-[365px] outline-none"
                maxLength={20}
                {...register("password", { required: true })}
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
            <div
              className={`Caption1Medium mb-6 ${
                !errors.password && getValues("password")
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            >
              8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합
            </div>
          </div>
          <label className="Caption1Medium mb-1 text-gray-300">
            비밀번호 확인
          </label>
          <div className="flex flex-col">
            <div
              className={`flex h-[51px] w-[430px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                errors.confirmPassword
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                placeholder="설정할 비밀번호를 입력해 주세요"
                className="SubHead1Medium w-[365px] outline-none"
                maxLength={20}
                {...register("confirmPassword", { required: true })}
                type={showPw.type}
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
          {/* 오류 메세지 띄우기 */}
          <span className="Caption1Medium text-error-400">
            {errors.password?.message || errors?.confirmPassword?.message}
          </span>
        </div>
        <button
          className={`SubHead1Semibold my-5 mb-12 h-[48px] w-[430px] self-center rounded-lg text-gray-0 ${
            getValues("confirmPassword") ? "bg-blue-500" : "bg-gray-200"
          }`}
          type="submit"
          disabled={isSubmitting}
        >
          다음으로
        </button>
      </form>
      <div className="SubHead2Semibold flex justify-center">
        <Check className="mr-1" />
        <p className="text-gray-400">이메일 생성 및 인증</p>
        <Arrow className="mx-2 mt-1" />
        <p className="text-gray-800">비밀번호 설정</p>
        <Arrow className="mx-2 mt-1" />
        <p className="text-gray-400">기업 및 개인정보 등록</p>
      </div>
    </>
  );
};

export default Password;
