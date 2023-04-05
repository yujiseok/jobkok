import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { ReactComponent as Add } from "@/assets/svg/add-icon.svg";
import { ReactComponent as ArchiveTickBlue } from "@/assets/svg/archive-tick-blue.svg";
import { ReactComponent as ArchiveTick } from "@/assets/svg/archive-tick.svg";
import { ReactComponent as Calendar } from "@/assets/svg/calendar.svg";
import { ReactComponent as ChevronRight } from "@/assets/svg/chevron-right.svg";
import { ReactComponent as HeartMemoji } from "@/assets/svg/heart-memoji.svg";
import { ReactComponent as Trash } from "@/assets/svg/trash.svg";
import { LIMIT } from "@/constants/pagination";
import useDnD from "@/lib/hooks/useDnD";
import usePagination from "@/lib/hooks/usePagination";
import formatDate from "@/lib/utils/formatDate";
import makeString from "@/lib/utils/makeString";
import talentByProcedure from "@/lib/utils/talentByProcedure";
import type { IKanban } from "@/types/talent";
import Banner from "@components/Common/Banner";
import InterviewBadge from "@components/Talent/InterviewBadge";
import NumberBadge from "@components/Talent/NumberBadge";
import PreferentialBadge from "@components/Talent/PreferentialBadge";
import TKeywordBadge from "@components/Talent/TKeywordBadge";

