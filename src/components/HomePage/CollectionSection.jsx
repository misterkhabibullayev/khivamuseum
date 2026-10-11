import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCollectionsSt } from "../../store/useCollectionsSt";
import CustomLink from "../Header/CustomLink";
import { Icons } from "../../icons/icons";

export default function CollectionSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "uz";

  const { collections, loading, error, getCollections } = useCollectionsSt();

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p>error</p>;
  return (
    <section className="py-10 sm:py-15 lg:py-22.5">
      <div className="container1">
        <div className="flex flex-col items-center justify-center mb-10 md:mb-20">
          <h1 className="font-medium text-2xl md:text-3xl mb-3 text-black dark:text-link-hover text-center">
            {t("collections.title")}
          </h1>
          <p className="text-base md:text-lg text-center md:max-w-2/3">
            {t("collections.text")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {collections.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center bg-white dark:bg-dark-main p-4 rounded-xl group"
            >
              <div className="rounded-xl overflow-hidden aspect-4/3 mb-4">
                <CustomLink to={`/collections/${item.slug}`}>
                  <img
                    src={item?.images[0]?.url}
                    alt={item?.title?.[currentLang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                </CustomLink>
              </div>
              <div className="p-2">
                <div>
                  <CustomLink to={`/collections/${item.slug}`}>
                    <h2 className="font-semibold text-lg md:text-xl max-h-14 line-clamp-2 hover:text-link-hover transition-all duration-300">
                      {item?.title?.[currentLang]}
                    </h2>
                  </CustomLink>
                  <p className="line-clamp-3 font-medium text-sm md:text-base my-4">
                    {item?.description?.[currentLang]}
                  </p>
                </div>
                <div>
                  <CustomLink
                    to={`/collections/${item.slug}`}
                    className="w-auto! flex items-center gap-1 h-8.5 rounded-full text-sm md:text-base font-medium leading-[130%] hover:text-link-hover transition-all duration-300"
                  >
                    {t("more")}
                    <Icons.rightIcon />
                  </CustomLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
