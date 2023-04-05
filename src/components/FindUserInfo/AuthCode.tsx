import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ReactComponent as Dot } from "@/assets/svg/blue-middle-dot.svg";
import { schema } from "@components/Signup/Email";
import { userSchema } from "@pages/SignIn";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const authSchema = userSchema.extend({
  code: z.number().min(1, "인증코드를 입력해 주세요").max(6),
});

type User = z.infer<typeof authSchema>;

const AuthCode = ({ setStep }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<User>({
    resolver: zodResolver(schema),
  });

  const handleConfirmCode = () => {
    console.log("코드 확인, 실패");
  };

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
              className={`mr-3 flex h-[51px] w-[430px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                errors.useremail
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                id="email"
                placeholder="jobkok@gmail.com"
                className="SubHead1Medium w-[365px] outline-none"
                type="text"
                {...register("useremail", {
                  required: true,
                })}
              />
            </div>
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="Caption1Medium text-gray-400">
            이메일로 회원님의 인증코드가 발송되었습니다
          </span>
        </div>
        {/* 인증코드 전송 버튼 누르면 나타나도록 */}
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
                {...register("code", {
                  required: true,
                })}
              />
              <span className="SubHead1Medium text-error-400">3:00</span>
            </div>
            <div className="SubHead1Semibold flex h-[51px] w-24 items-center justify-center rounded-lg bg-blue-50 text-blue-200">
              <button onClick={handleConfirmCode}>인증하기</button>
            </div>
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="Caption1Medium text-error-400">
            {errors?.code?.message}
          </span>
        </div>
        <button
          className="SubHead1Semibold my-5 mb-12 h-[48px] w-[430px] self-center rounded-lg bg-blue-50 text-blue-400"
          type="submit"
          disabled={isSubmitting && isDirty}
          onClick={() => {
            setStep(3);
          }}
        >
          다음으로
        </button>
      </form>
    </>
  );
};

export default AuthCode;
