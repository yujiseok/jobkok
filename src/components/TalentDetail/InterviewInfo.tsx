import { useState } from "react";
import { ReactComponent as Edit } from "@/assets/svg/edit-icon.svg";
import formatDate from "@/lib/utils/formatDate";
import { formatTime } from "@/lib/utils/formatTime";
import type { ITalentDetail } from "@/types/talentDetail";
import ConfirmInterviewModal from "./ConfirmInterviewModal";

const InterviewInfo = ({ talentInfo }: { talentInfo: ITalentDetail }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");

  const handleInterviewDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterviewDate(e.target.value);
  };

  const handleInterviewTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value + ":00";
    setInterviewTime(time);
  };

  return (
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
                    {talentInfo.meeting ? formatDate(talentInfo?.meeting) : "-"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="Caption1Medium text-gray-400">
                    면접 시간
                  </span>
                  <span className="BodyBody2">
                    {talentInfo.meeting ? formatTime(talentInfo?.meeting) : "-"}
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
          <label htmlFor="confirm-interview-modal">
            <Edit />
          </label>
        ) : (
          <Edit onClick={() => setIsEditing(!isEditing)} />
        )}
      </button>
      <ConfirmInterviewModal
        setIsEditing={setIsEditing}
        interviewDate={interviewDate}
        interviewTime={interviewTime}
      />
    </div>
  );
};
export default InterviewInfo;
