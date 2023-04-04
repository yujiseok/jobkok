import AsideBox from "./AsideBox";
import DefDesc from "./DefDesc";
import DefTerm from "./DefTerm";

const GetFormInfo = () => {
  return (
    <>
      {/* 추후 api 값 조회하여 출력으로 변경 */}
      <AsideBox className="pt-[26px] pb-5">
        <h2 className="Head4Semibold mb-4 text-gray-900">지원서 일정</h2>
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
    </>
  );
};
export default GetFormInfo;
