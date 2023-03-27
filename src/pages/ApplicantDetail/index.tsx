const ApplicantDetail = () => {
  return (
    <>
      <button>돌아가기</button>
      <section className="flex w-full justify-between">
        <div className="flex-row">
          <div className="flex items-center">
            <h1 className="text-4xl">김잡콕</h1>
            <div className="badge-primary badge">면접 제안</div>
            <button>찜</button>
            <button>삭제</button>
          </div>
          <div className="badge-container flex gap-2">
            <div className="badge">#체계적</div>
            <div className="badge-primary badge">#꼼꼼한</div>
            <div className="badge-secondary badge">#세심한</div>
          </div>
          <div>
            <span>전화번호</span> <span>010-1234-1234</span>
          </div>
        </div>
        <div className="btn-container flex gap-2">
          <button className="btn-outline btn-sm btn">채용확정</button>
          <button className="btn-outline btn-sm btn">보류하기</button>
          <label htmlFor="my-modal" className="btn-sm btn">
            알림 보내기
          </label>
          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <div className="flex items-center">
                <p className="font-bold">절차 선택</p>
                <select className="select max-w-xs">
                  <option disabled selected>
                    절차
                  </option>
                  <option>탈락입니다</option>
                  <option>어쩌구 저쩌구</option>
                  <option>어쩌구 저쩌구</option>
                  <option>어쩌구 저쩌구</option>
                  <option>어쩌구 저쩌구</option>
                </select>
              </div>
              <p className="py-4 font-bold">면접 날짜</p>
              <p className="py-4 font-bold">면접 시간</p>
              <textarea
                className="textarea
                 h-32 w-full resize-none border-black"
                placeholder="안녕하세요?"
              ></textarea>
              <div className="modal-action">
                <button className="btn">보내기</button>
                <label htmlFor="my-modal" className="btn-outline btn">
                  취소하기
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-between bg-slate-100">
        <div>면접 일정 </div>
        <div>면접 날짜</div>
        <div>면접 시간</div>
        <button className="btn-outline btn">면접 일정 수정</button>
      </div>

      <div className="timeline m-auto w-full">
        <label htmlFor="타임라인">타임라인</label>
        <div className=" bg-slate-100">
          <ul className="steps steps-vertical w-full lg:steps-horizontal">
            <li className="step-primary step">최초 지원</li>
            <li className="step-primary step">서류 합격</li>
            <li className="step">면접 제안</li>
            <li className="step">면접 합격</li>
            <li className="step">최종 합격</li>
          </ul>
        </div>
      </div>
      <div>
        <label htmlFor="평가 노트">평가 노트</label>
        <div className="bg-slate-100">평가 노트 그리기</div>
      </div>
      <div>
        <label htmlFor="지원서 내용">
          지원서 내용
          <div className="bg-slate-100">
            안녕하세요! 꼼꼼함으로 승부하는 성실한 인재 김잡콕입니다. 저는
            이러이러한 능력을 가지고 있고 해당 능력으로 어디어디에서 3년의
            실무경험을 가지고 있습니다. 제가 함께하게 된다면 이러이러한 점을
            기여할 수 있습니다. 꼭 뽑아주세요! 감사합니다.
          </div>
        </label>
      </div>
      <div className="flex justify-around">
        <div className="font-bold">
          우대사항
          <span className="badge">경력 3년</span>
          <span className="badge">자격증 보유</span>
        </div>
        <div className="font-bold">
          포트폴리오
          <span className="badge">링크 확인</span>
        </div>
        <div className="font-bold">
          기타능력
          <span className="badge">엑셀</span>
          <span className="badge">파워포인트</span>
        </div>
      </div>
    </>
  );
};
export default ApplicantDetail;
