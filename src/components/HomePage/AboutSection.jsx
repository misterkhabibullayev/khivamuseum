import { useTranslation } from "react-i18next";
import CustomLink from "../Header/CustomLink";
import { Icons } from "../../icons/icons";

export default function AboutSection() {
  const { t } = useTranslation();
  return (
    <>
      <section className="py-30 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 overflow-x-hidden">
        <div className="w-full md:w-1/2 px-5 md:pl-[8%]">
          <div>
            <h1 className="font-bold text-2xl md:text-3xl leading-[110%] text-black dark:text-white">
              {t("about.title")}
            </h1>
            <p className="font-medium text-base md:text-lg leading-[130%] text-black dark:text-white my-8 md:my-10">
              {t("about.text")}
            </p>
            <div className="flex items-center gap-5">
              <CustomLink
                to={"/tickets"}
                className="flex items-center gap-1 font-bold text-sm leading-[110%] w-auto px-5 h-8.5 rounded-full bg-link-hover hover:bg-link-hover/80 transition-colors duration-300 text-white"
              >
                {t("header.aTickets")}
                <span>
                  <Icons.ticketIcon />
                </span>
              </CustomLink>
              <CustomLink
                to="about"
                className="flex items-center gap-1 px-5 h-8.5 rounded-full border border-link-hover hover:bg-link-hover hover:gap-2 transition-all duration-300 text-sm md:text-base font-medium leading-[130%]"
              >
                {t("about.more")}
                <Icons.rightIcon />
              </CustomLink>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center md:rounded-l-full overflow-hidden">
          <img
            src="/Images/khiva1.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
