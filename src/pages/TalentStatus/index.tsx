import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link, useSearchParams } from "react-router-dom";
import { editTalentByProcedure } from "@/api/talent";
import { assortFailTalent } from "@/api/talentDetail";
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
import useLikeMutate from "@/lib/hooks/useLikeMutate";
import usePagination from "@/lib/hooks/usePagination";
import useTalentByProcedureQuery from "@/lib/hooks/useTalentByProcedureQuery";
import formatDate from "@/lib/utils/formatDate";
import talentToProcedure from "@/lib/utils/talentByProcedure";
import type { IKanbanBase, ITalent } from "@/types/talent";
import Banner from "@components/Common/Banner";
import ModalForLater from "@components/Common/ModalForLater";
// import InterviewBadge from "@components/Talent/InterviewBadge";
import Kanban from "@components/Talent/Kanban";
import { KanbanBoard } from "@components/Talent/KanbanBoard";
import KanbanHeader from "@components/Talent/KanbanHeader";
import NumberBadge from "@components/Talent/NumberBadge";
import Pagination from "@components/Talent/Pagination";
import PreferentialBadge from "@components/Talent/PreferentialBadge";
import TKeywordBadge from "@components/Talent/TKeywordBadge";

const TalentStatus = () => {
  const [talent, setTalent] = useState<ITalent[]>([]);
  const [applyStep, setApplyStep] = useState("서류제출");
  const { offset } = usePagination();
  const [searchParams, setSearchParams] = useSearchParams();
  const applyProcedure = searchParams.get("applyProcedure") ?? "전체";
  const formData = useFormListQuery();
  const { likeMutate } = useLikeMutate();
  const [recruitId, handleChangeFormList] = useFormList(formData);
  const { allTalent, allTalentRefetch } = useAllTalentQuery(recruitId);
  const { talentByProcedure, talentByProcedureRefetch } =
    useTalentByProcedureQuery(recruitId, applyProcedure);

  const kanbanData: IKanbanBase[] = talentToProcedure(allTalent);
  const { onDragEnd } = useDnD(kanbanData);

  const queryClient = useQueryClient();
  const { mutate: deleteMutate, data } = useMutation(assortFailTalent, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

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
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      applyProcedure: e.target.value,
    });
  };
  const handleChangeStep = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setApplyStep(e.target.value);
  };

  // 추후 useMutation 처리
  const multipleEdit = async () => {
    for (let i = 0; i < talent.length; i++) {
      try {
        const res = await editTalentByProcedure(talent[i].applyId, applyStep);
        if (res.state === 200) {
          allTalentRefetch();
          talentByProcedureRefetch();
          setTalent([]);
          // alert("채용 단계 수정이 성공하였습니다.");
        }
      } catch (error) {
        alert("채용 단계 수정이 실패하였습니다.");
        return;
      }
    }
  };

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

        <Kanban allTalent={allTalent} likeMutate={likeMutate} />
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
              <select
                className="outline-none"
                value={applyStep}
                onChange={handleChangeStep}
              >
                <option value="서류제출">서류제출</option>
                <option value="면접">면접</option>
                <option value="최종조율">최종조율</option>
              </select>

              <span className="Head4Medium text-gray-600">단계로</span>
            </div>

            <button
              disabled={talent.length < 1}
              className="flex items-center gap-3 rounded-lg bg-blue-500 px-14 py-3 text-gray-0 shadow-blue disabled:bg-gray-300"
              onClick={multipleEdit}
            >
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
                className="h-full w-full bg-transparent focus:outline-none"
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
              {(applyProcedure === "전체" ? allTalent : talentByProcedure)?.data
                ?.filter((talent) => talent.failApply !== true)
                ?.slice(offset, offset + LIMIT)
                .map((item) => (
                  <tr key={item.applyId} className="border-b border-gray-50">
                    <td>
                      <input
                        type="checkbox"
                        className="h-5 w-5 border-gray-400 checked:bg-blue-500"
                        onChange={(e) => handleTalentChange(e, item)}
                      />
                    </td>
                    <th>
                      <Link to={`/talent/detail/${item.applyId}`}>
                        <div className="flex items-center gap-4">
                          <HeartMemoji /> <span>{item.applyName}</span>
                        </div>
                      </Link>
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
                        <button onClick={() => likeMutate(item.applyId)}>
                          {item.wish ? <ArchiveTickBlue /> : <ArchiveTick />}
                        </button>
                        <button onClick={() => deleteMutate(item.applyId)}>
                          <Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {applyProcedure === "전체" ? (
            <Pagination
              length={
                allTalent?.data?.filter((talent) => talent.failApply !== true)
                  .length as number
              }
            />
          ) : (
            <Pagination
              length={
                (talentByProcedure?.data?.filter(
                  (talent) => talent.failApply !== true,
                ).length as number) ?? 0
              }
            />
          )}
        </div>
      </section>
      <ModalForLater id="modal" />
      <ModalForLater id="modal-calendar" />
    </>
  );
};

const TH_ITEMS = ["선택", "인재", "키워드", "지원일", "액션"];

const APPLY_PROCEDURE = ["전체", "서류제출", "면접", "최종조율"];

export default TalentStatus;
