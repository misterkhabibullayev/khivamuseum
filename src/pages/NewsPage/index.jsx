import { Helmet } from "react-helmet-async";
import Breadcrumbs from "../../components/BreadCrumbs";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useNewsStore } from "../../store/useNewsStore";

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  console.log(currentLang);

  const { news, loading, error, getNews } = useNewsStore();

  useEffect(() => {
    getNews();
  }, [getNews]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>error</p>;
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {news.map((item) => (
            <div key={item.id}>
              <h1>{item?.title?.[currentLang]}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
