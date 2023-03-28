import { useNavigate } from "react-router-dom";
import FormDetail from "@pages/ApplicantAuth/formDetail";
import PolicyTerms from "@pages/Application/policyTerms";

const Application = () => {
  const navigate = useNavigate();
  const handleSubmitBtn = () => {
    navigate("/applicant/completion?");
    // 지원서 등록 api
  };
  return (
    <div className="my-10 mx-auto w-8/12 flex-col content-center">
      <FormDetail />
      <section>
        <h3>경력</h3>
        <form className="mb-20">
          <div>
            <label htmlFor="careerName">일한곳</label>
            <input
              type="text"
              placeholder="일한 곳 이름을 알려주세요."
              id="careerName"
            />
          </div>
          <div>
            <label htmlFor="careerPeriod">일한 기간</label>
            <input type="date" id="careerPeriod" />
            <span> ~ </span>
            <input type="date" id="careerPeriod" />
          </div>
          <div>
            <label htmlFor="careerDetail">상세내용</label>
            <textarea placeholder="어떤 일을 하셨는지 설명해주세요."></textarea>
          </div>
        </form>
        <h3>최종학력</h3>
        <form className="mb-20">
          <div>
            <label htmlFor="eduName">학교명</label>
            <input
              type="text"
              id="eduName"
              placeholder="학교명을 입력해주세요."
            />
          </div>
          <div>
            <label htmlFor="eduPeriod">기간</label>
            <input type="date" id="eduPeriod" />
            <span> ~ </span>
            <input type="date" id="eduPeriod" />
          </div>
          <div>
            <label htmlFor="eduMajor">전공</label>
            <input
              type="text"
              id="eduMajor"
              placeholder="전공을 입력해주세요."
            />
          </div>
          <div>
            <label htmlFor="eduLevel">년제</label>
            <select id="eduLevel">
              <option>초등학교</option>
              <option>중학교</option>
              <option>고등학교</option>
              <option>대학(2,3년제)</option>
              <option>대학(4년제)</option>
              <option>대학원</option>
            </select>
          </div>
          <div>
            <label htmlFor="eduStatus">졸업상태</label>
            <select id="eduStatus">
              <option>재학</option>
              <option>중퇴</option>
              <option>휴학</option>
              <option>수료</option>
              <option>졸업</option>
              <option>졸업유예</option>
            </select>
          </div>
        </form>
        <h3>자기소개</h3>
        <form className="mb-20">
          <div>
            <label>주제</label>
            <input type="text" value="조회api" readOnly />
          </div>
          <div>
            <label>주제</label>
            <textarea placeholder="위 주제에 대해 자유롭게 서술해주세요."></textarea>
          </div>
          <div>
            <span>문항 답변 글자수 :</span>
            <span>1000 자</span>
          </div>
        </form>
        <h3>자격증</h3>
        <form className="mb-20">
          <div>
            <label htmlFor="certificateName">자격증 이름</label>
            <input
              type="text"
              id="certificateName"
              placeholder="자격증 이름을 알려주세요."
            />
          </div>
          <div>
            <label htmlFor="certificatePublisher">발행처</label>
            <input
              type="text"
              id="certificatePublisher"
              placeholder="발행처/기관을 알려주세요."
            />
          </div>
          <div>
            <label htmlFor="certificateDate">취득일</label>
            <input type="date" id="certificateDate" />
          </div>
        </form>
        <h3>취업우대사항</h3>
        <form className="mb-20"></form>
        <h3>포트폴리오</h3>
        <form className="mb-20">
          <input type="url" placeholder="링크를 입력해주세요." />
        </form>
        <h3>기타이력서</h3>
        <form className="mb-20">
          <input type="url" placeholder="링크를 입력해주세요." />
        </form>
        <h3>어학능력</h3>
        <form className="mb-20">
          <div>
            <label htmlFor="languageName">언어</label>
            <input
              type="text"
              id="languageName"
              placeholder="언어를 입력해주세요."
            />
          </div>
          <div>
            <label htmlFor="languageLevel">수준</label>
            <select id="languageLevel">
              <option>상</option>
              <option>중</option>
              <option>하</option>
            </select>
          </div>
        </form>
        <h3>수상내역</h3>
        <form className="mb-20">
          <div>
            <label htmlFor="awardsName">수상명</label>
            <input
              type="text"
              id="awardsName"
              placeholder="수상명을 작성해주세요."
            />
          </div>
          <div>
            <label htmlFor="awardsCompany">수여기관</label>
            <input
              type="text"
              id="awardsCompany"
              placeholder="수여기관을 입력해주세요."
            />
          </div>
          <div>
            <label htmlFor="awardsDate">수여기관</label>
            <input type="date" id="awardsDate" />
          </div>
        </form>
        <h3>나의 성격 키워드(5개 필수)</h3>
        <form className="mb-20">
          {KEYWORDS.map((el) => {
            return (
              <div key={el}>
                <label htmlFor="1">{el}</label>
                <input type="checkbox" name="keywords" id="1" />
              </div>
            );
          })}
        </form>
      </section>
      <PolicyTerms />
      <button type="button" onClick={handleSubmitBtn}>
        작성완료
      </button>
    </div>
  );
};
export default Application;

const KEYWORDS = [
  "키워드1",
  "키워드2",
  "키워드3",
  "키워드4",
  "키워드5",
  "키워드6",
  "키워드7",
  "키워드8",
  "키워드9",
  "키워드10",
];
