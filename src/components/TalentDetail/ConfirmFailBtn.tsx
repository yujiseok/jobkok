import ConfirmFailModal from "./ConfirmFailModal";

const ConfirmFailBtn = () => {
  return (
    <label
      htmlFor="confirm-fail-modal"
      className="cursor-pointer rounded-md bg-error-50 px-6 py-3 text-error-400"
    >
      탈락 처리
      <ConfirmFailModal />
    </label>
  );
};
export default ConfirmFailBtn;
