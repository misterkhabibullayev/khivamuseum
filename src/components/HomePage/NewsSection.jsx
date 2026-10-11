import { useTranslation } from "react-i18next";
import CustomLink from "../Header/CustomLink";
import { Icons } from "../../icons/icons";
import { useEffect } from "react";
import { useNewsStore } from "../../store/useNewsStore";
import { formatDate } from "../../utils/formatDate";

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
            to="/gallery"
            className="flex items-center gap-1 border border-link-hover px-5 rounded-full py-1 text-sm md:text-base hover:bg-link-hover hover:text-white transition-all duration-300"
          >
            {t("more")}
            <Icons.rightIcon />
          </CustomLink>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-11 gap-6">
          {news.slice(0, 4).map((item, index) => {
            const mainImgObj = item.images?.find(
              (img) => img.mainImage === true,
            );
            const thumbnailUrl = mainImgObj?.url || item.images?.[0]?.url;
            return (
              <div
                key={item.id}
                className={`rounded-xl border border-link-hover bg-white dark:bg-dark-main h-full ${index === 0 ? "col-span-1 sm:col-span-6" : ""}`}
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
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white px-3 py-0.5 rounded-full bg-link-hover font-medium text-base">
                        <Icons.dayIcon />
                        {formatDate(item.createdAt)}
                      </div>
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white px-3 py-0.5 rounded-full bg-link-hover font-medium text-base ">
                        <Icons.viewIcon />
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
      </div>
    </section>
  );
}
