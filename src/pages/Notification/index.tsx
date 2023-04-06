import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchApplicant, setProcedure } from "@/api/notification";
import { getFormList } from "@/api/talent";
import { assortLikeTalent } from "@/api/talentDetail";
import { ReactComponent as Profile } from "@/assets/svg/heart-memoji.svg";
import { ReactComponent as Search } from "@/assets/svg/search.svg";
import { ReactComponent as SendingIcon } from "@/assets/svg/send.svg";
import { applicantProcedure } from "@/constants/applicantProcedure";
import { LIMIT } from "@/constants/pagination";
import useAllTalentQuery from "@/lib/hooks/useAllTalentQuery";
import useAllTalentListQuery from "@/lib/hooks/useGetTalentQuery";
import useGetTalentQuery from "@/lib/hooks/useGetTalentQuery";
import useInputLength from "@/lib/hooks/useInputLength";
import usePagination from "@/lib/hooks/usePagination";
import useSearchTalent from "@/lib/hooks/useSearchTalent";
import formatDate from "@/lib/utils/formatDate";
import makeString from "@/lib/utils/makeString";
import Banner from "@components/Common/Banner";
import BlueBadge from "@components/Notification/BlueBadge";
import PurpleBadge from "@components/Notification/Purplebadge";
import RedBadge from "@components/Notification/RedBadge";

