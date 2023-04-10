import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import "./swiper.css";

import { useAppSelector } from "@/app/hooks";
import { ReactComponent as Add } from "@/assets/svg/add.svg";
import { ReactComponent as ArrowRight } from "@/assets/svg/arrow-right.svg";
import { ReactComponent as Calendar } from "@/assets/svg/calendar.svg";
import { ReactComponent as ChevronRight } from "@/assets/svg/chevron-right.svg";
import { ReactComponent as Pin } from "@/assets/svg/pin.svg";
import { ReactComponent as Rocket } from "@/assets/svg/rocket.svg";
import { ReactComponent as Stats } from "@/assets/svg/stats.svg";
import { ReactComponent as User } from "@/assets/svg/user.svg";
import useAllTalentQuery from "@/lib/hooks/useAllTalentQuery";
import useFormList from "@/lib/hooks/useFormList";
import useFormListQuery from "@/lib/hooks/useFormListQuery";
import useFormStatusQuery from "@/lib/hooks/useFormStatusQuery";
import useLikeMutate from "@/lib/hooks/useLikeMutate";
import sortWithSlice from "@/lib/utils/sortWithSlice";
import type { ITalent } from "@/types/talent";
import Banner from "@components/Common/Banner";
import ModalForLater from "@components/Common/ModalForLater";
import Kanban from "@components/Talent/Kanban";
import NumberBadge from "@components/Talent/NumberBadge";
import Slider from "@components/Talent/Slider";
import SliderWrapper from "@components/Talent/SliderWrapper";
import { WhiteContainer } from "@components/Talent/WhiteContainer";

const TalentManagement = () => {
  const { auth } = useAppSelector((state) => state);
  const formData = useFormListQuery();
  const { likeMutate } = useLikeMutate();

  const [recruitId, handleChangeFormList] = useFormList(formData);

  const formStatus = useFormStatusQuery(recruitId);
  const { allTalent } = useAllTalentQuery(recruitId);

  // 폼 없을 시
  if (formData?.result === "FAIL") {
    return (
      <>
        <Banner className="h-[25rem]">
          <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center">
            <h1 className="Head2Semibold">
              안녕하세요, <span>{auth.companyName}</span>님!
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
                    <NumberBadge procedure="서류제출">0</NumberBadge>
                  </div>
                </div>
              </div>
              <div
                className="flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 
                  pb-0"
              >
                <div className="flex items-center justify-between pr-4">
                  <div className="flex items-center py-5">
                    <span className="SubHead1Semibold">면접</span>
                    <NumberBadge procedure="면접">0</NumberBadge>
                  </div>
                  <label htmlFor="modal-calendar" className="cursor-pointer">
                    <Calendar />
                  </label>
                </div>
              </div>
              <div
                className="flex-1 rounded-xl border border-gray-50 bg-gray-0 pl-8 pr-4 
                  pb-0"
              >
                <div className="flex items-center justify-between pr-4">
                  <div className="flex items-center py-5">
                    <span className="SubHead1Semibold">최종조율</span>
                    <NumberBadge procedure="최종조율">0</NumberBadge>
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

  return (
    <>
      <Banner className="h-[25rem]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <div className="flex items-center justify-between ">
            <div className="SubHead2Semibold">
              <select
                className="bg-transparent pr-3 outline-none"
                onChange={handleChangeFormList}
              >
                {formData?.data !== null &&
                  formData?.data.map((item) => (
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
              안녕하세요 <span>{auth.companyName}</span>님!
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
              <div className="Head1Bold mb-1">{formStatus?.process}</div>
              <div> {formStatus?.processFinish}</div>
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
          <div className="manage-slider relative flex items-center gap-4">
            <div className="relative h-48 flex-[0.3] rounded-xl bg-blue-400 px-4 py-6 text-gray-0 shadow-job">
              <p className="SubHead1Semibold mb-3">잡콕인재추천</p>
              <p className="SubHead2Medium">
                설정하신 우대사항 란에
                <br /> 가장많이 기입한 지원자가 추천됩니다.
              </p>
              <Rocket className="absolute right-4 bottom-2" />
            </div>
            {formStatus?.totalCount === 0 ? (
              <WhiteContainer>
                <User />
                아직 인재가 없지만 <br /> 많은 인재들이 이 지원서를 보고 있어요
                🙌
              </WhiteContainer>
            ) : (
              <SliderWrapper>
                {sortWithSlice(allTalent?.data)?.map((talent, i) => (
                  <SwiperSlide key={talent.applyId}>
                    <Slider talent={talent} i={i} />
                  </SwiperSlide>
                ))}
              </SliderWrapper>
            )}
          </div>
          <div className="manage-slider relative flex items-center gap-4">
            <div className="relative h-48 flex-[0.3] rounded-xl bg-banner-teal-500 px-4 py-6 text-gray-0 shadow-job">
              <p className="SubHead1Semibold mb-3">잡콕인재추천</p>
              <p className="SubHead2Medium">
                설정하신 우대사항 란에
                <br /> 가장많이 기입한 지원자가 추천됩니다.
              </p>
              <Stats className="absolute right-4 bottom-2" />
            </div>
            {formStatus?.totalCount === 0 ? (
              <WhiteContainer>
                <User />
                아직 인재가 없지만 <br /> 많은 인재들이 이 지원서를 보고 있어요
                🙌
              </WhiteContainer>
            ) : (
              <SliderWrapper>
                {sortWithSlice(allTalent?.data)
                  ?.filter((talent) => talent.failApply !== true)
                  .map((talent: ITalent, i: number) => (
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

        <Kanban allTalent={allTalent} likeMutate={likeMutate} />
      </section>
      <ModalForLater id="modal" />
      <ModalForLater id="modal-calendar" />
    </>
  );
};

export default TalentManagement;
