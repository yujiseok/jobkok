import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper.css";
import { ReactComponent as ArchiveTick } from "@/assets/svg/archive-tick.svg";
import { ReactComponent as Calendar } from "@/assets/svg/calendar.svg";
import { ReactComponent as ChevronRight } from "@/assets/svg/chevron-right.svg";
import { ReactComponent as HeartMemoji } from "@/assets/svg/heart-memoji.svg";
import { ReactComponent as Pin } from "@/assets/svg/pin.svg";
import { ReactComponent as Rocket } from "@/assets/svg/rocket.svg";
import { ReactComponent as Stats } from "@/assets/svg/stats.svg";
import useDnD from "@/lib/hooks/useDnD";
import InterviewBadge from "@components/Talent/InterviewBadge";
import KeywordBadge from "@components/Talent/KeywordBadge";
import NumberBadge from "@components/Talent/NumberBadge";
import PreferentialBadge from "@components/Talent/PreferentialBadge";
import ProcedureBadge from "@components/Talent/ProcedureBadge";

const mockData = [
  {
    id: "서류 검토",
    title: " 서류 검토",
    tasks: [
      {
        id: "b",
        title: "Learn JavaScript",
      },
      {
        id: "c",
        title: "Learn Next",
      },
      {
        id: "d",
        title: "Learn React",
      },
    ],
  },
  {
    id: "면접 진행",
    title: "면접 진행",
    tasks: [
      {
        id: "f",
        title: "Learn CSS",
      },
      {
        id: "g",
        title: "Learn TypeScript",
      },
    ],
  },
  {
    id: "최종 조율",
    title: "최종 조율",
    tasks: [
      {
        id: "i",
        title: "Learn HTML",
      },
    ],
  },
];

const numberArr = Array(6)
  .fill(1)
  .map((v, i) => i + 1);

const randomNumber1 = [...numberArr].sort(() => 0.5 - Math.random());
const randomNumber2 = [...numberArr].sort(() => 0.5 - Math.random());

