import { useNavigate } from "react-router-dom";
import { ReactComponent as Back } from "@/assets/svg/backspace.svg";

const TalentDetailHeading = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative mb-3 flex items-center gap-6">
        <Back className="cursor-pointer" onClick={() => navigate(-1)} />
        <h2 className="Head2Semibold">인재 상세페이지</h2>
      </div>
      <p className="Head4Semibold ml-9 text-gray-500">
        인재 상세 정보를 확인하고 한 곳에서 채용 및 탈락 처리를 할 수 있습니다.
      </p>
    </div>
  );
};
export default TalentDetailHeading;
