import { Link } from "react-router-dom";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "./index.css";

const TalentManagement = () => {
  return (
    <>
      {/* 헤더 */}
      <h2>인재 관리</h2>

      <section className="flex flex-col gap-8 bg-red-100 px-14 py-12">
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

      <section className="px-14">
        <div className="mt-20 mb-12">
          <h4>
            <span>📌</span>잡콕에서 추천하는 엄선한 인재들 입니다!
          </h4>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative flex w-[1200px] gap-4">
            <div className="w-72 rounded-xl bg-slate-300 shadow-job">
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
              className="w-4/6"
            >
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 1
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 2
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 3
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 4
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 5
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 6
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 7
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 8
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 9
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="relative flex w-[1200px] gap-4">
            <div className="w-72 rounded-xl bg-slate-300 shadow-job">
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
              className="w-4/6"
            >
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 1
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 2
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 3
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 4
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 5
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 6
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 7
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 8
              </SwiperSlide>
              <SwiperSlide className="h-48 rounded-xl bg-slate-300 shadow-job">
                Slide 9
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
      <br />

      {/* 채용진행현황 */}
      <section>
        <h4>채용 진행 현황</h4>
        <div className="flex justify-between">
          <p>
            한 눈에 칸반보드에서 인재 현황을 확인해보세요. 인재카드를
            Drag&Drop을 통해 자유롭게 이동해보세요.
          </p>
          <Link to="status">관리하기</Link>
        </div>

        <div className="flex">
          <div>
            지원 접수 <span>0</span>
          </div>
          <div>
            서류 합격 <span>0</span>
          </div>
          <div>
            면접 제안 <span>0</span>
          </div>
        </div>
      </section>
    </>
  );
};
export default TalentManagement;
