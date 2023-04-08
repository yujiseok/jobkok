import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import { emailDuplicatecheck } from "@/api/applicant";
import { getConfirmCode, getSendCode } from "@/api/auth";
import { ReactComponent as IconLogo } from "@/assets/svg/blue-logo.svg";
import AuthEnter from "@components/Applicant/AuthEnter";
import AuthLabel from "@components/Applicant/AuthLabel";
import AuthRow from "@components/Applicant/AuthRow";

const schema = z.object({
  applyName: z
    .string()
    .nonempty("이름을 입력해주세요.")
    .min(2, "이름을 2자 이상 20자 이내로 입력해주세요.")
    .max(15, "이름을 2자 이상 20자 이내로 입력해주세요.")
    .regex(/^[ㄱ-ㅎ가-힣a-zA-Z]+$/, "특수문자, 숫자, 공백은 입력 불가합니다."),
  applyPhone: z
    .string()
    .nonempty("전화번호를 입력해주세요.")
    .regex(
      /^01([0|1|6|7|8|9])-([0-9]{4})-([0-9]{4})$/,
      "전화번호가 올바르지 않습니다.",
    ),
  applyEmail: z
    .string()
    .nonempty("이메일을 입력해주세요.")
    .email("이메일 형식이 올바르지 않습니다.")
    .regex(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      "이메일 형식이 올바르지 않습니다.",
    ),
  authCode: z
    .string()
    .min(6, "인증코드 6자리를 입력해주세요")
    .regex(/^\d{6}$/, "인증코드 6자리를 입력해주세요")
    .optional(),
});

type IAuthForm = z.infer<typeof schema>;

