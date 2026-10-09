import { Icons } from "../../icons/icons";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./Language";
import { useEffect, useRef, useState } from "react";
import CustomLink from "./CustomLink";

export default function Header() {
  const { t } = useTranslation();

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  const headerTopRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (headerTopRef.current) {
        const topHeaderHeight = headerTopRef.current.offsetHeight;
        const shouldBeSticky = window.scrollY >= topHeaderHeight;

        setIsSticky((prev) =>
          prev !== shouldBeSticky ? shouldBeSticky : prev,
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header
        ref={headerTopRef}
        className={`fixed top-0 left-0 z-9999 w-full transition-all duration-300 ${isSticky ? "bg-white dark:bg-dark-main text-black dark:text-white" : "bg-white/10 backdrop-blur-xs text-white"}`}
      >
        <div className="container1">
          <div className="flex items-center justify-between py-1 text-base">
            <div className="flex items-center gap-x-2 xl:gap-x-5">
              <div>
                <CustomLink
                  to={"https://khiva360.nazzar.uz/"}
                  target="_blank"
                  className="flex items-center gap-x-2"
                >
                  <Icons.vrIcon />
                  <span>Khiva 360°</span>
                </CustomLink>
              </div>
              <div>
                <CustomLink
                  to={"https://khivamuseumshop.uz/main/home"}
                  target="_blank"
                  className="flex items-center gap-x-2"
                >
                  <Icons.shopIcon />
                  <span>Khiva Museum Shop</span>
                </CustomLink>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <CustomLink
                  to={"https://www.youtube.com/@khivamuseaum.2025"}
                  className="inline-block px-2 py-0.5"
                >
                  <Icons.youtubeIcon />
                </CustomLink>
                <CustomLink
                  to={"https://www.instagram.com/khivamuseumuzb"}
                  className="inline-block px-2 py-0.5"
                >
                  <Icons.instagramIcon />
                </CustomLink>
                <CustomLink
                  to={"mailto: info@khivamuseum.uz"}
                  className="inline-block px-2 py-0.5"
                >
                  <Icons.mailIcon />
                </CustomLink>
                <CustomLink
                  to={"tel: +998556046343"}
                  className="flex items-center px-2 py-0.5 gap-1"
                >
                  <Icons.phoneIcon />
                  <span>+998556046343</span>
                </CustomLink>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <LanguageDropdown />
                </div>
                <div>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-px bg-link-hover"></div>
        <div className="container1 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-7">
              <div>
                <CustomLink to={"/"}>
                  <img src="/Images/logo.png" alt="" className="h-14.5" />
                </CustomLink>
              </div>
              <nav className="flex items-center gap-7 py-2">
                <CustomLink
                  to={"/"}
                  className="font-bold text-sm uppercase leading-[110%] group relative"
                >
                  {t("header.home")}
                  <span className="absolute -bottom-2 left-0 w-full h-0.5! bg-link-hover scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                </CustomLink>
                <div
                  className="relative"
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                >
                  <button className="cursor-pointer h-full flex items-center gap-1">
                    <span className="font-bold text-sm uppercase leading-[110%]">
                      {t("header.aboutus")}
                    </span>
                    <span
                      className={`transition-transform duration-200 ${isAboutOpen ? "rotate-180" : "rotate-0"}`}
                    >
                      <Icons.downArrowIcon className="w-4.5 h-4.5" />
                    </span>
                  </button>
                  {isAboutOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-45 pt-2">
                      <div className="w-full flex flex-col items-center bg-link-hover rounded-lg">
                        <CustomLink
                          to={"/about"}
                          className="font-medium text-base leading-[130%] px-5 py-2 text-white"
                        >
                          {t("header.aboutTheMuseum")}
                        </CustomLink>
                        <div className="h-px bg-white w-full"></div>
                        <CustomLink
                          to={"/employees"}
                          className="font-medium text-base leading-[130%] px-5 py-2 text-white"
                        >
                          {t("header.employees")}
                        </CustomLink>
                      </div>
                    </div>
                  )}
                </div>
                <CustomLink
                  to={"/collections"}
                  className="font-bold text-sm uppercase leading-[110%] group relative"
                >
                  {t("header.museumCollection")}
                  <span className="absolute -bottom-2 left-0 w-full h-0.5! bg-link-hover scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                </CustomLink>
                <CustomLink
                  to={"/gallery"}
                  className="font-bold text-sm uppercase leading-[110%] group relative"
                >
                  {t("header.gallery")}
                  <span className="absolute -bottom-2 left-0 w-full h-0.5! bg-link-hover scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                </CustomLink>
                <div
                  className="relative"
                  onMouseEnter={() => setIsNewsOpen(true)}
                  onMouseLeave={() => setIsNewsOpen(false)}
                >
                  <button className="cursor-pointer h-full flex items-center gap-1">
                    <span className="font-bold text-sm uppercase leading-[110%]">
                      {t("header.news")}
                    </span>
                    <span
                      className={`transition-transform duration-200 ${isNewsOpen ? "rotate-180" : "rotate-0"}`}
                    >
                      <Icons.downArrowIcon className="w-4.5 h-4.5" />
                    </span>
                  </button>
                  {isNewsOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-45 pt-2">
                      <div className="w-full flex flex-col items-center bg-link-hover rounded-lg">
                        <CustomLink
                          to={"/news"}
                          className="font-medium text-base leading-[130%] px-5 py-2 text-white"
                        >
                          {t("header.news")}
                        </CustomLink>
                        <div className="h-px bg-white w-full"></div>
                        <CustomLink
                          to={"/announcements"}
                          className="font-medium text-base leading-[130%] px-5 py-2 text-white"
                        >
                          {t("header.announcements")}
                        </CustomLink>
                      </div>
                    </div>
                  )}
                </div>
                <CustomLink
                  to={"/contact"}
                  className="font-bold text-sm uppercase leading-[110%] group relative"
                >
                  {t("header.contact")}
                  <span className="absolute -bottom-2 left-0 w-full h-0.5! bg-link-hover scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                </CustomLink>
              </nav>
            </div>
            <div className="flex items-center gap-5">
              <div className="">
                <CustomLink
                  to={"/tickets"}
                  className="flex items-center gap-1 font-bold text-sm leading-[110%] w-full px-5 h-8.5 rounded-full bg-link-hover hover:bg-link-hover/80 transition-colors duration-300 text-white"
                >
                  {t("header.aTickets")}
                  <span>
                    <Icons.ticketIcon />
                  </span>
                </CustomLink>
              </div>
              <div>
                <CustomLink
                  to={"/login"}
                  className="flex items-center gap-1 font-bold text-sm leading-[110%] w-full px-1.25 py-1.25 rounded-full bg-link-hover hover:bg-link-hover/80 transition-colors duration-300 text-white"
                >
                  <span>
                    <Icons.personIcon />
                  </span>
                </CustomLink>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
