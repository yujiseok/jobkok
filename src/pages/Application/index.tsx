import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { emailDuplicatecheck, submitApply } from "@/api/applicant";
import { ReactComponent as IconComplete } from "@/assets/svg/check-round-full-blue.svg";
import { ReactComponent as IconIncomplete } from "@/assets/svg/check-round-line-gray.svg";
import { ReactComponent as IconArrowLeft } from "@/assets/svg/chevron-left-white.svg";

import { OPTIONAL_FIELD, REQUIRED_FIELD } from "@/constants/applicant";

import FieldAwards from "@components/Applicant/field/FieldAwards";
import FieldCareer from "@components/Applicant/field/FieldCareer";
import FieldCertificate from "@components/Applicant/field/FieldCertificate";
import FieldCoverLetter from "@components/Applicant/field/FieldCoverLetter";
import FieldEdu from "@components/Applicant/field/FieldEdu";
import FieldKeywords from "@components/Applicant/field/FieldKeywords";
import FieldLanguage from "@components/Applicant/field/FieldLanguage";
import FieldLink from "@components/Applicant/field/FieldLink";
import FieldPreference from "@components/Applicant/field/FieldPreference";
import FieldTermAgree from "@components/Applicant/field/FieldTermAgree";

const schema = z.object({
  // 자기소개
  resumeContent: z.string().nonempty().min(20),

  // 경력
  careerName: z.string().nonempty(),
  careerStart: z.string().nonempty(),
  careerEnd: z.string().nonempty(),
  careerDetail: z.string().nonempty(),

  // 최종학력
  eduName: z.string().nonempty(),
  eduStart: z.string().nonempty(),
  eduEnd: z.string().nonempty(),
  eduMajor: z.string().nonempty(),
  eduYear: z.string().nonempty(),
  eduStatus: z.string().nonempty(),

  // 자격증
  certificateName: z.string().nonempty(),
  certificatePublisher: z.string().nonempty(),
  certificateDate: z.string().nonempty(),

  // 수상내역
  awardsName: z.string().nonempty(),
  awardsCompany: z.string().nonempty(),
  awardsDate: z.string().nonempty(),

  // 어학능력
  languageName: z.string().nonempty(),
  languageLevel: z.string().nonempty(),

  // 취업우대사항
  veteran: z.boolean().refine((val) => val),
  disorder: z.boolean().refine((val) => val),
  employment: z.boolean().refine((val) => val),
  militaryEnum: z.string().nonempty(),
  terms: z.boolean().refine((val) => val),

  // 기타이력서
  applyPortfolio: z.string().url("올바른 URL 형식이 아닙니다."),
  applyResume: z.string().url("올바른 URL 형식이 아닙니다."),

  // 나의 성격 키워드
  keywordsReq: z.array(z.string()).default([]),

  // 약관
  requiredAgree: z.boolean().refine((val) => val),
  optionalAgree: z.boolean().refine((val) => val),
  consignAgree: z.boolean().refine((val) => val),
});

type IApplicationForm = z.infer<typeof schema>;

const Application = () => {
  const navigate = useNavigate();

  const { ...methods } = useForm<IApplicationForm>({
    resolver: zodResolver(schema),
  });

  // input date 는 키보드로 입력불가
  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
  };

  // 폼 제출
  const onSubmit = async (data: IApplicationForm) => {
    if (confirm("제출 후에는 수정이 불가능합니다. 정말 제출하시겠습니까?")) {
      const { requiredAgree, optionalAgree, consignAgree, ...rest } = data;
      const convertData = {
        ...rest,
        activitiesTitle: null,
        activitiesContent: null,
        activitiesStart: null,
        activitiesEnd: null,
      };
      const res = await submitApply(convertData);
      navigate("/applicant/completion");
    }
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
          <div className="applicant-aside-box mb-4 pt-[26px] pr-[26px] pb-[27px] pl-6">
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
          </div>
          <button
            className="submit-btn-active SubHead1Semibold mb-4 w-[284px]"
            type="submit"
          >
            지원서 제출
          </button>
          <div className="applicant-aside-box mb-1 pt-2.5 pr-[28px] pl-6 pb-4">
            <h4 className="applicant-aside-heading h-10 w-[232px] border-b border-gray-50 py-2">
              필수입력사항
            </h4>
            <ul>
              {REQUIRED_FIELD.map((field) => (
                <li className="flex h-10 w-[232px] items-end" key={field}>
                  <IconComplete className="mr-1.5 " />
                  <span className="SubHead2Medium text-gray-800">{field}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="applicant-aside-box mb-1 pt-2.5 pr-[28px] pl-6 pb-4">
            <h4 className="applicant-aside-heading h-10 w-[232px] border-b border-gray-50 py-2">
              선택입력사항
            </h4>
            <ul>
              {OPTIONAL_FIELD.map((field) => (
                <li className="flex h-10 w-[232px] items-end" key={field}>
                  <IconIncomplete className="mr-1.5 " />
                  <span className="SubHead2Medium text-gray-800">{field}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="applicant-aside-box h-[60px] justify-center">
            <h4 className="applicant-aside-heading">약관동의</h4>
          </div>
        </aside>

        <section className="order-1 w-full">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <h2 className="Head3Semibold mb-4 text-gray-900">
                지원자 추가정보
              </h2>
              <div className="flex flex-col gap-5">
                {/* 자기소개 */}
                <FieldCoverLetter />
                {/* 경력 */}
                <FieldCareer handleKeyDown={handleKeyDown} />
                {/* 최종학력 */}
                <FieldEdu handleKeyDown={handleKeyDown} />
                {/* 자격증 */}
                <FieldCertificate handleKeyDown={handleKeyDown} />
                {/* 수상내역 */}
                <FieldAwards handleKeyDown={handleKeyDown} />
                {/* 취업우대사항 */}
                <FieldPreference />
                {/* 어학 */}
                <FieldLanguage />
                {/* 기타이력서 */}
                <FieldLink />
                {/* 나의키워드 */}
                <FieldKeywords />
                {/* 약관동의 */}
                <FieldTermAgree />
              </div>
            </form>
          </FormProvider>
          <div className="mt-8 flex justify-between">
            <button
              className="action-btn-aactive SubHead1Semibold"
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
            <button
              className="submit-btn-active w-[147px]"
              type="button"
              onClick={methods.handleSubmit(onSubmit)}
              disabled={methods.formState.isSubmitting}
            >
              제출하기
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Application;
