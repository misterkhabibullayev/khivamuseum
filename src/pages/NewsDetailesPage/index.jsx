import { CalendarDays, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Breadcrumbs from "../../components/BreadCrumbs";
import Loading from "../../components/Loading";
import { useBreadcrumbStore } from "../../store/useBreadCrumStore";
import { useNewsStore } from "../../store/useNewsStore";
import { formatDate } from "../../utils/formatDate";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import "../../index.css";

export default function NewsDetailesPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  const { newsDetails } = useParams();
  const { setDynamicName } = useBreadcrumbStore();

  const { news1, loading, error, getNewsBySlug } = useNewsStore();

  useEffect(() => {
    if (newsDetails) {
      getNewsBySlug(newsDetails);
    }
  }, [newsDetails, getNewsBySlug]);
  const newsTitle = news1?.title?.[currentLang];

  useEffect(() => {
    if (newsTitle) {
      setDynamicName(newsTitle);
    }
    return () => setDynamicName("");
  }, [newsTitle, setDynamicName]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!news1) return null;
  return (
    <div>
      <div className="container1">
        <Breadcrumbs />
      </div>
      <div className="container1 pt-8 pb-8">
        <h2 className="font-bold text-xl md:text-2xl text-black dark:text-white mb-2">
          {newsTitle}
        </h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 text-sm leading-[130%]">
            <CalendarDays className="w-4 h-4" />
            {formatDate(news1.createdAt)}
          </div>
          <div className="flex items-center gap-1 text-sm leading-[130%]">
            <Eye className="w-4 h-4" />
            {news1.views}
          </div>
        </div>
      </div>
      <div className="container1 flex flex-col lg:flex-row lg:items-start gap-10 pb-20">
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-light-main dark:bg-dark-main relative">
          <button className="custom-prev-btn absolute top-1/2 left-1 -translate-y-1/2 z-10 p-1 rounded-full bg-link-hover text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="custom-next-btn absolute top-1/2 right-1 -translate-y-1/2 z-10 p-1 rounded-full bg-link-hover text-white">
            <ChevronRight className="w-6 h-6" />
          </button>
          <Swiper
            spaceBetween={30}
            loop={true}
            navigation={{
              prevEl: ".custom-prev-btn",
              nextEl: ".custom-next-btn",
            }}
            modules={[Navigation]}
            className="mySwiper w-full h-full"
          >
            {news1.images.map((item, i) => (
              <SwiperSlide key={i} className="w-full h-full">
                <img
                  src={item.url}
                  alt={newsTitle}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: news1?.description?.[currentLang],
            }}
            className="w-full text-base md:text-lg"
          ></div>
        </div>
      </div>
    </div>
  );
}
