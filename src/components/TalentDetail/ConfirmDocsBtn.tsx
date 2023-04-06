import ConfirmDocsModal from "@components/TalentDetail/ConfirmDocsModal";

const ConfirmDocsBtn = () => {
  return (
    <label
      htmlFor="confirm-docs-modal"
      className="cursor-pointer rounded-md bg-blue-50 px-6 py-3 text-blue-500"
    >
      서류 검토
      <ConfirmDocsModal />
    </label>
  );
};
export default ConfirmDocsBtn;
