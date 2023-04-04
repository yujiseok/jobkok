import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { ReactComponent as Arrow } from "@/assets/svg/arrow-right.svg";
import { ReactComponent as Bluelogo } from "@/assets/svg/blue-logo.svg";
import { ReactComponent as Check } from "@/assets/svg/round-check.svg";
import type { NewUser } from "./Email";
import { schema } from "./Email";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Password = ({ setStep }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<NewUser>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: NewUser) => {
    // 회원가입 api 수정 예정
    console.log(data);
  };

  return (
    <>
      <button className="mb-[52px]">
        <Bluelogo />
      </button>
      <p className="Head2Semibold mb-2 text-title-gray">회원가입</p>
      <p className="SubHead1Medium mb-12 text-gray-600">
        이제 비밀번호를 설정할게요.
      </p>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="Caption1Medium mb-1 text-gray-300">
          비밀번호 설정
        </label>
        {/* 비밀번호 입력칸 */}
        <div className="mb-20">
          <div className="flex flex-col">
            <div
              className={`flex h-[51px] w-[430px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                errors.password
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                type="password"
                placeholder="설정할 비밀번호를 입력해 주세요"
                className="SubHead1Medium w-[365px] outline-none"
                maxLength={20}
                {...register("password", { required: true })}
              />
            </div>
            <div className="Caption1Medium mb-6 text-gray-400">
              8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합
            </div>
          </div>
          <label className="Caption1Medium mb-1 text-gray-300">
            비밀번호 확인
          </label>
          <div className="flex flex-col">
            <div
              className={`flex h-[51px] w-[430px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                errors.password
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                type="password"
                placeholder="설정할 비밀번호를 입력해 주세요"
                className="SubHead1Medium w-[365px] outline-none"
                maxLength={20}
                {...register("confirmPassword", { required: true })}
              />
            </div>
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="Caption1Medium text-error-400">
            {errors.password?.message || errors?.confirmPassword?.message}
          </span>
        </div>
        <button
          className="SubHead1Semibold my-5 mb-12 h-[48px] w-[430px] self-center rounded-lg bg-blue-50 text-blue-400"
          type="submit"
          disabled={isSubmitting}
          onClick={() => {
            setStep(3);
          }}
        >
          다음으로
        </button>
      </form>
      <div className="SubHead2Semibold flex justify-center">
        <Check className="mr-1" />
        <p className="text-gray-400">이메일 생성 및 인증</p>
        <Arrow className="mx-2" />
        <p className="text-gray-800">비밀번호 설정</p>
        <Arrow className="mx-2" />
        <p className="text-gray-400">기업 및 개인정보 등록</p>
      </div>
    </>
  );
};

export default Password;
