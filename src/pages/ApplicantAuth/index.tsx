import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import GetFormInfo from "@pages/ApplicantAuth/getFormInfo";
// import { applicantSubmit, emailAuth, submitApply } from "@/api/applicant";

interface IAuthForm {
  name: string;
  tel: string;
  email: string;
  number: number;
}

const ApplicantAuth = () => {
  const navigate = useNavigate();
  const [isToggled, setToggle] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAuthForm>({ mode: "onChange" });

  // 인증받기 버튼
  const handleGetCodeBtn = () => {
    // 이메일 값 없으면 확인창
    if (watch().email === "") {
      confirm("이메일을 입력해주세요");
    } else {
      setToggle(!isToggled);
      confirm("이메일이 전송됐습니다. 메일함을 확인해주세요.");
      // 이메일 인증 API
    }
  };

  // 인증완료 버튼
  const handelConfirmCode = () => {
    // if (이메일 인증 api 반환값이 성공) 이면
    setToggle(!isToggled);
    // 실패면
    // confirm("올바른 인증코드를 입력해주세요")
  };

  // 폼 제출
  const onSubmit = (data: IAuthForm) => {
    console.log(data);
  };

  //지원서 작성 버튼 클릭시
  const handleSubmitBtn = () => {
    navigate("/applicant/application");
    // 이메일 중복확인 api
  };

  return (
    <div className="mx-auto flex-col content-center">
      <GetFormInfo />
      <section>
        <h2 className="text-l mb-5 font-bold">지원자 기본 정보</h2>
        <form className="flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">이름(필수)</label>
            <input
              className="ml-3 border-2 border-solid border-gray-600"
              type="text"
              id="name"
              placeholder="이름을 입력해주세요"
              {...register("name", {
                required: {
                  value: true,
                  message: "이름을 입력해주세요.",
                },
                minLength: {
                  value: 2,
                  message: "이름을 2자 이상 20자 이내로 입력해주세요.",
                },
                maxLength: {
                  value: 15,
                  message: "이름을 2자 이상 20자 이내로 입력해주세요.",
                },
                pattern: {
                  value: /^[ㄱ-ㅎ가-힣a-zA-Z]+$/,
                  message: "특수문자, 숫자, 공백은 입력 불가합니다.",
                },
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="tel">전화번호(필수)</label>
            <input
              className="ml-3 border-2 border-solid border-gray-600"
              type="tel"
              id="tel"
              placeholder="010-1234-5678"
              {...register("tel", {
                required: {
                  value: true,
                  message: "전화번호를 입력해주세요.",
                },
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: "010-0000-0000 형식으로 입력해주세요",
                },
              })}
            />
            {errors.tel && <p>{errors.tel.message}</p>}
          </div>
          <div>
            <label htmlFor="email">이메일(필수)</label>
            <input
              className="ml-3 border-2 border-solid border-gray-600"
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요."
              {...register("email", {
                required: {
                  value: true,
                  message: "이메일을 입력해주세요.",
                },
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "올바른 이메일을 입력해주세요",
                },
              })}
            />
            <button
              type="button"
              onClick={handleGetCodeBtn}
              className="bg-slate-300"
            >
              인증받기
            </button>
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          {isToggled ? (
            <>
              <label>인증번호</label>
              <input
                type="text"
                maxLength={6}
                placeholder="인증번호를 입력해주세요."
                {...register("number", {
                  required: {
                    value: true,
                    message: "숫자 6자리를 입력해주세요",
                  },
                  minLength: {
                    value: 6,
                    message: "숫자 6자리를 입력해주세요",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "숫자 6자리를 입력해주세요",
                  },
                })}
              />
              {errors.number && <p>{errors.number.message}</p>}
              <button type="button" onClick={handelConfirmCode}>
                완료
              </button>
            </>
          ) : null}
          <input
            type="submit"
            className="bg-slate-300"
            value="지원서 작성"
            disabled={isSubmitting}
          />
        </form>
      </section>
    </div>
  );
};
export default ApplicantAuth;
