import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBreadcrumbStore } from "../store/useBreadCrumStore";
import CustomLink from "./Header/CustomLink";

export default function Breadcrumbs() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { dynamicName } = useBreadcrumbStore();

  const supportedLangs = ["uz", "ru", "en"];

  const rawPathnames = location.pathname.split("/").filter((x) => x);

  const hasLangPrefix =
    rawPathnames.length > 0 && supportedLangs.includes(rawPathnames[0]);
  const currentLangPrefix = hasLangPrefix ? `/${rawPathnames[0]}` : "";

  const pathnames = hasLangPrefix ? rawPathnames.slice(1) : rawPathnames;

  if (pathnames.length === 0) return null;

  return (
    <nav className="items-center gap-2 py-4 hidden md:flex font-FiraSans font-normal text-[14px] leading-[110%]">
      <CustomLink
        to={currentLangPrefix || "/"}
        className="text-black dark:text-white transition-colors"
      >
        {t("breadCrumbs.main")}
      </CustomLink>

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        const translationKey = `breadCrumbs.${value}`;
        const hasTranslation = i18n.exists(translationKey);

        let label = value;

        if (hasTranslation) {
          label = t(translationKey);
        } else if (last && dynamicName) {
          label = dynamicName;
        }

        return (
          <div key={to} className="flex items-center gap-2">
            <span className="text-black dark:text-white">/</span>
            {last ? (
              <span className="text-black dark:text-white font-normal">
                {label}
              </span>
            ) : (
              <CustomLink
                to={to}
                className="text-black dark:text-white transition-all duration-300"
              >
                {label}
              </CustomLink>
            )}
          </div>
        );
      })}
    </nav>
  );
}
