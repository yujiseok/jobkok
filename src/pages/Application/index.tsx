import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { ReactComponent as IconArrowLeft } from "@/assets/applicant/arrowLeft.svg";
import { ReactComponent as IconComplete } from "@/assets/applicant/complete.svg";
import { ReactComponent as IconIncomplete } from "@/assets/applicant/incomplete.svg";

import {
  EDULEVEL_OPTION,
  EDUSTATUS_OPTION,
  LANGUAGELEVEL_OPTION,
  MILITARY_OPTION,
  OPTIONAL_FIELD,
  REQUIRED_FIELD,
  TERMS_APPLY,
  TERMS_SENSITIVE,
} from "@/constants/applicant";
import AsideBox from "@components/Applicant//AsideBox";
import ActionBtn from "@components/Applicant/ActionBtn";
import AsideHeading from "@components/Applicant/AsideHeading";
import FieldBox from "@components/Applicant/FieldBox";
import FielCheckbox from "@components/Applicant/FieldCheckbox";
import FieldInputBox from "@components/Applicant/FieldInputBox";
import FieldLabel from "@components/Applicant/FieldLabel";
import FieldLegend from "@components/Applicant/FieldLegend";
import FieldParagraph from "@components/Applicant/FieldParagraph";
import FieldRow from "@components/Applicant/FieldRow";
import MyKeywords from "@components/Applicant/MyKeywords";
import SubmitBtn from "@components/Applicant/SubmitBtn";

const schema = z.object({
  // 경력
  careerName: z.string().nonempty(),
  careerPeriodStart: z.string().nonempty(),
  careerPeriodEnd: z.string().nonempty(),
  careerDetail: z.string().nonempty(),

  // // 자개소개
  resumeContent: z.string().nonempty().min(20),

  // 최종학력
  eduName: z.string().nonempty(),
  eduPeriodStart: z.string().nonempty(),
  eduPeriodEnd: z.string().nonempty(),
  eduMajor: z.string().nonempty(),
  eduLevel: z.string().nonempty(),
  eduStatus: z.string().nonempty(),

  // 자격증
  certificateName: z.string().nonempty(),
  certificatePublisher: z.string().nonempty(),
  certificateDate: z.string().nonempty(),

  // 취업우대사항
  veterans: z.boolean().refine((val) => val),
  disability: z.boolean().refine((val) => val),
  subsidy: z.boolean().refine((val) => val),
  military: z.string().nonempty(),
  sensitiveAgree: z.boolean().refine((val) => val),

  // 기타이력서
  portfolio: z.string().url("올바른 URL 형식이 아닙니다."),
  link: z.string().url("올바른 URL 형식이 아닙니다."),

  // 어학능력
  languageName: z.string().nonempty(),
  languageLevel: z.string().nonempty(),

  // 수상내역
  awardsName: z.string().nonempty(),
  awardsCompany: z.string().nonempty(),
  awardsDate: z.string().nonempty(),

  // 나의 성격 키워드

  // 약관
  requiredAgree: z.boolean().refine((val) => val),
  optionalAgree: z.boolean().refine((val) => val),
  consignAgree: z.boolean().refine((val) => val),
});

type IApplicationForm = z.infer<typeof schema>;

