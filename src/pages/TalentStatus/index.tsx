import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link, useSearchParams } from "react-router-dom";
import { ReactComponent as Add } from "@/assets/svg/add-icon.svg";
import { ReactComponent as ArchiveTickBlue } from "@/assets/svg/archive-tick-blue.svg";
import { ReactComponent as ArchiveTick } from "@/assets/svg/archive-tick.svg";
import { ReactComponent as ArrowRight } from "@/assets/svg/arrow-right.svg";
import { ReactComponent as Calendar } from "@/assets/svg/calendar.svg";
import { ReactComponent as ChevronRight } from "@/assets/svg/chevron-right.svg";
import { ReactComponent as HeartMemoji } from "@/assets/svg/heart-memoji.svg";
import { ReactComponent as Search } from "@/assets/svg/search.svg";
import { ReactComponent as Trash } from "@/assets/svg/trash.svg";
import { LIMIT } from "@/constants/pagination";
import useAllTalentQuery from "@/lib/hooks/useAllTalentQuery";
import useDnD from "@/lib/hooks/useDnD";
import useFormList from "@/lib/hooks/useFormList";
import useFormListQuery from "@/lib/hooks/useFormListQuery";
import usePagination from "@/lib/hooks/usePagination";
import useTalentByProcedureQuery from "@/lib/hooks/useTalentByProcedureQuery";
import ceilPage from "@/lib/utils/ceilPage";
import formatDate from "@/lib/utils/formatDate";
import talentToProcedure from "@/lib/utils/talentByProcedure";
import type { IKanbanBase, ITalent } from "@/types/talent";
import Banner from "@components/Common/Banner";
import ModalForLater from "@components/Common/ModalForLater";
import InterviewBadge from "@components/Talent/InterviewBadge";
// import KanbanHeader from "@components/Talent/KanbanHeader";
import NumberBadge from "@components/Talent/NumberBadge";
import Pagination from "@components/Talent/Pagination";
import PreferentialBadge from "@components/Talent/PreferentialBadge";
import TKeywordBadge from "@components/Talent/TKeywordBadge";

