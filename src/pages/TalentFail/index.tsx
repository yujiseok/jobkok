import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { useState } from "react";
import { ReactComponent as ArchiveTickBlue } from "@/assets/svg/archive-tick-blue.svg";
import { ReactComponent as ArchiveTick } from "@/assets/svg/archive-tick.svg";
import { ReactComponent as HeartMemoji } from "@/assets/svg/heart-memoji.svg";
import { ReactComponent as Trash } from "@/assets/svg/trash.svg";
import { LIMIT } from "@/constants/pagination";
import usePagination from "@/lib/hooks/usePagination";
import formatDate from "@/lib/utils/formatDate";
import makeString from "@/lib/utils/makeString";
import type { IFailedTalent } from "@/types/talentPool";
import FailKeywordBadge from "@components/Talent/FailKeywordBadge";
import FailProcedureBadge from "@components/Talent/FailProcedureBadge";
import Heading from "@components/Talent/Heading";

interface IData {
  userId: number;
  id: number;
  title: string;
}

const getData = async () => {
  const { data }: AxiosResponse<IData[]> = await axios({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/albums",
  });

  return data;
};

const data: IFailedTalent[] = [
  {
    recruitId: 2,
    recruitTitle: "제목1",
    applyId: 2,
    applyName: "지원자1",
    applyPhone: "010-2222-3333",
    applyEmail: "a@test.com",
    applyProcedure: "서류제출",
    applyDelete: false,
    failApply: true,
    wish: true,
    createdTime: "2023-02-16T15:59:46.803305",
    recentMessageTime: "2023-02-20T15:59:46.803305",
    keywords: ["keyword1", "keyword2", "keyword3"],
  },
  {
    recruitId: 2,
    recruitTitle: "제목1",
    applyId: 8,
    applyName: "홍길동",
    applyPhone: "010-1111-1111",
    applyEmail: "applyTest2@test.com",
    applyProcedure: null,
    applyDelete: false,
    failApply: true,
    wish: false,
    createdTime: "2023-03-27T20:48:44.871229",
    recentMessageTime: null,
    keywords: ["keyword1", "keyword4", "keyword6", "keyword8"],
  },
];

const TalentFail = () => {
  const { data: test } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
    suspense: true,
  });

  const { page, offset, handleClick } = usePagination();
  // const [currPage, setCurrPage] = useState(page);
  const totalPage = data && Math.ceil(data?.length / LIMIT);
  const btnLimint = 5;

  return (
    <>
      <section className="x absolute top-16 left-0 h-16 w-full  bg-blue-400 py-12 text-gray-0">
        <div className="mx-auto flex h-full max-w-7xl items-center">
          <select className="">
            <option>스마트스토어 상세페이지 디자이너 지원서 폼</option>
            <option>찜된 탈락인재</option>
            <option>영구삭제 인재</option>
          </select>
        </div>
      </section>
      <header className="pt-[6.25rem]">
        <Heading>탈락 인재 보관함</Heading>
        <p className="SubHead1Semibold mt-6 mb-12 text-gray-500">
          아쉽게 탈락했던 인재와 다시 함께할 수 있도록 모아놓은 보관함이에요
        </p>
      </header>
      <section className="rounded-[20px] border bg-gray-0 p-11">
        <div className="flex gap-4">
          <select className="">
            <option selected>전체인재</option>
            <option>찜된 탈락인재</option>
            <option>영구삭제 인재</option>
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
              {data?.slice(offset, offset + LIMIT).map((item) => (
                <tr key={item.applyId} className="border-b border-gray-50">
                  <th>
                    <div className="flex items-center gap-4">
                      <HeartMemoji /> <span>{item.applyName}</span>
                    </div>
                  </th>
                  <td>
                    <div className="flex gap-6px">
                      {item.keywords.map((keyword) => (
                        <FailKeywordBadge key={keyword}>
                          {keyword}
                        </FailKeywordBadge>
                      ))}
                    </div>
                  </td>
                  <td>
                    {item.applyProcedure !== null ? (
                      <FailProcedureBadge>
                        {item.applyProcedure}
                      </FailProcedureBadge>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="SubHead2Medium text-gray-500">
                    {formatDate(item.createdTime)}
                  </td>
                  <td className="SubHead2Medium text-gray-500">
                    {item.recentMessageTime !== null
                      ? formatDate(item.recentMessageTime)
                      : "-"}
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
                        className={`${i + 1 === page ? "bg-purple-300" : ""}`}
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

const TH_ITEMS = ["인재", "키워드", "탈락시점", "지원일", "최근알림일", "액션"];

export default TalentFail;
