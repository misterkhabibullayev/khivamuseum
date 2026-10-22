import { CalendarDays, Eye } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import Loading from "../../components/Loading";
import { useBreadcrumbStore } from "../../store/useBreadCrumStore";
import { useNewsStore } from "../../store/useNewsStore";
import { formatDate } from "../../utils/formatDate";

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
      <div className="container1 pt-8 pb-10">
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
      <div className="container1 flex flex-col md:flex-row gap-10 md:gap-20 pb-20">
        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden">
          <img src={news1?.images?.[0].url} alt={newsTitle} className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2">
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
