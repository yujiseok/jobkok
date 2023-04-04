import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { ReactComponent as IconArrowLeft } from "@/assets/applicant/arrowLeft.svg";
import { ReactComponent as IconComplete } from "@/assets/applicant/complete.svg";
import { ReactComponent as IconIncomplete } from "@/assets/applicant/incomplete.svg";
import { ReactComponent as IconSelect } from "@/assets/applicant/select.svg";
import {
  EDULEVEL_OPTION,
  EDUSTATUS_OPTION,
  KEYWORDS_CHECK,
  LANGUAGELEVEL_OPTION,
  MILITARY_OPTION,
  OPTIONAL_FIELD,
  REQUIRED_FIELD,
  TERMS_APPLY,
  TERMS_SENSITIVE,
} from "@/constants/applicant";
import AsideBox from "@components/Applicant//AsideBox";
import DefDesc from "@components/Applicant//DefDesc";
import DefTerm from "@components/Applicant//DefTerm";
import AsideHeading from "@components/Applicant/AsideHeading";
import FieldBox from "@components/Applicant/FieldBox";
import FielCheckbox from "@components/Applicant/FieldCheckbox";
import FieldInputBox from "@components/Applicant/FieldInputBox";
import FieldLabel from "@components/Applicant/FieldLabel";
import FieldLegend from "@components/Applicant/FieldLegend";
import FieldParagraph from "@components/Applicant/FieldParagraph";
import FieldRow from "@components/Applicant/FieldRow";
import SubmitBtn from "@components/Applicant/SubmitBtn";

