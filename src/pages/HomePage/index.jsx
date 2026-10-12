import { Helmet } from "react-helmet-async";
import AboutSection from "../../components/HomePage/AboutSection";
import CollectionSection from "../../components/HomePage/CollectionSection";
import GallerySection from "../../components/HomePage/GallerySection";
import HeroSection from "../../components/HomePage/HeroSection";
import NewsSection from "../../components/HomePage/NewsSection";
import StatistikSection from "../../components/HomePage/StatistikSection";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Helmet>
          <title>{t("meta.home")}</title>
          <meta name="description" content={t("meta.homeDes")} />
        </Helmet>
        <HeroSection />
        <AboutSection />
        <StatistikSection />
        <CollectionSection />
        <GallerySection />
        <NewsSection />
      </div>
    </>
  );
}
