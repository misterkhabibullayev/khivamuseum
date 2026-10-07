import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Icons } from "../../icons/icons";

const languages = [
  { code: "uz", name: "O'zbek", flag: "fi-uz" },
  { code: "ru", name: "Русский", flag: "fi-ru" },
  { code: "en", name: "English", flag: "fi-gb" },
];

export default function LanguageDropdown() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLangCode = lang || i18n.language || "uz";
  const currentLang =
    languages.find((item) => item.code === currentLangCode) || languages[0];

  const handleSelectLanguage = (newLangCode) => {
    if (newLangCode === currentLangCode) {
      setIsLangOpen(false);
      return;
    }

    const pathSegments = location.pathname.split("/");
    pathSegments[1] = newLangCode;
    const newPath = pathSegments.join("/");
    i18n.changeLanguage(newLangCode);
    navigate(newPath);
    setIsLangOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsLangOpen(true)}
      onMouseLeave={() => setIsLangOpen(false)}
    >
      <button className="cursor-pointer px-2 py-0.5">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <span
              className={`fi ${currentLang.flag} fis rounded-full text-xl`}
            ></span>
            <span>{currentLang.name}</span>
          </div>
          <div
            className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : "rotate-0"}`}
          >
            <Icons.downArrowIcon />
          </div>
        </div>
      </button>
      {isLangOpen && (
        <div className="absolute top-full z-10 left-0 pt-2 w-32 shadow-lg overflow-hidden rounded-lg">
          <div className="bg-light-second dark:bg-dark-second overflow-hidden rounded-lg">
            {languages.map((item) => (
              <button
                key={item.code}
                onClick={() => handleSelectLanguage(item.code)}
                className={`cursor-pointer w-full px-3 py-2 flex items-center gap-2 overflow-hidden transition-colors duration-300 ${currentLangCode === item.code ? "bg-link-hover" : "hover:bg-link-hover/80"}`}
              >
                <span
                  className={`fi ${item.flag} fis rounded-full text-lg`}
                ></span>
                <span className="text-lg">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
