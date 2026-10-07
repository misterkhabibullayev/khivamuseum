import { useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LanguageWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const supportedLangs = ["uz", "ru", "en"];

    if (!supportedLangs.includes(lang)) {
      navigate("/uz", { replace: true });
      return;
    }

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n, navigate]);

  return <Outlet />;
}