const schema = z.object({
  // // 경력
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
  disability: z.boolean().refine((val) => val),
  veterans: z.boolean().refine((val) => val),
  subsidy: z.boolean().refine((val) => val),
  military: z.string().nonempty(),
  agree: z.boolean().refine((val) => val),

  // 기타이력서
  portfolio: z.string().url("올바른 링크를 입력해주세요."),
  resume: z.string().url("올바른 링크를 입력해주세요."),

  // 어학능력
  languageName: z.string().nonempty(),
  languageLevel: z.string().nonempty(),

  // 수상내역
  awardsName: z.string().nonempty(),
  awardsCompany: z.string().nonempty(),
  awardsDate: z.string().nonempty(),

  // 나의 성격 키워드

  // 약관
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
    <>
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
                <DefTerm>지원서 접수 마감일</DefTerm>
                <DefDesc>23/03/30</DefDesc>
              </div>
              <div className="flex gap-3.5">
                <DefTerm>기업 면접 가능 기간</DefTerm>
                <DefDesc>23/03/31 ~ 23/04/01</DefDesc>
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
                <FieldInputBox className="h-[272px]">
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
                </FieldInputBox>
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
                  <FieldInputBox>
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
                  <FieldInputBox>
                    <FieldLabel htmlFor="careerPeriodStart">시작일</FieldLabel>
                    <input
                      className="max-w-[120px] focus:outline-none"
                      type="date"
                      id="careerPeriodStart"
                      onKeyDown={handleKeyDown}
                      {...register("careerPeriodStart")}
                    />
                  </FieldInputBox>
                  <FieldInputBox>
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
                <FieldInputBox className="h-[272px]">
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
                </FieldInputBox>
                <div className="Caption1Medium mt-[-16px] text-gray-400">
                  {watch().careerDetail?.length}
                  /1000자(공백포함)
                </div>
              </FieldBox>
              {/* 최종학력 */}
              <FieldBox>
                <FieldLegend>최종학력</FieldLegend>
                <FieldRow>
                  <FieldInputBox>
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
                  <FieldInputBox>
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
                  <FieldInputBox>
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
                  <FieldInputBox>
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
                  <FieldInputBox>
                    <FieldLabel htmlFor="eduPeriodStart">입학날짜</FieldLabel>
                    <input
                      className="max-w-[120px] focus:outline-none"
                      type="date"
                      id="eduPeriodStart"
                      onKeyDown={handleKeyDown}
                      {...register("eduPeriodStart")}
                    />
                  </FieldInputBox>
                  <FieldInputBox>
                    <FieldLabel htmlFor="careerPeriodEnd">졸업날짜</FieldLabel>
                    <input
                      className="max-w-[120px] focus:outline-none"
                      type="date"
                      id="careerPeriodEnd"
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
                  <FieldInputBox>
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
                  <FieldInputBox>
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
                  <FieldInputBox>
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
                  <FieldInputBox>
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
                  <FieldInputBox>
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
                  <FieldInputBox>
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
                  <FielCheckbox>
                    <label
                      className="SubHead1Semibold text-gray-500"
                      htmlFor="veterans"
                    >
                      국가보훈
                    </label>
                    <input
                      className="hidden"
                      type="checkbox"
                      id="veterans"
                      {...register("veterans")}
                    />
                  </FielCheckbox>
                  <FielCheckbox>
                    <label
                      className="SubHead1Semibold text-gray-500"
                      htmlFor="disability"
                    >
                      장애
                    </label>
                    <input
                      className="hidden"
                      type="checkbox"
                      id="disability"
                      {...register("disability")}
                    />
                  </FielCheckbox>
                  <FielCheckbox>
                    <label
                      className="SubHead1Semibold text-gray-500"
                      htmlFor="subsidy"
                    >
                      고용지원금
                    </label>
                    <input
                      className="hidden"
                      type="checkbox"
                      id="subsidy"
                      {...register("subsidy")}
                    />
                  </FielCheckbox>
                  <FieldInputBox>
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
                <FielCheckbox className="h-[86px] w-full">
                  <label
                    className="SubHead2Semibold text-gray-600"
                    htmlFor="agree"
                  >
                    민감정보 제공 안내
                  </label>
                  <input
                    className="hidden"
                    type="checkbox"
                    id="agree"
                    {...register("agree")}
                  />
                  <p className="SubHead2Medium h-[54px] max-w-[540px] overflow-auto text-gray-300">
                    {TERMS_SENSITIVE}
                  </p>
                </FielCheckbox>
              </FieldBox>
              {/* 어학 */}
              <FieldBox>
                <FieldLegend>어학능력</FieldLegend>
                <FieldRow>
                  <FieldInputBox>
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
                  <FieldInputBox>
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
                  <FieldInputBox>
                    <FieldLabel htmlFor="portfolio">포트폴리오 링크</FieldLabel>
                    <input
                      className="focus:outline-none"
                      type="url"
                      id="portfolio"
                      placeholder="링크를 첨부해주세요."
                      {...register("portfolio")}
                    />
                  </FieldInputBox>
                  <p className="mt-2 text-sm text-rose-500">
                    {errors.portfolio?.message}
                  </p>
                  <FieldInputBox>
                    <FieldLabel htmlFor="resume">기타 링크</FieldLabel>
                    <input
                      className="focus:outline-none"
                      type="url"
                      id="resume"
                      placeholder="링크를 첨부해주세요."
                      {...register("resume")}
                    />
                  </FieldInputBox>
                  <p className="mt-2 text-sm text-rose-500">
                    {errors.resume?.message}
                  </p>
                </FieldRow>
              </FieldBox>
              {/* 나의키워드 */}
              <FieldBox>
                <FieldLegend>나의 키워드(필수)</FieldLegend>
                <FieldParagraph>
                  해당되는 항목의 체크박스에 체크해주세요.
                </FieldParagraph>
                <div className="grid h-[108px] max-w-[820px] grid-cols-5 gap-2">
                  {KEYWORDS_CHECK.map((keyword) => (
                    <button
                      className="SubHead2Semibold flex items-center justify-center gap-1 rounded-lg border border-gray-100 py-2.5 text-gray-500"
                      key={keyword}
                      type="button"
                    >
                      <IconSelect />
                      {keyword}
                    </button>
                  ))}
                </div>
              </FieldBox>
              <FieldBox>
                <FieldLegend>약관동의</FieldLegend>
                <FieldParagraph>
                  지원하려면 약관동의가 필요합니다.
                </FieldParagraph>
                {TERMS_APPLY.map((content) => (
                  <FielCheckbox
                    className="h-[86px] w-full gap-3 py-4"
                    key={content.title}
                  >
                    <label
                      className="SubHead2Semibold text-gray-600"
                      htmlFor="agree"
                    >
                      {content.title}
                    </label>
                    <input
                      className="hidden"
                      type="checkbox"
                      id="agree"
                      {...register("agree")}
                    />
                    <p className="SubHead2Medium h-[54px] max-w-[540px] overflow-auto text-gray-300">
                      {content.description}
                    </p>
                  </FielCheckbox>
                ))}
              </FieldBox>
            </div>
          </form>
          <div className="mt-8 flex justify-between">
            <button
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
            </button>
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
    </>
  );
};
export default Application;
