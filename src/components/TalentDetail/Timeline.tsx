import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDetailInfo } from "@/api/talentDetail";

const Timeline = () => {
  const { id } = useParams() as { id: string };
  const { data: talentInfo } = useQuery({
    queryKey: ["talentInfo"],
    queryFn: () => getDetailInfo(id),
  });
  return (
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
  );
};
export default Timeline;
