import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addComment,
  assortLikeTalent,
  getDetailInfo,
  setMeeting,
} from "@/api/talentDetail";
import { ReactComponent as TickBlue } from "@/assets/svg/archive-tick-blue.svg";
import { ReactComponent as Tick } from "@/assets/svg/archive-tick.svg";
import { ReactComponent as Back } from "@/assets/svg/backspace.svg";
import { ReactComponent as Edit } from "@/assets/svg/edit-icon.svg";
import { ReactComponent as Profile } from "@/assets/svg/profile-detail.svg";
import { ReactComponent as TrashBin } from "@/assets/svg/trash.svg";
import Breadcrumbs from "@components/TalentDetail/Breadcrumbs";
import ConfirmDocsModal from "@components/TalentDetail/ConfirmDocsModal";
import ConfirmFailModal from "@components/TalentDetail/ConfirmFailModal";
import ConfirmPassModal from "@components/TalentDetail/ConfirmPassModal";
import PersonalNotiModal from "@components/TalentDetail/PersonalNotiModal";

type FormValues = {
  evaluation: string;
};

const TalentDetail = () => {
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
    <div className="relative pt-8">
      <ConfirmFailModal />
      <Breadcrumbs />
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
          <label
            htmlFor="confirm-docs-modal"
            className="cursor-pointer rounded-md bg-blue-50 px-6 py-3 text-blue-500"
          >
            서류 검토
            <ConfirmDocsModal />
          </label>

          <label
            htmlFor="confirm-fail-modal"
            className="cursor-pointer rounded-md bg-error-50 px-6 py-3 text-error-400"
          >
            탈락 처리
            <ConfirmFailModal />
          </label>
          <label
            htmlFor="personal-noti-modal"
            className="cursor-pointer rounded-md bg-blue-500 px-6 py-3 text-white"
          >
            개별 알림 보내기
          </label>
          {/* 모달 */}
          <PersonalNotiModal />
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
                      {isLiked ? (
                        <button onClick={() => setIsLiked(false)}>
                          <TickBlue />
                        </button>
                      ) : (
                        <button onClick={handleWishApplicant}>
                          <Tick />{" "}
                        </button>
                      )}

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

                <label
                  htmlFor="confirm-pass-modal"
                  className="SubHead2Semibold cursor-pointer rounded-md bg-blue-50 px-6 py-3 text-blue-500"
                >
                  채용 확정
                </label>
                <ConfirmPassModal />
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

            <ul className="steps w-full">
              {[
                { label: "최초 접수", date: talentInfo?.createdTime },
                { label: "서류 검토", date: talentInfo?.checkApply },
                { label: "면접일", date: talentInfo?.meeting },
                {
                  label: "최종 합격",
                  date: talentInfo?.pass !== "false" && talentInfo?.pass,
                },
              ].map(({ label, date }, index) => (
                <li
                  key={index}
                  className={`step ${
                    date
                      ? "before:!bg-blue-400 after:!bg-blue-400 after:!text-gray-0"
                      : ""
                  }`}
                >
                  <p>{label}</p>
                  <p>{date ? date.slice(0, 10) : "-"}</p>
                </li>
              ))}
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
                          className="BodyBody2"
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
                          className="BodyBody2"
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
                        <span className="BodyBody2">
                          {talentInfo?.meeting.slice(0, 10)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="Caption1Medium text-gray-400">
                          면접 시간
                        </span>
                        <span className="BodyBody2">
                          {talentInfo?.meeting.slice(11, 16)}
                        </span>
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
                <Edit onClick={setMeetingDate} />
              ) : (
                <Edit onClick={() => setisEditing(!isEditing)} />
              )}
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="feedback-note flex-1 rounded-md border-2 border-gray-50 bg-white px-5 py-4"
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
    </div>
  );
};
export default TalentDetail;

const MAX_LENGTH = 1000;
