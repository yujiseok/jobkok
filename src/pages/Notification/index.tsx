import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { searchApplicant } from "@/api/notification";
import { ReactComponent as Profile } from "@/assets/svg/heart-memoji.svg";
import { ReactComponent as Search } from "@/assets/svg/search.svg";
import { LIMIT } from "@/constants/pagination";
import useFormList from "@/lib/hooks/useFormList";
import useFormListQuery from "@/lib/hooks/useFormListQuery";
import useGetTalentQuery from "@/lib/hooks/useGetTalentQuery";
import usePagination from "@/lib/hooks/usePagination";
import useSearchTalent from "@/lib/hooks/useSearchTalent";
import ceilPage from "@/lib/utils/ceilPage";
import formatDate from "@/lib/utils/formatDate";
import type { ISearchData } from "@/types/notification";
import type { ITalent } from "@/types/talent";
import Banner from "@components/Common/Banner";
import BlueBadge from "@components/Notification/BlueBadge";
import PurpleBadge from "@components/Notification/Purplebadge";
import RedBadge from "@components/Notification/RedBadge";
import SendingBox from "@components/Notification/SendingBox";
import TalentSearchBar from "@components/Notification/TalentSearchBar";
import Pagination from "@components/Talent/Pagination";

type FormValues = {
  mailContent: string;
};

const Notification = () => {
  const { page, offset, handleClick } = usePagination();
  const formData = useFormListQuery();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const applyProcedure = searchParams.get("applyProcedure") ?? "전체";
  const noticeStep = searchParams.get("noticeStep") ?? "all";
  const applyName = searchParams.get("applyName") ?? "";
  const [recruitId, handleChangeFormList] = useFormList(formData);
  const { searchInput } = useSearchTalent(recruitId);
  const [isSearch, setIsSearch] = useState(false);
  const [searchTalent, setSearchTalent] = useState<ISearchData[]>([]);

  const handleSearchBar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput?.current?.value) return alert("입력해주세요");
    setSearchParams({ applyName: searchInput.current.value.trim() });
    setIsSearch(true);
    const test = async () => {
      const res = await searchApplicant(applyName, recruitId);
      console.log(res.data);
      setSearchTalent(res?.data as ISearchData[]);
    };
    test();
  };

  //폼과 절차에 따라 인재 목록 보여주기
  const allTalent = useGetTalentQuery(recruitId, applyProcedure, applyName);

  const totalPage =
    allTalent && allTalent !== null ? ceilPage(allTalent.length) : 0;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      applyProcedure: e.target.value,
      noticeStep,
      applyName,
    });
  };

  // 추후 수정 예정
  // 조건에 따라 렌더링 해주는 searchTalent 와 allTalent의 타입이 달라 우선 any로 처리
  const [selectedTalent, setSelectedTalent] = useState<any[]>([]);
  const handleSelectTalent = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: ISearchData | ITalent,
  ) => {
    if (e.target.checked && selectedTalent.length < 4) {
      setSelectedTalent((prev) => [...prev, item]);
    } else {
      const selectedList = [...selectedTalent].filter(
        (talent) => talent.applyId !== item.applyId,
      );
      e.target.checked = false;
      setSelectedTalent(selectedList);
    }
  };

  return (
    <>
      <Banner className="h-16">
        <div className="mx-auto flex h-full max-w-7xl items-center">
          <div className="flex items-center justify-between ">
            <div className="SubHead2Semibold">
              <select
                className="bg-transparent pr-3 outline-none"
                onChange={handleChangeFormList}
              >
                {formData?.data !== null &&
                  formData?.data.map((item) => (
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
        {!allTalent ? (
          <div className="mx-auto justify-center p-24">
            <img
              src="/assets/images/folder.webp"
              alt="폴더"
              className="mx-auto mb-3 object-none"
            />
            <h2 className="SubHead1Semibold">등록된 인재가 없습니다</h2>
          </div>
        ) : (
          <>
            <div className="flex-[0.4] p-0">
              <select
                className="outline-none"
                onChange={handleChange}
                value={applyProcedure}
              >
                <option disabled>인재를 선택하세요</option>
                <option value="전체">전체</option>
                <option value="서류제출">서류제출</option>
                <option value="면접">면접</option>
                <option value="최종조율">최종조율</option>
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
                <button type="submit" className="mr-6">
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
                    {(isSearch ? searchTalent : allTalent)
                      ?.slice(offset, offset + LIMIT)
                      .map((item, i) => (
                        <tr key={i}>
                          <th>
                            <input
                              type="checkbox"
                              className="h-5 w-5 border-gray-400 checked:bg-blue-500"
                              onChange={(e) => handleSelectTalent(e, item)}
                            />
                          </th>
                          <td className="SubHead1Semibold flex items-center gap-4 text-gray-600">
                            <Profile className="rounded-md bg-gray-50" />
                            {item.applyName}
                          </td>
                          <td>
                            {item.applyProcedure === "서류제출" ? (
                              <BlueBadge>서류제출</BlueBadge>
                            ) : // eslint-disable-next-line no-constant-condition
                            item.applyProcedure === "면접" ? (
                              <RedBadge>면접</RedBadge>
                            ) : (
                              <PurpleBadge>최종조율</PurpleBadge>
                            )}
                          </td>
                          <td className="Caption1Medium text-gray-500">
                            {formatDate(item.createdTime)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Pagination totalPages={totalPage} />
              </div>
            </div>

            <div className="flex-[0.6]">
              <SendingBox
                selectedTalent={selectedTalent}
                applyName={applyName}
                noticeStep={noticeStep}
                recruitId={recruitId}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default Notification;
