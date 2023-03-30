import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { ShowPw } from "@pages/SignIn";

// 비밀번호 유효성 검사 정규표현식
const PW_REGEX =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/;

// 휴대폰 번호 유효성 검사 정규표현식
const PHONE_REGEX = /^\d{3}-\d{3,4}-\d{4}$/;

// 사업자 등록 번호 정규 표현식
const REGISTRATION_REGEX = /^\d{3}-\d{2}-\d{5}$/;

// schema 유효성 검사
const schema = z
  .object({
    useremail: z
      .string()
      .min(1, "이메일을 입력해 주세요.")
      .email("올바른 이메일 형식을 입력해 주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상 20자 이하로 입력해 주세요.")
      .regex(PW_REGEX, "올바른 비밀번호 형식을 입력해 주세요."),
    confirmPassword: z
      .string()
      .min(8, "비밀번호는 8자 이상 20자 이하로 입력해 주세요.")
      .regex(PW_REGEX, "올바른 비밀번호 형식을 입력해 주세요."),
    phone: z
      .string()
      .regex(PHONE_REGEX, "올바른 전화번호 형식을 입력해 주세요."),
    registration: z
      .string()
      .regex(REGISTRATION_REGEX, "올바른 사업자 등록 번호를 입력해 주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type NewUser = z.infer<typeof schema>;

const SignUp = () => {
  const [showPw, setShowPw] = useState<ShowPw>({
    type: "password",
    visible: false,
  });
  const [phoneValue, setPhoneValue] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");

  // 비밀번호 보이기 설정
  const handleToggle = (e: any) => {
    e.preventDefault();
    setShowPw(() => {
      if (!showPw.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  // 이메일 중복 확인
  const handleConfirmEmail = (e: any) => {
    e.preventDefault();
    // 이미 가입된 이메일일경우 처리 예정
  };

  // 핸드폰 번호 입력값 확인
  const handlePhoneChange = (e: any) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhoneValue(e.target.value);
    }
  };

  // 사업자 등록 번호 입력값 확인
  const handleCompanyNumberChange = (e: any) => {
    const regex = /^[0-9\b -]{0,11}$/;
    if (regex.test(e.target.value)) {
      setCompanyNumber(e.target.value);
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

  // 사업자 등록 번호 하이픈 자동 생성
  useEffect(() => {
    if (companyNumber.length === 10) {
      setCompanyNumber(
        companyNumber.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3"),
      );
    }
  }, [companyNumber]);

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
    <div className="container flex flex-col items-center">
      <div className="logo">logo</div>
      <div className="wrapper">
        <p className="font-semibold">회원가입</p>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-9">이메일</div>
          <div className="flex">
            <div className="mt-3 flex h-10 flex-grow items-center border border-solid border-black">
              {/* 이메일 입력칸 */}
              <label className="px-2">Email</label>
              <input
                className="outline-none"
                {...register("useremail")}
                required={true}
              />
              <button
                className="ml-auto px-5"
                onClick={(e) => {
                  e.preventDefault();
                  setValue("useremail", "");
                }}
              >
                x
              </button>
            </div>
            <div className="mt-3 ml-4 flex h-10 items-center border border-solid border-black px-4">
              <button onClick={handleConfirmEmail}>중복체크</button>
            </div>
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="text-red-600">{errors?.useremail?.message}</span>
          {/* 패스워드 입력칸 */}
          <span className="mt-9">비밀번호 설정</span>
          <div className="mt-3 flex h-10 items-center border border-solid border-black">
            <label className="px-2">PW</label>
            <input
              type={showPw.type}
              maxLength={20}
              className="outline-none"
              {...register("password")}
              required={true}
            />
            <button className="ml-auto px-5" onClick={handleToggle}>
              {showPw.visible ? <span>눈감기</span> : <span>눈뜨기</span>}
            </button>
          </div>
          <span>8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합</span>
          {/* 패스워드 확인 입력칸 */}
          <div className="mt-3 flex h-10 items-center border border-solid border-black">
            <label className="px-2">PW 확인</label>
            <input
              type={showPw.type}
              maxLength={20}
              className="outline-none"
              {...register("confirmPassword")}
              required={true}
            />
            <button className="ml-auto px-5" onClick={handleToggle}>
              {showPw.visible ? <span>눈감기</span> : <span>눈뜨기</span>}
            </button>
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="text-red-600">
            {errors?.confirmPassword?.message}
          </span>
          {/* 휴대전화 정보 입력 칸 */}
          <span className="mt-9">휴대전화 정보</span>
          <div className="mt-3 flex h-10 items-center border border-solid border-black">
            <label className="px-2">전화번호</label>
            <input
              className="outline-none"
              value={phoneValue}
              {...register("phone")}
              onChange={handlePhoneChange}
              required={true}
            />
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="text-red-600">{errors?.phone?.message}</span>
          {/* 회사 정보 입력 칸 */}
          <div className="mt-9 flex">
            <div className="mr-2">
              <div>회사명</div>
              <div className="mt-2 flex h-10 items-center border border-solid border-black">
                <label className="px-2">회사명</label>
                <input type="text" required={true} className="outline-none" />
              </div>
            </div>
            <div>
              <div>대표자명</div>
              <div className="mt-2 flex h-10 items-center border border-solid border-black">
                <label className="px-2">대표자명</label>
                <input type="text" required={true} className="outline-none" />
              </div>
            </div>
          </div>
          <span className="mt-5">사업자 등록 번호</span>
          <div className="mt-3 flex h-10 items-center border border-solid border-black">
            <label className="px-2">사업자 등록 번호</label>
            <input
              className="outline-none"
              value={companyNumber}
              {...register("registration")}
              onChange={handleCompanyNumberChange}
              required={true}
            />
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="text-red-600">{errors?.registration?.message}</span>
          <button
            className="my-5 h-10 w-36 self-center border border-solid border-black"
            type="submit"
            disabled={isSubmitting}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
