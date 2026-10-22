import { CalendarDays } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import CustomLink from "../../components/Header/CustomLink";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { Icons } from "../../icons/icons";
import { useAnnouncementsStore } from "../../store/useAnnouncementsStore";
import { formatDate } from "../../utils/formatDate";

export default function AnnouncementsPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "uz";

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { announcements, totalPages, loading, error, getAnnouncements } =
    useAnnouncementsStore();

  useEffect(() => {
    getAnnouncements(currentPage);
  }, [currentPage, getAnnouncements]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <Helmet>
        <title>{t("meta.announcements")}</title>
        <meta name="description" content={t("meta.announcementsDes")} />
      </Helmet>
      <div className="container1">
        <div>
          <Breadcrumbs />
        </div>
        <div className="flex items-center justify-center pb-8">
          <h2 className="font-bold text-3xl md:text-4xl">
            {t("breadCrumbs.announcements")}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {announcements?.map((item) => {
            const mainImgObj = item.images?.find(
              (img) => img.mainImage === true,
            );
            const thumbnailUrl = mainImgObj?.url || item.images?.[0]?.url;
            return (
              <div
                key={item.id}
                className={`rounded-xl border border-link-hover bg-white dark:bg-dark-main h-full`}
              >
                <div className="w-full h-full">
                  <CustomLink
                    to={`/announcements/${item.slug}`}
                    className="inline-block rounded-xl overflow-hidden w-full h-full group "
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={thumbnailUrl}
                        alt={item?.title?.[currentLang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    <div className="flex items-center gap-1 font-medium text-sm px-2 pt-2">
                      <CalendarDays className="w-4 h-4" />
                      {formatDate(item.createdAt)}
                    </div>
                    <div className="p-2 flex-1">
                      <h2 className="font-medium text-lg md:text-xl line-clamp-3 mb-5 w-full max-h-21">
                        {item?.title?.[currentLang]}
                      </h2>
                      <span className="flex items-center gap-3 group-hover:gap-5 transition-all duration-300 text-sm md:text-base">
                        {t("more")}
                        <Icons.arrowTopIcon className="rotate-90" />
                      </span>
                    </div>
                  </CustomLink>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center pt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
