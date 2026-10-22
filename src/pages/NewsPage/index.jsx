import { CalendarDays, Eye } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import CustomLink from "../../components/Header/CustomLink";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { Icons } from "../../icons/icons";
import { useNewsStore } from "../../store/useNewsStore";
import { formatDate } from "../../utils/formatDate";

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "uz";

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { news, totalPages, loading, error, getNews } = useNewsStore();

  useEffect(() => {
    getNews(currentPage);
  }, [currentPage, getNews]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <Helmet>
        <title>{t("meta.gallery")}</title>
        <meta name="description" content={t("meta.galleryDes")} />
      </Helmet>
      <div className="container1">
        <div>
          <Breadcrumbs />
        </div>
        <div className="flex items-center justify-center pb-8">
          <h2 className="font-bold text-3xl md:text-4xl">
            {t("breadCrumbs.news")}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {news.map((item) => {
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
                    to={`/news/${item.slug}`}
                    className="inline-block rounded-xl overflow-hidden w-full h-full group "
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={thumbnailUrl}
                        alt={item?.title?.[currentLang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                      />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white px-3 py-0.5 rounded-full bg-link-hover font-medium text-sm">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(item.createdAt)}
                      </div>
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white px-3 py-0.5 rounded-full bg-link-hover font-medium text-sm ">
                        <Eye className="w-4 h-4" />
                        {item.views}
                      </div>
                    </div>
                    <div className="p-5 flex-1">
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