const TalentStatus = () => {
  const [data, onDragEnd] = useDnD(kanbanData);
  const { page, offset, handleClick } = usePagination();
  const totalPage = data && Math.ceil(data?.length / LIMIT);
  return (
    <>
      <Banner className="h-16">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
          <select className="">
            <option>스마트스토어 상세페이지 디자이너 지원서 폼</option>
            <option>찜된 탈락인재</option>
            <option>영구삭제 인재</option>
          </select>

          <button className="SubHead2Semibold rounded-md bg-blue-50 py-2 px-5 text-blue-400">
            폼 마감하기
          </button>
        </div>
      </Banner>
      <section className="pt-[6.25rem]">
        <h4 className="Head3Semibold flex items-center gap-1">
          채용 진행 현황
        </h4>
        <p className="SubHead1Semibold mt-6 mb-12 text-gray-500">
          한 눈에 칸반보드에서 인재 현황을 확인해보세요.
        </p>
      </section>
      <section>
        <DragDropContext onDragEnd={onDragEnd}>
          {/* grid grid-cols-3 grid-rows-1 */}
          <div className="flex items-start justify-between gap-6">
            {data.map((applicant) => (
              <Droppable key={applicant.id} droppableId={applicant.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 ${
                      applicant.applicant.length ? "pb-12" : "pb-0"
                    }`}
                  >
                    <div className="flex items-center justify-between pr-4">
                      <div className="flex items-center py-5">
                        <span className="SubHead1Semibold">
                          {applicant.title}
                        </span>
                        <NumberBadge id={applicant.id}>
                          {applicant.applicant.length}
                        </NumberBadge>
                      </div>
                      {applicant.id === "면접" ? (
                        <button>
                          <Calendar />
                        </button>
                      ) : applicant.id === "최종조율" ? (
                        <label
                          htmlFor="modal"
                          className={`cursor-pointer rounded-md border bg-gray-0 px-5 py-[0.3438rem] ${
                            applicant.applicant.length
                              ? " border-blue-500  text-blue-500"
                              : "pointer-events-none border-gray-200 text-gray-200"
                          }`}
                        >
                          채용 확정
                        </label>
                      ) : null}
                    </div>

                    <div className="flex max-h-[54.75rem] flex-col gap-4 overflow-y-auto overflow-x-hidden py-1 pr-3">
                      {applicant.applicant.map((item, index) => (
                        <Draggable
                          key={item.applyName}
                          draggableId={item.applyName}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className={`rounded-xl bg-gray-0 px-4 py-5 shadow-job  ${
                                snapshot.isDragging
                                  ? "bg-gray-50/95"
                                  : "bg-gray-0"
                              }`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <Link
                                  to={`/talent/detail/${item.applyId}`}
                                  className="flex items-center gap-2"
                                >
                                  <div className="rounded-md bg-blue-50">
                                    <HeartMemoji />
                                  </div>
                                  <span className="SubHead1Semibold">
                                    {item.applyName}
                                  </span>
                                  <ChevronRight />
                                </Link>

                                <button>
                                  <ArchiveTick className="text-gray-300" />
                                </button>
                              </div>
                              <div className="Caption1Semibold flex gap-6px pt-4 pb-8">
                                <PreferentialBadge>
                                  우대사항 <span>2</span>/<span>5</span>
                                </PreferentialBadge>
                                <PreferentialBadge>
                                  키워드 <span>{item.keywords.length}</span>/
                                  <span>5</span>
                                </PreferentialBadge>
                              </div>
                              <div className="flex items-center justify-between">
                                <time
                                  className="Caption1Medium text-gray-300"
                                  dateTime={new Date().toLocaleDateString()}
                                >
                                  {formatDate(item.createdTime)}
                                </time>

                                <InterviewBadge>
                                  면접 D-16 20:00 예정
                                </InterviewBadge>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </section>

      <section className="pt-[6.25rem]">
        <h4 className="Head3Semibold flex items-center gap-1">
          전체 인재 현황
        </h4>
        <div className="mt-14 mb-3 flex items-center gap-4">
          <h6 className="Head4Semibold">빠른 단계 추가</h6>
          <span className="SubHead1Semibold text-gray-500">
            아래에서 인재를 선택하고 빠르게 채용단계를 넘겨보세요 (한번에 최대
            4명)
          </span>
        </div>

        <div
          className="mb-6 flex items-center justify-between rounded-[20px] border-[1.5px] border-gray-50 bg-gray-0 px-10
          py-8"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4 rounded-lg border border-gray-50 bg-gray-0 py-[6px] px-2">
              <HeartMemoji className="rounded-md bg-gray-50 " />
              <p className="SubHead1Medium text-gray-900">김잡콕</p>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-gray-50 bg-gray-0 py-[6px] px-2">
              <HeartMemoji className="rounded-md bg-gray-50 " />
              <p className="SubHead1Medium text-gray-900">김잡콕</p>
            </div>
            <p className="Head4Semibold ml-6 text-gray-600">님을</p>
          </div>

          <div className="flex items-center gap-16">
            <div className="flex items-center gap-6">
              <select className="select max-w-xs bg-blue-50 text-blue-500 focus:border-transparent focus:outline-none">
                <option disabled>단계를 선택하세요</option>
                <option>면접 합격</option>
              </select>

              <span className="Head4Medium text-gray-600">단계로</span>
            </div>

            <button className="flex items-center gap-3 rounded-lg bg-blue-500 px-14 py-3 text-gray-0 shadow-blue">
              추가하기 <Add />
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-[20px] border-[1.5px] border-gray-50 bg-gray-0 p-11">
        <div className="flex justify-between gap-4">
          <select className="">
            <option selected>전체 인재</option>
            <option>찜된 탈락 인재</option>
            <option>영구 삭제 인재</option>
          </select>
          <input type="text" placeholder="인재를 검색해보세요" className="" />
        </div>

        <div className="mt-16">
          <table className="table w-full">
            <thead className="">
              <tr>
                {TH_ITEMS.map((item) => (
                  <th
                    key={item}
                    className="SubHead1Medium bg-white text-gray-600"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allApplicant?.slice(offset, offset + LIMIT).map((item) => (
                <tr key={item.applyId} className="border-b border-gray-50">
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox-primary checkbox"
                    />
                  </td>
                  <th>
                    <div className="flex items-center gap-4">
                      <HeartMemoji /> <span>{item.applyName}</span>
                    </div>
                  </th>
                  <td>
                    <div className="flex gap-6px">
                      {item.keywords.map((keyword) => (
                        <TKeywordBadge key={keyword}>{keyword}</TKeywordBadge>
                      ))}
                    </div>
                  </td>

                  <td className="SubHead2Medium text-gray-500">
                    {formatDate(item.createdTime)}
                  </td>

                  <td>
                    <div className="flex gap-4">
                      <button>
                        {item.wish ? <ArchiveTickBlue /> : <ArchiveTick />}
                      </button>
                      <button>
                        <Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ul className="mt-12 flex justify-center gap-14">
            <li>
              <button
                disabled={page === 1}
                onClick={() => {
                  handleClick(makeString(page - 1));
                }}
              >
                Prev
              </button>
            </li>
            <ul className="flex gap-8">
              {Array(totalPage)
                .fill(null)
                .map((_, i) => {
                  return (
                    <li key={i + 1}>
                      <button
                        onClick={() => handleClick(makeString(i + 1))}
                        className={`${i + 1 === page ? "text-blue-500" : ""}`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  );
                })}
            </ul>
            <li>
              <button
                disabled={page === totalPage}
                onClick={() => {
                  handleClick(makeString(page + 1));
                }}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

const mockData = {
  state: 200,
  result: "success",
  data: [
    {
      applyId: "1",
      applyName: "김김김",
      applyPhone: "010-1111-1111",
      applyEmail: "applyTest@test.com",
      resumeContent: "저는 홍길동 입니다 !",
      applyPortfolio: "https://portfolio.portfolio",
      applyProcedure: "면접진행",
      evaluation: "나쁘지 않음",
      pass: false,
      createdTime: "2023-03-21T13:04:30",
      applyDelete: false,
      keywords: [""],
      wish: true,
    },
    {
      applyId: "2",
      applyName: "김이박",
      applyPhone: "010-1111-1111",
      applyEmail: "applyTest@test.com",
      resumeContent: "저는 길동홍 입니다 !",
      applyPortfolio: "https://portfolio.portfolio",
      applyProcedure: "서류제출",
      evaluation: "나쁘지 않음",
      pass: false,
      createdTime: "2023-03-21T13:04:30",
      applyDelete: false,
      keywords: [""],
      wish: true,
    },
    {
      applyId: "3",
      applyName: "존안",
      applyPhone: "010-2222-2222",
      applyEmail: "applyTest2@test.com",
      resumeContent: "저는 홍길동 입니다 !",
      applyPortfolio: "https://portfolio.portfolio",
      applyProcedure: "서류제출",
      evaluation: "별로임",
      pass: false,
      createdTime: "2023-03-21T13:31:30",
      applyDelete: false,
      keywords: [""],
      wish: false,
    },
    {
      applyId: "4",
      applyName: "김철수",
      applyPhone: "010-2222-2222",
      applyEmail: "applyTest2@test.com",
      resumeContent: "저는 홍길동 입니다 !",
      applyPortfolio: "https://portfolio.portfolio",
      applyProcedure: "최종조율",
      evaluation: "별로임",
      pass: false,
      createdTime: "2023-03-21T13:31:30",
      applyDelete: false,
      keywords: [""],
      wish: false,
    },
  ],
};

const kanbanData: IKanban[] = talentByProcedure(mockData);
console.log(kanbanData);

const numberArr = Array(6)
  .fill(1)
  .map((v, i) => i + 1);

const randomNumber1 = [...numberArr].sort(() => 0.5 - Math.random());
const randomNumber2 = [...numberArr].sort(() => 0.5 - Math.random());
const TH_ITEMS = ["선택", "인재", "키워드", "지원일", "액션"];

const allApplicant = [
  {
    applyId: "1",
    applyName: "홍길동",
    applyPhone: "010-1111-1111",
    applyEmail: "applyTest@test.com",
    resumeContent: "저는 홍길동 입니다 !",
    applyPortfolio: "https://portfolio.portfolio",
    applyProcedure: "면접",
    evaluation: "나쁘지 않음",
    pass: false,
    createdTime: "2023-03-21T13:04:30",
    applyDelete: false,
    keywords: ["keyword1", "keyword2"],
    wish: true,
  },
  {
    applyId: "2",
    applyName: "김민수",
    applyPhone: "010-2222-2222",
    applyEmail: "applyTest2@test.com",
    resumeContent: "저는 홍길동 입니다 !",
    applyPortfolio: "https://portfolio.portfolio",
    applyProcedure: "서류전형",
    evaluation: "별로임",
    pass: false,
    createdTime: "2023-03-21T13:31:30",
    applyDelete: false,
    keywords: ["keyword1", "keyword2"],
    wish: false,
  },
];

export default TalentStatus;
