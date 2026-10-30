import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Breadcrumbs from "../../components/BreadCrumbs";
import Loading from "../../components/Loading";
import { useAnnouncementsStore } from "../../store/useAnnouncementsStore";
import { useBreadcrumbStore } from "../../store/useBreadCrumStore";
import { formatDate } from "../../utils/formatDate";

export default function NewsDetailesPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  const { announDet } = useParams();
  const { setDynamicName } = useBreadcrumbStore();

  const { announcement, loading, error, getAnnouncementBySlug } =
    useAnnouncementsStore();

  useEffect(() => {
    if (announDet) {
      getAnnouncementBySlug(announDet);
    }
  }, [announDet, getAnnouncementBySlug]);
  const announcTitle = announcement?.title?.[currentLang];

  useEffect(() => {
    if (announcTitle) {
      setDynamicName(announcTitle);
    }
    return () => setDynamicName("");
  }, [announcTitle, setDynamicName]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!announcement) return null;
  return (
    <div>
      <div className="container1">
        <Breadcrumbs />
      </div>
      <div className="container1 pb-20 pt-4">
        {announcement.images.length > 0 && (
          <div className="w-full md:w-1/2 md:float-left md:mr-6 md:mb-4 aspect-video rounded-2xl overflow-hidden bg-light-main dark:bg-dark-main relative">
            {announcement.images.length > 1 ? (
              <>
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
                  {announcement.images.map((item, i) => (
                    <SwiperSlide key={i} className="w-full h-full">
                      <img
                        src={item.url}
                        alt={announcTitle}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              <div className="w-full h-full">
                <img
                  src={announcement.images[0].url}
                  alt={announcTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        )}
        <div className="">
          <div className="pb-4">
            <h2 className="font-bold text-xl md:text-2xl text-black dark:text-white mb-2">
              {announcTitle}
            </h2>
            <div className="flex items-center gap-6 text-black/50 dark:text-white/50">
              <div className="flex items-center gap-1 text-sm leading-[130%]">
                <CalendarDays className="w-4 h-4" />
                {formatDate(announcement.createdAt)}
              </div>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: announcement?.description?.[currentLang],
            }}
            className="w-full text-base md:text-lg"
          ></div>
        </div>
      </div>
    </div>
  );
}
