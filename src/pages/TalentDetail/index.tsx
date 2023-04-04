import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addComment,
  assortFailTalent,
  assortLikeTalent,
  checkApplication,
  getDetailInfo,
  setMeeting,
} from "@/api/talentDetail";
import { ReactComponent as TickBlue } from "@/assets/svg/archive-tick-blue.svg";
import { ReactComponent as Tick } from "@/assets/svg/archive-tick.svg";
import { ReactComponent as Back } from "@/assets/svg/backspace.svg";
import { ReactComponent as Edit } from "@/assets/svg/edit-icon.svg";
import { ReactComponent as Profile } from "@/assets/svg/profile-detail.svg";
import { ReactComponent as SendingIcon } from "@/assets/svg/send.svg";
import { ReactComponent as TrashBin } from "@/assets/svg/trash.svg";

type FormValues = {
  evaluation: string;
};

const TalentDetail = () => {
  const [isAgree, setIsAgree] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { register, watch, handleSubmit } = useForm<FormValues>();
  const [isEditing, setisEditing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");

  const { data: talentInfo } = useQuery({
    queryKey: ["talentInfo"],
    queryFn: () => getDetailInfo(id),
    suspense: true,
  });

  const onSubmit = async (data: FormValues) => {
    const res = await addComment(id, data.evaluation);
    console.log(res);
  };

  const checkTalent = async () => {
    const res = await checkApplication(id);
  };

  const failTalent = async () => {
    const res = await assortFailTalent(id);
  };

  const handleWishApplicant = async () => {
    const res = await assortLikeTalent(id);
    setIsLiked(true);
  };

  const handleInterviewDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterviewDate(e.target.value);
  };

  const handleInterviewTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value + ":00";
    setInterviewTime(time);
  };

  const setMeetingDate = async (e: React.MouseEvent<SVGSVGElement>) => {
    // const newTime = interviewTime + ":00";
    // const res = await setMeeting(id, interviewDate, interviewTime);
    // console.log(res);
    setisEditing(false);
  };

  return (
    <>
      <div className="breadcrumbs flex justify-end pb-10 pt-4 text-sm">
        <ul>
          <li className="SubHead2Semibold text-gray-400">
            <Link to="/talent/management">인재 관리</Link>
          </li>
          <li className="SubHead2Semibold text-gray-400">
            <Link to="/talent/status">채용 진행 현황</Link>
          </li>
          <li className="SubHead2Semibold">인재 상세페이지</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <div>
          <div className="relative mb-3 flex items-center gap-6">
            <Back className="cursor-pointer" onClick={() => navigate(-1)} />
            <h2 className="Head2Semibold">인재 상세페이지</h2>
          </div>
          <p className="Head4Semibold ml-9 text-gray-500">
            인재 상세 정보를 확인하고 한 곳에서 채용 및 탈락 처리를 할 수
            있습니다.
          </p>
        </div>
        <div className="SubHead2Semibold flex items-start gap-4 rounded-md">
          <button
            onClick={checkTalent}
            className="cursor-pointer rounded-md bg-blue-50 px-6 py-3 text-blue-500"
          >
            서류 검토
          </button>
          <button
            onClick={failTalent}
            className="cursor-pointer rounded-md bg-error-50 px-6 py-3 text-error-400"
          >
            탈락 처리
          </button>
          {/* <button className="cursor-pointer rounded-md bg-blue-500 px-6 py-3 text-white">
            개별 알림 보내기
          </button> */}
          <label
            htmlFor="my-modal"
            className="cursor-pointer rounded-md bg-blue-500 px-6 py-3 text-white"
          >
            개별 알림 보내기
          </label>

          {/* 모달 */}
          {/* <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="Head4Semibold text-gray-800">개별 알림 보내기</h3>

              <textarea
                placeholder="입력해 주세요"
                className="Caption1Medium textarea-bordered textarea textarea-lg min-h-[120px] w-full resize-none"
                maxLength={MAX_LENGTH}
                onChange={handleInput}
              ></textarea>
              <div className="Caption1Medium text-gray-300">
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
              <div className="modal-action flex justify-center">
                <label htmlFor="my-modal">
                  <button
                    disabled={!isAgree || !inputCount}
                    className="SubHead2Semibold flex items-center gap-2 rounded-md bg-blue-500 px-14 py-3 text-white disabled:bg-gray-200"
                  >
                    알림 보내기
                    <SendingIcon />
                  </button>
                </label>
              </div>

              <div className="modal-action">
                <label htmlFor="my-modal" className="btn">
                  Yay!
                </label>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <section className="applicant-container mt-12 flex gap-5">
        <div className="applicant-left flex-[0.6]">
          <div className="info-container flex gap-10 rounded-md border-2 border-gray-50 bg-white p-8">
            <div className="applicant-avatar avatar">
              <div className="rounded-xl">
                <Profile className="bg-blue-50" />
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="applicant-detail flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <p className="Head4Semibold mb-1 mr-[0.625rem]">
                      {talentInfo?.applyName}
                    </p>
                    <div className="flex cursor-pointer gap-2">
                      <button>
                        {isLiked ? (
                          <TickBlue onClick={() => setIsLiked(false)} />
                        ) : (
                          <Tick onClick={handleWishApplicant} />
                        )}
                      </button>
                      <TrashBin />
                    </div>
                  </div>
                  <p className="SubHead2Medium text-gray-600">
                    {talentInfo?.applyPhone}
                  </p>
                  <p className="SubHead2Medium text-gray-600">
                    {talentInfo?.applyEmail}
                  </p>
                </div>
                <button className="SubHead2Semibold cursor-pointer rounded-md bg-blue-50 px-6 py-3 text-blue-400">
                  채용 확정
                </button>
              </div>
              <div className="badge-container mt-10 flex max-w-[280px] flex-wrap gap-x-2 gap-y-6px">
                <div className="SubHead2Semibold rounded-sm bg-gray-200 p-1 text-blue-25">
                  # {talentInfo?.keywords}
                </div>
                <div className="SubHead2Semibold rounded-sm bg-gray-200 p-1 text-blue-25">
                  # {talentInfo?.keywords}
                </div>
                <div className="SubHead2Semibold rounded-sm bg-gray-200 p-1 text-blue-25">
                  # {talentInfo?.keywords}
                </div>
                <div className="SubHead2Semibold rounded-sm bg-gray-200 p-1 text-blue-25">
                  # {talentInfo?.keywords}
                </div>
                <div className="SubHead2Semibold rounded-sm bg-gray-200 p-1 text-blue-25">
                  # {talentInfo?.keywords}
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-container mt-4 rounded-md border-2 border-gray-50 bg-white p-10">
            <p className="Head4Semibold pb-2">타임라인</p>
            <p className="SubHead2Medium pb-12 text-gray-400">
              인재의 채용 절차단계를 확인해보세요
            </p>
            <ul className="steps w-full ">
              <li className="step after:!bg-blue-400 after:!text-gray-0 ">
                <p>최초 접수</p>
                <p>2022.02.04</p>
              </li>
              <li className=" step before:!bg-blue-400 after:!bg-blue-400 after:!text-gray-0">
                <p>서류 합격</p>
                <p>2022.02.04</p>
              </li>
              <li className="step">
                <p> 면접</p>
                <br />
              </li>
              <li className="step">
                <p> 최종 합격</p>
                <br />
              </li>
            </ul>
          </div>
        </div>

        <div className=" flex flex-[0.4] flex-col gap-4">
          <div className="interview-container flex justify-between gap-4 rounded-md border-2 border-gray-50 bg-white px-5 py-4">
            <div className="interview-time-container flex justify-between">
              <form className="flex gap-4">
                <p className="SubHead1Semibold">면접 정보</p>
                <div className="flex justify-center gap-4">
                  {isEditing ? (
                    <>
                      <fieldset className="flex items-center gap-3">
                        <label
                          className="Caption1Medium text-gray-400"
                          htmlFor="meetingDate"
                        >
                          면접 날짜
                        </label>
                        <input
                          className="BodyBody3"
                          type="date"
                          id="meetingDate"
                          onChange={handleInterviewDate}
                        />
                      </fieldset>
                      <fieldset className="flex items-center gap-3">
                        <label
                          className="Caption1Medium text-gray-400"
                          htmlFor="interviewTime"
                        >
                          면접 시간
                        </label>
                        <input
                          className="BodyBody3"
                          type="time"
                          id="interviewTime"
                          onChange={handleInterviewTime}
                        />
                      </fieldset>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="Caption1Medium text-gray-400">
                          면접 날짜
                        </span>
                        <span className="BodyBody2">미정</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="Caption1Medium text-gray-400">
                          면접 시간
                        </span>
                        <span className="BodyBody2">미정</span>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
            <button
              type="submit"
              className="SubHead2Medium cursor-pointer text-gray-400"
            >
              {isEditing ? (
                <Edit onClick={(e) => setMeetingDate()} />
              ) : (
                <Edit onClick={() => setisEditing(!isEditing)} />
              )}
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="feedback-note flex-1 rounded-md border-2 border-gray-50 bg-white p-7"
          >
            <div className="flex items-center justify-between">
              <p className="SubHead1Semibold">평가노트</p>
              <button>
                <Edit />
              </button>
            </div>
            <p className="SubHead2Medium my-3 text-gray-400">
              인재의 전반적인 평가와 인상을 작성해보세요
            </p>

            <textarea
              defaultValue={
                talentInfo?.evaluation
                  ? talentInfo?.evaluation
                  : "입력해 주세요"
              }
              className="Caption1Medium textarea-bordered textarea textarea-lg min-h-[120px] w-full resize-none"
              maxLength={MAX_LENGTH}
              {...register("evaluation")}
            ></textarea>

            <div className="Caption1Medium text-gray-300">
              <span>{watch().evaluation?.length.toLocaleString()}</span>
              <span>/{MAX_LENGTH.toLocaleString()}자</span>
            </div>
          </form>
        </div>
      </section>

      <div className="mt-12">
        <p className="Head4Semibold">지원서 내용</p>
        <p className="SubHead2Medium mt-2 text-gray-400">
          인재가 작성하지 않은 우대사항 항목은 숨김 처리되며, 필요시 열어볼 수
          있습니다.
        </p>
        <div className="min-h-28 mt-11 rounded-md border bg-white px-11 py-4 pb-20">
          <ul className="SubHead1Semibold tabs w-full justify-between">
            <li className="tab text-lg font-bold">자기소개</li>
            <li className="tab text-lg font-bold">경력</li>
            <li className="tab text-lg font-bold">최종학력</li>
            <li className="tab text-lg font-bold">자격증</li>
            <li className="tab text-lg font-bold">수상내역</li>
            <li className="tab text-lg font-bold">어학능력</li>
            <li className="tab text-lg font-bold">기타이력</li>
            <li className="tab text-lg font-bold">취업우대사항</li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default TalentDetail;

const MAX_LENGTH = 1000;
