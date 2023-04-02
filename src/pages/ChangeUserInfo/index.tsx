import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PHONE_REGEX, PW_REGEX } from "@/constants/signup";

const schema = z
  .object({
    phone: z
      .string()
      .regex(PHONE_REGEX, "올바른 전화번호 형식을 입력해 주세요.")
      .optional(),
    password: z
      .string()
      .min(8, "8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합")
      .max(20, "8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합")
      .regex(PW_REGEX, "8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합")
      .optional(),
    confirmPassword: z
      .string()
      .min(8, "비밀번호가 일치하지 않습니다.")
      .max(20, "비밀번호가 일치하지 않습니다.")
      .regex(PW_REGEX, "비밀번호가 일치하지 않습니다.")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type ChangeUser = z.infer<typeof schema>;

const ChangeUserInfo = () => {
  const [changeTel, setChangeTel] = useState(true);
  const [changePassword, setChangePassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangeUser>({
    resolver: zodResolver(schema),
  });

  // 전화번호 변경
  const handleChangeTelBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setChangeTel(false);
  };

  // 비밀번호 변경 및 취소 버튼
  const handleChangePasswordBtn = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setChangePassword((prev) => !prev);
  };

  // 계정삭제 버튼
  const handleDelUserBtn = () => {
    if (
      confirm(
        "계정을 삭제하시겠습니까? 신중히 고민해주세요! 되돌릴 수 없습니다. (기획중...)",
      )
    )
      console.log("계정삭제 api 호출 + 로그아웃");
  };

  // 폼 제출
  const onSubmit = (data: ChangeUser) => {
    console.log(data.confirmPassword);
    if (data.phone) {
      setChangeTel(true);
    } else if (data.confirmPassword) {
      setChangePassword(true);
    }
  };

  return (
    <div>
      <div>
        <h2>기업정보변경</h2>
        <p>계정 재설정 및 계정 삭제를 진행할 수 있습니다.</p>
      </div>
      <section>
        <h3>기업정보</h3>
        <dl>
          <div>
            <dt className="sr-only">잡콕미술학원 이미지</dt>
            <dd>
              <img src="#" />
            </dd>
          </div>
          <div>
            <dt>잡콕미술학원</dt>
            <dd>기업명</dd>
          </div>
          <div>
            <dt>이현서</dt>
            <dd>대표명</dd>
          </div>
          <div>
            <dt>jobkokart@art.net</dt>
            <dd>이메일</dd>
          </div>
          <div>
            <dt>333-24-56839</dt>
            <dd>사업자 등록번호</dd>
          </div>
        </dl>
      </section>
      <section>
        <h3>기업정보변경</h3>
        <div>
          {changeTel ? (
            <>
              <span>전화번호</span>
              <p>010-1234-5678</p>
              <button type="button" onClick={handleChangeTelBtn}>
                전화번호 변경
              </button>
            </>
          ) : (
            <form onClick={handleSubmit(onSubmit)}>
              <label htmlFor="tel">전화번호</label>
              <input
                type="tel"
                id="tel"
                placeholder="010-1234-5678"
                {...register("phone")}
              />
              <p className="mt-2 text-sm text-rose-500">
                {errors.phone?.message}
              </p>
              <button
                type="submit"
                onSubmit={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                변경완료
              </button>
            </form>
          )}
        </div>
        <div>
          {changePassword ? (
            <>
              <span>비밀번호</span>
              <p>********</p>
              <button type="button" onClick={handleChangePasswordBtn}>
                비밀번호 변경
              </button>
            </>
          ) : (
            <form onClick={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="newPassword">새 비밀번호</label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합"
                  {...register("password")}
                />
                <p className="mt-2 text-sm text-rose-500">
                  {errors.password?.message}
                </p>
                {/* 눈뜨기 */}
              </div>
              <div>
                <label htmlFor="confirmPassword">새 비밀번호 확인</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합"
                  {...register("confirmPassword")}
                />
                <p className="mt-2 text-sm text-rose-500">
                  {errors.confirmPassword?.message}
                </p>
                {/* 눈뜨기 */}
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  완료
                </button>
                <button type="button" onClick={handleChangePasswordBtn}>
                  취소
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
      <button type="button" onClick={handleDelUserBtn}>
        계정삭제
      </button>
    </div>
  );
};
export default ChangeUserInfo;
