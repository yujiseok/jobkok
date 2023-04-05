import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper.css";
import {
  getAllTalent,
  getFormList,
  getStatus,
  getTalentByProcedure,
} from "@/api/talent";
import { ReactComponent as Add } from "@/assets/svg/add.svg";
import { ReactComponent as ArchiveTickBlue } from "@/assets/svg/archive-tick-blue.svg";
import { ReactComponent as ArchiveTick } from "@/assets/svg/archive-tick.svg";
import { ReactComponent as ArrowRight } from "@/assets/svg/arrow-right.svg";
import { ReactComponent as Calendar } from "@/assets/svg/calendar.svg";
import { ReactComponent as ChevronDown } from "@/assets/svg/chevron-down-white.svg";
import { ReactComponent as ChevronRight } from "@/assets/svg/chevron-right.svg";
import { ReactComponent as HeartMemoji } from "@/assets/svg/heart-memoji.svg";
import { ReactComponent as Pin } from "@/assets/svg/pin.svg";
import { ReactComponent as Rocket } from "@/assets/svg/rocket.svg";
import { ReactComponent as Stats } from "@/assets/svg/stats.svg";
import { ReactComponent as User } from "@/assets/svg/user.svg";
import useAllTalentQuery from "@/lib/hooks/useAllTalentQuery";
import useDnD from "@/lib/hooks/useDnD";
import useFormStatusQuery from "@/lib/hooks/useFormStatusQuery";
import formatDate from "@/lib/utils/formatDate";
import talentByProcedure from "@/lib/utils/talentByProcedure";
import type { IKanban } from "@/types/talent";
import Banner from "@components/Common/Banner";
import ModalForLater from "@components/Common/ModalForLater";
import InterviewBadge from "@components/Talent/InterviewBadge";
import NumberBadge from "@components/Talent/NumberBadge";
import PreferentialBadge from "@components/Talent/PreferentialBadge";
import Slider from "@components/Talent/Slider";
import SliderWrapper from "@components/Talent/SliderWrapper";
import { WhiteContainer } from "@components/Talent/WhiteContainer";