const Application = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IApplicationForm>({
    resolver: zodResolver(schema),
  });

  // input date 는 키보드로 입력불가
  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
  };

  // 폼 제출
  const onSubmit = async (data: IApplicationForm) => {
    console.log(data);
    navigate("/applicant/completion");
  };

  return (
    <main className="mx-auto max-w-7xl">
      <header className="absolute left-0 right-0 h-[148px] bg-blue-400 py-[56px]">
        <div className="relative mx-auto flex max-w-7xl justify-center">
          <IconArrowLeft className="absolute left-[62px]" />
          <h1 className="Head2Semibold text-gray-0">
            [기업에서 설정한 지원서 제목] 지원서
          </h1>
        </div>
      </header>

      <div className="flex gap-6 px-16 pt-[192px] pb-[108px]">
        <aside className="sticky top-0 order-2 h-full pt-[45px]">
          <AsideBox className="mb-4 pt-[26px] pr-[26px] pb-[27px] pl-6">
            <h4 className="Head4Semibold mb-[24.5px] text-gray-900">
              지원서 일정
            </h4>
            <dl>
              <div className="mb-[26px] flex gap-3.5">
                <dt className="Caption1Medium w-[90px] text-gray-600">
                  지원서 접수 마감일
                </dt>
                <dd className="SubHead2Medium w-[130px] text-gray-600">
                  23/03/30
                </dd>
              </div>
              <div className="flex gap-3.5">
                <dt className="Caption1Medium w-[90px] text-gray-600">
                  기업 면접 가능 기간
                </dt>
                <dd className="SubHead2Medium w-[130px] text-gray-600">
                  23/03/31 ~ 23/04/01
                </dd>
              </div>
            </dl>
          </AsideBox>
          <SubmitBtn className="mb-4 w-[284px]" type="submit">
            지원서 제출
          </SubmitBtn>
          <AsideBox className="mb-1 pt-2.5 pr-[28px] pl-6 pb-4">
            <AsideHeading className="h-10 w-[232px] border-b border-gray-50 py-2">
              필수입력사항
            </AsideHeading>
            <ul>
              {REQUIRED_FIELD.map((field) => (
                <li className="flex h-10 w-[232px] items-end" key={field}>
                  <IconComplete className="mr-1.5 " />
                  <span className="SubHead2Medium text-gray-800">{field}</span>
                </li>
              ))}
            </ul>
          </AsideBox>
          <AsideBox className="mb-1 pt-2.5 pr-[28px] pl-6 pb-4">
            <AsideHeading className="h-10 w-[232px] border-b border-gray-50 py-2">
              선택입력사항
            </AsideHeading>
            <ul>
              {OPTIONAL_FIELD.map((field) => (
                <li className="flex h-10 w-[232px] items-end" key={field}>
                  <IconIncomplete className="mr-1.5 " />
                  <span className="SubHead2Medium text-gray-800">{field}</span>
                </li>
              ))}
            </ul>
          </AsideBox>
          <AsideBox className="h-[60px] justify-center">
            <AsideHeading>약관동의</AsideHeading>
          </AsideBox>
        </aside>

        <section className="order-1 w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="Head3Semibold mb-4 text-gray-900">
              지원자 추가정보
            </h2>
            <div className="flex flex-col gap-5">
              {/* 자기소개 */}
              <FieldBox>
                <FieldLegend>자기소개(필수)</FieldLegend>
                <p className="Head4Medium text-gray-700">
                  본인 대해 자유롭게 서술해주세요.
                </p>
                <div
                  className={`flex h-[272px] items-center gap-4 rounded-lg border  bg-gray-0 px-6 ${
                    errors.resumeContent
                      ? " border-error-400"
                      : " border-gray-100"
                  }`}
                >
                  <FieldLabel className="w-20" htmlFor="resumeContent">
                    지원자 작성란
                  </FieldLabel>
                  <textarea
                    className="h-full w-full resize-none py-4 focus:outline-none"
                    id="resumeContent"
                    placeholder="위 주제에 대해 자유롭게 서술해주세요.(최소 20자 이상)"
                    maxLength={1000}
                    {...register("resumeContent")}
                  ></textarea>
                </div>
                <div className="Caption1Medium mt-[-16px] text-gray-400">
                  {watch().resumeContent?.length}
                  /1000자(공백포함)
                </div>
              </FieldBox>
              {/* 경력 */}
              <FieldBox>
                <FieldLegend className="text-xl font-bold">
                  경력(필수)
                </FieldLegend>
                <FieldRow>
                  <FieldInputBox errors={errors.careerName}>
                    <FieldLabel htmlFor="careerName">일한곳</FieldLabel>
                    <input
                      className="max-w-[214px] focus:outline-none"
                      type="text"
                      id="careerName"
                      maxLength={50}
                      placeholder="가장 관련있는 경력을 적어주세요."
                      {...register("careerName")}
                    />
                  </FieldInputBox>
                  <FieldInputBox errors={errors.careerPeriodStart}>
                    <FieldLabel htmlFor="careerPeriodStart">시작일</FieldLabel>
                    <input
                      className="max-w-[120px] focus:outline-none"
                      type="date"
                      id="careerPeriodStart"
                      onKeyDown={handleKeyDown}
                      {...register("careerPeriodStart")}
                    />
                  </FieldInputBox>
                  <FieldInputBox errors={errors.careerPeriodEnd}>
                    <FieldLabel htmlFor="careerPeriodEnd">마감일</FieldLabel>
                    <input
                      className="max-w-[120px] focus:outline-none"
                      type="date"
                      id="careerPeriodEnd"
                      onKeyDown={handleKeyDown}
                      {...register("careerPeriodEnd")}
                    />
                  </FieldInputBox>
                </FieldRow>
                <div
                  className={`flex h-[272px] items-center gap-4 rounded-lg border bg-gray-0 px-6 ${
                    errors.careerDetail
                      ? " border-error-400"
                      : " border-gray-100"
                  }`}
                >
                  <FieldLabel className="w-20" htmlFor="careerDetail">
                    상세 내용
                  </FieldLabel>
                  <textarea
                    className="h-full w-full resize-none py-4 focus:outline-none"
                    id="careerDetail"
                    placeholder="경력이 한개 이상일 경우, 일한 곳, 일한 기간, 상세 내용을 함께 적어주세요."
                    maxLength={1000}
                    {...register("careerDetail")}
                  ></textarea>
                </div>
                <div className="Caption1Medium mt-[-16px] text-gray-400">
                  {watch().careerDetail?.length}
                  /1000자(공백포함)
                </div>
              </FieldBox>
              {/* 최종학력 */}
              <FieldBox>
                <FieldLegend>최종학력</FieldLegend>
                <FieldRow>
                  <FieldInputBox errors={errors.eduName}>
                    <FieldLabel htmlFor="eduName">학교명</FieldLabel>
                    <input
                      className="max-w-[200px] bg-transparent focus:outline-none"
                      type="text"
                      id="eduName"
                      maxLength={20}
                      placeholder="학교명을 입력해주세요."
                      {...register("eduName")}
                    />
                  </FieldInputBox>
                  <FieldInputBox errors={errors.eduMajor}>
                    <FieldLabel htmlFor="eduMajor">전공</FieldLabel>
                    <input
                      className="max-w-[190px] bg-transparent focus:outline-none"
                      type="text"
                      id="eduMajor"
                      maxLength={20}
                      placeholder="전공을 입력해주세요."
                      {...register("eduMajor")}
                    />
                  </FieldInputBox>
                  <FieldInputBox errors={errors.eduLevel}>
                    <label className="sr-only" htmlFor="eduLevel">
                      년제
                    </label>
                    <select
                      className="max-w-[160px] focus:outline-none"
                      id="eduLevel"
                      {...register("eduLevel")}
                    >
                      {EDULEVEL_OPTION.map((level) => {
                        return (
                          <option key={level.value} value={level.value}>
                            {level.keywords}
                          </option>
                        );
                      })}
                    </select>
                  </FieldInputBox>
                  <FieldInputBox errors={errors.eduStatus}>
                    <label className="sr-only" htmlFor="eduStatus">
                      졸업상태
                    </label>
                    <select
                      className="max-w-[160px] focus:outline-none"
                      id="eduStatus"
                      {...register("eduStatus")}
                    >
                      {EDUSTATUS_OPTION.map((status) => {
                        return (
                          <option key={status.value} value={status.value}>
                            {status.keywords}
                          </option>
                        );
                      })}
                    </select>
                  </FieldInputBox>
                  <FieldInputBox errors={errors.eduPeriodStart}>
                    <FieldLabel htmlFor="eduPeriodStart">입학날짜</FieldLabel>
                    <input
                      className="max-w-[120px] focus:outline-none"
                      type="date"
                      id="eduPeriodStart"
                      onKeyDown={handleKeyDown}
                      {...register("eduPeriodStart")}
                    />
                  </FieldInputBox>
                  <FieldInputBox errors={errors.eduPeriodEnd}>
                    <FieldLabel htmlFor="eduPeriodEnd">졸업날짜</FieldLabel>
                    <input
                      className="max-w-[120px] focus:outline-none"
                      type="date"
                      id="eduPeriodEnd"
                      onKeyDown={handleKeyDown}
                      {...register("eduPeriodEnd")}
                    />
                  </FieldInputBox>
                </FieldRow>
              </FieldBox>
              {/* 자격증 */}
              <FieldBox>
                <FieldLegend>자격증</FieldLegend>
                <FieldRow>
                  <FieldInputBox errors={errors.certificateName}>
                    <FieldLabel htmlFor="certificateName">
                      자격증 이름
                    </FieldLabel>
                    <input
                      className="max-w-[160px] bg-transparent focus:outline-none"
                      type="text"
                      id="certificateName"
                      maxLength={20}
                      placeholder="자격증 이름을 알려주세요."
                      {...register("certificateName")}
                    />
                  </FieldInputBox>
                  <FieldInputBox errors={errors.certificatePublisher}>
                    <FieldLabel htmlFor="certificatePublisher">
                      발생처
                    </FieldLabel>
                    <input
                      className="max-w-[140px] bg-transparent focus:outline-none "
                      type="text"
                      id="certificatePublisher"
                      maxLength={20}
                      placeholder="발행처를 알려주세요."
                      {...register("certificatePublisher")}
                    />
                  </FieldInputBox>
                  <FieldInputBox errors={errors.certificateDate}>
                    <FieldLabel htmlFor="certificateDate">취득일</FieldLabel>
                    <input
                      className="max-w-[120px] bg-transparent focus:outline-none "
                      type="date"
                      id="certificateDate"
                      onKeyDown={handleKeyDown}
                      {...register("certificateDate")}
                    />
                  </FieldInputBox>
                </FieldRow>
              </FieldBox>
              {/* 수상내역 */}
              <FieldBox>
                <FieldLegend>수상내역</FieldLegend>
                <FieldRow>
                  <FieldInputBox errors={errors.awardsName}>
                    <FieldLabel htmlFor="awardsName">수상명</FieldLabel>
                    <input
                      className="max-w-[150px] bg-transparent focus:outline-none"
                      type="text"
                      id="awardsName"
                      maxLength={20}
                      placeholder="수상명을 작성해주세요."
                      {...register("awardsName")}
                    />
                  </FieldInputBox>
                  <FieldInputBox errors={errors.awardsCompany}>
                    <FieldLabel htmlFor="awardsCompany">수여기관</FieldLabel>
                    <input
                      className="max-w-[160px] bg-transparent focus:outline-none"
                      type="text"
                      id="awardsCompany"
                      maxLength={20}
                      placeholder="수여기관을 입력해주세요."
                      {...register("awardsCompany")}
                    />
                  </FieldInputBox>
                  <FieldInputBox errors={errors.awardsDate}>
                    <FieldLabel htmlFor="awardsDate">수상일</FieldLabel>
                    <input
                      className="max-w-[120px] bg-transparent  focus:outline-none"
                      type="date"
                      id="awardsDate"
                      onKeyDown={handleKeyDown}
                      {...register("awardsDate")}
                    />
                  </FieldInputBox>
                </FieldRow>
              </FieldBox>
              {/* 취업우대사항 */}
              <FieldBox>
                <FieldLegend>취업우대사항</FieldLegend>
                <FieldParagraph>
                  본인이 해당하는 항목을 선택해주세요.
                </FieldParagraph>
                <FieldRow>
                  <FielCheckbox
                    htmlFor="veterans"
                    inputValue={watch().veterans}
                  >
                    국가보훈
                    <input
                      className="sr-only"
                      type="checkbox"
                      id="veterans"
                      {...register("veterans")}
                    />
                  </FielCheckbox>
                  <FielCheckbox
                    htmlFor="disability"
                    inputValue={watch().disability}
                  >
                    장애
                    <input
                      className="sr-only"
                      type="checkbox"
                      id="disability"
                      {...register("disability")}
                    />
                  </FielCheckbox>
                  <FielCheckbox htmlFor="subsidy" inputValue={watch().subsidy}>
                    고용지원금
                    <input
                      className="sr-only"
                      type="checkbox"
                      id="subsidy"
                      {...register("subsidy")}
                    />
                  </FielCheckbox>
                  <FieldInputBox errors={errors.military}>
                    <label className="sr-only" htmlFor="military">
                      병역사항
                    </label>
                    <select
                      className="focus:outline-none"
                      id="military"
                      {...register("military")}
                    >
                      {MILITARY_OPTION.map((status) => {
                        return (
                          <option key={status.value} value={status.value}>
                            {status.keywords}
                          </option>
                        );
                      })}
                    </select>
                  </FieldInputBox>
                </FieldRow>
                <FielCheckbox
                  className="SubHead2Semibold h-[86px] w-full text-gray-600"
                  htmlFor="sensitiveAgree"
                  inputValue={watch().sensitiveAgree}
                >
                  민감정보 제공 안내
                  <input
                    className="sr-only"
                    type="checkbox"
                    id="sensitiveAgree"
                    {...register("sensitiveAgree")}
                  />
                  <p className="SubHead2Medium ml-6 h-[54px] max-w-[540px] overflow-auto text-gray-300">
                    {TERMS_SENSITIVE}
                  </p>
                </FielCheckbox>
              </FieldBox>
              {/* 어학 */}
              <FieldBox>
                <FieldLegend>어학능력</FieldLegend>
                <FieldRow>
                  <FieldInputBox errors={errors.languageName}>
                    <FieldLabel htmlFor="languageName">언어</FieldLabel>
                    <input
                      className="focus:outline-none"
                      type="text"
                      id="languageName"
                      maxLength={20}
                      placeholder="언어를 입력해주세요."
                      {...register("languageName")}
                    />
                  </FieldInputBox>
                  <FieldInputBox errors={errors.languageLevel}>
                    <label className="sr-only" htmlFor="languageLevel">
                      수준
                    </label>
                    <select
                      className="focus:outline-none"
                      id="languageLevel"
                      {...register("languageLevel")}
                    >
                      {LANGUAGELEVEL_OPTION.map((level) => {
                        return (
                          <option key={level.value} value={level.value}>
                            {level.keywords}
                          </option>
                        );
                      })}
                    </select>
                  </FieldInputBox>
                </FieldRow>
              </FieldBox>
              {/* 기타이력서 */}
              <FieldBox>
                <FieldLegend>기타 이력서</FieldLegend>
                <FieldRow>
                  <div>
                    <FieldInputBox errors={errors.portfolio}>
                      <FieldLabel htmlFor="portfolio">
                        포트폴리오 링크
                      </FieldLabel>
                      <input
                        className="focus:outline-none"
                        type="url"
                        id="portfolio"
                        placeholder="링크를 첨부해주세요."
                        {...register("portfolio")}
                      />
                    </FieldInputBox>
                    <p className="mt-2 text-sm text-error-400">
                      {errors.portfolio?.message}
                    </p>
                  </div>
                  <div>
                    <FieldInputBox errors={errors.link}>
                      <FieldLabel htmlFor="link">기타 링크</FieldLabel>
                      <input
                        className="focus:outline-none"
                        type="url"
                        id="link"
                        placeholder="링크를 첨부해주세요."
                        {...register("link")}
                      />
                    </FieldInputBox>
                    <p className="mt-2 text-sm text-error-400">
                      {errors.link?.message}
                    </p>
                  </div>
                </FieldRow>
              </FieldBox>
              {/* 나의키워드 */}
              <MyKeywords />
              {/* 약관동의 */}
              <FieldBox>
                <FieldLegend>약관동의</FieldLegend>
                <FieldParagraph>
                  지원하려면 약관동의가 필요합니다.
                </FieldParagraph>
                <FielCheckbox
                  className="SubHead2Semibold h-[86px] w-full gap-3 py-4 text-gray-600"
                  htmlFor="requiredAgree"
                  inputValue={watch().requiredAgree}
                >
                  {TERMS_APPLY[0].title}
                  <input
                    className="sr-only"
                    type="checkbox"
                    id="requiredAgree"
                    {...register("requiredAgree")}
                  />
                  <p className="SubHead2Medium h-[54px] max-w-[500px] overflow-auto text-gray-300">
                    {TERMS_APPLY[0].description}
                  </p>
                </FielCheckbox>
                <FielCheckbox
                  className="SubHead2Semibold h-[86px] w-full gap-3 py-4 text-gray-600"
                  htmlFor="optionalAgree"
                  inputValue={watch().optionalAgree}
                >
                  {TERMS_APPLY[1].title}
                  <input
                    className="sr-only"
                    type="checkbox"
                    id="optionalAgree"
                    {...register("optionalAgree")}
                  />
                  <p className="SubHead2Medium h-[54px] max-w-[500px] overflow-auto text-gray-300">
                    {TERMS_APPLY[1].description}
                  </p>
                </FielCheckbox>
                <FielCheckbox
                  className="SubHead2Semibold h-[86px] w-full gap-3 py-4 text-gray-600"
                  htmlFor="consignAgree"
                  inputValue={watch().consignAgree}
                >
                  {TERMS_APPLY[2].title}
                  <input
                    className="sr-only"
                    type="checkbox"
                    id="consignAgree"
                    {...register("consignAgree")}
                  />
                  <p className="SubHead2Medium h-[54px] max-w-[500px] overflow-auto text-gray-300">
                    {TERMS_APPLY[2].description}
                  </p>
                </FielCheckbox>
              </FieldBox>
            </div>
          </form>
          <div className="mt-8 flex justify-between">
            <ActionBtn
              className="SubHead1Semibold rounded-md bg-blue-50 py-2.5 px-6 text-blue-500"
              type="button"
              onClick={() => {
                confirm(
                  "작성했던 정보가 초기화됩니다. 이전 단계로 이동하시겠습니까?",
                )
                  ? navigate(-1)
                  : null;
              }}
            >
              이전
            </ActionBtn>
            <SubmitBtn
              className="w-[147px]"
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              제출하기
            </SubmitBtn>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Application;
