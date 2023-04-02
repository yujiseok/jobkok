import { KEYWORDS_CHECK } from "@/constants/applicant";

const NewForm = () => {
  return (
    <div>
      <div>
        <span>뒤로가기</span>
        <span>접수 진행중</span>
        <span>SELF</span>
        <h2>
          <input type="text" placeholder="폼 이름을 입력해주세요." />
        </h2>
        <span>편집아이콘</span>
        <div>
          <button type="button">임시저장</button>
          <button type="button">삭제</button>
        </div>
      </div>
      <div>
        <h3>생성된 지원서 링크</h3>
        <p>폼 작성 완료 후 생성됩니다.</p>
      </div>
      <form>
        <fieldset>
          <label htmlFor="applicationTitle">지원서 이름</label>
          <input
            type="text"
            id="applicationTitle"
            placeholder="인재에게 보일 지원서 이름을 작성해주세요."
          />
        </fieldset>
        <fieldset>
          <label htmlFor="interviewPeriod">면접가능 기간</label>
          <input type="date" id="interviewPeriod" />
        </fieldset>
        <fieldset>
          <label htmlFor="applicationPeriod">지원서 접수 마감일</label>
          <input type="date" id="applicationPeriod" />
        </fieldset>
      </form>
      <div>
        <h3>인재 필수 수집정보</h3>
        <span>인재 추가 정보</span>
        <span>전화번호</span>
        <span>이메일</span>
      </div>
      <section>
        <h3>인재 추가 정보</h3>
      </section>
      <div>
        <div>
          <h3>추천 인재 키워드</h3>
          <p>10개 중 최소 5개 선택 가능합니다.</p>
        </div>
        <div>
          {KEYWORDS_CHECK.map((keyword) => (
            <button key={keyword} type="button">
              {keyword}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label>
          기본설정 외에 입력하신 채용 공고가 다른 기업에게 노출될 수 있다는
          사실에 동의합니다.
        </label>
        <input type="checkbox" />
        <button type="button">작성완료</button>
      </div>
    </div>
  );
};
export default NewForm;
