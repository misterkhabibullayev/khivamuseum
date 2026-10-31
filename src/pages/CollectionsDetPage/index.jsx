import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import Loading from "../../components/Loading";
import { useBreadcrumbStore } from "../../store/useBreadCrumStore";
import { useCollectionsSt } from "../../store/useCollectionsSt";

export default function CollectionsDetPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  const { coldetailes } = useParams();
  const { setDynamicName } = useBreadcrumbStore();

  const { collection, loading, error, getCollectionBySlug } =
    useCollectionsSt();

  useEffect(() => {
    if (coldetailes) {
      getCollectionBySlug(coldetailes);
    }
  }, [coldetailes, getCollectionBySlug]);
  const collectionTitle = collection?.title?.[currentLang];

  useEffect(() => {
    if (collectionTitle) {
      setDynamicName(collectionTitle);
    }
    return () => setDynamicName("");
  }, [collectionTitle, setDynamicName]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!collection) return null;
  return (
    <div>
      <Helmet>
        <title>{collectionTitle}</title>
        <meta name="description" content={t("meta.collectionsDes")} />
      </Helmet>
      <div className="container1">
        <Breadcrumbs />
      </div>
      <div className="container1 pt-8 pb-10">
        <h2 className="font-bold text-2xl md:text-4xl text-black dark:text-white">
          {collectionTitle}
        </h2>
      </div>
      <div className="container1 flex flex-col md:flex-row gap-10 md:gap-20 pb-20">
        <div
          dangerouslySetInnerHTML={{
            __html: collection?.content?.[currentLang],
          }}
          className="w-full md:w-1/2 text-base md:text-lg"
        ></div>
        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden">
          <img src={collection?.images?.[0].url} alt={collectionTitle} />
        </div>
      </div>
    </div>
  );
}
