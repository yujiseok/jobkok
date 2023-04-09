import { ReactComponent as TickBlue } from "@/assets/svg/archive-tick-blue.svg";
import { ReactComponent as Tick } from "@/assets/svg/archive-tick.svg";
import { ReactComponent as Profile } from "@/assets/svg/profile-detail.svg";
import { ReactComponent as TrashBin } from "@/assets/svg/trash.svg";
import useLikeMutate from "@/lib/hooks/useLikeMutate";
import type { ITalentDetail } from "@/types/talentDetail";
import ConfirmPassModal from "./ConfirmPassModal";

const ProfileCard = ({
  talentInfo,
  id,
}: {
  talentInfo: ITalentDetail;
  id: string;
}) => {
  const { likeMutate } = useLikeMutate();
  return (
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
                {talentInfo.wish ? (
                  <TickBlue />
                ) : (
                  <button onClick={() => likeMutate(id)}>
                    <Tick />
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
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