const TalentStatus = () => {
  const { page, offset, handleClick } = usePagination();
  const [searchParams, setSearchParams] = useSearchParams();
  const applyProcedure = searchParams.get("applyProcedure") ?? "전체인재";
  const formData = useFormListQuery();

  const [recruitId, handleChangeFormList] = useFormList(formData);

  const [talent, setTalent] = useState<ITalent[]>([]);
  const handleTalentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: ITalent,
  ) => {
    if (e.target.checked && talent.length < 4) {
      setTalent((prev) => [...prev, item]);
    } else {
      const newTalent = [...talent].filter(
        (talent) => talent.applyId !== item.applyId,
      );
      e.target.checked = false;
      setTalent(newTalent);
    }
  };

  const { allTalent, allTalentRefetch } = useAllTalentQuery(recruitId);

  const totalPages =
    allTalent && allTalent.data !== null ? ceilPage(allTalent?.data.length) : 0; // 전체 인재로?

  const kanbanData: IKanbanBase[] = talentToProcedure(allTalent);
  const { onDragEnd } = useDnD(kanbanData);

  const { talentByProcedure, talentByProcedureRefetch } =
    useTalentByProcedureQuery(recruitId, applyProcedure);
  // const { talentByProcedure: docsTalent } = useTalentByProcedureQuery(
  //   recruitId,
  //   "서류제출",
  // );
  // const { talentByProcedure: interviewTalent } = useTalentByProcedureQuery(
  //   recruitId,
  //   "면접",
  // );
  // const { talentByProcedure: finalTalent } = useTalentByProcedureQuery(
  //   recruitId,
  //   "최종조율",
  // );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      applyProcedure: e.target.value,
    });
  };

  // console.log({ docsTalent, interviewTalent, finalTalent });

  useEffect(() => {
    if (applyProcedure === "전체인재") {
      allTalentRefetch();
    } else {
      talentByProcedureRefetch({
        queryKey: ["procedure", recruitId, applyProcedure],
      });
    }
  }, [applyProcedure, recruitId]);

  //  폼 없을 시
  if (formData?.result === "FAIL") {
    return (
      <Banner className="h-[25rem]">
        <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center">
          <h1 className="Head2Semibold">
            안녕하세요, <span>잡콕미술학원</span>님!
          </h1>
          <p className="Head4/Semibold Head4Semibold mt-[6px] mb-9">
            첫 지원서 폼 만들고 편한 채용관리하세요!
          </p>
          <Link
            to="/form/new"
            className="flex items-center gap-2 rounded-lg border border-blue-500 bg-gray-0 px-16 py-2 text-blue-500"
          >
            만들러 가기 <ArrowRight />
          </Link>
        </div>
      </Banner>
    );
  }

  console.log(talentByProcedure);

  return (
    <>
      <Banner className="h-16">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
          <select
            className="bg-transparent pr-3 outline-none"
            onChange={handleChangeFormList}
          >
            {formData?.data !== null &&
              formData?.data.map((form) => (
                <option key={form.id} value={form.id} className="text-gray-900">
                  {form.title}
                </option>
              ))}
          </select>

          <button className="SubHead2Semibold rounded-md bg-blue-50 py-2 px-5 text-blue-400">
            폼 마감하기
          </button>
        </div>
      </Banner>

      <section className="mt-20">
        <h4 className="Head3Semibold mb-6">채용 진행 현황</h4>
        <div className="mt-14 mb-5 flex justify-between">
          <p className="SubHead1Semibold text-gray-400">
            한 눈에 칸반보드에서 인재 현황을 확인해보세요. 인재카드를
            Drag&Drop을 통해 자유롭게 이동해보세요.
          </p>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex items-start justify-between gap-6">
            {kanbanData.map((kanban) => (
              <Droppable key={kanban.title} droppableId={kanban.title}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 ${
                      kanban.applicant.length ? "pb-12" : "pb-0"
                    }`}
                  >
                    <div className="flex items-center justify-between pr-4">
                      <div className="flex items-center py-5">
                        <span className="SubHead1Semibold">{kanban.title}</span>
                        <NumberBadge procedure={kanban.title}>
                          {kanban.applicant.length}
                        </NumberBadge>
                      </div>
                      {kanban.title === "면접" ? (
                        <button>
                          <Calendar />
                        </button>
                      ) : kanban.title === "최종조율" ? (
                        <label
                          htmlFor="modal"
                          className={`cursor-pointer rounded-md border bg-gray-0 px-5 py-[0.3438rem] ${
                            kanban.applicant.length
                              ? " border-blue-500  text-blue-500"
                              : "pointer-events-none border-gray-200 text-gray-200"
                          }`}
                        >
                          채용 확정
                        </label>
                      ) : null}
                    </div>

                    <div className="flex max-h-[54.75rem] flex-col gap-4 overflow-y-auto overflow-x-hidden py-1 pr-3">
                      {kanban.applicant.map((item, index) => (
                        <Draggable
                          key={item.applyId}
                          draggableId={item.applyId?.toString() as string}
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
                                  키워드 <span>{item.keywordList.length}</span>/
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

                                {/* <InterviewBadge>
                                      면접 D-16 20:00 예정
                                    </InterviewBadge> */}
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
        <div className="mt-14 mb-5 flex items-center gap-4">
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
            {talent.map((item) => (
              <div
                key={item.applyId}
                className="flex items-center gap-4 rounded-lg border border-gray-50 bg-gray-0 py-[6px] px-2"
              >
                <HeartMemoji className="rounded-md bg-gray-50 " />
                <p className="SubHead1Medium text-gray-900">{item.applyName}</p>
              </div>
            ))}
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
          <select
            className="pr-2 outline-none"
            value={applyProcedure}
            onChange={handleChange}
          >
            <option value="전체인재">전체 인재</option>
            {APPLY_PROCEDURE.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <form
            // onSubmit={handleSearchBar}
            className="SubHead1Medium mx-6 flex justify-between rounded-md bg-blue-25 text-gray-400"
          >
            <label htmlFor="searchBar" className="w-full py-4 px-6">
              <input
                id="searchBar"
                placeholder="인재를 검색해보세요"
                className="autofill:none h-full w-full bg-transparent focus:outline-none"
                // ref={searchInput}
              />
            </label>
            <button className="mr-6">
              <Search />
            </button>
          </form>
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
              {allTalent?.data?.slice(offset, offset + LIMIT).map((item) => (
                <tr key={item.applyId} className="border-b border-gray-50">
                  <td>
                    <input
                      type="checkbox"
                      className="h-5 w-5 border-gray-400 checked:bg-blue-500"
                      onChange={(e) => handleTalentChange(e, item)}
                    />
                  </td>
                  <th>
                    <div className="flex items-center gap-4">
                      <HeartMemoji /> <span>{item.applyName}</span>
                    </div>
                  </th>
                  <td>
                    <div className="flex gap-6px">
                      {item.keywordList.map((keyword) => (
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
          <Pagination totalPages={totalPages} />
        </div>
      </section>
      <ModalForLater id="modal" />
    </>
  );
};

const TH_ITEMS = ["선택", "인재", "키워드", "지원일", "액션"];

const APPLY_PROCEDURE = ["서류제출", "면접", "최종조율"];

export default TalentStatus;
