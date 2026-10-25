import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Icons } from "../../icons/icons";
import CustomLink from "./CustomLink";
import HeaderModal from "./HeaderModal";
import LanguageDropdown from "./Language";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { t } = useTranslation();
  const [isModal, setIsModal] = useState(false);
  const closeModal = () => setIsModal(false);
  const location = useLocation();

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  const headerTopRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const token = localStorage.getItem("client_token");

  let clientUser = null;
  try {
    const rawUser = localStorage.getItem("client_user");
    clientUser = rawUser ? JSON.parse(rawUser) : null;
  } catch {
    clientUser = null;
  }

  const userLetter = clientUser?.email
    ? clientUser.email[0].toUpperCase()
    : clientUser?.firstName
      ? clientUser.firstName[0].toUpperCase()
      : "U";

  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/uz" ||
    location.pathname === "/ru" ||
    location.pathname === "/en" ||
    location.pathname === "/uz/" ||
    location.pathname === "/ru/" ||
    location.pathname === "/en/";

  // const isSolidBg = isSticky || !isHomePage;

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
        className={`top-0 left-0 z-1000 w-full transition-all duration-300 ${isHomePage ? `fixed ${isSticky ? "bg-white dark:bg-dark-main text-black dark:text-white" : "bg-white/10 backdrop-blur-xs text-white"}` : "sticky bg-white dark:bg-dark-main text-black dark:text-white"}`}
      >
        <div className="container1 py-3 lg:py-0">
          <div className="flex items-center justify-between py-1 text-base">
            <div className="flex items-center gap-x-2 xl:gap-x-5">
              <div className="hidden lg:flex">
                <CustomLink
                  to={"https://khiva360.nazzar.uz/"}
                  target="_blank"
                  className="flex items-center gap-x-2"
                >
                  <Icons.vrIcon />
                  <span>Khiva 360°</span>
                </CustomLink>
              </div>
              <div className="hidden lg:flex">
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
              <div className="items-center hidden md:flex">
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
                  <span className="hidden lg:flex">+998556046343</span>
                </CustomLink>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <LanguageDropdown />
                </div>
                <div>
                  <ThemeToggle
                    isSticky={isSticky}
                    headerTopRef={headerTopRef}
                  />
                </div>
              </div>
              <div className="pl-2 flex lg:hidden">
                <button
                  onClick={() => setIsModal(true)}
                  className="flex items-center"
                >
                  <Icons.burgerIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-px bg-link-hover hidden lg:flex"></div>
        <div className="container1 py-2 hidden lg:block">
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
                  to={token ? "/profile" : "/login"}
                  className="flex items-center justify-center gap-1 font-bold text-sm leading-[110%] px-1.25 py-1.25 w-8.5 h-8.5 rounded-full bg-link-hover hover:bg-link-hover/80 transition-colors duration-300 text-white"
                >
                  {token ? (
                    clientUser?.avatar ? (
                      <img
                        src={clientUser.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="font-bold text-xl flex items-center justify-center">{userLetter}</span>
                    )
                  ) : (
                    <span>
                      <Icons.personIcon />
                    </span>
                  )}
                </CustomLink>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        onClick={closeModal}
        className={`w-full h-full fixed inset-0 z-1000 bg-black/30 isModal transition-opacity duration-300
          ${
            isModal
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
      >
        <HeaderModal isModal={isModal} closeModal={closeModal} />
      </div>
    </>
  );
}
