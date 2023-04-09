import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getConfirmCode } from "@/api/auth";
import { ReactComponent as Dot } from "@/assets/svg/blue-middle-dot.svg";
import { CODE_REGEX } from "@/constants/signup";
import { useTimer } from "@/lib/hooks/useTimer";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const schema = z.object({
  useremail: z
    .string()
    .min(1, "이메일을 입력해 주세요.")
    .email("올바른 이메일 형식을 입력해 주세요."),
  code: z
    .string()
    .min(1, "인증코드를 입력해 주세요")
    .regex(CODE_REGEX, "인증코드를 확인해 주세요"),
});

type User = z.infer<typeof schema>;

const AuthCode = ({ setStep }: Props) => {
  const [InputValue, setInputValue] = useState("");
  const [confirmCode, setConfirmCode] = useState(false);
  const { formattedTime, isCountingDown, setIsCountingDown } = useTimer(
    180000,
    false,
  );
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<User>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const handleConfirmCode = async () => {
    const email = InputValue;
    const code = getValues("code");
    setValue("useremail", InputValue);
    const res = await getConfirmCode(email, code);
    if (res === 200) {
      setConfirmCode(true);
      setIsCountingDown(false);
    } else {
      console.log("코드확인실패");
    }
  };

  useEffect(() => {
    setIsCountingDown(true);
    const useremail = localStorage.getItem("useremail");
    if (useremail !== null) {
      setInputValue(useremail);
    }
  }, []);

  const onSubmit = (data: User) => {
    console.log(data);
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
        <label htmlFor="email" className="Caption1Medium mb-1 text-gray-300">
          이메일
        </label>
        <div className="mb-6">
          <div className="flex">
            <div
              className={`mr-3 flex h-[51px] w-[430px] items-center rounded-lg border border-solid bg-blue-25 px-6 after:text-gray-300 ${
                errors.useremail
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                id="email"
                className="SubHead1Medium w-[365px] bg-blue-25 outline-none"
                value={InputValue}
                type="text"
                {...register("useremail", {
                  required: true,
                })}
              />
            </div>
          </div>
          <span className="Caption1Medium text-gray-400">
            이메일로 회원님의 인증코드가 발송되었습니다
          </span>
        </div>
        <label htmlFor="code" className="Caption1Medium mb-1 text-gray-300">
          인증코드
        </label>
        <div className="mb-16">
          <div className="flex">
            <div
              className={`mr-3 flex h-[51px] w-[315px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                errors.code
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                id="code"
                placeholder="6자리 인증코드를 입력해주세요"
                className="SubHead1Medium w-[365px] outline-none"
                type="text"
                maxLength={6}
                {...register("code", {
                  required: true,
                })}
              />
              {isCountingDown && (
                <span
                  className={`SubHead1Medium text-error-400 ${
                    confirmCode ? "hidden" : "block"
                  }`}
                >
                  {formattedTime}
                </span>
              )}
            </div>
            <div
              className={`SubHead1Semibold flex h-[51px] w-24 items-center justify-center rounded-lg bg-blue-50 ${
                getValues("code") ? "text-blue-500" : "text-blue-200"
              }`}
            >
              <button
                disabled={!getValues("code") || !!errors.code || confirmCode}
                onClick={handleConfirmCode}
              >
                인증하기
              </button>
            </div>
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="Caption1Medium text-error-400">
            {errors?.code?.message}
          </span>
        </div>
        <button
          className={`SubHead1Semibold my-5 mb-12 h-[48px] w-[430px] self-center rounded-lg text-gray-0 ${
            confirmCode ? "bg-blue-500" : "bg-gray-200"
          }`}
          type="submit"
          disabled={isSubmitting && isDirty}
          onClick={() => {
            if (confirmCode) {
              setStep(3);
            }
          }}
        >
          다음으로
        </button>
      </form>
    </>
  );
};

export default AuthCode;
