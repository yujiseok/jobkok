import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
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

const Phone = ({ setStep }: Props) => {
  const [phoneValue, setPhoneValue] = useState("");
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

  // 핸드폰 번호 입력값 확인
  const handlePhoneChange = (e: any) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhoneValue(e.target.value);
    }
  };

  // 전화번호 하이픈 자동 생성
  useEffect(() => {
    if (phoneValue.length === 10) {
      setPhoneValue(phoneValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phoneValue.length === 13) {
      setPhoneValue(
        phoneValue
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
      );
    }
  }, [phoneValue]);

  return (
    <>
      <button className="mb-[52px]">
        <Bluelogo />
      </button>
      <p className="Head2Semibold mb-2 text-title-gray">회원가입</p>
      <p className="SubHead1Medium mb-12 text-gray-600">
        회원등록을 위해 전화번호를 입력해 주세요.
      </p>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="Caption1Medium mb-1 text-gray-300">전화번호</label>
        <div className="mb-48">
          <div className="flex flex-col">
            <div
              className={`flex h-[51px] w-[430px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                errors.phone
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                className="SubHead1Medium w-[365px] outline-none"
                type="text"
                placeholder="(-)없이 입력해 주세요"
                value={phoneValue}
                {...register("phone", { required: true })}
                onChange={handlePhoneChange}
              />
            </div>
          </div>
          <span className="Caption1Medium text-error-400">
            {errors?.phone?.message}
          </span>
        </div>
        <button
          className="SubHead1Semibold my-5 mb-12 h-[48px] w-[430px] self-center rounded-lg bg-blue-50 text-blue-400"
          type="submit"
          disabled={isSubmitting}
          onClick={() => {
            setStep(4);
          }}
        >
          다음으로
        </button>
      </form>
      <div className="SubHead2Semibold flex justify-center">
        <Check className="mr-1" />
        <p className="text-gray-400">이메일 생성 및 인증</p>
        <Arrow className="mx-2" />
        <Check className="mr-1" />
        <p className="text-gray-400">비밀번호 설정</p>
        <Arrow className="mx-2" />
        <p className="text-gray-800">기업 및 개인정보 등록</p>
      </div>
    </>
  );
};

export default Phone;
