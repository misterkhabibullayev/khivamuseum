// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";


// import required modules
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { Icons } from "../../icons/icons";
import CustomLink from "../Header/CustomLink";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative w-full h-screen">
        <div className="">
          <div className="w-full h-screen">
            <Swiper
              loop={true}
              spaceBetween={0}
              effect="fade"
              speed={1000}
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
                clickable: true,
                bulletClass: "hero-bullet",
                bulletActiveClass: "hero-bullet-active",
              }}
              className="mySwiper h-full"
            >
              <SwiperSlide className="bg-[url('/Images/xiva-1.jpg')] bg-center bg-no-repeat bg-cover relative">
                <div className="w-full h-full p-10 bg-black/30"></div>
                <div className="container1 relative">
                  <div className="absolute bottom-15 left-10 z-10">
                    <h1 className="font-bold text-2xl md:text-4xl text-white">
                      {t("hero.title1")}
                    </h1>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-10 h-0.5 bg-white"></div>
                      <div className="text-white">
                        <Icons.locationIcon />
                      </div>
                      <p className="text-white text-base md:text-lg">
                        {t("hero.text")}
                      </p>
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
                </div>
              </SwiperSlide>
              <SwiperSlide className="bg-[url('/Images/xiva-2.jpg')] bg-center bg-no-repeat bg-cover relative">
                <div className="w-full h-full p-10 bg-black/30"></div>
                <div className="container1 relative">
                  <div className="absolute bottom-15 left-10 z-10">
                    <h1 className="text-white font-bold text-2xl md:text-4xl">
                      {t("hero.title2")}
                    </h1>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-10 h-0.5 bg-white"></div>
                      <div className="text-white">
                        <Icons.locationIcon />
                      </div>
                      <p className="text-white text-base md:text-lg">
                        {t("hero.text")}
                      </p>
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
                </div>
              </SwiperSlide>
              <SwiperSlide className="bg-[url('/Images/xiva-3.jpg')] bg-center bg-no-repeat bg-cover relative">
                <div className="w-full h-full p-10 bg-black/30"></div>
                <div className="container1 relative">
                  <div className="absolute bottom-15 left-10 z-10">
                    <h1 className="font-bold text-2xl md:text-4xl text-white">
                      {t("hero.title3")}
                    </h1>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-10 h-0.5 bg-white"></div>
                      <div className="text-white">
                        <Icons.locationIcon />
                      </div>
                      <p className="text-white text-base md:text-lg">
                        {t("hero.text")}
                      </p>
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
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="absolute bottom-15 right-15 z-30 text-white">
              <div className="flex items-center w-auto gap-4">
                <button className="custom-prev-btn w-8.5 h-8.5 bg-link-hover rounded-full flex items-center justify-center font-medium">
                  <span className="rotate-90">
                    <Icons.downArrowIcon />
                  </span>
                </button>
                <div className="custom-pagination w-auto! flex items-center gap-4"></div>
                <button className="custom-next-btn w-8.5 h-8.5 bg-link-hover rounded-full flex items-center justify-center">
                  <span className="-rotate-90">
                    <Icons.downArrowIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
