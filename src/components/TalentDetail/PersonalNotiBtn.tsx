import PersonalNotiModal from "./PersonalNotiModal";

const PersonalNotiBtn = () => {
  return (
    <label
      htmlFor="personal-noti-modal"
      className="cursor-pointer rounded-md bg-blue-500 px-6 py-3 text-white"
    >
      개별 알림 보내기
      <PersonalNotiModal />
    </label>
  );
};
export default PersonalNotiBtn;
