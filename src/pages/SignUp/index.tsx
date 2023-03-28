const SignUp = () => {
  return <div>SignUp</div>;
};
export default SignUp;

// 휴대폰 번호 유효성 검사 정규표현식
// const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;

// 비밀번호 유효성 검사 정규표현식
// const pwRegex =
//   /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/;

// const userSchema = z.object({
//   useremail: z
//     .string()
//     .email({ message: "유효하지 않은 이메일 주소입니다." }),
//   password: z.string().regex(pwRegex, {
//     message:
//       "8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합을 사용하세요.",
//   }),
// });