const ApplicantAuth = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isSended, setIsSended] = useState(false);
  const [isCertified, setIsCertified] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IAuthForm>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  // 이메일 중복확인
  const emailCheck = async () => {
    const res = await emailDuplicatecheck(watch().applyEmail, 49);
    return res.data;
  };

  // 인증코드 확인
  const authcodeCheck = async () => {
    const res = await getConfirmCode(watch().applyEmail, watch().authCode);
    return res?.state === 200;
  };

  // 인증받기 토글 열릴 때 : 이메일 유효성 통과, 중복없음, 인증미완료
  const handleGetCodeBtn = async () => {
    if (
      getValues().applyEmail === "" ||
      errors.applyEmail?.message !== undefined
    ) {
      setFocus("applyEmail");
    } else if (isCertified) {
      confirm("이미 이메일 인증이 완료됐습니다.");
    } else if (await emailCheck()) {
      const res = await getSendCode(watch().applyEmail);
      if (res.state === 200) {
        confirm("이메일이 전송됐습니다. 메일함을 확인해주세요.");
        setIsSended(true);
      } else {
        confirm(`이메일 전송에 실패했습니다.`);
      }
    } else {
      confirm("이미 지원됐습니다. 중복지원이 불가합니다.");
    }
  };

  // 인증완료 버튼
  const handelConfirmCode = async () => {
    if (
      getValues().authCode === undefined ||
      getValues().authCode === "" ||
      errors.authCode
    ) {
      setFocus("authCode");
    } else if (await authcodeCheck()) {
      setIsSended(false);
      setIsCertified(true);
    } else {
      confirm("올바른 인증코드를 입력해주세요");
    }
  };

  // 폼 제출 : 인증됐으면 페이지이동, 안됐으면 인증코드에 focus
  const onSubmit = async (data: IAuthForm) => {
    if (isCertified) {
      const { authCode, ...rest } = data;
      const convertData = {
        ...rest,
        recruitId: params.id,
      };
      navigate(`/applicant/application/${params.id}`, { state: convertData });
    } else {
      setFocus("authCode");
    }
  };

  return (
    <div className="flex h-screen justify-center p-16">
      <section className="relative w-[430px]">
        <h1 className="mb-[52.8px]">
          <IconLogo />
        </h1>
        <div className="mb-[58px]">
          <h2 className="Head2Semibold mb-2 text-title-gray">지원자 인증</h2>
          <p className="SubHead1Medium text-gray-600">
            해당 정보는 기업에게 제공되는 개인정보 입니다.
          </p>
        </div>
        <div className="flex flex-col justify-between">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AuthRow>
              <AuthEnter>
                <AuthLabel htmlFor="applyName">이름</AuthLabel>
                <input
                  className={`SubHead1Medium h-[52px] w-full rounded-md border py-4 px-6 text-gray-800 focus:outline-none ${
                    errors.applyName && "border-error-400"
                  }`}
                  type="text"
                  id="applyName"
                  placeholder="홍길동"
                  {...register("applyName")}
                />
              </AuthEnter>
              <AuthEnter>
                <AuthLabel htmlFor="applyPhone">전화번호</AuthLabel>
                <input
                  className={`SubHead1Medium h-[52px] w-full rounded-md border py-4 px-6 text-gray-800 focus:outline-none ${
                    errors.applyPhone && "border-error-400"
                  }`}
                  type="tel"
                  id="applyPhone"
                  placeholder="010-1234-5678"
                  {...register("applyPhone")}
                />
              </AuthEnter>
            </AuthRow>
            <AuthRow>
              <AuthEnter>
                <AuthLabel htmlFor="applyEmail">이메일</AuthLabel>
                <input
                  className={`SubHead1Medium h-[52px] w-[315px] rounded-md border py-4 px-6 text-gray-800 focus:outline-none ${
                    errors.applyEmail && "border-error-400"
                  } ${isCertified && "bg-gray-100"}`}
                  type="email"
                  id="applyEmail"
                  placeholder="jobkok@jobkok.com"
                  {...register("applyEmail")}
                  disabled={isCertified}
                />
                <p className="Caption1Medium mt-1 text-gray-400">
                  {isSended
                    ? "이메일로 회원님의 인증코드가 발송되었습니다"
                    : !isCertified && "인증코드를 받아 이메일 인증을 해주세요."}
                </p>
              </AuthEnter>
              <button
                className={`SubHead1Semibold btn mt-[19px] h-[52px] rounded-lg border-transparent bg-blue-50 py-2.5 px-6 ${
                  errors.applyEmail || watch().applyEmail === ""
                    ? "text-blue-200"
                    : "text-blue-400"
                }`}
                type="button"
                onClick={handleGetCodeBtn}
              >
                코드발송
              </button>
            </AuthRow>
            {isSended && (
              <AuthRow className="relative">
                <AuthEnter className="relative">
                  <AuthLabel htmlFor="authCode">인증코드</AuthLabel>
                  <input
                    className={`SubHead1Medium h-[52px] w-[315px] rounded-md border py-4 px-6 text-gray-800 focus:outline-none ${
                      errors.authCode ? "border-error-400" : ""
                    }`}
                    type="text"
                    id="authCode"
                    maxLength={6}
                    placeholder="6자리 인증코드를 입력해주세요"
                    {...register("authCode", {
                      required: true,
                    })}
                  />
                  <span className="SubHead1Medium absolute bottom-4 right-6 text-error-400">
                    {/* 타이머 함수 적용 필요 */}
                    3:00
                  </span>
                </AuthEnter>
                <button
                  className={`SubHead1Semibold btn mt-[19px] h-[52px] rounded-lg border-transparent bg-blue-50 py-2.5 px-6 ${
                    errors.authCode || watch().authCode === ""
                      ? "text-blue-200"
                      : "text-blue-400"
                  }`}
                  type="button"
                  onClick={handelConfirmCode}
                >
                  인증완료
                </button>
                <p className="Caption1Medium absolute bottom-[-23px] text-error-400">
                  {errors.authCode?.message}
                </p>
              </AuthRow>
            )}
          </form>
        </div>
        <button
          className={`SubHead1Semibold btn absolute bottom-0 h-11 w-full rounded-lg border-transparent py-2.5 px-6 text-gray-0 ${
            isCertified && isValid ? "bg-blue-500" : "bg-gray-200"
          }`}
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          지원서 작성하기
        </button>
      </section>
    </div>
  );
};
export default ApplicantAuth;
