import { useParams } from "react-router-dom";
import { useCollectionsSt } from "../../store/useCollectionsSt";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../components/BreadCrumbs";
import { useEffect } from "react";
import { useBreadcrumbStore } from "../../store/useBreadCrumStore";

export default function CollectionsDetPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  const { coldetailes } = useParams();
  const { setDynamicName } = useBreadcrumbStore();

  const collections = useCollectionsSt((state) => state.collections);

  const currentCollection = collections.find(
    (item) => item.slug === coldetailes,
  );
  const collectionTitle = currentCollection?.title?.[currentLang];

  useEffect(() => {
    if (collectionTitle) {
      setDynamicName(collectionTitle);
    }
    return () => setDynamicName("");
  }, [collectionTitle, setDynamicName]);
  console.log(currentCollection);
  return (
    <div>
      <div className="container1">
        <Breadcrumbs />
      </div>
      <div className="container1 flex flex-col md:flex-row gap-10 md:gap-20 pt-10 pb-20">
        <div
          dangerouslySetInnerHTML={{
            __html: currentCollection?.content?.[currentLang],
          }}
          className="w-full md:w-1/2 text-base md:text-lg"
        ></div>
        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden">
          <img src={currentCollection?.images?.[0].url} alt={collectionTitle} />
        </div>
      </div>
    </div>
  );
}
