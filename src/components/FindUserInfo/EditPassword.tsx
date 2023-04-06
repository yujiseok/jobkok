import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type * as z from "zod";
import { ReactComponent as Dot } from "@/assets/svg/blue-end-dot.svg";
import { schema } from "@components/Signup/Email";
import { userSchema } from "@pages/SignIn";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const authSchema = userSchema.extend({});

type User = z.infer<typeof authSchema>;

const AuthCode = ({ setStep }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/sign-in`, { replace: true });
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<User>({
    resolver: zodResolver(schema),
  });

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
        <label htmlFor="password" className="Caption1Medium mb-1 text-gray-300">
          비밀번호 재설정
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
                id="password"
                placeholder="재설정할 비밀번호를 입력해 주세요"
                className="SubHead1Medium w-[365px] outline-none"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />
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
                errors.password
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                id="check-password"
                placeholder="비밀번호를 다시 한번 입력해 주세요"
                className="SubHead1Medium w-[365px] outline-none"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />
            </div>
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="Caption1Medium text-error-400">
            {errors?.password?.message}
          </span>
        </div>
        <button
          className="SubHead1Semibold my-5 mb-12 h-[48px] w-[430px] self-center rounded-lg bg-blue-50 text-blue-400"
          type="submit"
          disabled={isSubmitting && isDirty}
          onClick={handleClick}
        >
          재설정 완료하기
        </button>
      </form>
    </>
  );
};

export default AuthCode;
