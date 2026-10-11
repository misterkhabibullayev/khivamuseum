import AboutSection from "../../components/HomePage/AboutSection";
import CollectionSection from "../../components/HomePage/CollectionSection";
import GallerySection from "../../components/HomePage/GallerySection";
import HeroSection from "../../components/HomePage/HeroSection";
import NewsSection from "../../components/HomePage/NewsSection";
import StatistikSection from "../../components/HomePage/StatistikSection";

export default function HomePage() {
  return (
    <>
      <div>
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
