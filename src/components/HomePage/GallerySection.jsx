import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Icons } from "../../icons/icons";
import { useGalleryStore } from "../../store/useGalleryStore";
import CustomLink from "../Header/CustomLink";

export default function GallerySection() {
  const { t } = useTranslation();

  const { gallery, getGallery } = useGalleryStore();

  useEffect(() => {
    getGallery();
  }, [getGallery]);
  return (
    <section className="py-10">
      <div className="container1">
        <div className="flex items-center justify-between pb-10">
          <h2 className="font-semibold text-2xl md:text-4xl">
            {t("gallery.title")}
          </h2>
          <CustomLink
            to="/gallery"
            className="flex items-center gap-1 border border-link-hover px-5 rounded-full py-1 text-sm md:text-base hover:bg-link-hover hover:text-white transition-all duration-300"
          >
            {t("more")}
            <Icons.rightIcon />
          </CustomLink>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 grid-rows-4 sm:grid-rows-2 sm:h-125 gap-6">
          {gallery.slice(0, 4).map((item, index) => (
            <div
              key={item.id}
              className={`rounded-xl overflow-hidden h-75 md:h-auto ${index === 0 ? "col-span-2 row-span-1 sm:row-span-2" : ""} ${index === 1 ? "col-span-2 row-span-1 sm:row-span-1" : ""} ${index === 2 ? "col-span-2 sm:col-span-1 row-span-1 sm:row-span-1" : ""} ${index === 3 ? "col-span-2 sm:col-span-1 row-span-1 sm:row-span-1" : ""}`}
            >
              <img
                src={item?.url}
                alt={`gallery-${item.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
