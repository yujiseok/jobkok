import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { ReactComponent as Dot } from "@/assets/svg/blue-dot.svg";
import { ReactComponent as Xicon } from "@/assets/svg/x-icon.svg";
import { userSchema } from "@pages/SignIn";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const authSchema = userSchema.extend({});

type User = z.infer<typeof authSchema>;

const AuthEmail = ({ setStep }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<User>({
    mode: "onChange",
    resolver: zodResolver(authSchema),
  });

  const onSubmit = (data: User) => {
    console.log(data);
    setStep(2);
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
        {/* 이메일 입력칸 */}
        <div className="mb-14">
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
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="Caption1Medium text-error-400">
            {errors?.useremail?.message}
          </span>
        </div>
        <button
          className="SubHead1Semibold my-5 mb-12 h-[48px] w-[430px] self-center rounded-lg bg-blue-50 text-blue-400"
          type="submit"
          disabled={isSubmitting && isDirty}
          onClick={() => {
            setStep(2);
          }}
        >
          인증코드 발송
        </button>
      </form>
    </>
  );
};

export default AuthEmail;
