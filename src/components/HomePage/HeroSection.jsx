// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "../../index.css";

// import required modules
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { Icons } from "../../icons/icons";
import CustomLink from "../Header/CustomLink";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <>
      <section className="pt-8 pb-10 md:pb-15 lg:pb-22.5">
        <div className="container1">
          <div className="w-full h-125 rounded-2xl overflow-hidden">
            <Swiper
              slidesPerView={1}
              loop={true}
              spaceBetween={0}
              effect="fade"
              speed={2000}
              fadeEffect={{
                crossFade: true,
              }}
              modules={[Pagination, Navigation, Autoplay, EffectFade]}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              navigation={{
                prevEl: ".custom-prev-btn",
                nextEl: ".custom-next-btn",
              }}
              pagination={{
                el: ".custom-pagination",
                type: "fraction",
                formatFractionCurrent: (num) => String(num).padStart(2, "0"),
                formatFractionTotal: (num) => String(num).padStart(2, "0"),
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = ".custom-prev-btn";
                swiper.params.navigation.nextEl = ".custom-next-btn";
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              className="mySwiper h-full"
            >
              <SwiperSlide className="bg-[url('/Images/xiva-1.jpg')] bg-center bg-no-repeat bg-cover relative">
                <div className="w-full h-full p-10 bg-black/30"></div>
                <div className="absolute bottom-10 left-10 z-10">
                  <h1 className="font-bold text-2xl md:text-4xl">
                    {t("hero.title1")}
                  </h1>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-0.5 bg-white"></div>
                    <div>
                      <Icons.locationIcon />
                    </div>
                    <p>{t("hero.text")}</p>
                  </div>
                  <div className="mt-4">
                    <CustomLink
                      to={"/tickets"}
                      className="flex items-center gap-1 font-bold text-sm leading-[110%] w-fit px-5 h-8.5 rounded-full bg-link-hover transition-all duration-300 text-white hover:gap-2"
                    >
                      {t("header.aTickets")}
                      <span>
                        <Icons.rightIcon />
                      </span>
                    </CustomLink>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="bg-[url('/Images/xiva-2.jpg')] bg-center bg-no-repeat bg-cover relative">
                <div className="w-full h-full p-10 bg-black/30"></div>
                <div className="absolute bottom-10 left-10 z-10">
                  <h1 className="font-bold text-2xl md:text-4xl">
                    {t("hero.title2")}
                  </h1>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-0.5 bg-white"></div>
                    <div>
                      <Icons.locationIcon />
                    </div>
                    <p>{t("hero.text")}</p>
                  </div>
                  <div className="mt-4">
                    <CustomLink
                      to={"https://khiva360.nazzar.uz/"}
                      target="_blank"
                      className="flex items-center gap-1 font-bold text-sm leading-[110%] w-fit px-5 h-8.5 rounded-full bg-link-hover transition-all duration-300 text-white hover:gap-2"
                    >
                      <Icons.vrIcon />
                      <span>Khiva 360°</span>
                    </CustomLink>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="bg-[url('/Images/xiva-3.jpg')] bg-center bg-no-repeat bg-cover relative">
                <div className="w-full h-full p-10 bg-black/30"></div>
                <div className="absolute bottom-10 left-10 z-10">
                  <h1 className="font-bold text-2xl md:text-4xl">
                    {t("hero.title3")}
                  </h1>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-0.5 bg-white"></div>
                    <div>
                      <Icons.locationIcon />
                    </div>
                    <p>{t("hero.text")}</p>
                  </div>
                  <div className="mt-4">
                    <CustomLink
                      to={"/tickets"}
                      className="flex items-center gap-1 font-bold text-sm leading-[110%] w-fit px-5 h-8.5 rounded-full bg-link-hover transition-all duration-300 text-white hover:gap-2"
                    >
                      {t("header.aTickets")}
                      <span>
                        <Icons.rightIcon />
                      </span>
                    </CustomLink>
                  </div>
                </div>
              </SwiperSlide>

              <div className="absolute bottom-10 right-10 z-30">
                <div className="flex items-center w-auto gap-1">
                  <button className="custom-prev-btn w-8.5 h-8.5 bg-link-hover rounded-full flex items-center justify-center font-medium">
                    <span className="rotate-90">
                      <Icons.downArrowIcon />
                    </span>
                  </button>
                  <div className="custom-pagination w-auto! flex items-center text-white bg-link-hover px-5 h-8.5 rounded-full font-medium text-xl"></div>
                  <button className="custom-next-btn w-8.5 h-8.5 bg-link-hover rounded-full flex items-center justify-center">
                    <span className="-rotate-90">
                      <Icons.downArrowIcon />
                    </span>
                  </button>
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
