import { Fancybox } from "@fancyapps/ui";
import { ZoomIn } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { useGalleryStore } from "../../store/useGalleryStore";

export default function GalleryPage() {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { gallery, totalPages, loading, error, getGallery } = useGalleryStore();

  useEffect(() => {
    getGallery(currentPage);
  }, [currentPage, getGallery]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {});
    return () => {
      Fancybox.destroy();
    };
  }, []);

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
        <div className="flex items-center justify-center py-8 md:pt-0">
          <h2 className="font-bold text-3xl md:text-4xl">
            {t("breadCrumbs.gallery")}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {gallery.map((item) => (
            <div key={item.id} className="rounded-lg overflow-hidden">
              <a
                href={item.url}
                data-fancybox="gallery"
                className="relative group"
              >
                <img
                  src={item.url}
                  alt={`gallery-${item.id}`}
                  className="w-full h-full object-cover aspect-square"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-7 h-7 text-white" />
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center py-6">
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
