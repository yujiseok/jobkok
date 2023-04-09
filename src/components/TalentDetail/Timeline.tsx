import formatDate from "@/lib/utils/formatDate";
import type { ITalentDetail } from "@/types/talentDetail";

const Timeline = ({ talentInfo }: { talentInfo: ITalentDetail }) => {
  return (
    <div className="timeline-container mt-4 rounded-md border-2 border-gray-50 bg-white p-10">
      <p className="Head4Semibold pb-2">타임라인</p>
      <p className="SubHead2Medium pb-12 text-gray-400">
        인재의 채용 절차단계를 확인해보세요
      </p>

      <ul className="steps w-full">
        {[
          { label: "최초 접수", date: talentInfo?.createdTime },
          {
            label: "서류 검토",
            date: talentInfo?.checkApply || talentInfo?.meeting,
          },
          {
            label: "면접일",
            date: talentInfo?.meeting || talentInfo?.pass,
          },
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
            <p>{date ? formatDate(date) : "-"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Timeline;
