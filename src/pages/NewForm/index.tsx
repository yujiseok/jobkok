import { ReactComponent as IconChevronLeft } from "@/assets/svg/chevron-left.svg";
import { ReactComponent as IconEdit } from "@/assets/svg/edit-icon.svg";
import { KEYWORDS_CHECK } from "@/constants/applicant";
import ContentsBox from "@components/NewForm/ContentsBox";
import RequiredBadge from "@components/NewForm/RequiredBadge";

const NewForm = () => {
  return (
    <div className="p-16">
      <div className="mb-[63px] flex justify-between">
        <IconChevronLeft />
        <div className="flex justify-center gap-3">
          <span className="SubHead2Semibold h-[28px] w-[84px] rounded border border-gray-50 bg-gray-0 py-1 px-1.5 text-center text-blue-400">
            접수 진행중
          </span>
          <span className="SubHead2Semibold h-[28px] w-[84px] rounded bg-blue-400 p-1.5 text-center text-blue-25">
            SELF
          </span>
          <h2>
            <input
              className="h-[46px] w-full rounded-lg border border-gray-100 bg-gray-0 px-6 py-3.5"
              type="text"
              id="applicationTitle"
              placeholder="폼 이름을 입력해주세요."
            />
          </h2>
          <IconEdit />
        </div>
        <div>
          <button
            className="SubHead1Semibold mr-4 rounded-lg bg-blue-50 py-2.5 px-6 text-blue-400"
            type="button"
          >
            임시저장
          </button>
          <button
            className="SubHead1Semibold rounded-lg bg-error-50 py-2.5 px-6 text-error-400"
            type="button"
          >
            삭제
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <ContentsBox className="h-[71px] gap-6">
          <h3 className="SubHead1Semibold text-gray-800">생성된 지원서 링크</h3>
          <p className="SubHead2Medium text-gray-300">
            폼 작성 완료 후 생성됩니다.
          </p>
        </ContentsBox>
        <ContentsBox>
          <form className="flex flex-col gap-4">
            <fieldset className="flex items-center gap-6">
              <label
                className="SubHead1Semibold w-[116px] text-gray-800"
                htmlFor="applicationTitle"
              >
                지원서 이름
              </label>
              <input
                className="h-[46px] w-[700px] rounded-lg border border-gray-100 bg-gray-0 px-6 py-3.5"
                type="text"
                id="applicationTitle"
                placeholder="인재에게 보일 지원서 이름을 작성해주세요."
              />
            </fieldset>
            <fieldset className="flex items-center gap-6">
              <label
                className="SubHead1Semibold w-[116px] text-gray-800"
                htmlFor="interviewPeriod"
              >
                면접가능 기간
              </label>
              <input type="date" id="interviewPeriod" />
            </fieldset>
            <fieldset className="flex items-center gap-6">
              <label
                className="SubHead1Semibold w-[116px] text-gray-800"
                htmlFor="applicationPeriod"
              >
                지원서 접수 마감일
              </label>
              <input type="date" id="applicationPeriod" />
            </fieldset>
          </form>
        </ContentsBox>
        <ContentsBox className="flex flex-col items-baseline gap-4">
          <h3 className="SubHead1Semibold text-gray-800">인재 필수 수집정보</h3>
          <div className="flex gap-1.5">
            <RequiredBadge>이름</RequiredBadge>
            <RequiredBadge>전화번호</RequiredBadge>
            <RequiredBadge>이메일</RequiredBadge>
          </div>
        </ContentsBox>
        <ContentsBox className="mb-10">
          <section className="mb-10">
            <h3 className="SubHead1Semibold mb-10 text-gray-800">
              인재 추가 정보
            </h3>
            <p>디자인 변경중</p>
          </section>
        </ContentsBox>
      </div>
      <ContentsBox className="mb-[52px] flex flex-col gap-8 py-[68px]">
        <div className="flex flex-col items-center gap-3">
          <h3 className="Head4Semibold text-black">추천 인재 키워드</h3>
          <p className="SubHead2Medium text-gray-400">
            10개 중 최소 5개 선택 가능합니다.
          </p>
        </div>
        <div className="grid h-[108px] max-w-[820px] grid-cols-5 gap-5">
          {KEYWORDS_CHECK.map((keyword) => (
            <button
              className="SubHead1Semibold h-[44px] w-[148px] rounded-lg border-[1.5px] border-gray-100 py-2.5 text-gray-200"
              key={keyword}
              type="button"
            >
              {keyword}
            </button>
          ))}
        </div>
      </ContentsBox>
      <div className="flex flex-col items-center justify-center gap-[29px]">
        <div className="flex gap-2">
          <label
            className="SubHead1Medium order-2 text-gray-400"
            htmlFor="agree"
          >
            기본설정 외에 입력하신 채용 공고가 다른 기업에게 노출될 수 있다는
            사실에 동의합니다.
          </label>
          <input className="order-1" type="checkbox" id="agree" />
        </div>
        <button
          className="SubHead1Semibold h-11 w-[106px] rounded-lg bg-gray-200 px-6 py-2.5 text-gray-0"
          type="button"
        >
          작성완료
        </button>
      </div>
    </div>
  );
};
export default NewForm;
