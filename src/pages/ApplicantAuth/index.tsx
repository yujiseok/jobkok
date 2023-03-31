import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import GetFormInfo from "@components/Applicant/GetFormInfo";
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
    <div className="container mx-auto max-w-[768px] py-10">
      <GetFormInfo />
      <section className="rounded-md border border-solid p-10">
        <h2 className="mb-10 text-2xl font-bold">지원자 기본 정보</h2>
        <form className="flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="name">
              이름 <span className="text-sm text-red-500">필수</span>
            </label>
            <input
              className="ml-3 rounded-md border border-solid p-1"
              type="text"
              id="name"
              placeholder="홍길동"
              {...register("name")}
            />
            <p className="mt-2 text-sm text-rose-500">{errors.name?.message}</p>
          </div>
          <div className="mb-5">
            <label htmlFor="tel">
              전화번호 <span className="text-sm text-red-500">필수</span>
            </label>
            <input
              className="ml-3 rounded-md border border-solid p-1"
              type="tel"
              id="tel"
              placeholder="010-1234-5678"
              {...register("tel")}
            />
            <p className="mt-2 text-sm text-rose-500">{errors.tel?.message}</p>
          </div>
          <div className="mb-5">
            <label htmlFor="email">
              이메일 <span className="text-sm text-red-500">필수</span>
            </label>
            <input
              className="mr-5 ml-3 rounded-md border border-solid p-1"
              type="email"
              id="email"
              placeholder="user@user.com"
              {...register("email")}
            />
            <button
              className="rounded-md bg-blue-500 py-1 px-2 text-white"
              type="button"
              onClick={handleGetCodeBtn}
            >
              인증받기
            </button>
            <p className="mt-2 text-sm text-rose-500">
              {errors.email?.message}
            </p>
          </div>
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
          className="rounded-md bg-blue-500 py-3 px-5 text-white"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          다음
        </button>
      </section>
    </div>
  );
};
export default ApplicantAuth;
