import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";
import { getConfirmCode, getSendCode, postEmailCheck } from "@/api/auth";
import { ReactComponent as Bluelogo } from "@/assets/svg/blue-logo.svg";
import { ReactComponent as Arrow } from "@/assets/svg/chevron-right.svg";
import { ReactComponent as Xicon } from "@/assets/svg/x-icon.svg";
import { CODE_REGEX } from "@/constants/signup";
import { fillEmail } from "@/features/signUpSlice";
import { useTimer } from "@/lib/hooks/useTimer";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

// schema 유효성 검사
export const schema = z.object({
  useremail: z
    .string()
    .min(1, "이메일을 입력해 주세요.")
    .email("올바른 이메일 형식을 입력해 주세요."),
  code: z
    .string()
    .min(1, "인증코드를 입력해 주세요")
    .regex(CODE_REGEX, "인증코드를 확인해 주세요"),
});

type NewUser = z.infer<typeof schema>;

const Email = ({ setStep }: Props) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const { formattedTime, isCountingDown, setIsCountingDown, resetTime } =
    useTimer(180000, false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<NewUser>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: NewUser) => {
    if (isCodeConfirmed) {
      dispatch(fillEmail(data.useremail));
      setStep(2);
    }
  };

  // 이메일 중복확인
  const handleConfirmEmail = async () => {
    const res = await postEmailCheck(getValues("useremail"));
    if (errors.useremail) {
      return alert("이미 사용중인 이메일 입니다.");
    } else if (res.state === 200) {
      console.log(res);
      setIsConfirmed(true);
    }
  };

  //인증코드 발송
  const handleGetCode = async () => {
    setIsClicked(true);
    setIsCountingDown(true);
    const res = await getSendCode(getValues("useremail"));
    if (res.state !== 200) {
      return alert("이메일을 확인해 주세요");
    }
  };

  // 인증코드 확인
  const handleConfirmCode = async () => {
    const res = await getConfirmCode(getValues("useremail"), getValues("code"));
    if (res.state !== 200) {
      return alert("인증코드를 확인해 주세요");
    } else {
      setIsCodeConfirmed(true);
      setIsCountingDown(false);
    }
  };

  return (
    <>
      <button className="pb-[52px]">
        <Bluelogo />
      </button>
      <p className="Head2Semibold pb-2 text-title-gray">회원가입</p>
      <p className="SubHead1Medium pb-12 text-gray-600">
        잡콕에 오신 것을 환영해요, 먼저 계정부터 만들어 볼까요?
      </p>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="Caption1Medium pb-1 text-gray-300">이메일</label>
        {/* 이메일 입력칸 */}
        <div className="pb-32">
          <div className="flex">
            <div
              className={`mr-3 flex h-[51px] w-[315px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                errors.useremail
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                placeholder="jobkok@gmail.com"
                className="SubHead1Medium w-[365px] outline-none"
                type="text"
                {...register("useremail", {
                  required: true,
                })}
                disabled={isConfirmed}
              />
              {!isConfirmed && (
                <button
                  className="ml-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    setValue("useremail", "");
                  }}
                >
                  {getValues("useremail") ? <Xicon /> : null}
                </button>
              )}
            </div>
            <div
              className={`SubHead1Semibold flex h-[51px] w-24 items-center justify-center rounded-lg bg-blue-50 ${
                getValues("useremail") && !isConfirmed
                  ? "text-blue-400"
                  : "text-blue-200"
              }`}
            >
              <button
                disabled={isConfirmed || !getValues("useremail")}
                onClick={handleConfirmEmail}
              >
                {isClicked ? "재발송" : "중복확인"}
              </button>
            </div>
          </div>
          {/* 오류 메세지 띄우기 */}
          {
            <span
              className={`Caption1Medium text-error-400 ${
                isConfirmed && "hidden"
              }`}
            >
              {errors?.useremail?.message}
            </span>
          }
          {isConfirmed && (
            <span
              className={`Caption1Medium ${
                isClicked ? "text-gray-400" : "text-blue-500"
              }`}
            >
              {isClicked
                ? "이메일로 회원님의 인증코드가 발송되었습니다"
                : "사용가능한 이메일입니다"}
            </span>
          )}
          {/* 인증코드 입력 칸 */}
          {isClicked && (
            <div className="pt-6">
              <label
                htmlFor="confirm-code"
                className="Caption1Medium pb-2 text-gray-300"
              >
                인증코드
              </label>
              <div className="flex">
                <div
                  className={`mr-3 flex h-[51px] w-[315px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                    errors.code
                      ? "border-error-400"
                      : "border-gray-100 focus-within:border-blue-400"
                  }`}
                >
                  <input
                    id="confirm-code"
                    placeholder="6자리 인증코드를 입력해주세요"
                    className="SubHead1Medium w-[365px] outline-none"
                    maxLength={6}
                    {...register("code", {
                      required: true,
                    })}
                  />
                  {isCountingDown && (
                    <span className="SubHead1Medium text-error-400">
                      {formattedTime}
                    </span>
                  )}
                </div>
                <div
                  className={`SubHead1Semibold flex h-[51px] w-24 items-center justify-center rounded-lg bg-blue-50 ${
                    getValues("code") ? "text-blue-400" : "text-blue-200"
                  }`}
                >
                  <button onClick={handleConfirmCode}>인증하기</button>
                </div>
              </div>
              <span className={`Caption1Medium text-error-400`}>
                {errors?.code?.message}
              </span>
            </div>
          )}
        </div>
        {isConfirmed && (
          <button
            className={`SubHead1Semibold my-5 h-[48px] w-[430px] self-center rounded-lg bg-blue-50 pb-4 pt-3 text-blue-400 ${
              isClicked && "hidden"
            }`}
            onClick={handleGetCode}
          >
            해당 이메일로 인증코드 발송
          </button>
        )}
        {isClicked && (
          <button
            className={`SubHead1Semibold my-5 h-[48px] w-[430px] self-center rounded-lg text-gray-0 ${
              isCodeConfirmed ? "bg-blue-500" : "bg-gray-200"
            }`}
            type="submit"
          >
            다음으로
          </button>
        )}
      </form>
      <div className="SubHead2Semibold flex justify-center">
        <p className="text-gray-800">이메일 생성 및 인증</p>
        <Arrow className="mx-2 mt-1" />
        <p className="text-gray-400">비밀번호 설정</p>
        <Arrow className="mx-2 mt-1" />
        <p className="text-gray-400">기업 및 개인정보 등록</p>
      </div>
    </>
  );
};

export default Email;
