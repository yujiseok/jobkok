import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { ReactComponent as IconArrowDown } from "@/assets/applicant/arrowDown.svg";
import { ReactComponent as IconArrowLeft } from "@/assets/applicant/arrowLeft.svg";
import { ReactComponent as IconCalendar } from "@/assets/applicant/calendar.svg";
import { ReactComponent as IconComplete } from "@/assets/applicant/complete.svg";
import { ReactComponent as IconIncomplete } from "@/assets/applicant/incomplete.svg";
import {
  EDULEVEL_OPTION,
  EDUSTATUS_OPTION,
  KEYWORDS_CHECK,
  LANGUAGELEVEL_OPTION,
  MILITARY_OPTION,
  OPTIONAL_FIELD,
  REQUIRED_FIELD,
} from "@/constants/applicant";
import AsideBox from "@components/Applicant//AsideBox";
import DefDesc from "@components/Applicant//DefDesc";
import DefTerm from "@components/Applicant//DefTerm";
import AsideHeading from "@components/Applicant/AsideHeading";
import FieldBox from "@components/Applicant/FieldBox";
import FieldLabel from "@components/Applicant/FieldLabel";
import FieldLegend from "@components/Applicant/FieldLegend";
import FieldParagraph from "@components/Applicant/FieldParagraph";
import PolicyTerms from "@components/Applicant/PolicyTerms";
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
    <div className="container mx-auto max-w-[768px] flex-col py-10">
      <aside className="fixed top-[244px] right-16">
        <AsideBox className="pt-[26px] pb-5">
          <AsideHeading>지원서 일정</AsideHeading>
          <dl>
            <div className="mb-3 flex gap-3.5">
              <DefTerm>지원서 접수 마감일</DefTerm>
              <DefDesc>23/03/30</DefDesc>
            </div>
            <div className="flex gap-3.5">
              <DefTerm>면접 가능 기간</DefTerm>
              <DefDesc>2023/03/31 ~ 2023/04/01</DefDesc>
            </div>
          </dl>
        </AsideBox>
        <SubmitBtn className="w-[284px]">지원서 제출</SubmitBtn>
        <AsideBox>
          <AsideHeading>필수입력사항</AsideHeading>
          <ul>
            {REQUIRED_FIELD.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </AsideBox>
        <AsideBox>
          <AsideHeading>선택입력사항</AsideHeading>
          <ul>
            {OPTIONAL_FIELD.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </AsideBox>
        <AsideBox>
          <AsideHeading>약관동의</AsideHeading>
        </AsideBox>
      </aside>

      <section className="pl-16 pt-[188px] pb-[108px] pr-[372px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="Head3Semibold mb-4 text-gray-900">지원자 추가정보</h2>
          <div className="flex flex-col gap-5">
            <FieldBox>
              <FieldLegend>자기소개(필수)</FieldLegend>
              <p className="Head4Medium text-gray-700">
                본인 대해 자유롭게 서술해주세요.
              </p>
              <div className="flex h-[272px] items-center gap-6 rounded-lg border border-gray-100 bg-gray-0 py-4 px-6">
                <FieldLabel htmlFor="resumeContent">지원자 작성란</FieldLabel>
                <textarea
                  className="h-full w-full resize-none focus:outline-none"
                  id="resumeContent"
                  placeholder="위 주제에 대해 자유롭게 서술해주세요.(최소 20자 이상)"
                  maxLength={1000}
                  {...register("resumeContent")}
                ></textarea>
              </div>
              <div className="Caption1Medium mt-[-16px] text-gray-400">
                {watch().resumeContent?.length}
                /1000자(공백포함, 20자 이상)
              </div>
            </FieldBox>
            <FieldBox>
              <FieldLegend className="mb-5 text-xl font-bold">
                경력(필수)
              </FieldLegend>
              <div>
                <FieldLabel htmlFor="careerName">일한곳</FieldLabel>
                <input
                  type="text"
                  id="careerName"
                  maxLength={50}
                  placeholder="일한 곳 이름을 알려주세요."
                  {...register("careerName")}
                />
              </div>
              <div>
                <FieldLabel htmlFor="careerPeriod">일한 기간</FieldLabel>
                <FieldLabel className="mr-5" htmlFor="careerPeriodStart">
                  시작
                </FieldLabel>
                <input
                  type="date"
                  id="careerPeriodStart"
                  onKeyDown={handleKeyDown}
                  {...register("careerPeriodStart")}
                />
                <span> ~ </span>
                <FieldLabel className="mr-5" htmlFor="careerPeriodEnd">
                  끝
                </FieldLabel>
                <input
                  type="date"
                  id="careerPeriodEnd"
                  onKeyDown={handleKeyDown}
                  {...register("careerPeriodEnd")}
                />
              </div>
              <div className="flex h-[272px] items-center gap-6 rounded-lg border border-gray-100 bg-gray-0 py-4 px-6">
                <FieldLabel htmlFor="careerDetail">상세 내용</FieldLabel>
                <textarea
                  className="h-full w-full resize-none focus:outline-none"
                  id="careerDetail"
                  placeholder="어떤 일을 하셨는지 설명해주세요."
                  maxLength={1000}
                  {...register("careerDetail")}
                ></textarea>
              </div>
              <div className="Caption1Medium mt-[-16px] text-gray-400">
                {watch().careerDetail?.length}
                /1000자(공백포함, 20자 이상)
              </div>
            </FieldBox>
            <FieldBox>
              <FieldLegend className="mb-5 text-xl font-bold">
                최종학력
              </FieldLegend>
              <div>
                <FieldLabel className="mr-5" htmlFor="eduName">
                  학교명
                </FieldLabel>
                <input
                  type="text"
                  id="eduName"
                  maxLength={20}
                  placeholder="학교명을 입력해주세요."
                  {...register("eduName")}
                />
              </div>
              <div>
                <span className="mr-5">기간</span>
                <FieldLabel htmlFor="eduPeriodStart">시작</FieldLabel>
                <input
                  type="date"
                  id="eduPeriodStart"
                  onKeyDown={handleKeyDown}
                  {...register("eduPeriodStart")}
                />
                <FieldLabel htmlFor="careerPeriodEnd">끝</FieldLabel>
                <input
                  type="date"
                  id="careerPeriodEnd"
                  onKeyDown={handleKeyDown}
                  {...register("eduPeriodEnd")}
                />
              </div>
              <div>
                <FieldLabel htmlFor="eduMajor">전공</FieldLabel>
                <input
                  type="text"
                  id="eduMajor"
                  maxLength={20}
                  placeholder="전공을 입력해주세요."
                  {...register("eduMajor")}
                />
              </div>
              <div>
                <FieldLabel htmlFor="eduLevel">년제</FieldLabel>
                <select id="eduLevel" {...register("eduLevel")}>
                  {EDULEVEL_OPTION.map((level) => {
                    return (
                      <option key={level.value} value={level.value}>
                        {level.keywords}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <FieldLabel htmlFor="eduStatus">졸업상태</FieldLabel>
                <select id="eduStatus" {...register("eduStatus")}>
                  {EDUSTATUS_OPTION.map((status) => {
                    return (
                      <option key={status.value} value={status.value}>
                        {status.keywords}
                      </option>
                    );
                  })}
                </select>
              </div>
            </FieldBox>
            <FieldBox>
              <FieldLegend className="mb-5 text-xl font-bold">
                자격증
              </FieldLegend>
              <div>
                <FieldLabel htmlFor="certificateName">자격증 이름</FieldLabel>
                <input
                  type="text"
                  id="certificateName"
                  maxLength={20}
                  placeholder="자격증 이름을 알려주세요."
                  {...register("certificateName")}
                />
              </div>
              <div>
                <FieldLabel htmlFor="certificatePublisher">발행처</FieldLabel>
                <input
                  type="text"
                  id="certificatePublisher"
                  maxLength={20}
                  placeholder="발행처/기관을 알려주세요."
                  {...register("certificatePublisher")}
                />
              </div>
              <div>
                <FieldLabel htmlFor="certificateDate">취득일</FieldLabel>
                <input
                  type="date"
                  id="certificateDate"
                  onKeyDown={handleKeyDown}
                  {...register("certificateDate")}
                />
              </div>
            </FieldBox>
            <FieldBox>
              <FieldLegend className="mb-5 text-xl font-bold">
                수상내역
              </FieldLegend>
              <div>
                <FieldLabel htmlFor="awardsName">수상명</FieldLabel>
                <input
                  type="text"
                  id="awardsName"
                  maxLength={20}
                  placeholder="수상명을 작성해주세요."
                  {...register("awardsName")}
                />
              </div>
              <div>
                <FieldLabel htmlFor="awardsCompany">수여기관</FieldLabel>
                <input
                  type="text"
                  id="awardsCompany"
                  maxLength={20}
                  placeholder="수여기관을 입력해주세요."
                  {...register("awardsCompany")}
                />
              </div>
              <div>
                <FieldLabel htmlFor="awardsDate">수상공모일</FieldLabel>
                <input
                  type="date"
                  id="awardsDate"
                  onKeyDown={handleKeyDown}
                  {...register("awardsDate")}
                />
              </div>
            </FieldBox>
            <FieldBox>
              <FieldLegend className="mb-5 text-xl font-bold">
                취업우대사항
              </FieldLegend>
              <FieldParagraph>
                본인이 해당하는 항목을 선택해주세요.
              </FieldParagraph>
              <div>
                <FieldLabel htmlFor="disability">장애여부</FieldLabel>
                <input
                  type="checkbox"
                  id="disability"
                  {...register("disability")}
                />
              </div>
              <div>
                <FieldLabel htmlFor="veterans">국가보훈여부</FieldLabel>
                <input
                  type="checkbox"
                  id="veterans"
                  {...register("veterans")}
                />
              </div>
              <div>
                <FieldLabel htmlFor="subsidy">고용지원금</FieldLabel>
                <input type="checkbox" id="subsidy" {...register("subsidy")} />
              </div>
              <div>
                <FieldLabel htmlFor="military">병역사항</FieldLabel>
                <select id="military" {...register("military")}>
                  {MILITARY_OPTION.map((status) => {
                    return (
                      <option key={status.value} value={status.value}>
                        {status.keywords}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mt-10">
                <FieldLabel htmlFor="agree">
                  민감정보 제공에 동의합니다.
                </FieldLabel>
                <input type="checkbox" id="agree" {...register("agree")} />
                <div className="mt-10 flex w-96 flex-col gap-5">
                  <span className="font-bold">민감정보 제공 안내</span>
                  <p className="text-xs text-slate-500">
                    민감정보는 선택입력항목이며, 입력하지 않더라도 이력서 작성에
                    제한을 두지 않습니다.
                  </p>
                  <p className="h-20  overflow-auto text-xs text-slate-500">
                    1.개인정보의 수집 및 이용목적 : 효과적인 취업지원,
                    경력개발에 적합한 서비스를 제공하기 위함. <br /> 2.수집하는
                    개인정보 항목 : 장애여부, 국가보훈, 고용지원금, 병역사항{" "}
                    <br /> 3.개인정보의 보유 및 이용기간 : 개인정보의 수집 및
                    이용에 대한 동의를 철회하거나, 수집 및 이용목적이 달성되거나
                    이용기간이 종료한 경우 개인정보를 지체 없이 파기 <br /> 단,
                    상법 등 관계법령의 규정에 의하여 보전할 필요가 있는 경우
                    거래내역과 최소한의 기본정보를 일정기간 보유
                  </p>
                </div>
              </div>
            </FieldBox>
            <FieldBox>
              <FieldLegend className="mb-5 text-xl font-bold">
                어학능력
              </FieldLegend>
              <div>
                <FieldLabel htmlFor="languageName">언어</FieldLabel>
                <input
                  type="text"
                  id="languageName"
                  maxLength={20}
                  placeholder="언어를 입력해주세요."
                  {...register("languageName")}
                />
              </div>
              <div>
                <FieldLabel htmlFor="languageLevel">수준</FieldLabel>
                <select id="languageLevel" {...register("languageLevel")}>
                  {LANGUAGELEVEL_OPTION.map((level) => {
                    return (
                      <option key={level.value} value={level.value}>
                        {level.keywords}
                      </option>
                    );
                  })}
                </select>
              </div>
            </FieldBox>
            <FieldBox>
              <FieldLegend className="mb-5 text-xl font-bold">
                기타 이력서
              </FieldLegend>
              <div>
                <FieldLabel htmlFor="portfolio">포트폴리오</FieldLabel>
                <input
                  type="url"
                  id="portfolio"
                  placeholder="링크를 입력해주세요."
                  {...register("portfolio")}
                />
              </div>
              <p className="mt-2 text-sm text-rose-500">
                {errors.portfolio?.message}
              </p>
              <div>
                <FieldLabel htmlFor="resume">기타 이력서</FieldLabel>
                <input
                  type="url"
                  id="resume"
                  placeholder="링크를 입력해주세요."
                  {...register("resume")}
                />
              </div>
              <p className="mt-2 text-sm text-rose-500">
                {errors.resume?.message}
              </p>
            </FieldBox>
            <FieldBox>
              <FieldLegend className="mb-5 text-xl font-bold">
                나의 성격 키워드(5개 필수)
              </FieldLegend>
              <FieldParagraph>
                해당되는 항목의 체크박스에 체크해주세요.
              </FieldParagraph>
              {KEYWORDS_CHECK.map((element) => {
                return (
                  <span key={element} className="mr-10">
                    <label htmlFor="1">{element}</label>
                    <input type="checkbox" name="keywords" id="1" />
                  </span>
                );
              })}
            </FieldBox>
            <PolicyTerms />
          </div>
        </form>
        <div className="mt-8 flex justify-between">
          <button
            className="SubHead1Semibold h-[23px] rounded-md bg-blue-50 py-2.5 px-6 text-blue-500"
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
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            제출하기
          </SubmitBtn>
        </div>
      </section>
    </div>
  );
};
export default Application;
