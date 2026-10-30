import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Icons } from "../../icons/icons";
import { useNewsStore } from "../../store/useNewsStore";
import { formatDate } from "../../utils/formatDate";
import CustomLink from "../Header/CustomLink";

export default function NewsSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "uz";

  const { news, loading, error, getNews } = useNewsStore();
  console.log(news);

  useEffect(() => {
    getNews();
  }, [getNews]);

  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p>error</p>;
  return (
    <section className="py-10 sm:py-15 lg:py-22.5">
      <div className="container1">
        <div className="flex items-center justify-between pb-10">
          <h2 className="font-semibold text-2xl md:text-4xl">
            {t("news.title")}
          </h2>
          <CustomLink
            to="/news"
            className="flex items-center gap-1 border border-link-hover px-5 rounded-full py-1 text-sm md:text-base hover:bg-link-hover hover:text-white transition-all duration-300"
          >
            {t("more")}
            <Icons.rightIcon />
          </CustomLink>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-12 sm:grid-rows-3 gap-4 md:gap-6">
          {news.slice(0, 4).map((item, index) => {
            const mainImgObj = item.images?.find(
              (img) => img.mainImage === true,
            );
            const thumbnailUrl = mainImgObj?.url || item.images?.[0]?.url;
            return (
              <div
                key={item.id}
                className={`rounded-xl border border-link-hover bg-white dark:bg-dark-main overflow-hidden ${
                  index === 0
                    ? "col-span-1 sm:col-span-6 sm:row-span-3"
                    : "col-span-1 sm:col-span-6 sm:row-span-1"
                }`}
              >
                <CustomLink
                  to={`/news/${item.slug}`}
                  className={`w-full h-full group flex ${
                    index === 0
                      ? "flex-col"
                      : "flex-col sm:flex-row sm:items-center"
                  }`}
                >
                  <div
                    className={`relative overflow-hidden shrink-0 ${
                      index === 0
                        ? "w-full aspect-video"
                        : "w-full sm:w-48 md:w-56 aspect-video h-full"
                    }`}
                  >
                    <img
                      src={thumbnailUrl}
                      alt={item?.title?.[currentLang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />

                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white px-2.5 py-0.5 rounded-full bg-link-hover font-medium text-xs md:text-sm">
                      <Icons.dayIcon className="w-3.5 h-3.5" />
                      {formatDate(item.createdAt)}
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white px-2.5 py-0.5 rounded-full bg-link-hover font-medium text-xs md:text-sm">
                      <Icons.viewIcon className="w-3.5 h-3.5" />
                      {item.views}
                    </div>
                  </div>

                  <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
                    <h2
                      className={`font-medium text-black dark:text-white line-clamp-2 ${
                        index === 0
                          ? "text-lg md:text-2xl mb-4"
                          : "text-base md:text-lg mb-2"
                      }`}
                    >
                      {item?.title?.[currentLang]}
                    </h2>

                    <span className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300 text-sm font-medium text-link-hover mt-auto">
                      {t("more")}
                      <Icons.arrowTopIcon className="rotate-90 w-4 h-4" />
                    </span>
                  </div>
                </CustomLink>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
