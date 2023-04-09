import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { newRecuitForm } from "@/api/form";
import { ReactComponent as IconChevronLeft } from "@/assets/svg/chevron-left.svg";
import { ReactComponent as IconEdit } from "@/assets/svg/edit-icon.svg";
import { KEYWORDS_CHECK } from "@/constants/applicant";
import { convertIsoDate } from "@/lib/utils/convertIsoDate";
import type { IFormRes } from "@/types/form";

import FieldAwards from "@components/Applicant/field/FieldAwards";
import FieldCareer from "@components/Applicant/field/FieldCareer";
import FieldCertificate from "@components/Applicant/field/FieldCertificate";
import FieldCoverLetter from "@components/Applicant/field/FieldCoverLetter";
import FieldEdu from "@components/Applicant/field/FieldEdu";
import FieldLanguage from "@components/Applicant/field/FieldLanguage";
import FieldLink from "@components/Applicant/field/FieldLink";
import FieldPreference from "@components/Applicant/field/FieldPreference";

import ModalForLater from "@components/Common/ModalForLater";
import ContentsBox from "@components/NewForm/ContentsBox";
import EditTypeBadge from "@components/NewForm/EditTypeBadge";
import ProcessBadge from "@components/NewForm/ProcessBadge";
import RequiredBadge from "@components/NewForm/RequiredBadge";
import SaveModal from "@components/NewForm/SaveModal";

const schema = z.object({
  title: z.string().nonempty(),
  contents: z.string().nonempty(),
  meetStart: z.string().nonempty(),
  meetEnd: z.string().nonempty(),
  docsEnd: z.string().nonempty(),
  resumeTitle: z.string().nonempty(),
  agree: z.boolean().refine((val) => val),
});

type IRecuiteForm = z.infer<typeof schema>;

const NewForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [registerData, setRegisterData] = useState<IFormRes>();
  const [isSaveModal, setIsSaveModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IRecuiteForm>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  // 뒤로가기 : 폼링크 관리 페이지로 이동
  const handleBackBtn = () => {
    navigate("/form");
  };

  // 삭제
  const handleDelBtn = () => {
    navigate("/form");
  };

  // 폼 제출 : 인증됐으면 페이지이동, 안됐으면 인증코드에 focus
  const onSubmit = async (data: IRecuiteForm) => {
    const { agree, docsEnd, meetEnd, meetStart, ...rest } = data;
    const convertData = {
      ...rest,
      type: true,
      docsStart: convertIsoDate(Date()),
      docsEnd: convertIsoDate(docsEnd),
      meetEnd: convertIsoDate(meetEnd),
      meetStart: convertIsoDate(meetStart),
      ongoing: true,
      keywordStandard:
        "센스있어요, 꼼꼼해요, 잘 웃어요, 원칙적이에요, 습득력이 좋아요",
      confirmStart: "2023-06-05T00:00:00",
      confirmEnd: "2023-06-05T00:00:00",
    };
    const res = await newRecuitForm(convertData);
    setRegisterData(res.data);
    setIsSaveModal(true);
  };

  return (
    <form
      className="px-[56px] pb-[164px] pt-0"
      onSubmit={handleSubmit(onSubmit)}
      action="/recruit"
      method="POST"
      encType="multipart/form-date"
    >
      {/* 최상단 */}
      <div className="mb-[63px] flex justify-between">
        <IconChevronLeft className="cursor-pointer" onClick={handleBackBtn} />
        <div className="flex justify-center gap-3">
          <ProcessBadge>채용진행중</ProcessBadge>
          <EditTypeBadge>SELF</EditTypeBadge>
          <div className="flex items-center gap-3">
            <h2>
              <input
                className="Head3Semibold h-[46px] min-w-[420px] rounded-lg border border-gray-100 bg-gray-0 py-3.5 px-2 text-center text-gray-800"
                type="text"
                id="title"
                placeholder="폼 이름을 입력해주세요."
                {...register("title")}
              />
            </h2>
            <IconEdit />
          </div>
        </div>
        <div>
          <label
            htmlFor="tempsave-modal"
            className="SubHead1Semibold mr-4 cursor-pointer rounded-lg bg-blue-50 py-2.5 px-6 text-blue-400"
          >
            임시저장
          </label>
          <button
            className="SubHead1Semibold rounded-lg bg-error-50 py-2.5 px-6 text-error-400"
            type="button"
            onClick={handleDelBtn}
          >
            삭제
          </button>
        </div>
      </div>
      {/* 메인 내용 */}
      <div className="mb-10 flex flex-col gap-6">
        {/* 생성된 지원서 링크 */}
        <ContentsBox className="h-[71px] gap-6">
          <h3 className="SubHead1Semibold text-gray-800">생성된 지원서 링크</h3>
          <p className="SubHead2Medium text-gray-300">
            폼 작성 완료 후 생성됩니다.
          </p>
        </ContentsBox>
        {/* 채용폼 내용 */}
        <ContentsBox>
          <div className="flex flex-col gap-4">
            <fieldset className="flex items-center gap-6">
              <label
                className="SubHead1Semibold w-[116px] text-gray-800"
                htmlFor="contents"
              >
                지원서 이름
              </label>
              <input
                className="h-[46px] w-[700px] rounded-lg border border-gray-100 bg-gray-0 px-6 py-3.5"
                type="text"
                id="applicationTitle"
                placeholder="인재에게 보일 지원서 이름을 작성해주세요."
                {...register("contents")}
              />
            </fieldset>

            <fieldset className="flex items-center gap-6">
              <label
                className="SubHead1Semibold w-[116px] text-gray-800"
                htmlFor="docsEnd"
              >
                지원서 접수 마감일
              </label>
              <input type="date" id="docsEnd" {...register("docsEnd")} />
            </fieldset>
            <fieldset className="flex items-center gap-6">
              <label
                className="SubHead1Semibold w-[116px] text-gray-800"
                htmlFor="interviewPeriod"
              >
                면접가능 기간
              </label>
              <input type="date" id="meetStart" {...register("meetStart")} />
              <span>~</span>
              <input type="date" id="meetEnd" {...register("meetEnd")} />
            </fieldset>
          </div>
        </ContentsBox>
        {/* 인재 필수 수집 정보 */}
        <ContentsBox className="flex flex-col items-baseline gap-4">
          <h3 className="SubHead1Semibold text-gray-800">인재 필수 수집정보</h3>
          <div className="flex gap-1.5">
            <RequiredBadge>이름</RequiredBadge>
            <RequiredBadge>전화번호</RequiredBadge>
            <RequiredBadge>이메일</RequiredBadge>
          </div>
        </ContentsBox>
        {/* 인재 추가 정보 */}
        <div className="flex gap-8">
          <ContentsBox className="w-[190px] flex-col gap-4">
            <h3 className="SubHead1Semibold text-gray-800">인재 추가 정보</h3>
            <ul>
              {ADD_INFO.map((field) => {
                return (
                  <li
                    key={field.title}
                    className="flex h-[48px] w-[126px] items-center justify-between py-[15px]"
                  >
                    <label htmlFor={field.title}>{field.title}</label>
                    <input
                      type="checkbox"
                      id={field.title}
                      className="toggle toggle-sm"
                    />
                  </li>
                );
              })}
            </ul>
          </ContentsBox>
          <div className="w-full min-w-[777px] rounded-lg border-[1.5px] border-gray-50 bg-gray-0 p-0">
            <ul className="flex h-[66px] p-0">
              {ADD_INFO.map((field, index) => {
                return (
                  <li
                    className={`SubHead1Semibold flex w-[112.6px] cursor-pointer items-center justify-center border-t-0 border-r-0 border-l-0 ${
                      activeTab === index
                        ? "border-b-[0.143rem] border-blue-500 text-blue-500"
                        : "border-b-dashed border-b-2 border-blue-50 text-gray-400"
                    }`}
                    key={field.title}
                    onClick={() => setActiveTab(index)}
                  >
                    {field.title}
                  </li>
                );
              })}
            </ul>
            <div>{ADD_INFO[activeTab].content}</div>
          </div>
        </div>
      </div>
      {/* 추천인재키워드 */}
      <ContentsBox className="mb-[52px] flex flex-col items-center gap-8 py-[68px]">
        <div className="flex flex-col items-center gap-3">
          <h3 className="Head4Semibold text-black">추천 인재 키워드</h3>
          <p className="SubHead2Medium text-gray-400">
            10개 중 최소 5개 선택 가능합니다.
          </p>
        </div>
        <div className="grid h-[108px] max-w-[820px] grid-cols-5 gap-5">
          {KEYWORDS_CHECK.map((keyword) => (
            <button
              className="SubHead1Semibold h-[44px] w-[148px] rounded-lg border-[1.5px] border-gray-100 py-2.5 text-gray-200"
              key={keyword}
              type="button"
            >
              {keyword}
            </button>
          ))}
        </div>
      </ContentsBox>
      {/* 약관 동의 */}
      <div className="flex flex-col items-center justify-center gap-[29px]">
        <div className="flex gap-2">
          <label
            className="SubHead1Medium order-2 text-gray-400"
            htmlFor="agree"
          >
            기본설정 외에 입력하신 채용 공고가 다른 기업에게 노출될 수 있다는
            사실에 동의합니다.
          </label>
          <input
            className="order-1"
            type="checkbox"
            id="agree"
            {...register("agree")}
          />
        </div>
        {/* 제출완료 버튼 */}
        <button
          type="submit"
          className={`SubHead1Semibold btn h-11 w-[106px] cursor-pointer rounded-lg border-transparent px-6 py-2.5 text-gray-0 ${
            isValid ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          작성완료
        </button>
      </div>

      {isSaveModal && (
        <SaveModal setIsSaveModal={setIsSaveModal} apiData={registerData} />
      )}
      <ModalForLater id={"tempsave-modal"} />
    </form>
  );
};
export default NewForm;

const ADD_INFO = [
  { title: "자기소개", content: <FieldCoverLetter /> },
  { title: "경력", content: <FieldCareer /> },
  { title: "최종학력", content: <FieldEdu /> },
  { title: "자격증", content: <FieldCertificate /> },
  { title: "수상내역", content: <FieldAwards /> },
  { title: "어학능력", content: <FieldLanguage /> },
  { title: "기타이력서", content: <FieldLink /> },
  { title: "취업우대사항", content: <FieldPreference /> },
];
