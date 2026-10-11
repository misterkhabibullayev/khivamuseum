import { useTranslation } from "react-i18next";
import CustomLink from "../Header/CustomLink";
import { Icons } from "../../icons/icons";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#121316] pt-20">
      <div className="container1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 pb-18">
          <div>
            <div>
              <CustomLink to="/" className="flex items-center gap-2">
                <img
                  src="/Images/logo.png"
                  alt="Khiva Museum Logo"
                  className="h-15"
                />
                <h2 className="whitespace-pre-line font-bold text-2xl text-white">
                  {t("footer.logo")}
                </h2>
              </CustomLink>
            </div>
            <div className="flex gap-1 my-4 text-gray-300">
              <span className="pt-1">
                <Icons.locationIcon />
              </span>
              <span className="font-medium text-sm max-w-50">
                {t("footer.address")}
              </span>
            </div>
            <div>
              <CustomLink
                to={""}
                className="flex items-center gap-1 font-bold text-sm leading-[110%] w-fit px-5 h-8.5 rounded-full bg-link-hover transition-all duration-300 text-white hover:gap-2"
              >
                {t("footer.addressOpen")}
                <span>
                  <Icons.rightIcon />
                </span>
              </CustomLink>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:col-span-2">
            <div>
              <h2 className="font-semibold text-2xl mb-5 text-white">
                {t("footer.main")}
              </h2>
              <div className="flex flex-col">
                <CustomLink
                  to="/"
                  className="text-sm py-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  {t("footer.mainLink")}
                </CustomLink>
                <CustomLink
                  to="/about"
                  className="text-sm py-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  {t("footer.aboutUs")}
                </CustomLink>
                <CustomLink
                  to="/news"
                  className="text-sm py-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  {t("footer.news")}
                </CustomLink>
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-2xl mb-5 text-white">
                {t("footer.museum")}
              </h2>
              <div className="flex flex-col">
                <CustomLink
                  to="/collection"
                  className="text-sm py-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  {t("footer.museumCollection")}
                </CustomLink>
                <CustomLink
                  to="/gallery"
                  className="text-sm py-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  {t("footer.gallery")}
                </CustomLink>
                <CustomLink
                  to="/contact"
                  className="text-sm py-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  {t("footer.contact")}
                </CustomLink>
                <CustomLink
                  to="https://khiva360.nazzar.uz/"
                  className="text-sm py-3 text-gray-300 hover:text-white transition-all duration-300"
                >
                  {t("footer.khiva360")}
                </CustomLink>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-2xl mb-5 text-white">
              {t("footer.socialNetworks")}
            </h2>
            <div className="grid grid-cols-2">
              <CustomLink
                to="https://www.instagram.com/khivamuseum/"
                className="text-sm py-3 text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Icons.footerInstaIcon />
                Instagram
              </CustomLink>
              <CustomLink
                to="https://www.facebook.com/"
                className="text-sm py-3 text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Icons.facebookIcon />
                Facebook
              </CustomLink>
              <CustomLink
                to="https://t.me/khivamuseum"
                className="text-sm py-3 text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Icons.telegramIcon />
                Telegram
              </CustomLink>
              <CustomLink
                to="https://www.youtube.com/"
                className="text-sm py-3 text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Icons.youtubeIcon />
                YouTube
              </CustomLink>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-white"></div>
      <div className="flex flex-col sm:flex-row items-center justify-center py-6 gap-2 font-medium text-lg text-white">
        <p>
          &copy; {new Date().getFullYear()} {t("footer.copyRight")}
        </p>
        <Link
          to={"https://www.limon.group/"}
          className="flex items-center gap-1"
        >
          Developed by
          <span className="font-bold text-xl text-[#D4AF37]">LIMON.UZ</span>
        </Link>
      </div>
    </footer>
  );
}
