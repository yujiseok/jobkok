import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ReactComponent as Arrow } from "@/assets/svg/arrow-right.svg";
import { ReactComponent as Bluelogo } from "@/assets/svg/blue-logo.svg";
import { ReactComponent as Xicon } from "@/assets/svg/x-icon.svg";
import {
  CEO_REGEX,
  PHONE_REGEX,
  PW_REGEX,
  REGISTRATION_REGEX,
} from "@/constants/signup";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

// schema 유효성 검사
export const schema = z
  .object({
    useremail: z
      .string()
      .min(1, "이메일을 입력해 주세요.")
      .email("올바른 이메일 형식을 입력해 주세요."),
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
    phone: z
      .string()
      .min(1, "전화번호를 입력해 주세요.")
      .regex(PHONE_REGEX, "올바른 전화번호 형식을 입력해 주세요."),
    companyName: z.string().min(1, "회사명을 입력해 주세요."),
    ceo: z
      .string()
      .min(1, "대표자명을 입력해 주세요.")
      .regex(CEO_REGEX, "대표자명을 확인해 주세요."),
    registration: z
      .string()
      .regex(REGISTRATION_REGEX, "올바른 사업자 등록 번호를 입력해 주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type NewUser = z.infer<typeof schema>;

const Email = ({ setStep }: Props) => {
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
    // 회원가입 api 수정 예정
    console.log(data);
  };

  // 이메일 중복 확인
  const handleConfirmEmail = (e: any) => {
    e.preventDefault();
    // 이미 가입된 이메일일경우 처리 예정
  };

  return (
    <>
      <button className="mb-[52px]">
        <Bluelogo />
      </button>
      <p className="Head2Semibold mb-2 text-title-gray">회원가입</p>
      <p className="SubHead1Medium mb-12 text-gray-600">
        잡콕에 오신 것을 환영해요, 먼저 계정부터 만들어 볼까요?
      </p>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="Caption1Medium mb-1 text-gray-300">이메일</label>
        {/* 이메일 입력칸 */}
        <div className="mb-48">
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
              />
              <button
                className="ml-auto"
                onClick={(e) => {
                  e.preventDefault();
                  setValue("useremail", "");
                }}
              >
                {getValues("useremail") ? <Xicon /> : null}
              </button>
            </div>
            <div className="SubHead1Semibold flex h-[51px] w-24 items-center justify-center rounded-lg bg-blue-50 text-blue-200">
              <button onClick={handleConfirmEmail}>중복체크</button>
            </div>
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="Caption1Medium text-error-400">
            {errors?.useremail?.message}
          </span>
        </div>
        <button
          className="SubHead1Semibold my-5 mb-12 h-[48px] w-[430px] self-center rounded-lg bg-blue-50 text-blue-400"
          type="submit"
          disabled={isSubmitting}
          onClick={() => {
            setStep(2);
          }}
        >
          해당 이메일로 인증코드 발송
        </button>
      </form>
      <div className="SubHead2Semibold flex justify-center">
        <p className="text-gray-800">이메일 생성 및 인증</p>
        <Arrow className="mx-2" />
        <p className="text-gray-400">비밀번호 설정</p>
        <Arrow className="mx-2" />
        <p className="text-gray-400">기업 및 개인정보 등록</p>
      </div>
    </>
  );
};

export default Email;
