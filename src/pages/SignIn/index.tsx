import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SignIn = () => {
  // 비밀번호 유효성 검사
  const pwRegex =
    /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/;
  // 휴대폰 번호 유효성 검사 정규표현식
  const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;

  const userSchema = z.object({
    useremail: z
      .string()
      .email({ message: "유효하지 않은 이메일 주소입니다." }),
    password: z.string().regex(pwRegex, {
      message:
        "8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합을 사용하세요.",
    }),
    username: z.string().optional(),
  });

  type User = z.infer<typeof userSchema>;

  const user = { useremail: "hran9404@naver.com", password: "dlgpfks1234" };
  console.log(userSchema.safeParse(user));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  console.log(watch("useremail"));

  return (
    <div className="container">
      <div className="logo">logo</div>
      <div className="wrapper">
        <p>로그인</p>
        <form className="flex w-64 flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="border border-solid border-black">
            <span>EMAIL</span>
            <input {...register("useremail", { required: true })} />
          </div>
          {/* 오류 메세지 띄우기 */}
          {errors?.useremail?.message}
          <input
            placeholder="PW"
            className="border border-solid border-black"
            {...register("password", { required: true })}
          />
          {/* 오류 메세지 띄우기 */}
          {errors?.useremail?.message}
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
export default SignIn;
