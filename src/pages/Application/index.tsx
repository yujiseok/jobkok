import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import {
  EDULEVEL_OPTION,
  EDUSTATUS_OPTION,
  KEYWORDS_CHECK,
  LANGUAGELEVEL_OPTION,
  MILITARY_OPTION,
} from "@/constants/applicant";
import GetFormInfo from "@components/Applicant/GetFormInfo";
import PolicyTerms from "@components/Applicant/PolicyTerms";

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
  portfolio: z.string().url(),
  resume: z.string().url(),

  // 어학능력
  languageName: z.string().nonempty(),
  languageLevel: z.string().nonempty(),

  // 수상내역
  awardsName: z.string().nonempty(),
  awardsCompany: z.string().nonempty(),
  awardsDate: z.string().nonempty(),

  // 나의 성격 키워드
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
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  // input date 는 키보드로 입력불가
  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
  };

  // 폼 제출
  const onSubmit = async (data: IApplicationForm) => {
    // navigate("/applicant/completion");
    // 폼 제출 시 폼 내 모든 에러를 수집
    const errorFields = Object.keys(errors);

    // 만약 에러가 있는 필드가 있다면, 첫 번째 에러가 발생한 필드로 포커스 이동
    if (errorFields.length > 0) {
      const field = errorFields[0];
      const input = document.getElementById(field);
      if (input) {
        input.focus();
      }
    } else {
      // 에러가 없는 경우 폼 제출 처리
      console.log(data);
    }
  };

  return (
    <div className="container mx-auto max-w-[768px] flex-col py-10">
      <GetFormInfo />
      <form
        className="mb-10 rounded-md rounded-lg border border-solid p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-5 text-2xl font-bold">지원자 추가정보</h2>
        <fieldset className="mb-20">
          <legend className="mb-5 text-xl font-bold">
            경력 <span className="text-sm text-red-500">필수</span>
          </legend>
          <div>
            <label className="mr-5" htmlFor="careerName">
              일한곳
            </label>
            <input
              type="text"
              id="careerName"
              maxLength={50}
              placeholder="일한 곳 이름을 알려주세요."
              {...register("careerName")}
            />
          </div>
          <div>
            <span className="mr-5">일한 기간</span>
            <label className="mr-5" htmlFor="careerPeriodStart">
              시작
            </label>
            <input
              type="date"
              id="careerPeriodStart"
              onKeyDown={handleKeyDown}
              {...register("careerPeriodStart")}
            />
            <span> ~ </span>
            <label className="mr-5" htmlFor="careerPeriodEnd">
              끝
            </label>
            <input
              type="date"
              id="careerPeriodEnd"
              onKeyDown={handleKeyDown}
              {...register("careerPeriodEnd")}
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="careerDetail">
              상세내용
            </label>
            <textarea
              id="careerDetail"
              placeholder="어떤 일을 하셨는지 설명해주세요."
              maxLength={1000}
              {...register("careerDetail")}
            ></textarea>
            <div>
              문항 답변 글자수 : {watch().careerDetail?.length}
              /1000자(공백포함)
            </div>
          </div>
        </fieldset>
        <fieldset className="mb-20">
          <legend className="mb-5 text-xl font-bold">
            자기소개 <span className="text-sm text-red-500">필수</span>
          </legend>
          <div>
            <label className="mr-5" htmlFor="resumeSubject">
              주제
            </label>
            <input type="text" id="resumeSubject" value="조회api" readOnly />
          </div>
          <div>
            <label className="mr-5" htmlFor="resumeContent">
              상세내용
            </label>
            <textarea
              id="resumeContent"
              placeholder="위 주제에 대해 자유롭게 서술해주세요.(최소 20자 이상)"
              maxLength={1000}
              {...register("resumeContent")}
            ></textarea>
          </div>
          <div>
            문항 답변 글자수 : {watch().resumeContent?.length}
            /1000자(공백포함)
          </div>
        </fieldset>
        <fieldset className="mb-20">
          <legend className="mb-5 text-xl font-bold">최종학력</legend>
          <div>
            <label className="mr-5" htmlFor="eduName">
              학교명
            </label>
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
            <label className="mr-5" htmlFor="eduPeriodStart">
              시작
            </label>
            <input
              type="date"
              id="eduPeriodStart"
              onKeyDown={handleKeyDown}
              {...register("eduPeriodStart")}
            />
            <label className="mr-5" htmlFor="careerPeriodEnd">
              끝
            </label>
            <input
              type="date"
              id="careerPeriodEnd"
              onKeyDown={handleKeyDown}
              {...register("eduPeriodEnd")}
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="eduMajor">
              전공
            </label>
            <input
              type="text"
              id="eduMajor"
              maxLength={20}
              placeholder="전공을 입력해주세요."
              {...register("eduMajor")}
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="eduLevel">
              년제
            </label>
            <select id="eduLevel" {...register("eduLevel")}>
              {EDULEVEL_OPTION.map((element) => {
                return (
                  <option key={element.value} value={element.value}>
                    {element.keywords}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="mr-5" htmlFor="eduStatus">
              졸업상태
            </label>
            <select id="eduStatus" {...register("eduStatus")}>
              {EDUSTATUS_OPTION.map((element) => {
                return (
                  <option key={element.value} value={element.value}>
                    {element.keywords}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
        <fieldset className="mb-20">
          <legend className="mb-5 text-xl font-bold">자격증</legend>
          <div>
            <label className="mr-5" htmlFor="certificateName">
              자격증 이름
            </label>
            <input
              type="text"
              id="certificateName"
              maxLength={20}
              placeholder="자격증 이름을 알려주세요."
              {...register("certificateName")}
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="certificatePublisher">
              발행처
            </label>
            <input
              type="text"
              id="certificatePublisher"
              maxLength={20}
              placeholder="발행처/기관을 알려주세요."
              {...register("certificatePublisher")}
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="certificateDate">
              취득일
            </label>
            <input
              type="date"
              id="certificateDate"
              onKeyDown={handleKeyDown}
              {...register("certificateDate")}
            />
          </div>
        </fieldset>

        <fieldset className="mb-20">
          <legend className="mb-5 text-xl font-bold">기타 이력서</legend>
          <div>
            <label className="mr-5" htmlFor="portfolio">
              포트폴리오
            </label>
            <input
              type="url"
              id="portfolio"
              placeholder="링크를 입력해주세요."
              {...register("portfolio")}
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="resume">
              기타 이력서
            </label>
            <input
              type="url"
              id="resume"
              placeholder="링크를 입력해주세요."
              {...register("resume")}
            />
          </div>
        </fieldset>
        <fieldset className="mb-20">
          <legend className="mb-5 text-xl font-bold">어학능력</legend>
          <div>
            <label className="mr-5" htmlFor="languageName">
              언어
            </label>
            <input
              type="text"
              id="languageName"
              maxLength={20}
              placeholder="언어를 입력해주세요."
              {...register("languageName")}
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="languageLevel">
              수준
            </label>
            <select id="languageLevel" {...register("languageLevel")}>
              {LANGUAGELEVEL_OPTION.map((element) => {
                return (
                  <option key={element.value} value={element.value}>
                    {element.keywords}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
        <fieldset className="mb-20">
          <legend className="mb-5 text-xl font-bold">수상내역</legend>
          <div>
            <label className="mr-5" htmlFor="awardsName">
              수상명
            </label>
            <input
              type="text"
              id="awardsName"
              maxLength={20}
              placeholder="수상명을 작성해주세요."
              {...register("awardsName")}
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="awardsCompany">
              수여기관
            </label>
            <input
              type="text"
              id="awardsCompany"
              maxLength={20}
              placeholder="수여기관을 입력해주세요."
              {...register("awardsCompany")}
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="awardsDate">
              수상공모일
            </label>
            <input
              type="date"
              id="awardsDate"
              onKeyDown={handleKeyDown}
              {...register("awardsDate")}
            />
          </div>
        </fieldset>
        <fieldset className="mb-20">
          <legend className="mb-5 text-xl font-bold">취업우대사항</legend>
          <div>
            <label className="mr-5" htmlFor="disability">
              장애여부
            </label>
            <input
              type="checkbox"
              id="disability"
              {...register("disability")}
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="veterans">
              국가보훈여부
            </label>
            <input type="checkbox" id="veterans" {...register("veterans")} />
          </div>
          <div>
            <label className="mr-5" htmlFor="subsidy">
              고용지원금
            </label>
            <input type="checkbox" id="subsidy" {...register("subsidy")} />
          </div>
          <div>
            <label className="mr-5" htmlFor="military">
              병역사항
            </label>
            <select id="military" {...register("military")}>
              {MILITARY_OPTION.map((element) => {
                return (
                  <option key={element.value} value={element.value}>
                    {element.keywords}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mt-10">
            <label className=" mr-5" htmlFor="agree">
              민감정보 제공에 동의합니다.
            </label>
            <input type="checkbox" id="agree" {...register("agree")} />
            <div className="mt-10 flex w-96 flex-col gap-5">
              <span className="font-bold">민감정보 제공 안내</span>
              <p className="text-xs text-slate-500">
                민감정보는 선택입력항목이며, 입력하지 않더라도 이력서 작성에
                제한을 두지 않습니다.
              </p>
              <p className="h-20  overflow-auto text-xs text-slate-500">
                1.개인정보의 수집 및 이용목적 : 효과적인 취업지원, 경력개발에
                적합한 서비스를 제공하기 위함. <br /> 2.수집하는 개인정보 항목 :
                장애여부, 국가보훈, 고용지원금, 병역사항 <br /> 3.개인정보의
                보유 및 이용기간 : 개인정보의 수집 및 이용에 대한 동의를
                철회하거나, 수집 및 이용목적이 달성되거나 이용기간이 종료한 경우
                개인정보를 지체 없이 파기 <br /> 단, 상법 등 관계법령의 규정에
                의하여 보전할 필요가 있는 경우 거래내역과 최소한의 기본정보를
                일정기간 보유
              </p>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-5 text-xl font-bold">
            나의 성격 키워드(5개 필수)
          </legend>
          {KEYWORDS_CHECK.map((element) => {
            return (
              <span key={element} className="mr-10">
                <label htmlFor="1">{element}</label>
                <input type="checkbox" name="keywords" id="1" />
              </span>
            );
          })}
        </fieldset>
      </form>
      <PolicyTerms />
      <div>
        <button
          className="mt-10 mr-10 rounded-md bg-blue-500 py-3 px-5 text-white"
          type="button"
          onClick={() => {
            if (
              confirm(
                "작성했던 정보가 초기화됩니다. 이전 단계로 이동하시겠습니까?",
              )
            ) {
              navigate(-1);
            }
          }}
        >
          이전
        </button>
        <button
          className="fixed top-0 right-0 mt-10 rounded-md bg-blue-500 py-3 px-5 text-white"
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          제출하기
        </button>
      </div>
    </div>
  );
};
export default Application;
