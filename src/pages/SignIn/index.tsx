import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

interface ShowPw {
  type: "password" | "text";
  visible: boolean;
}

const SignIn = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["rememberEmail"]);
  const [isRemember, setIsRemember] = useState(false);
  const [showPw, setShowPw] = useState<ShowPw>({
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

  // schema 유효성 검사
  const userSchema = z.object({
    useremail: z
      .string()
      .min(1, "이메일을 입력해 주세요.")
      .email("이메일 주소를 확인해 주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상 20자 이하로 입력해 주세요.")
      .max(20, "비밀번호는 8자 이상 20자 이하로 입력해 주세요."),
  });

  type User = z.infer<typeof userSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = (data: User) => {
    // 로그인 api 수정 예정
    console.log(data);
  };

  return (
    <div className="container flex flex-col items-center">
      <div className="logo">logo</div>
      <div className="wrapper">
        <p>로그인</p>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3 flex h-10 w-80 items-center border border-solid border-black">
            {/* 이메일 입력칸 */}
            <span className="px-2">Email</span>
            <input
              className="outline-none"
              {...register("useremail", {
                required: true,
              })}
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
          {/* 오류 메세지 띄우기 */}
          <span className="text-red-600">{errors?.useremail?.message}</span>
          {/* 패스워드 입력칸 */}
          <div className="mt-3 flex h-10 w-80 items-center border border-solid border-black">
            <span className="px-2">PW</span>
            <input
              type={showPw.type}
              maxLength={20}
              className="outline-none"
              {...register("password", { required: true })}
            />
            <button className="ml-auto px-5" onClick={handleToggle}>
              {showPw.visible ? <span>눈감기</span> : <span>눈뜨기</span>}
            </button>
          </div>
          {/* 오류 메세지 띄우기 */}
          <span className="text-red-600">{errors?.password?.message}</span>
          <div className="mt-3">
            <input
              type="checkbox"
              onChange={handleChange}
              checked={isRemember}
            />
            <span className="ml-1.5">아이디 저장하기</span>
          </div>
          <button
            className="my-5 h-10 w-36 self-center border border-solid border-black"
            type="submit"
            disabled={isSubmitting}
            value="로그인"
          />
        </form>
        <div className="flex justify-center">
          <Link to="/sign-up" className="mx-2">
            회원가입
          </Link>
          <Link to="/find-user-info" className="mx-2">
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
