import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ReactComponent as Profile } from "@/assets/svg/heart-memoji.svg";
import { ReactComponent as Search } from "@/assets/svg/search.svg";
import useInputLength from "@/lib/hooks/useInputLength";
import formatDate from "@/lib/utils/formatDate";
import NotiBadge from "@components/Notification/NotiBadge";

const data = {
  content: [
    {
      recruitId: 2,
      recruitTitle: "제목1",
      applyId: 2,
      applyName: "권지수",
      applyPhone: "010-2222-3333",
      applyEmail: "jisuno0915@gmail.com",
      applyProcedure: "서류제출",
      applyDelete: false,
      failApply: true,
      wish: false,
      createdTime: "2023-02-16T15:59:46.803305",
      recentMessageTime: "2023-03-31T17:05:41.0287",
      keywords: ["keyword1", "keyword2", "keyword3"],
    },
    {
      recruitId: 2,
      recruitTitle: "제목1",
      applyId: 3,
      applyName: "지원자2",
      applyPhone: null,
      applyEmail: "ydsn336@naver.com",
      applyProcedure: "서류제출",
      applyDelete: false,
      failApply: false,
      wish: false,
      createdTime: "2023-02-17T15:59:46.803305",
      recentMessageTime: "2023-03-31T17:05:41.089688",
      keywords: ["keyword1", "keyword2", "keyword3", "keyword6", "keyword8"],
    },
    {
      recruitId: 2,
      recruitTitle: "제목1",
      applyId: 4,
      applyName: "지원자3",
      applyPhone: "010-2222-2121",
      applyEmail: "c@test.com",
      applyProcedure: "면접",
      applyDelete: true,
      failApply: true,
      wish: false,
      createdTime: "2023-03-26T17:07:24.220008",
      recentMessageTime: null,
      keywords: ["keyword2", "keyword4", "keyword6", "keyword8", "keyword10"],
    },
    {
      recruitId: 2,
      recruitTitle: "제목1",
      applyId: 5,
      applyName: null,
      applyPhone: null,
      applyEmail: null,
      applyProcedure: "서류제출",
      applyDelete: false,
      failApply: false,
      wish: false,
      createdTime: "2023-03-26T17:09:48.111359",
      recentMessageTime: null,
      keywords: ["keyword1", "keyword3", "keyword4", "keyword5", "keyword9"],
    },
    {
      recruitId: 2,
      recruitTitle: "제목1",
      applyId: 8,
      applyName: "홍길동",
      applyPhone: "010-1111-1111",
      applyEmail: "applyTest2@test.com",
      applyProcedure: "면접",
      applyDelete: false,
      failApply: true,
      wish: false,
      createdTime: "2023-03-27T20:48:44.871229",
      recentMessageTime: null,
      keywords: ["keyword1", "keyword4", "keyword6", "keyword7", "keyword8"],
    },
    {
      recruitId: 2,
      recruitTitle: "제목1",
      applyId: 9,
      applyName: "각난닫",
      applyPhone: "010-1111-1111",
      applyEmail: "applyTest3@test.com",
      applyProcedure: null,
      applyDelete: false,
      failApply: false,
      wish: false,
      createdTime: "2023-03-28T17:34:18.03024",
      recentMessageTime: null,
      keywords: ["keyword1", "keyword4", "keyword6", "keyword8", "keyword9"],
    },
    {
      recruitId: 2,
      recruitTitle: "제목1",
      applyId: 10,
      applyName: "znzn",
      applyPhone: "010-1111-1111",
      applyEmail: "applyTest4@test.com",
      applyProcedure: null,
      applyDelete: false,
      failApply: false,
      wish: false,
      createdTime: "2023-03-28T19:54:23.735125",
      recentMessageTime: null,
      keywords: ["keyword1", "keyword4", "keyword6", "keyword8", "keyword10"],
    },
    {
      recruitId: 2,
      recruitTitle: "제목1",
      applyId: 23,
      applyName: "키시",
      applyPhone: "010-1111-1111",
      applyEmail: "applyTest7@test.com",
      applyProcedure: null,
      applyDelete: false,
      failApply: false,
      wish: false,
      createdTime: "2023-03-29T15:19:26.468342",
      recentMessageTime: null,
      keywords: ["keyword3", "keyword4", "keyword6", "keyword8", "keyword10"],
    },
    {
      recruitId: 2,
      recruitTitle: "제목1",
      applyId: 32,
      applyName: "아나",
      applyPhone: "010-1111-1111",
      applyEmail: "applyTest5@test.com",
      applyProcedure: null,
      applyDelete: false,
      failApply: false,
      wish: false,
      createdTime: "2023-03-29T15:34:44.146626",
      recentMessageTime: null,
      keywords: ["keyword3", "keyword4", "keyword6", "keyword8", "keyword10"],
    },
    {
      recruitId: 2,
      recruitTitle: "제목1",
      applyId: 33,
      applyName: "외않되되",
      applyPhone: "010-1111-1111",
      applyEmail: "apply@test.com",
      applyProcedure: null,
      applyDelete: false,
      failApply: false,
      wish: false,
      createdTime: "2023-03-29T15:37:49.190268",
      recentMessageTime: null,
      keywords: ["keyword3", "keyword4", "keyword6", "keyword8", "keyword10"],
    },
  ],
};

