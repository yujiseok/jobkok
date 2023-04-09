import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ReactComponent as IconArrow } from "@/assets/svg/chevron-down-lightgray.svg";
import { ReactComponent as IconCompany } from "@/assets/svg/company.svg";
import { ReactComponent as IconOwner } from "@/assets/svg/owner.svg";
import { ReactComponent as IconPersonalCard } from "@/assets/svg/personalcard.svg";
import { ReactComponent as IconSms } from "@/assets/svg/sms.svg";
import { PHONE_REGEX, PW_REGEX } from "@/constants/signup";
import Box from "@components/ChangeUser/Box";
import Description from "@components/ChangeUser/Description";
import DescriptionList from "@components/ChangeUser/DescriptionList";
import Icon from "@components/ChangeUser/Icon";
import InfoList from "@components/ChangeUser/InfoList";
import Term from "@components/ChangeUser/Term";

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
  const [isChangeTel, setIsChangeTel] = useState(true);
  const [isChangePassword, setIsChangePassword] = useState(true);

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
    setIsChangeTel(false);
  };

  // 비밀번호 변경 및 취소 버튼
  const handleChangePasswordBtn = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsChangePassword((prev) => !prev);
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
      setIsChangeTel(true);
    } else if (data.confirmPassword) {
      setIsChangePassword(true);
    }
  };

  return (
    <div>
      <div className="mx-0 mt-[80px] mb-[108px] flex h-[257px] flex-col items-center justify-center bg-blue-400 text-center ">
        <h2 className="Head2Semibold mb-[6px] text-gray-0">기업정보변경</h2>
        <p className="Head4Semibold text-gray-0">
          계정 재설정 및 계정 삭제를 진행할 수 있습니다.
        </p>
      </div>
      <section className="relative flex gap-6 bg-blue-25 px-16">
        <Box className="w-[346px]">
          <strong className="mb-8 h-[282px] w-[282px] rounded-2xl bg-blue-100">
            <span className="sr-only">잡콕미술학원 이미지</span>
          </strong>
          <h3 className="Head4Semibold mb-6">기업정보</h3>
          <ul className="flex flex-col gap-6">
            <InfoList>
              <Icon>
                <IconCompany />
              </Icon>
              <DescriptionList>
                <Term>기업명</Term>
                <Description>잡콕미술학원</Description>
              </DescriptionList>
            </InfoList>
            <InfoList>
              <Icon>
                <IconOwner />
              </Icon>
              <DescriptionList>
                <Term>대표명</Term>
                <Description>이현서</Description>
              </DescriptionList>
            </InfoList>
            <InfoList>
              <Icon>
                <IconSms />
              </Icon>
              <DescriptionList>
                <Term>이메일</Term>
                <Description>jobkokart@art.net</Description>
              </DescriptionList>
            </InfoList>
            <InfoList>
              <Icon>
                <IconPersonalCard />
              </Icon>
              <DescriptionList>
                <Term>사업자 등록번호</Term>
                <Description>333-24-56839</Description>
              </DescriptionList>
            </InfoList>
          </ul>
        </Box>
        <Box className="w-[782px]">
          <h3 className="Head4Semibold mb-14">잡콕 계정 정보</h3>
          <ul className="flex flex-col gap-9">
            <li className="flex items-center gap-3">
              <span>전화번호</span>
              {isChangeTel ? (
                <div className="flex items-center gap-3">
                  <p>010-1234-5678</p>
                  <button
                    className="SubHead1Semibold flex h-11 w-[133px] items-center justify-center rounded-lg bg-blue-50 py-2.5 px-6 text-blue-400"
                    type="button"
                    onClick={handleChangeTelBtn}
                  >
                    전화번호 변경
                  </button>
                </div>
              ) : (
                <div>
                  <form
                    className="flex items-center gap-3"
                    onClick={handleSubmit(onSubmit)}
                  >
                    <input
                      className="relative"
                      type="tel"
                      placeholder="010-1234-5678"
                      {...register("phone")}
                    />
                    <button
                      className="SubHead1Semibold flex h-11 w-[133px] items-center justify-center rounded-lg bg-blue-50 py-2.5 px-6 text-blue-400"
                      type="submit"
                      onSubmit={handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                    >
                      변경완료
                    </button>
                  </form>
                  <p className="absolute mt-2 text-sm text-rose-500">
                    {errors.phone?.message}
                  </p>
                </div>
              )}
            </li>
            <li>
              {isChangePassword ? (
                <>
                  <span>비밀번호</span>
                  <div className="flex items-center gap-3">
                    <p>********</p>
                    <button
                      className="SubHead1Semibold flex h-11 w-[133px] items-center justify-center rounded-lg bg-blue-50 py-2.5 px-6 text-blue-400"
                      type="button"
                      onClick={handleChangePasswordBtn}
                    >
                      비밀번호 변경
                    </button>
                  </div>
                </>
              ) : (
                <form onClick={handleSubmit(onSubmit)}>
                  <span>비밀번호</span>
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
                      className="SubHead1Semibold flex h-11 w-[133px] items-center justify-center rounded-lg bg-blue-50 py-2.5 px-6 text-blue-400"
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                    >
                      완료
                    </button>
                    <button
                      className="SubHead1Semibold flex h-11 w-[133px] items-center justify-center rounded-lg bg-blue-50 py-2.5 px-6 text-blue-400"
                      type="button"
                      onClick={handleChangePasswordBtn}
                    >
                      취소
                    </button>
                  </div>
                </form>
              )}
            </li>
          </ul>
        </Box>
        <button
          className="SubHead1Medium absolute right-0 bottom-[-60px] flex items-center px-16 text-gray-400"
          type="button"
          onClick={handleDelUserBtn}
        >
          계정삭제하기
          <IconArrow className="ml-1 rotate-[270deg]" />
        </button>
      </section>
    </div>
  );
};
export default ChangeUserInfo;
