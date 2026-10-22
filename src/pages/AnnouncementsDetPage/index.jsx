import { CalendarDays } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
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
      <div className="container1 pt-8 pb-10">
        <h2 className="font-bold text-xl md:text-2xl text-black dark:text-white mb-2">
          {announcTitle}
        </h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 text-sm leading-[130%]">
            <CalendarDays className="w-4 h-4" />
            {formatDate(announcement.createdAt)}
          </div>
        </div>
      </div>
      <div className="container1 flex flex-col md:flex-row gap-10 md:gap-20 pb-20">
        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden">
          <img
            src={announcement?.images?.[0].url}
            alt={announcTitle}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2">
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