const Notification = () => {
  const [inputCount, handleInput] = useInputLength(MAX_LENGTH);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchByName = searchParams.get("searchName");
  const [isAgree, setIsAgree] = useState(false);

  console.log(isAgree);

  const handleSearchBar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput?.current?.value) return;
    setSearchParams({ searchByName: searchInput.current.value.trim() });
  };

  const searchInput = useRef<HTMLInputElement>(null);
  return (
    <>
      <section className="absolute top-16 left-0 h-16 w-full bg-blue-400 py-12 text-gray-0">
        <div className="mx-auto my-auto flex h-full max-w-7xl flex-col gap-8">
          <select className="SubHead2Semibold w-[500px] appearance-none bg-transparent outline-none">
            <option>스마트스토어 상세페이지 디자이너 지원서 폼</option>
            <option>안녕하세요</option>
            <option>반갑습니다</option>
          </select>
        </div>
      </section>

      <div className="mt-[100px]">
        <h1 className="Head3Semibold text-gray-900">단체 알림 센터</h1>
        <p className="SubHead1Semibold mt-5 text-gray-500">
          인재에게 단계별 알림을 보낼 수 있습니다.
        </p>
      </div>

      <section className="mt-9 flex rounded-md border-2 border-solid bg-base-100 shadow">
        <div className="flex-[0.4] p-0">
          <select className="select mt-[2.0625rem] ml-6 focus:outline-transparent">
            <option disabled>단계를 선택하세요</option>
            <option>면접 진행</option>
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
                {data.content.map((item) => (
                  <tr key={item.recruitId}>
                    <th>
                      <input
                        type="checkbox"
                        className="checkbox border-gray-400 checked:bg-blue-500"
                      />
                    </th>
                    <td className="SubHead1Semibold flex items-center gap-4 text-gray-600">
                      <Profile className="rounded-md bg-gray-50" />
                      {item.applyName}
                    </td>
                    <td>
                      <NotiBadge className="bg-badge-purple text-text-on-badge-purple">
                        {item.applyProcedure}
                      </NotiBadge>
                    </td>
                    <td className="Caption1Medium text-gray-500">
                      {formatDate(item.createdTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-4 my-6 flex-[0.6]">
          <div className="mb-12 mt-12 flex  items-center justify-between">
            <h2 className="Head3Semibold">알림 보내기</h2>
            <select className="select bg-blue-50 px-3 text-blue-500 focus:outline-transparent">
              <option disabled>단계를 선택하세요</option>
              <option>서류 합격</option>
              <option>면접 조율</option>
              <option>최종 합격</option>
              <option>불합격</option>
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
            placeholder="안녕하세요. 귀하께서 서류 전형에 합격하여 면접 제안드립니다."
            className="SubHead1Medium textarea-bordered textarea textarea-lg min-h-[300px] w-full resize-none"
            maxLength={MAX_LENGTH}
            onChange={handleInput}
          ></textarea>
          <div className="BodyBody3 mt-2 text-gray-300">
            <span>{inputCount.toLocaleString()}</span>
            <span>/{MAX_LENGTH.toLocaleString()}자</span>
          </div>
          <div className="form-control mt-16 mb-6">
            <div className="flex justify-center gap-4">
              <input
                type="checkbox"
                className="checkbox"
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
              className="SubHead2Semibold rounded-md bg-blue-500 px-14 py-3 text-white disabled:bg-gray-200"
            >
              알림 보내기
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Notification;

const MAX_LENGTH = 1000;
