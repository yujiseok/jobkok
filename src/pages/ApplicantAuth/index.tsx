import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { ReactComponent as IconBack } from "@/assets/applicant/arrow-left.svg";
import { ReactComponent as IconLogo } from "@/assets/applicant/logo.svg";
import AuthEnter from "@components/Applicant/AuthEnter";
import AuthError from "@components/Applicant/AuthError";
import AuthRow from "@components/Applicant/AuthRow";
// import { applicantSubmit, emailAuth, submitApply } from "@/api/applicant";

const schema = z.object({
  name: z
    .string()
    .nonempty("이름을 입력해주세요.")
    .min(2, "이름을 2자 이상 20자 이내로 입력해주세요.")
    .max(15, "이름을 2자 이상 20자 이내로 입력해주세요.")
    .regex(/^[ㄱ-ㅎ가-힣a-zA-Z]+$/, "특수문자, 숫자, 공백은 입력 불가합니다."),
  tel: z
    .string()
    .nonempty("전화번호를 입력해주세요.")
    .regex(
      /^01([0|1|6|7|8|9])-([0-9]{4})-([0-9]{4})$/,
      "전화번호가 올바르지 않습니다.",
    ),
  email: z
    .string()
    .nonempty("이메일을 입력해주세요.")
    .email("이메일 형식이 올바르지 않습니다.")
    .regex(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      "이메일 형식이 올바르지 않습니다.",
    ),
  authCode: z.string().min(6, "인증코드 6자리를 입력해주세요").optional(),
});

type IAuthForm = z.infer<typeof schema>;

const ApplicantAuth = () => {
  const navigate = useNavigate();
  const [isToggled, setToggle] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<IAuthForm>({
    resolver: zodResolver(schema),
  });

  // 인증받기 토글 : 유효성 통과, 중복없음, 인증미완료시에만 열림
  const handleGetCodeBtn = async () => {
    if (errors.email) {
      setFocus("email");
      // 중복없음 분기 추가 필요 : 중복시 confirm("이미 지원됐습니다. 중복지원이 불가합니다.")
    } else if (isDone) {
      confirm("이미 이메일 인증이 완료됐습니다.");
    } else {
      setToggle(true);
      // 이메일 인증 API
      confirm("이메일이 전송됐습니다. 메일함을 확인해주세요.");
    }
  };

  // 인증완료 버튼
  const handelConfirmCode = async () => {
    if (errors.authCode) {
      setFocus("authCode");
      // 이메일 인증 API 성공값 추가 필요 : 실패시 confirm("올바른 인증코드를 입력해주세요")
    } else {
      setToggle(false);
      setIsDone(true);
    }
  };

  // 폼 제출 : 인증됐으면 페이지이동, 안됐으면 인증코드에 focus
  const onSubmit = async (data: IAuthForm) => {
    if (isDone) {
      //데이터 지원서로 가져와서, 한꺼번에 등록 api 호출해야함
      //리덕스에 data 저장?
      console.log(data);
      navigate("/applicant/application");
    } else {
      setToggle(true);
      setFocus("authCode");
    }
  };

  return (
    <div className="mx-auto flex justify-center">
      <div className="flex w-[820px] gap-[99px] p-16">
        <IconBack />
        <section className="w-[430px]">
          <h2 className="mb-[52.8px]">
            <IconLogo />
          </h2>
          <div className="mb-[58px]">
            <h3 className="Head2Semibold mb-2 text-[#333]">지원자 인증</h3>
            <p className="SubHead1Medium text-gray-600">
              해당 정보는 기업에게 제공되는 개인정보 입니다.
            </p>
          </div>
          <form className="mb-[158px]" onSubmit={handleSubmit(onSubmit)}>
            <AuthRow className="mb-4">
              <AuthEnter>
                <label className="Caption1Medium text-gray-300" htmlFor="name">
                  이름
                </label>
                <input
                  className="SubHead1Medium h-[52px] w-[180px] rounded-md border py-4 px-6 text-gray-300"
                  type="text"
                  id="name"
                  placeholder="홍길동"
                  {...register("name")}
                />
                <AuthError>{errors.name?.message}</AuthError>
              </AuthEnter>
              <AuthEnter>
                <label
                  className="Caption1Medium w-[238px] text-gray-300"
                  htmlFor="tel"
                >
                  전화번호
                </label>
                <input
                  className="SubHead1Medium h-[52px] w-full rounded-md border py-4 px-6 text-gray-300"
                  type="tel"
                  id="tel"
                  placeholder="010-1234-5678"
                  {...register("tel")}
                />
                <AuthError>{errors.tel?.message}</AuthError>
              </AuthEnter>
            </AuthRow>
            <AuthRow>
              <AuthEnter>
                <label className="Caption1Medium text-gray-300" htmlFor="email">
                  이메일
                </label>
                <input
                  className="SubHead1Medium h-[52px] w-[315px] rounded-md border py-4 px-6 text-gray-300"
                  type="email"
                  id="email"
                  placeholder="jobkok@jobkok.com"
                  {...register("email")}
                />
                <AuthError className="mt-1 text-sm text-rose-500">
                  {errors.email?.message}
                </AuthError>
              </AuthEnter>
              <button
                className="SubHead1Semibold mt-[19px] h-[52px] rounded-lg bg-blue-50 py-2.5 px-6 text-blue-200"
                type="button"
                onClick={handleGetCodeBtn}
              >
                코드발송
              </button>
            </AuthRow>
            {isToggled && (
              <div className="mb-5">
                <label htmlFor="authCode">
                  인증코드 <span className="text-sm text-red-500">필수</span>
                </label>
                <input
                  className="mr-5 ml-3 rounded-md border border-solid p-1"
                  type="text"
                  id="authCode"
                  maxLength={6}
                  placeholder="인증코드를 입력해주세요."
                  {...register("authCode", {
                    required: true,
                  })}
                />
                <button
                  className="rounded-md bg-blue-500 py-1 px-2 text-white"
                  type="button"
                  onClick={handelConfirmCode}
                >
                  인증완료
                </button>
                <p className="mt-2 text-sm text-rose-500">
                  {errors.authCode?.message}
                </p>
              </div>
            )}
          </form>
          <button
            className="SubHead1Semibold h-11 w-full rounded-lg bg-gray-200 py-2.5 px-6 text-gray-0"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            지원서 작성하기
          </button>
        </section>
      </div>
      <img className="h-screen w-[460px] bg-blue-400" />
    </div>
  );
};
export default ApplicantAuth;
