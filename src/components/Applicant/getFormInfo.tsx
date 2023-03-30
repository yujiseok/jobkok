const GetFormInfo = () => {
  return (
    <>
      {/* 추후 api 값 조회하여 출력으로 변경 */}
      <section className="mb-10">
        <h1 className="mb-5 text-center text-xl font-bold">
          아기사랑 파트타이머 직원 채용
        </h1>
        <ul>
          <li className="flex gap-5 ">
            <span>지원서 접수 마감일</span>
            <p>23/03/30</p>
          </li>
          <li className="flex gap-5">
            <span>면접 가능 기간</span>
            <p>2023/03/31 ~ 2023/04/01</p>
          </li>
        </ul>
      </section>
    </>
  );
};
export default GetFormInfo;