const TalentManagement = () => {
  const { data: formData } = useQuery({
    queryKey: ["form"],
    queryFn: () => getFormList("false"),
    suspense: true,
    refetchOnWindowFocus: false,
  });

  // 폼 없을 시
  if (formData?.result === "FAIL") {
    return (
      <>
        <Banner className="h-[25rem]">
          <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center">
            <h1 className="Head2Semibold">
              안녕하세요, <span>잡콕미술학원</span>님!
            </h1>
            <p className="Head4/Semibold Head4Semibold mt-[6px] mb-9">
              첫 지원서 폼 만들고 편한 채용관리하세요!
            </p>
            <Link
              to="/form/new"
              className="flex items-center gap-2 rounded-lg border border-blue-500 bg-gray-0 px-16 py-2 text-blue-500"
            >
              만들러 가기 <ArrowRight />
            </Link>
          </div>
        </Banner>
        <section className="pt-[26rem]">
          <div>
            <h4 className="Head3Semibold mb-12 flex items-center gap-1">
              <Pin className="-scale-x-100" />
              잡콕에서 추천하는 인재들 입니다!
            </h4>
          </div>

          <div className="flex flex-col gap-8">
            <div className="relative flex items-center gap-4">
              <div className="relative h-48 flex-[0.3] rounded-xl bg-blue-400 px-4 py-6 text-gray-0 shadow-job">
                <p className="SubHead1Semibold mb-3">잡콕인재추천</p>
                <p className="SubHead2Medium">
                  설정하신 우대사항 란에
                  <br /> 가장많이 기입한 지원자가 추천됩니다.
                </p>
                <Rocket className="absolute right-4 bottom-2" />
              </div>
              <WhiteContainer>
                <Add />
                지원서 폼을 만들고 채용을 시작하면 <br />딱 맞는 잡콕 인재를
                추천해드려요
              </WhiteContainer>
            </div>
            <div className="relative flex items-center gap-4">
              <div className="relative h-48 flex-[0.3] rounded-xl bg-banner-teal-500 px-4 py-6 text-gray-0 shadow-job">
                <p className="SubHead1Semibold mb-3">잡콕인재추천</p>
                <p className="SubHead2Medium">
                  설정하신 우대사항 란에
                  <br /> 가장많이 기입한 지원자가 추천됩니다.
                </p>
                <Stats className="absolute right-4 bottom-2" />
              </div>
              <WhiteContainer>
                <Add />
                지원서 폼을 만들고 채용을 시작하면 <br />딱 맞는 잡콕 인재를
                추천해드려요
              </WhiteContainer>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <h4 className="Head3Semibold mb-6">채용 진행 현황</h4>
          <div className="mt-6 mb-12 flex justify-between">
            <p className="SubHead1Semibold text-gray-400">
              한 눈에 칸반보드에서 인재 현황을 확인해보세요. 인재카드를
              Drag&Drop을 통해 자유롭게 이동해보세요.
            </p>
            <Link
              to="/talent/status"
              className="SubHead1Medium flex items-center gap-2 text-gray-400"
            >
              관리하기
              <ChevronRight />
            </Link>
          </div>

          <div className="flex items-start justify-between gap-6">
            <>
              <div
                className="flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 
                  pb-0"
              >
                <div className="flex items-center justify-between pr-4">
                  <div className="flex items-center py-5">
                    <span className="SubHead1Semibold">서류제출</span>
                    <NumberBadge id={"서류제출"}>0</NumberBadge>
                  </div>
                </div>
              </div>
              <div
                className="flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 
                  pb-0"
              >
                <div className="flex items-center justify-between pr-4">
                  <div className="flex items-center py-5">
                    <span className="SubHead1Semibold">면접진행</span>
                    <NumberBadge id={"면접진행"}>0</NumberBadge>
                  </div>
                  <button>
                    <Calendar />
                  </button>
                </div>
              </div>
              <div
                className="flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 
                  pb-0"
              >
                <div className="flex items-center justify-between pr-4">
                  <div className="flex items-center py-5">
                    <span className="SubHead1Semibold">최종조율</span>
                    <NumberBadge id={"최종조율"}>0</NumberBadge>
                  </div>

                  <button
                    disabled
                    className="rounded-md border border-gray-200 bg-gray-0 px-5 py-[0.3438rem] text-gray-200"
                  >
                    채용 확정
                  </button>
                </div>
              </div>
            </>
          </div>
        </section>
      </>
    );
  }

  // 폼 있을 시
  const [recruitId, setRecruitId] = useState(`${formData?.data[0]?.id}` ?? "");
  const [data, onDragEnd] = useDnD(kanbanData);

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecruitId(e.target.value);
  };

  const allTalent = useAllTalentQuery(recruitId);
  const formStatus = useFormStatusQuery(recruitId);
  // const kanbanData: IKanban[] = talentByProcedure(allTalent);

  return (
    <>
      <Banner className="h-[25rem]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <div className="flex items-center justify-between ">
            <div className="SubHead2Semibold">
              <select
                className="bg-transparent pr-3 outline-none"
                onChange={handleChangeStatus}
              >
                {formData?.data.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    className="text-gray-900"
                  >
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <button className="SubHead2Semibold rounded-md bg-blue-50 py-2 px-5 text-blue-400">
              폼 마감하기
            </button>
          </div>

          <div className="text-center">
            <h1 className="Head2Semibold mb-1">
              안녕하세요 <span>잡콕미술학원</span>님!
            </h1>
            <div className="Head3Semibold">
              현재까지 지원현황을 간략히 한 눈에 보여드립니다.
            </div>
          </div>

          <div className="flex justify-center text-center">
            <div className="px-36">
              <div className="Head1Bold mb-1">
                <span>{formStatus?.todayCount}</span>명
              </div>
              <div>오늘의 인재수</div>
            </div>

            <div className="border-r-2 border-l-2 border-gray-0/50 px-36">
              <div className="Head1Bold mb-1">{/* D-<span>9</span> */} </div>
              {/* 추후 데이터 일자만 */}
              {formStatus?.processFinish}
              <div>서류접수 마감일</div>
            </div>

            <div className="px-36">
              <div className="Head1Bold mb-1">
                <span>{formStatus?.totalCount}</span>명
              </div>
              <div>총 지원 인재수</div>
            </div>
          </div>
        </div>
      </Banner>
      <section className="pt-[26rem]">
        <div>
          <h4 className="Head3Semibold mb-12 flex items-center gap-1">
            <Pin className="-scale-x-100" />
            잡콕에서 추천하는 인재들 입니다!
          </h4>
        </div>

        <div className="flex flex-col gap-8">
          <div className="relative flex items-center gap-4">
            <div className="relative h-48 flex-[0.3] rounded-xl bg-blue-400 px-4 py-6 text-gray-0 shadow-job">
              <p className="SubHead1Semibold mb-3">잡콕인재추천</p>
              <p className="SubHead2Medium">
                설정하신 우대사항 란에
                <br /> 가장많이 기입한 지원자가 추천됩니다.
              </p>
              <Rocket className="absolute right-4 bottom-2" />
            </div>
            {formStatus?.totalCount === "0" ? (
              <WhiteContainer>
                <User />
                아직 인재가 없지만 <br /> 많은 인재들이 이 지원서를 보고 있어요
                🙌
              </WhiteContainer>
            ) : (
              <SliderWrapper>
                {allTalent?.data?.map((talent, i) => (
                  <SwiperSlide key={talent.applyId}>
                    <Slider talent={talent} i={i} />
                  </SwiperSlide>
                ))}
              </SliderWrapper>
            )}
          </div>
          <div className="relative flex items-center gap-4">
            <div className="relative h-48 flex-[0.3] rounded-xl bg-banner-teal-500 px-4 py-6 text-gray-0 shadow-job">
              <p className="SubHead1Semibold mb-3">잡콕인재추천</p>
              <p className="SubHead2Medium">
                설정하신 우대사항 란에
                <br /> 가장많이 기입한 지원자가 추천됩니다.
              </p>
              <Stats className="absolute right-4 bottom-2" />
            </div>
            {formStatus?.totalCount !== "0" ? (
              <WhiteContainer>
                <User />
                아직 인재가 없지만 <br /> 많은 인재들이 이 지원서를 보고 있어요
                🙌
              </WhiteContainer>
            ) : (
              <SliderWrapper>
                {allTalent?.data?.map((talent, i) => (
                  <SwiperSlide key={talent.applyId}>
                    <Slider talent={talent} i={i} />
                  </SwiperSlide>
                ))}
              </SliderWrapper>
            )}
          </div>
        </div>
      </section>
      <section className="mt-20">
        <h4 className="Head3Semibold mb-6">채용 진행 현황</h4>
        <div className="mt-6 mb-12 flex justify-between">
          <p className="SubHead1Semibold text-gray-400">
            한 눈에 칸반보드에서 인재 현황을 확인해보세요. 인재카드를
            Drag&Drop을 통해 자유롭게 이동해보세요.
          </p>
          <Link
            to="/talent/status"
            className="SubHead1Medium flex items-center gap-2 text-gray-400"
          >
            관리하기
            <ChevronRight />
          </Link>
        </div>

        {formStatus?.totalCount === "0" ? (
          <div className="flex items-start justify-between gap-6">
            <div
              className="flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 
                  pb-0"
            >
              <div className="flex items-center justify-between pr-4">
                <div className="flex items-center py-5">
                  <span className="SubHead1Semibold">서류제출</span>
                  <NumberBadge id={"서류제출"}>0</NumberBadge>
                </div>
              </div>
            </div>
            <div
              className="flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 
                  pb-0"
            >
              <div className="flex items-center justify-between pr-4">
                <div className="flex items-center py-5">
                  <span className="SubHead1Semibold">면접진행</span>
                  <NumberBadge id={"면접진행"}>0</NumberBadge>
                </div>
                <button>
                  <Calendar />
                </button>
              </div>
            </div>
            <div
              className="flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 
                  pb-0"
            >
              <div className="flex items-center justify-between pr-4">
                <div className="flex items-center py-5">
                  <span className="SubHead1Semibold">최종조율</span>
                  <NumberBadge id={"최종조율"}>0</NumberBadge>
                </div>

                <button
                  disabled
                  className="rounded-md border border-gray-200 bg-gray-0 px-5 py-[0.3438rem] text-gray-200"
                >
                  채용 확정
                </button>
              </div>
            </div>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex items-start justify-between gap-6">
              {data.map((applicant) => (
                <Droppable key={applicant.id} droppableId={applicant.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 ${
                        applicant.applicant.length ? "pb-12" : "pb-0"
                      }`}
                    >
                      <div className="flex items-center justify-between pr-4">
                        <div className="flex items-center py-5">
                          <span className="SubHead1Semibold">
                            {applicant.title}
                          </span>
                          <NumberBadge id={applicant.id}>
                            {applicant.applicant.length}
                          </NumberBadge>
                        </div>
                        {applicant.id === "면접" ? (
                          <button>
                            <Calendar />
                          </button>
                        ) : applicant.id === "최종조율" ? (
                          <label
                            htmlFor="modal"
                            className={`cursor-pointer rounded-md border bg-gray-0 px-5 py-[0.3438rem] ${
                              applicant.applicant.length
                                ? " border-blue-500  text-blue-500"
                                : "pointer-events-none border-gray-200 text-gray-200"
                            }`}
                          >
                            채용 확정
                          </label>
                        ) : null}
                      </div>

                      <div className="flex max-h-[54.75rem] flex-col gap-4 overflow-y-auto overflow-x-hidden py-1 pr-3">
                        {applicant.applicant.map((item, index) => (
                          <Draggable
                            key={item.applyName}
                            draggableId={item.applyName}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className={`rounded-xl bg-gray-0 px-4 py-5 shadow-job  ${
                                  snapshot.isDragging
                                    ? "bg-gray-50/95"
                                    : "bg-gray-0"
                                }`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <Link
                                    to={`/talent/detail/${item.applyId}`}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="rounded-md bg-blue-50">
                                      <HeartMemoji />
                                    </div>
                                    <span className="SubHead1Semibold">
                                      {item.applyName}
                                    </span>
                                    <ChevronRight />
                                  </Link>

                                  <button>
                                    <ArchiveTick className="text-gray-300" />
                                  </button>
                                </div>
                                <div className="Caption1Semibold flex gap-6px pt-4 pb-8">
                                  <PreferentialBadge>
                                    우대사항 <span>2</span>/<span>5</span>
                                  </PreferentialBadge>
                                  <PreferentialBadge>
                                    키워드 <span>{item.keywords.length}</span>/
                                    <span>5</span>
                                  </PreferentialBadge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <time
                                    className="Caption1Medium text-gray-300"
                                    dateTime={new Date().toLocaleDateString()}
                                  >
                                    {formatDate(item.createdTime)}
                                  </time>

                                  <InterviewBadge>
                                    면접 D-16 20:00 예정
                                  </InterviewBadge>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        )}
      </section>
      <ModalForLater id="modal" />
    </>
  );
};

// const mockData = [
//   {
//     id: "서류 검토",
//     title: " 서류 검토",
//     tasks: [
//       {
//         id: "b",
//         title: "Learn JavaScript",
//       },
//       {
//         id: "c",
//         title: "Learn Next",
//       },
//       {
//         id: "d",
//         title: "Learn React",
//       },
//     ],
//   },
//   {
//     id: "면접 진행",
//     title: "면접 진행",
//     tasks: [
//       {
//         id: "f",
//         title: "Learn CSS",
//       },
//       {
//         id: "g",
//         title: "Learn TypeScript",
//       },
//     ],
//   },
//   {
//     id: "최종 조율",
//     title: "최종 조율",
//     tasks: [
//       {
//         id: "i",
//         title: "Learn HTML",
//       },
//     ],
//   },
// ];

const mockData = {
  state: 200,
  result: "success",
  data: [
    {
      applyId: "1",
      applyName: "김김김",
      applyPhone: "010-1111-1111",
      applyEmail: "applyTest@test.com",
      resumeContent: "저는 홍길동 입니다 !",
      applyPortfolio: "https://portfolio.portfolio",
      applyProcedure: "면접진행",
      evaluation: "나쁘지 않음",
      pass: false,
      createdTime: "2023-03-21T13:04:30",
      applyDelete: false,
      keywords: [""],
      wish: true,
    },
    {
      applyId: "2",
      applyName: "김이박",
      applyPhone: "010-1111-1111",
      applyEmail: "applyTest@test.com",
      resumeContent: "저는 길동홍 입니다 !",
      applyPortfolio: "https://portfolio.portfolio",
      applyProcedure: "서류제출",
      evaluation: "나쁘지 않음",
      pass: false,
      createdTime: "2023-03-21T13:04:30",
      applyDelete: false,
      keywords: [""],
      wish: true,
    },
    {
      applyId: "3",
      applyName: "존안",
      applyPhone: "010-2222-2222",
      applyEmail: "applyTest2@test.com",
      resumeContent: "저는 홍길동 입니다 !",
      applyPortfolio: "https://portfolio.portfolio",
      applyProcedure: "서류제출",
      evaluation: "별로임",
      pass: false,
      createdTime: "2023-03-21T13:31:30",
      applyDelete: false,
      keywords: [""],
      wish: false,
    },
    {
      applyId: "4",
      applyName: "김철수",
      applyPhone: "010-2222-2222",
      applyEmail: "applyTest2@test.com",
      resumeContent: "저는 홍길동 입니다 !",
      applyPortfolio: "https://portfolio.portfolio",
      applyProcedure: "최종조율",
      evaluation: "별로임",
      pass: false,
      createdTime: "2023-03-21T13:31:30",
      applyDelete: false,
      keywords: [""],
      wish: false,
    },
  ],
};

const kanbanData: IKanban[] = talentByProcedure(mockData);

export default TalentManagement;
