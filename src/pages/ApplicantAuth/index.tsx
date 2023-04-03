import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { ReactComponent as IconLogo } from "@/assets/applicant/logo.svg";
import { ReactComponent as BannerJobkok } from "@/assets/svg/jobkok_banner_right.svg";
import AuthEnter from "@components/Applicant/AuthEnter";
import AuthLabel from "@components/Applicant/AuthLabel";
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
  const [isSended, setSended] = useState(false);
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

  // 인증받기 토글 열릴 때 : 이메일 유효성 통과, 중복없음, 인증미완료
  const handleGetCodeBtn = async () => {
    if (getValues().email === "" || errors.email?.message !== undefined) {
      setFocus("email");
      // 중복없음 분기 추가 필요 : 중복시 confirm("이미 지원됐습니다. 중복지원이 불가합니다.")
    } else if (isCertified) {
      confirm("이미 이메일 인증이 완료됐습니다.");
    } else {
      setSended(true);
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
      setSended(false);
      setIsCertified(true);
    }
  };

  // 폼 제출 : 인증됐으면 페이지이동, 안됐으면 인증코드에 focus
  const onSubmit = async (data: IAuthForm) => {
    if (isCertified) {
      //데이터 지원서로 가져와서, 한꺼번에 등록 api 호출해야함
      //리덕스에 data 저장?
      console.log(data);
      navigate("/applicant/application");
    } else {
      setSended(true);
      setFocus("authCode");
    }
  };

  return (
    <div className="mx-auto flex justify-center">
      <div className="flex w-[820px] justify-center p-16 pb-0">
        <section className="w-[430px]">
          <h1 className="mb-[52.8px]">
            <IconLogo />
          </h1>
          <div className="mb-[58px]">
            <h2 className="Head2Semibold mb-2 text-[#333]">지원자 인증</h2>
            <p className="SubHead1Medium text-gray-600">
              해당 정보는 기업에게 제공되는 개인정보 입니다.
            </p>
          </div>
          <div className="flex h-[360px] flex-col justify-between">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <AuthRow>
                <AuthEnter>
                  <AuthLabel htmlFor="name">이름</AuthLabel>
                  <input
                    className={`SubHead1Medium h-[52px] w-full rounded-md border py-4 px-6 text-gray-800 focus:outline-none ${
                      errors.name && "border-error-400"
                    }`}
                    type="text"
                    id="name"
                    placeholder="홍길동"
                    {...register("name")}
                  />
                </AuthEnter>
                <AuthEnter>
                  <AuthLabel htmlFor="tel">전화번호</AuthLabel>
                  <input
                    className={`SubHead1Medium h-[52px] w-full rounded-md border py-4 px-6 text-gray-800 focus:outline-none ${
                      errors.tel && "border-error-400"
                    }`}
                    type="tel"
                    id="tel"
                    placeholder="010-1234-5678"
                    {...register("tel")}
                  />
                </AuthEnter>
              </AuthRow>
              <AuthRow>
                <AuthEnter>
                  <AuthLabel htmlFor="email">이메일</AuthLabel>
                  <input
                    className={`SubHead1Medium h-[52px] w-[315px]  rounded-md border py-4 px-6 text-gray-800 focus:outline-none ${
                      errors.email && "border-error-400"
                    }`}
                    type="email"
                    id="email"
                    placeholder="jobkok@jobkok.com"
                    {...register("email")}
                  />
                  {isSended && (
                    <p className="Caption1Medium mt-1 text-gray-400">
                      이메일로 회원님의 인증코드가 발송되었습니다
                    </p>
                  )}
                </AuthEnter>
                <button
                  className={`SubHead1Semibold mt-[19px] h-[52px] rounded-lg bg-blue-50 py-2.5 px-6 ${
                    errors.email || watch().email === ""
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
                    className={`SubHead1Semibold mt-[19px] h-[52px] rounded-lg bg-blue-50 py-2.5 px-6 ${
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
            <button
              className={`SubHead1Semibold h-11 w-full rounded-lg  py-2.5 px-6 text-gray-0 ${
                isCertified && isValid ? "bg-blue-500" : "bg-gray-200"
              }`}
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              지원서 작성하기
            </button>
          </div>
        </section>
      </div>
      <BannerJobkok className="h-screen w-[460px]" />
    </div>
  );
};
export default ApplicantAuth;