const TalentManagement = () => {
  const [data, onDragEnd] = useDnD(mockData);

  return (
    <>
      <section className="absolute top-16 left-0 h-[25rem] w-full bg-blue-400 py-12 text-gray-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <div className="flex items-center justify-between ">
            <select className="SubHead2Semibold appearance-none bg-transparent outline-none">
              <option selected>
                스마트스토어 상세페이지 디자이너 지원서 폼
              </option>
              <option>안녕하세요</option>
              <option>반갑습니다</option>
            </select>

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
                <span>4</span>명
              </div>
              <div>오늘의 인재수</div>
            </div>

            <div className="border-r border-l border-gray-0 px-36">
              <div className="Head1Bold mb-1">
                D-<span>9</span>
              </div>
              <div>서류접수 마감일</div>
            </div>

            <div className="px-36">
              <div className="Head1Bold mb-1">
                <span>24</span>명
              </div>
              <div>총 지원 인재수</div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[34rem]">
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
            <Swiper
              slidesPerView={3}
              spaceBetween={16}
              pagination={{
                clickable: true,
              }}
              speed={1000}
              modules={[Pagination]}
              slidesPerGroup={3}
              className="flex-1"
            >
              {numberArr.map((value, i) => (
                <SwiperSlide key={value}>
                  <div className="relative h-48 rounded-xl bg-gray-0 px-4 py-6 shadow-job">
                    <div className="mb-3 flex justify-between">
                      <div className="flex items-center gap-[0.375rem]">
                        <div className="SubHead1Semibold">김잡콕 {value}</div>
                        <ProcedureBadge>서류검토</ProcedureBadge>
                      </div>
                    </div>
                    <div className="flex max-w-[7.8125rem] flex-wrap gap-[0.375rem]">
                      <KeywordBadge>경력</KeywordBadge>
                      <KeywordBadge>자격증</KeywordBadge>
                      <KeywordBadge>경력</KeywordBadge>
                      <KeywordBadge>경력</KeywordBadge>
                      <KeywordBadge>기타이력서</KeywordBadge>
                    </div>
                    <time
                      dateTime={new Date().toLocaleDateString()}
                      className="Caption1Medium absolute bottom-5 text-gray-300"
                    >
                      {new Date().toLocaleDateString()}
                    </time>
                    <img
                      src={`/assets/svg/thumbs-${randomNumber1[i]}.svg`}
                      alt={`thumbs-${randomNumber1[i]}`}
                      className="absolute bottom-0 right-1"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
            <Swiper
              slidesPerView={3}
              spaceBetween={16}
              pagination={{
                clickable: true,
              }}
              speed={1000}
              modules={[Pagination]}
              slidesPerGroup={3}
              className="flex-1"
            >
              {numberArr.map((value, i) => (
                <SwiperSlide
                  key={value}
                  className="rounded-xl bg-gray-0 shadow-job"
                >
                  <div className="relative h-48 px-4 py-6">
                    <div className="mb-3 flex justify-between">
                      <div className="flex items-center gap-[0.375rem]">
                        <div className="SubHead1Semibold">김잡콕 {value}</div>
                        <ProcedureBadge>서류검토</ProcedureBadge>
                      </div>
                    </div>
                    <div className="flex max-w-[7.8125rem] flex-wrap gap-[0.375rem]">
                      <KeywordBadge>경력</KeywordBadge>
                      <KeywordBadge>자격증</KeywordBadge>
                      <KeywordBadge>경력</KeywordBadge>
                      <KeywordBadge>경력</KeywordBadge>
                      <KeywordBadge>기타이력서</KeywordBadge>
                    </div>
                    <time
                      dateTime={new Date().toLocaleDateString()}
                      className="Caption1Medium absolute bottom-5 text-gray-300"
                    >
                      {new Date().toLocaleDateString()}
                    </time>
                    <img
                      src={`/assets/svg/thumbs-${randomNumber2[i]}.svg`}
                      alt={`thumbs-${randomNumber2[i]}`}
                      className="absolute bottom-0 right-1"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 채용진행현황 */}
      <section className="mt-20">
        <h4 className="Head3Semibold mb-6">채용 진행 현황</h4>
        <div className="flex justify-between">
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

        <DragDropContext onDragEnd={onDragEnd}>
          {/* grid grid-cols-3 grid-rows-1 */}
          <div className="mt-8 flex items-start justify-between gap-6">
            {data.map((section) => (
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 pb-12"
                  >
                    <div className="flex items-center justify-between pr-4">
                      <div className="flex items-center py-5">
                        <span className="SubHead1Semibold">
                          {section.title}
                        </span>
                        <NumberBadge id={section.id}>
                          {section.tasks.length}
                        </NumberBadge>
                      </div>
                      {section.id === "서류 검토" ? (
                        <button>
                          <Calendar />
                        </button>
                      ) : section.id === "최종 조율" ? (
                        <button className="rounded-md border border-blue-500 bg-gray-0 px-5 py-[0.3438rem] text-blue-500">
                          채용 확정
                        </button>
                      ) : null}
                    </div>

                    <div className="flex max-h-[54.75rem] flex-col gap-4 overflow-y-auto overflow-x-hidden py-1 pr-3">
                      {section.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
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
                                  to="/talent/detail/111"
                                  className="flex items-center gap-2"
                                >
                                  <div className="rounded-md bg-blue-50">
                                    <HeartMemoji />
                                  </div>
                                  <span className="SubHead1Semibold">
                                    김잡콕
                                  </span>
                                  <ChevronRight />
                                </Link>

                                <button>
                                  <ArchiveTick />
                                </button>
                              </div>
                              <div className="Caption1Semibold flex gap-[0.375rem] pt-4 pb-8">
                                <PreferentialBadge>
                                  우대사항 <span>2</span>/<span>5</span>
                                </PreferentialBadge>
                                <PreferentialBadge>
                                  키워드 <span>2</span>/<span>5</span>
                                </PreferentialBadge>
                              </div>
                              <div className="flex items-center justify-between">
                                <time
                                  className="Caption1Medium text-gray-300"
                                  dateTime={new Date().toLocaleDateString()}
                                >
                                  {new Date().toLocaleDateString()}
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
      </section>
    </>
  );
};

export default TalentManagement;
