import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./swiper.css";
import { SwiperSlide } from "swiper/react";
import { getFormLinkList } from "@/api/form";
import { ReactComponent as Arrow } from "@/assets/svg/chevron-down-large.svg";
import { ReactComponent as Search } from "@/assets/svg/search.svg";
import { ReactComponent as User } from "@/assets/svg/user.svg";
import Banner from "@components/Common/Banner";
import FormList from "@components/LinkForm/FormList";
import FormSlider from "@components/LinkForm/FormSlider";
import SliderWrapper from "@components/Talent/SliderWrapper";
import data from "../../pages/LinkForm/otherFormList.json";

const LinkForm = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [formLists, setFormLists] = useState([]);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const getFormLists = async () => {
    const data = await getFormLinkList();
    console.log(data);
    setFormLists(data);
  };

  useEffect(() => {
    getFormLists();
  }, []);

  return (
    <>
      <Banner className="flex h-[25rem] flex-col">
        <Link
          to="/form/new"
          className="SubHead2Semibold mr-16 h-[36px] w-[96px] self-end rounded-md bg-blue-50 pt-2 text-center text-blue-500"
        >
          작성하기
        </Link>
        <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center">
          <h1 className="Head2Semibold">폼 링크 관리</h1>
          <p className="Head4/Semibold Head4Semibold mt-[6px] mb-9">
            링크를 생성할 폼을 만들어 보세요!
          </p>
          <div className="flex h-[100px] w-[946px] justify-between rounded-lg bg-gray-0 p-6 text-gray-800">
            <div className="flex h-[52px] w-[200px] items-center justify-between rounded-lg border border-solid border-gray-50 px-6">
              <select className="appearance-none outline-none">
                <option>임시저장된 폼</option>
                <option>링크생성 완료된 폼</option>
              </select>
              <Arrow />
            </div>
            <div className="flex h-[52px] w-[682px] items-center rounded-lg border border-solid border-gray-50 px-6 ">
              <input
                className="w-full outline-none"
                type="text"
                placeholder="키워드를 이용해서 폼을 검색해보세요."
              />
              <Search />
            </div>
          </div>
        </div>
      </Banner>
      <section className="pt-[26rem]">
        <div className="flex flex-col gap-8">
          <div className="relative flex items-center gap-1">
            <div className="relative mr-2 h-48 flex-[0.3] rounded-xl bg-blue-400 px-4 py-6 text-gray-0 shadow-job">
              <p className="SubHead1Semibold mb-3">타기업 폼 리스트</p>
              <p className="SubHead2Medium">
                타기업에서 작성한
                <br /> 폼 리스트를 보여드립니다!
              </p>
              <User className="absolute right-4 bottom-2" />
            </div>
            <SliderWrapper>
              {data.data.length > 0 ? (
                data.data.map((data) => (
                  <SwiperSlide key={data.id}>
                    <FormSlider data={data} />
                  </SwiperSlide>
                ))
              ) : (
                <span>타기업 폼 정보가 없습니다.</span>
              )}
            </SliderWrapper>
          </div>
        </div>
      </section>
      <section className="flex flex-col pt-36">
        <div className="flex cursor-pointer pb-10">
          <div
            className={`Head4Semibold w-[160px] text-center ${
              isClicked ? "text-gray-600" : "text-blue-500"
            }`}
            onClick={handleClick}
          >
            임시저장된 폼
            <div
              className={`mt-5 h-0.5 w-[160px] ${
                isClicked ? "bg-gray-100" : "bg-blue-500"
              }`}
            ></div>
          </div>
          <div
            className={`Head4Semibold w-[160px] text-center ${
              isClicked ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={handleClick}
          >
            링크생성 완료된 폼
            <div
              className={`mt-5 h-0.5 w-[160px] ${
                isClicked ? "bg-blue-500" : "bg-gray-100"
              }`}
            ></div>
          </div>
        </div>
        {formLists.length > 0 && isClicked ? (
          formLists.map((data, index) => {
            return <FormList key={index} data={data} />;
          })
        ) : (
          <span className="SubHead1Medium self-center text-gray-500">
            임시저장된 폼이 없습니다.
          </span>
        )}
      </section>
    </>
  );
};
export default LinkForm;
