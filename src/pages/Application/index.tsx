import { useNavigate } from "react-router-dom";
import {
  EDULEVEL_OPTION,
  EDUSTATUS_OPTION,
  KEYWORDS_CHECK,
  LANGUAGELEVEL_OPTION,
  MILITARY_OPTION,
} from "@/constants/applicant";
import FormDetail from "@components/Applicant/getFormInfo";
import PolicyTerms from "@components/Applicant/policyTerms";

const Application = () => {
  const navigate = useNavigate();

  const handleSubmitBtn = () => {
    navigate("/applicant/completion");
    // 지원서 등록 api
  };

  return (
    <div className="my-10 mx-auto w-8/12 flex-col">
      <FormDetail />
      <section className="mb-10 rounded-md rounded-lg border border-solid p-10">
        <h2 className="mb-5 text-2xl font-bold">지원자 추가정보</h2>
        <h3 className="mb-5 text-xl font-bold">
          경력 <span className="text-sm text-red-500">필수</span>
        </h3>
        <form className="mb-20">
          <div>
            <label className="mr-5" htmlFor="careerName">
              일한곳
            </label>
            <input
              type="text"
              id="careerName"
              placeholder="일한 곳 이름을 알려주세요."
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="careerPeriod">
              일한 기간
            </label>
            <input type="date" id="careerPeriod" />
            <span> ~ </span>
            <input type="date" id="careerPeriod" />
          </div>
          <div>
            <label className="mr-5" htmlFor="careerDetail">
              상세내용
            </label>
            <textarea
              id="careerDetail"
              placeholder="어떤 일을 하셨는지 설명해주세요."
            ></textarea>
          </div>
        </form>
        <h3 className="mb-5 text-xl font-bold">
          자기소개 <span className="text-sm text-red-500">필수</span>
        </h3>
        <form className="mb-20">
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
              placeholder="위 주제에 대해 자유롭게 서술해주세요."
            ></textarea>
          </div>
          <div>
            <span>문항 답변 글자수 : 1000자</span>
          </div>
        </form>
        <h3 className="mb-5 text-xl font-bold">최종학력</h3>
        <form className="mb-20">
          <div>
            <label className="mr-5" htmlFor="eduName">
              학교명
            </label>
            <input
              type="text"
              id="eduName"
              placeholder="학교명을 입력해주세요."
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="eduPeriod">
              기간
            </label>
            <input type="date" id="eduPeriod" />
            <span> ~ </span>
            <input type="date" id="eduPeriod" />
          </div>
          <div>
            <label className="mr-5" htmlFor="eduMajor">
              전공
            </label>
            <input
              type="text"
              id="eduMajor"
              placeholder="전공을 입력해주세요."
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="eduLevel">
              년제
            </label>
            <select id="eduLevel">
              {EDULEVEL_OPTION.map((element) => {
                return <option key={element}>{element}</option>;
              })}
            </select>
          </div>
          <div>
            <label className="mr-5" htmlFor="eduStatus">
              졸업상태
            </label>
            <select id="eduStatus">
              {EDUSTATUS_OPTION.map((element) => {
                return <option key={element}>{element}</option>;
              })}
            </select>
          </div>
        </form>
        <h3 className="mb-5 text-xl font-bold">자격증</h3>
        <form className="mb-20">
          <div>
            <label className="mr-5" htmlFor="certificateName">
              자격증 이름
            </label>
            <input
              type="text"
              id="certificateName"
              placeholder="자격증 이름을 알려주세요."
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="certificatePublisher">
              발행처
            </label>
            <input
              type="text"
              id="certificatePublisher"
              placeholder="발행처/기관을 알려주세요."
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="certificateDate">
              취득일
            </label>
            <input type="date" id="certificateDate" />
          </div>
        </form>
        <h3 className="mb-5 text-xl font-bold">취업우대사항</h3>
        <form className="mb-20">
          <div>
            <label className="mr-5" htmlFor="disability">
              장애여부
            </label>
            <input type="checkbox" id="disability" />
          </div>
          <div>
            <label className="mr-5" htmlFor="veterans">
              국가보훈여부
            </label>
            <input type="checkbox" id="veterans" />
          </div>
          <div>
            <label className="mr-5" htmlFor="subsidy">
              고용지원금
            </label>
            <input type="checkbox" id="subsidy" />
          </div>
          <div>
            <label className="mr-5" htmlFor="military">
              병역사항
            </label>
            <select id="military">
              {MILITARY_OPTION.map((element) => {
                return <option key={element}>{element}</option>;
              })}
            </select>
          </div>
        </form>
        <h3 className="mb-5 text-xl font-bold">기타 이력서</h3>
        <form className="mb-20">
          <div>
            <label className="mr-5" htmlFor="portfolio">
              포트폴리오
            </label>
            <input
              type="url"
              id="portfolio"
              placeholder="링크를 입력해주세요."
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="resume">
              기타 이력서
            </label>
            <input type="url" id="resume" placeholder="링크를 입력해주세요." />
          </div>
        </form>
        <h3 className="mb-5 text-xl font-bold">어학능력</h3>
        <form className="mb-20">
          <div>
            <label className="mr-5" htmlFor="languageName">
              언어
            </label>
            <input
              type="text"
              id="languageName"
              placeholder="언어를 입력해주세요."
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="languageLevel">
              수준
            </label>
            <select id="languageLevel">
              {LANGUAGELEVEL_OPTION.map((element) => {
                return <option key={element}>{element}</option>;
              })}
            </select>
          </div>
        </form>
        <h3 className="mb-5 text-xl font-bold">수상내역</h3>
        <form className="mb-20">
          <div>
            <label className="mr-5" htmlFor="awardsName">
              수상명
            </label>
            <input
              type="text"
              id="awardsName"
              placeholder="수상명을 작성해주세요."
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="awardsCompany">
              수여기관
            </label>
            <input
              type="text"
              id="awardsCompany"
              placeholder="수여기관을 입력해주세요."
            />
          </div>
          <div>
            <label className="mr-5" htmlFor="awardsDate">
              수상공모일
            </label>
            <input type="date" id="awardsDate" />
          </div>
        </form>
        <h3 className="mb-5 text-xl font-bold">나의 성격 키워드(5개 필수)</h3>
        <form>
          {KEYWORDS_CHECK.map((element) => {
            return (
              <span key={element} className="mr-10">
                <label htmlFor="1">{element}</label>
                <input type="checkbox" name="keywords" id="1" />
              </span>
            );
          })}
        </form>
      </section>
      <PolicyTerms />
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
        className="mt-10 rounded-md bg-blue-500 py-3 px-5 text-white"
        type="button"
        onClick={handleSubmitBtn}
      >
        제출하기
      </button>
    </div>
  );
};
export default Application;
