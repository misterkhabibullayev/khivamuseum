import { useTranslation } from "react-i18next";
import { Icons } from "../../icons/icons";
import CustomLink from "./CustomLink";
import LanguageDropdown from "./Language";
import ThemeToggle from "./ThemeToggle";

export default function HeaderModal({ isModal, closeModal }) {
  const { t } = useTranslation();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`w-80 h-dvh relative transition-transform duration-300 bg-white dark:bg-dark-main ${isModal ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-5 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between pb-5 border-b border-b-link-hover">
          <CustomLink to={"/"}>
            <img
              src="/Images/logo.png"
              alt="KhivaMuseum logo"
              className="h-14.5"
            />
          </CustomLink>
          <button onClick={closeModal}>
            <Icons.closeIcon />
          </button>
        </div>
        <div className="flex items-center gap-3 py-5">
          <div>
            <LanguageDropdown />
          </div>
          <div>
            <ThemeToggle isModal={isModal} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-7 py-2">
            <CustomLink
              to={"/"}
              className="font-bold text-sm uppercase leading-[110%] group relative"
            >
              {t("header.home")}
              <span className="absolute -bottom-2 left-0 w-full h-0.5! bg-link-hover scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
            </CustomLink>
            <CustomLink
              to={"/about"}
              className="font-bold text-sm uppercase leading-[110%] group relative"
            >
              {t("header.aboutus")}
              <span className="absolute -bottom-2 left-0 w-full h-0.5! bg-link-hover scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
            </CustomLink>
            <CustomLink
              to={"/empolyees"}
              className="font-bold text-sm uppercase leading-[110%] group relative"
            >
              {t("header.employees")}
              <span className="absolute -bottom-2 left-0 w-full h-0.5! bg-link-hover scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
            </CustomLink>
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
            <CustomLink
              to={"/news"}
              className="font-bold text-sm uppercase leading-[110%] group relative"
            >
              {t("header.news")}
              <span className="absolute -bottom-2 left-0 w-full h-0.5! bg-link-hover scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
            </CustomLink>
            <CustomLink
              to={"/announcements"}
              className="font-bold text-sm uppercase leading-[110%] group relative"
            >
              {t("header.announcements")}
              <span className="absolute -bottom-2 left-0 w-full h-0.5! bg-link-hover scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
            </CustomLink>

            <CustomLink
              to={"/contact"}
              className="font-bold text-sm uppercase leading-[110%] group relative"
            >
              {t("header.contact")}
              <span className="absolute -bottom-2 left-0 w-full h-0.5! bg-link-hover scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
            </CustomLink>
          </nav>
        </div>
        <div className="shrink-0 bg-white dark:bg-dark-main flex flex-col items-center gap-5 pt-5">
          <div className="flex items-center gap-5 w-full">
            <div className="flex-1">
              <CustomLink
                to={"/tickets"}
                className="flex items-center justify-center gap-1 font-bold text-sm leading-[110%] w-full px-5 h-8.5 rounded-full bg-link-hover hover:bg-link-hover/80 transition-colors duration-300 text-white"
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
          <div className="grid grid-cols-2 gap-5 w-full">
            <CustomLink
              to="https://t.me/khivamuseum"
              className="text-base text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Icons.telegramIcon className="w-7 h-7" />
              Telegram
            </CustomLink>
            <CustomLink
              to="https://www.instagram.com/khivamuseum/"
              className="text-base text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Icons.footerInstaIcon className="w-7 h-7" />
              Instagram
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
}
