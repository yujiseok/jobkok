import type { ChangeEvent } from "react";
import { useState } from "react";

const Notification = () => {
  const [inputCount, setInputCount] = useState(0);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setInputCount(e.target.value.length);
  };
  return (
    <>
      <div className="min-h-16">
        <select className="select w-full max-w-xs">
          <option disabled>지원서를 선택하세요</option>
          <option>스마트스토어 상세페이지 디자이너 지원서 폼</option>
        </select>
      </div>
      <h1 className="text-3xl">알림 센터</h1>
      <p>어쩌궁 저쩌궁</p>
      <div className="mx-16 flex rounded-md border-2 border-solid bg-base-100 p-1 shadow">
        <div className="flex-1">
          <select className="select w-full max-w-xs">
            <option disabled>단계를 선택하세요</option>
            <option>면접 진행</option>
          </select>
          <div className="overflow-x-auto  p-6">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th className="bg-red-100">선택</th>
                  <th className="bg-red-100">인재</th>
                  <th className="bg-red-100">채용 단계</th>
                  <th className="bg-red-100">지원일</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      className="checkbox-primary checkbox"
                    />
                  </th>
                  <td>김잡콕</td>
                  <td>
                    <div className="badge ">면접 진행</div>
                  </td>
                  <td>2023.03.29</td>
                </tr>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      className="checkbox-primary checkbox"
                    />
                  </th>
                  <td>김잡콕</td>
                  <td>
                    <div className="badge">면접 진행</div>
                  </td>
                  <td>2023.03.29</td>
                </tr>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      className="checkbox-primary checkbox"
                    />
                  </th>
                  <td>김잡콕</td>
                  <td>
                    <div className="badge">면접 진행</div>
                  </td>
                  <td>2023.03.29</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-4 my-6 flex-1">
          <div className="my-6 flex  items-center justify-between">
            <h2 className="text-xl font-bold">알림 보내기</h2>
            <select className="select w-full max-w-xs bg-blue-100 text-blue-600">
              <option disabled>단계를 선택하세요</option>
              <option>면접 합격</option>
            </select>
          </div>
          <div className="mb-6 flex h-11 items-center rounded-md bg-slate-200 py-6">
            <p className="mx-4">받는 사람</p>
            <p className="rounded-md bg-white text-sm">김잡콕 님</p>
          </div>
          <textarea
            placeholder="입력해 주세요"
            className="textarea-bordered textarea textarea-lg w-full resize-none"
            maxLength={MAX_LENGTH}
            onChange={handleInput}
          ></textarea>
          <div className=" text-sm text-gray-400">
            <span>{inputCount.toLocaleString()}</span>
            <span>/{MAX_LENGTH.toLocaleString()}자</span>
          </div>
          <div className="form-control">
            <div className="flex justify-center gap-4">
              <input type="checkbox" className="checkbox" />
              <span className="label-text">
                알림을 보내면 취소가 불가능함을 인지합니다
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="btn-primary btn ">알림 보내기</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Notification;

const MAX_LENGTH = 1000;
