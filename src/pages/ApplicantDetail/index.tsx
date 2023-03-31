import { Link } from "react-router-dom";

const ApplicantDetail = () => {
  return (
    <>
      <div className="breadcrumbs flex justify-end text-sm">
        <ul>
          <li>
            <Link to="/talent/management">인재 관리</Link>
          </li>
          <li>
            <Link to="/talent/status">채용 진행 현황</Link>
          </li>
          <li>인재 상세페이지</li>
        </ul>
      </div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">인재 상세페이지</h2>
          <p>
            인재 상세 정보를 확인하고 한 곳에서 채용 및 탈락 처리를 할 수
            있습니다.
          </p>
        </div>
        <div>
          <button className="btn">탈락처리</button>
          <button className="btn">개별 알림 보내기</button>
        </div>
      </div>
      <section className="flex gap-4">
        <div className="flex-1">
          <div className="flex justify-between rounded-md bg-slate-200">
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <img
                  src="https://static.wanted.co.kr/open_profile/avatar/7e2e5de776434647748ff9a0da9b6ae3bf9be13eeb40db398aa794817aa6fb5c"
                  alt="profile"
                />
              </div>
            </div>
            <div>이현서</div>
            <button>채용 확정</button>
          </div>
          <div className="rounded-md bg-amber-500">
            타임라인
            <p>인재의 채용 절차단계를 확인해보세요</p>
            <ul className="steps w-full ">
              <li className="step-primary step">
                최초 접수
                <br />
                2022.02.04
              </li>
              <li className="step-primary step">
                서류 합격 <br />
                2022.02.04
              </li>
              <li className="step">
                면접 <br />
                2022.02.04
              </li>
              <li className="step">최종합격</li>
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <div className="min-h-16 flex rounded-md bg-lime-300">
            면접 관련 정보
            <div>
              면접 날짜<span>미정</span>
            </div>
            <div>
              면접 시간<span>미정</span>
            </div>
          </div>
          <div className="rounded-md  bg-orange-200">
            평가노트
            <p>인재의 전반적인 평가와 인상을 작성해보세요</p>
            <textarea
              placeholder="입력해 주세요"
              className="textarea-bordered textarea textarea-lg w-full resize-none"
              maxLength={1000}
            ></textarea>
          </div>
        </div>
      </section>
      <div>
        지원서 내용
        <p>
          인재가 작성하지 않은 우대사항 항목은 숨김 처리되며, 필요시 열어볼 수
          있습니다.
        </p>
      </div>
    </>
  );
};
export default ApplicantDetail;
