import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "./index.css";
import useDnD from "@/lib/hooks/useDnD";
import Heading from "@components/Talent/Heading";

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

const numberArr = Array(9)
  .fill(1)
  .map((v, i) => i + 1);

const TalentManagement = () => {
  const [data, onDragEnd] = useDnD(mockData);

  return (
    <>
      <section className="absolute top-16 left-0 flex w-full flex-col gap-8 bg-red-100 py-12">
        <div className="flex items-center justify-between ">
          <select className="appearance-none outline-none">
            <option selected>스마트스토어 상세페이지 디자이너 지원서 폼</option>
            <option>안녕하세요</option>
            <option>반갑습니다</option>
          </select>

          <button className="rounded-md bg-slate-400 py-2 px-5">
            폼 마감하기
          </button>
        </div>

        <div className="text-center">
          <h1>
            안녕하세요 <span>잡콕미술학원</span>님!
          </h1>
          <div>현재까지 지원현황을 간략히 한 눈에 보여드립니다.</div>
        </div>

        <div className="flex justify-center text-center">
          <div className="px-10">
            <div>
              <span>4</span>명
            </div>
            <div>오늘의 인재수</div>
          </div>

          <div className="border-r border-l border-black px-10">
            <div>
              D-<span>9</span>
            </div>
            <div>서류접수 마감일</div>
          </div>

          <div className="px-10">
            <div>
              <span>24</span>명
            </div>
            <div>총 지원 인재수</div>
          </div>
        </div>
      </section>

      <section className="mt-96">
        <div>
          <Heading className="mb-12">
            <span>📌</span>잡콕에서 추천하는 엄선한 인재들 입니다!
          </Heading>
        </div>

        <div className="flex flex-col gap-8">
          <div className="relative flex  gap-4">
            <div className="flex-[0.3] rounded-xl bg-slate-300 shadow-job">
              아아아아
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
              {numberArr.map((value) => (
                <SwiperSlide key={value}>
                  <div className="h-48 rounded-xl bg-slate-300 shadow-job">
                    Slide {value}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="relative flex gap-4">
            <div className="flex-[0.3] rounded-xl bg-slate-300 shadow-job">
              아아아아
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
              {numberArr.map((value) => (
                <SwiperSlide key={value}>
                  <div className="h-48 rounded-xl bg-slate-300 shadow-job">
                    Slide {value}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <br />

      {/* 채용진행현황 */}
      <section>
        <Heading className="mb-6">채용 진행 현황</Heading>
        <div className="flex justify-between">
          <p>
            한 눈에 칸반보드에서 인재 현황을 확인해보세요. 인재카드를
            Drag&Drop을 통해 자유롭게 이동해보세요.
          </p>
          <Link to="/talent/status">관리하기</Link>
        </div>

        {/* <div className="flex">
          <div>
            지원 접수 <span>0</span>
          </div>
          <div>
            서류 합격 <span>0</span>
          </div>
          <div>
            면접 제안 <span>0</span>
          </div>
        </div> */}
        {/* 칸반 */}

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="mt-8 grid grid-cols-3 gap-16">
            {data.map((section) => (
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-slate-400 p-4"
                  >
                    <div>
                      {section.title} <span>{section.tasks.length}</span>
                    </div>

                    <div
                      className="flex max-h-40 flex-col gap-4 overflow-y-auto overflow-x-hidden bg-amber-300 p-4 
                    "
                    >
                      {section.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className={`rounded-md py-12 ${
                                snapshot.isDragging
                                  ? "bg-slate-300/80"
                                  : "bg-slate-300"
                              }`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                            >
                              {task.title}
                              <span>
                                {
                                  data[
                                    data.findIndex(
                                      (item) => item.title === task.title,
                                    )
                                  ]?.tasks.length
                                }
                              </span>
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
