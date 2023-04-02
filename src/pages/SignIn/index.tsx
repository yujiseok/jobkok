import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import { ReactComponent as Bluelogo } from "@/assets/svg/blue-logo.svg";
import { ReactComponent as Whitelogo } from "@/assets/svg/white-logo.svg";
import { ReactComponent as Xicon } from "@/assets/svg/x-icon.svg";
import { PW_REGEX } from "@/constants/signup";

export interface IShowPw {
  type: "password" | "text";
  visible: boolean;
}

// schema 유효성 검사
const userSchema = z.object({
  useremail: z
    .string()
    .min(1, "이메일을 입력해 주세요.")
    .email("이메일 주소를 확인해 주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상 20자 이하로 입력해 주세요.")
    .max(20, "비밀번호는 8자 이상 20자 이하로 입력해 주세요.")
    .regex(PW_REGEX, "8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합"),
});

export type User = z.infer<typeof userSchema>;

const SignIn = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["rememberEmail"]);
  const [isRemember, setIsRemember] = useState(false);
  const [showPw, setShowPw] = useState<IShowPw>({
    type: "password",
    visible: false,
  });

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
  const onSubmit = (data: User) => {
    // 로그인 api 수정 예정
    console.log(data);
  };

  return (
    <div className="flex h-screen bg-gray-0">
      <div className="container flex w-3/5 justify-center py-[68px] px-[195px]">
        <div>
          <Bluelogo className="mb-[52px]" />
          <p className="Head2Semibold mb-2 text-title-gray">로그인</p>
          <p className="SubHead1Medium mb-12 text-gray-600">
            잡콕에 다시 오신 걸 환영해요
          </p>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label className="Caption1Medium mb-1 text-gray-300">아이디</label>
            <div className="mb-6">
              <div className="flex h-[51px] w-[430px] items-center rounded-lg border border-solid border-gray-100 bg-gray-0 px-6 after:text-gray-300 focus-within:border-blue-400">
                {/* 이메일 입력칸 */}
                <input
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
                  <Xicon />
                </button>
              </div>
              {/* 오류 메세지 띄우기 */}
              <span className="text-red-600">{errors?.useremail?.message}</span>
            </div>

            {/* 패스워드 입력칸 */}
            <label className="Caption1Medium mb-1 text-gray-300">
              비밀번호
            </label>
            <div className="flex h-[51px] w-[430px] items-center rounded-lg border border-solid border-gray-100 bg-gray-0 px-6 after:text-gray-300 focus-within:border-blue-400">
              <input
                type={showPw.type}
                placeholder="비밀번호를 입력해 주세요"
                className="SubHead1Medium w-[365px] outline-none"
                maxLength={20}
                {...register("password", { required: true })}
              />
              <button className="ml-auto" onClick={handleToggle}>
                {showPw.visible ? <span>눈감기</span> : <span>눈뜨기</span>}
              </button>
            </div>
            {/* 오류 메세지 띄우기 */}
            <span className="text-red-600">{errors?.password?.message}</span>
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
                className="SubHead2Medium mx-2 text-blue-400"
              >
                비밀번호를 잊어버렸나요? {">"}
              </Link>
            </div>
            <button
              className="SubHead1Semibold my-5 h-[48px] w-[430px] self-center rounded-lg bg-gray-200 text-gray-0"
              type="submit"
              disabled={isSubmitting}
            >
              로그인하기
            </button>
          </form>
          <div className="SubHead2Medium flex justify-center">
            <p className="text-gray-600">처음 오셨다면</p>
            <Link to="/sign-up" className="mx-2 text-blue-400">
              회원가입하기 {">"}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center bg-blue-500">
        <p className="Head4Medium mb-12 text-gray-0">
          인재는 두배로, 채용 시간은 절반으로
        </p>
        <Whitelogo />
      </div>
    </div>
  );
};
export default SignIn;