const Notification = () => {
  const [inputCount, handleInput] = useInputLength(MAX_LENGTH);
  const [isAgree, setIsAgree] = useState(false);
  const { page, offset, handleClick } = usePagination();
  const { searchInput, applyName, handleSearchBar } = useSearchTalent();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const applyProcedure = searchParams.get("applyProcedure") ?? "all";
  const noticeStep = searchParams.get("noticeStep") ?? "all";
  const [defaultMsg, setDefaultMsg] = useState("");

  // 폼 선택하기
  const { data: formData } = useQuery({
    queryKey: ["form"],
    queryFn: () => getFormList("false"),
    suspense: true,
    refetchOnWindowFocus: false,
  });

  const totalPage = formData && Math.ceil(formData?.data?.length / LIMIT);

  // recruitId 만 가져오기
  const [recruitId, setRecruitId] = useState(`${formData?.data[0]?.id}`);

  // 이름 검색으로 찾기
  const { data: searchTalent } = useQuery({
    queryKey: ["searchTalent", applyName, recruitId],
    queryFn: () => searchApplicant(applyName, recruitId),
    // enabled: false,
  });

  //폼과 절차에 따라 인재 목록 보여주기
  const allTalent = useAllTalentQuery(recruitId, applyProcedure);

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecruitId(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      applyProcedure: e.target.value,
    });
    searchInput.current!.value = "";
  };

  const handleNotiChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      noticeStep: e.target.value,
    });
    const stepMsg = await setProcedure(recruitId, e.target.value);
    setDefaultMsg(stepMsg);
  };

  console.log(noticeStep);

  return (
    <>
      <Banner className="h-16">
        <div className="mx-auto flex h-full max-w-7xl items-center">
          <div className="flex items-center justify-between ">
            <div className="SubHead2Semibold">
              <select
                className="bg-transparent pr-3 outline-none"
                onChange={handleChangeStatus}
              >
                {formData?.data.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    className="text-gray-900"
                  >
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Banner>

      <div className="mt-[100px]">
        <h1 className="Head3Semibold text-gray-900">단체 알림 센터</h1>
        <p className="SubHead1Semibold mt-5 text-gray-500">
          인재에게 단계별 알림을 보낼 수 있습니다.
        </p>
      </div>

      <section className="mt-9 flex gap-14 rounded-md border-2 border-solid bg-base-100 pt-10 pb-11 pl-6 pr-8 shadow">
        <div className="flex-[0.4] p-0">
          <select
            className="outline-none"
            onChange={handleChange}
            value={applyProcedure}
          >
            <option disabled>인재를 선택하세요</option>
            <option value="all">전체</option>
            <option value="docs_pass">서류 합격</option>
            <option value="meet_proposal">면접 조율</option>
            <option value="final_pass">최종 합격</option>
          </select>

          <form
            onSubmit={handleSearchBar}
            className="SubHead1Medium mx-6 mt-6 mb-6 flex justify-between rounded-md bg-blue-25  text-gray-400"
          >
            <label htmlFor="searchBar" className="w-full py-4 px-6 ">
              <input
                id="searchBar"
                placeholder="인재를 검색해보세요"
                className="w-full bg-transparent focus:outline-none"
                ref={searchInput}
              />
            </label>
            <button className="mr-6">
              <Search />
            </button>
          </form>

          <div className="overflow-x-auto px-6">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr className="Caption1Medium text-gray-600">
                  <th className="bg-gray-0">선택</th>
                  <th className="bg-gray-0">인재</th>
                  <th className="bg-gray-0">채용 단계</th>
                  <th className="bg-gray-0">지원일</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                {allTalent?.data
                  .slice(offset, offset + LIMIT)
                  .map((item, i) => (
                    <tr key={i}>
                      <th>
                        <input
                          type="checkbox"
                          className="h-5 w-5 border-gray-400 checked:bg-blue-500"
                        />
                      </th>
                      <td className="SubHead1Semibold flex items-center gap-4 text-gray-600">
                        <Profile className="rounded-md bg-gray-50" />
                        {item.applyName}
                      </td>
                      <td>
                        {item.applyProcedure === "서류 검토" ? (
                          <BlueBadge>서류 검토</BlueBadge>
                        ) : // eslint-disable-next-line no-constant-condition
                        item.applyProcedure === "면접 진행" ? (
                          <RedBadge>면접 진행</RedBadge>
                        ) : (
                          <PurpleBadge>최종 조율</PurpleBadge>
                        )}
                      </td>
                      <td className="Caption1Medium text-gray-500">
                        {formatDate(item.createdTime)}
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
        </div>

        <div className="flex-[0.6]">
          <div className="mb-12 mt-12 flex  items-center justify-between">
            <h2 className="Head3Semibold">알림 보내기</h2>

            <select
              className="rounded-md bg-blue-50 py-[10px] pr-5 pl-6 text-blue-500 focus:outline-transparent"
              onChange={handleNotiChange}
              value={noticeStep}
            >
              <option value="DOCS_PASS">서류 합격</option>
              <option value="MEET_PROPOSAL">면접 조율</option>
              <option value="FINAL_PASS">최종 합격</option>
            </select>
          </div>

          <div className="mb-6 flex items-center rounded-md bg-blue-25 py-4 px-4">
            <p className=" SubHead1Semibold mr-8 text-gray-800">받는 사람</p>

            <div className="flex items-center gap-4 rounded-md bg-gray-0 py-1 px-2 ">
              <Profile className="rounded-md bg-gray-50 " />
              <p className="SubHead1Medium text-gray-900">김잡콕</p>
            </div>
          </div>

          <textarea
            // placeholder="절차를 선택하시면 기본 메세지가 제공됩니다."
            className="SubHead1Medium textarea-bordered textarea textarea-lg min-h-[300px] w-full resize-none"
            maxLength={MAX_LENGTH}
            onChange={handleInput}
            value={defaultMsg}
          ></textarea>
          <div className="BodyBody3 mt-2 text-gray-300">
            <span>{inputCount.toLocaleString()}</span>
            <span>/{MAX_LENGTH.toLocaleString()}자</span>
          </div>
          <div className="form-control mt-16 mb-6">
            <div className="flex justify-center gap-4">
              <input
                type="checkbox"
                className="h-5 w-5 border-gray-400 checked:bg-blue-500"
                onClick={() => setIsAgree(!isAgree)}
              />

              <span className="label-text">
                알림을 보내면 취소가 불가능함을 인지합니다
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              disabled={!isAgree || !inputCount}
              className="SubHead2Semibold flex items-center gap-2 rounded-md bg-blue-500 px-14 py-3 text-white disabled:bg-gray-200"
            >
              알림 보내기
              <SendingIcon />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Notification;

const MAX_LENGTH = 1000;
