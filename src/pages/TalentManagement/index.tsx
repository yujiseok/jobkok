import { Link } from "react-router-dom";

const TalentManagement = () => {
  return (
    <>
      {/* 헤더 */}
      <h1>인재 관리</h1>
      <br />
      {/* 채용링크 생성 전 */}
      {/* 우대사항인재 */}
      <section>
        <h4>잡콕 인재(우대사항인재) 추천</h4>
        {/* Bg 컴포넌트 */}
        <div>
          <h4>잡콕 첫 사용이시군요! 채용링크를 만들어보세요.</h4>

          <Link to={""}>채용링크 바로 만들기</Link>
        </div>
      </section>
      <br />
      {/* 키워드추천인재 */}
      <section>
        <h4>키워드 인재 추천라인</h4>
        <div>
          <h4>잡콕 첫 사용이시군요! 채용링크를 만들어보세요.</h4>

          <Link to={""}>채용링크 바로 만들기</Link>
        </div>
      </section>
      <br />
      {/* 채용진행현황 */}
      <section>
        <div className="flex justify-between">
          <h4>채용 진행 현황</h4>
          <Link to={""}>관리하기</Link>
        </div>

        <div className="flex">
          <div>
            지원 접수 <span>0</span>
          </div>
          <div>
            서류 합격 <span>0</span>
          </div>
          <div>
            면접 제안 <span>0</span>
          </div>
        </div>
      </section>
    </>
  );
};
export default TalentManagement;
