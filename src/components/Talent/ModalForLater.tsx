const ModalForLater = () => {
  return (
    <>
      <input type="checkbox" id="modal" className="modal-toggle" />
      <label htmlFor="modal" className="modal">
        <label className="relative grid w-[680px] place-items-center rounded-lg bg-gray-0 pt-10 pb-[3.75rem] shadow-job2">
          <img src="/assets/images/folder.webp" alt="폴더" />
          <p className="SubHead1Semibold pt-6 pb-8 text-gray-800">
            해당 기능은 개발 예정인 기능입니다.
          </p>
          <div className="modal-action mt-0">
            <label
              htmlFor="modal"
              className="SubHead2Semibold cursor-pointer rounded-lg bg-blue-500 px-[3.75rem] py-[0.7188rem] text-gray-0 shadow-blue"
            >
              확인
            </label>
          </div>
        </label>
      </label>
    </>
  );
};
export default ModalForLater;
