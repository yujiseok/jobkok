import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { postSignIn } from "@/api/auth";
import { useAppDispatch } from "@/app/hooks";
import { ReactComponent as Bluelogo } from "@/assets/svg/blue-logo.svg";
import { ReactComponent as Eyeclose } from "@/assets/svg/eye-close.svg";
import { ReactComponent as Eyeopen } from "@/assets/svg/eye-open.svg";
import { ReactComponent as Xicon } from "@/assets/svg/x-icon.svg";
import { PW_REGEX } from "@/constants/signup";
import { signIn } from "@/features/authSlice";

export interface IShowPw {
  type: "password" | "text";
  visible: boolean;
}

// schema 유효성 검사
export const userSchema = z.object({
  useremail: z
    .string()
    .min(1, "이메일을 입력해 주세요.")
    .email("이메일 주소를 확인해 주세요."),
  password: z
    .string()
    .min(1, "비밀번호는 8자 이상 20자 이하로 입력해 주세요.")
    .max(20, "비밀번호는 8자 이상 20자 이하로 입력해 주세요.")
    .regex(PW_REGEX, "8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합"),
});

export type User = z.infer<typeof userSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["rememberEmail"]);
  const [isRemember, setIsRemember] = useState(false);
  const [IsFail, setIsFail] = useState(false);
  const [showPw, setShowPw] = useState<IShowPw>({
    type: "password",
    visible: false,
  });

  const dispatch = useAppDispatch();

  // 새로고침 했을때 저장된 이메일 값 보여주기
  useEffect(() => {
    if (cookies.rememberEmail !== undefined) {
      setValue("useremail", cookies.rememberEmail);
      setIsRemember(true);
    }
  }, []);

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

  // 이메일 값 쿠키 저장
  const handleChange = (e: any) => {
    setIsRemember(e.target.checked);
    const value = getValues("useremail");
    if (e.target.checked) {
      setCookie("rememberEmail", value, { maxAge: 2000 });
    } else {
      removeCookie("rememberEmail");
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    mode: "onChange",
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: User) => {
    const res = await postSignIn(data.useremail, data.password);
    if (res.state === 200) {
      navigate("/");
      dispatch(signIn(res.data));
    } else {
      setIsFail(true);
    }
  };

  return (
    <div className="flex h-screen justify-center p-16">
      <div className="w-[430px]">
        <div>
          <Bluelogo className="mb-[52px]" />
          <p className="Head2Semibold mb-2 text-title-gray">로그인</p>
          <p className="SubHead1Medium mb-12 text-gray-600">
            잡콕에 다시 오신 걸 환영해요
          </p>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="email"
              className="Caption1Medium mb-1 text-gray-300"
            >
              이메일
            </label>
            <div className="mb-6">
              <div
                className={`flex h-[51px] w-[430px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                  errors.useremail || IsFail
                    ? "border-error-400"
                    : "border-gray-100 focus-within:border-blue-400"
                }`}
              >
                {/* 이메일 입력칸 */}
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
              {/* 오류 메세지 띄우기 */}
              <span className="Caption1Medium text-error-400">
                {errors?.useremail?.message}
              </span>
            </div>

            {/* 패스워드 입력칸 */}
            <label
              htmlFor="password"
              className="Caption1Medium mb-1 text-gray-300"
            >
              비밀번호
            </label>
            <div
              className={`flex h-[51px] w-[430px] items-center rounded-lg border border-solid bg-gray-0 px-6 after:text-gray-300 ${
                errors.password || IsFail
                  ? "border-error-400"
                  : "border-gray-100 focus-within:border-blue-400"
              }`}
            >
              <input
                id="password"
                type={showPw.type}
                placeholder="비밀번호를 입력해 주세요"
                className="SubHead1Medium w-[365px] outline-none"
                maxLength={20}
                {...register("password", { required: true })}
              />
              <button className="ml-auto" onClick={handleToggle}>
                {getValues("password") ? (
                  showPw.visible ? (
                    <Eyeopen />
                  ) : (
                    <Eyeclose />
                  )
                ) : null}
              </button>
            </div>
            {/* 오류 메세지 띄우기 */}
            <span className="Caption1Medium text-error-400">
              {errors?.password?.message}
            </span>
            {IsFail && (
              <span className="Caption1Medium text-error-400">
                아이디 또는 비밀번호가 다릅니다.
              </span>
            )}
            <div className="mt-4 mb-20 flex justify-between">
              <div>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={isRemember}
                />
                <span className="SubHead1Medium ml-1.5 text-gray-400">
                  아이디 저장
                </span>
              </div>
              <Link
                to="/find-user-info"
                className="SubHead1Medium mx-2 text-blue-400"
              >
                비밀번호를 잊어버렸나요? {">"}
              </Link>
            </div>
            <button
              className={`SubHead1Semibold my-5 h-[48px] w-[430px] self-center rounded-lg text-gray-0 ${
                getValues("useremail") && getValues("password")
                  ? errors.useremail || errors.password
                    ? "bg-gray-200"
                    : "bg-blue-500"
                  : "bg-gray-200"
              }`}
              type="submit"
              disabled={isSubmitting && IsFail}
            >
              로그인하기
            </button>
          </form>
          <div className="SubHead2Medium flex justify-center">
            <p className="text-gray-600">잡콕에 처음 오셨다면</p>
            <Link to="/sign-up" className="mx-2 text-blue-400">
              회원가입하기 {">"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
