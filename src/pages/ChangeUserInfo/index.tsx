import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAppSelector } from "@/app/hooks";
import { ReactComponent as IconArrow } from "@/assets/svg/chevron-down-lightgray.svg";
import { ReactComponent as IconCompany } from "@/assets/svg/company.svg";
import { ReactComponent as IconOwner } from "@/assets/svg/owner.svg";
import { ReactComponent as IconPersonalCard } from "@/assets/svg/personalcard.svg";
import { ReactComponent as IconProfileHeart } from "@/assets/svg/profile-heart.svg";
import { ReactComponent as IconSms } from "@/assets/svg/sms.svg";
import { PHONE_REGEX, PW_REGEX } from "@/constants/signup";
import Box from "@components/ChangeUser/Box";
import Description from "@components/ChangeUser/Description";
import DescriptionList from "@components/ChangeUser/DescriptionList";
import Icon from "@components/ChangeUser/Icon";
import InfoList from "@components/ChangeUser/InfoList";
import Term from "@components/ChangeUser/Term";
import Banner from "@components/Common/Banner";

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
  const { auth } = useAppSelector((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangeUser>({
    resolver: zodResolver(schema),
  });

  // 전화번호 변경 버튼
  const handleChangeTelBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsChangeTel((prev) => !prev);
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
        "계정을 삭제하시겠습니까? 신중히 고민해주세요!\n저장된 기업과 지원자 정보가 모두 사라집니다.",
      )
    )
      console.log("계정삭제 api 호출 + 로그아웃");
  };

  // 폼 제출
  const onSubmit = (data: ChangeUser) => {
    if (data.phone) {
      setIsChangeTel(true);
    } else if (data.confirmPassword) {
      setIsChangePassword(true);
    }
  };

  //  className="mx-0 mt-[80px] mb-[108px] flex h-[257px] flex-col   bg-blue-400

  return (
    <div>
      <Banner className="flex h-[25rem] flex-col text-center">
        <h2 className="Head2Semibold mt-[60px] mb-[6px] text-gray-0">
          기업정보변경
        </h2>
        <p className="Head4Semibold text-gray-0">
          계정 재설정 및 계정 삭제를 진행할 수 있습니다.
        </p>
      </Banner>
      <div className="bg-glue-25 h-[710px] w-full pt-[400px]"></div>
      <section className="absolute top-[320px] flex gap-6 px-16">
        <Box className="w-[346px]">
          <strong className="mb-8 h-[282px] w-[282px] rounded-2xl bg-blue-50">
            <span className="sr-only">잡콕미술학원 이미지</span>
            <IconProfileHeart />
          </strong>
          <h3 className="Head4Semibold mb-6">기업정보</h3>
          <ul className="flex flex-col gap-6">
            <InfoList>
              <Icon>
                <IconCompany />
              </Icon>
              <DescriptionList>
                <Term>기업명</Term>
                <Description>{auth.companyName}</Description>
              </DescriptionList>
            </InfoList>
            <InfoList>
              <Icon>
                <IconOwner />
              </Icon>
              <DescriptionList>
                <Term>대표명</Term>
                <Description>{auth.ceoName}</Description>
              </DescriptionList>
            </InfoList>
            <InfoList>
              <Icon>
                <IconSms />
              </Icon>
              <DescriptionList>
                <Term>이메일</Term>
                <Description>{auth.memberEmail}</Description>
              </DescriptionList>
            </InfoList>
            <InfoList>
              <Icon>
                <IconPersonalCard />
              </Icon>
              <DescriptionList>
                <Term>사업자 등록번호</Term>
                <Description>{auth.companyNum}</Description>
              </DescriptionList>
            </InfoList>
          </ul>
        </Box>
        <Box className="relative w-[782px]">
          <h3 className="Head4Semibold mb-[55px]">잡콕 계정 정보</h3>
          <ul className="flex flex-col gap-10">
            <li className="flex flex-col gap-1">
              <span className="Caption1Medium text-gray-300">전화번호</span>
              {isChangeTel ? (
                <div className="SubHead1Medium flex items-center justify-between gap-6 text-gray-800">
                  <p className="pl-6">{auth.memberPhone}</p>
                  <button
                    className="SubHead1Semibold flex h-[52px] w-[160px] items-center justify-center rounded-lg bg-blue-50 py-2.5 px-6 text-blue-400"
                    type="button"
                    onClick={() => setIsChangeTel((prev) => !prev)}
                  >
                    전화번호 변경
                  </button>
                </div>
              ) : (
                <form
                  className="SubHead1Medium flex items-center justify-between gap-6  text-gray-800"
                  onClick={handleSubmit(onSubmit)}
                >
                  <input
                    className="w-[534px] rounded-lg border border-gray-100 bg-gray-0 px-6 py-4 focus:outline-none"
                    type="tel"
                    placeholder="010-1234-5678"
                    {...register("phone")}
                  />
                  <button
                    className="SubHead1Semibold flex h-[52px] w-[160px] items-center justify-center rounded-lg bg-blue-50 py-2.5 px-6 text-blue-400"
                    type="submit"
                    onSubmit={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                  >
                    변경완료
                  </button>
                </form>
              )}
            </li>
            <li>
              {isChangePassword ? (
                <>
                  <span className="Caption1Medium text-gray-300">비밀번호</span>
                  <div className="flex items-center justify-between gap-3">
                    <p className="pl-6">*****************</p>
                    <button
                      className="SubHead1Semibold flex h-[52px] w-[160px]  items-center justify-center rounded-lg bg-blue-50 py-2.5 px-6 text-blue-400"
                      type="button"
                      onClick={handleChangePasswordBtn}
                    >
                      비밀번호 변경
                    </button>
                  </div>
                </>
              ) : (
                <form onClick={handleSubmit(onSubmit)}>
                  <div className="mb-[17px] flex flex-col gap-1">
                    <label
                      className="Caption1Medium text-gray-300"
                      htmlFor="newPassword"
                    >
                      새 비밀번호
                    </label>
                    <div className="flex gap-6">
                      <div>
                        <input
                          className="mb-2 w-[534px] rounded-lg border border-gray-100 bg-gray-0 px-6 py-4 focus:outline-none"
                          type="password"
                          id="newPassword"
                          placeholder="새 비밀번호를 입력해주세요"
                          {...register("password")}
                        />
                        <p className="Caption1Medium text-gray-300">
                          8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          className="SubHead1Semibold flex h-[52px] w-[74px] items-center justify-center rounded-lg bg-blue-50 py-2.5 text-blue-400"
                          type="submit"
                          onClick={handleSubmit(onSubmit)}
                          disabled={isSubmitting}
                        >
                          완료
                        </button>
                        <button
                          className="SubHead1Semibold flex h-[52px] w-[74px] items-center justify-center rounded-lg bg-error-50 py-2.5 text-error-400"
                          type="button"
                          onClick={handleChangePasswordBtn}
                        >
                          취소
                        </button>
                      </div>
                      {/* 눈뜨기 */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      className="Caption1Medium text-gray-300"
                      htmlFor="confirmPassword"
                    >
                      새 비밀번호 확인
                    </label>
                    <input
                      className="mb-2 w-[534px] rounded-lg border border-gray-100 bg-gray-0 px-6 py-4 focus:outline-none"
                      type="password"
                      id="confirmPassword"
                      placeholder="새 비밀번호를 확인해주세요"
                      {...register("confirmPassword")}
                    />
                    <p className="Caption1Medium text-gray-300">
                      8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합
                    </p>
                    {/* 눈뜨기 */}
                  </div>
                </form>
              )}
            </li>
          </ul>
          <button
            className="SubHead1Medium absolute right-0 bottom-[-50px] flex items-center text-gray-400"
            type="button"
            onClick={handleDelUserBtn}
          >
            계정삭제하기
            <IconArrow className="ml-1 rotate-[270deg]" />
          </button>
        </Box>
      </section>
    </div>
  );
};
export default ChangeUserInfo;
