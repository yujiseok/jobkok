import { Pagination } from "swiper";
import { Swiper } from "swiper/react";

const SliderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
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
      {children}
    </Swiper>
  );
};
export default SliderWrapper;
