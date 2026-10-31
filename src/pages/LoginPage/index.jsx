import { Eye, EyeClosed, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomLink from "../../components/Header/CustomLink";
import { Helmet } from "react-helmet-async";

export default function LoginaPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Email yoki parol noto'g'ri!");
      }

      localStorage.setItem("client_token", data.token);

      navigate(`/${currentLang}/profile`, { replace: true });
    } catch (err) {
      setError(err.message || "Server bilan xatolik yuzaga keldi");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>{t("meta.login")}</title>
        <meta name="description" content={t("meta.loginDes")} />
      </Helmet>
      <div className="flex items-center justify-center py-20">
        <div className="p-6 bg-light-main dark:bg-dark-main rounded-lg border border-link-hover">
          <div>
            <h2 className="font-bold text-2xl text-link-hover text-center">
              Xush kelibsiz!
            </h2>
            <p className="font-medium text-xl text-link-hover text-center py-3">
              Kirish
            </p>
            <p className="text-red-500 pb-3 max-w-100 text-center">{error}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-medium text-base leading-[130%]"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 p-1">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Emailingizni kiriting"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="min-w-full outline-none border border-black dark:border-gray-300 rounded-lg px-4 pl-10 py-2 focus:border-link-hover hover:border-link-hover text-black dark:text-white dark:placeholder:text-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Parol</label>
              <div className="relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 p-1">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Parolni kiriting"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="min-w-full outline-none border border-black dark:border-gray-300 rounded-lg px-10 py-2 focus:border-link-hover hover:border-link-hover text-black dark:text-white dark:placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeClosed className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full py-2 text-base text-center bg-link-hover rounded-lg text-white"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Kirish"
              )}
            </button>
          </form>
          <div className="flex items-center gap-1 pt-5">
            <span>Ro'yxatdan o'tmaganmisiz?</span>
            <CustomLink to="/register" className="text-link-hover">
              Ro'yxatdan o'tish
            </CustomLink>
          </div>
        </div>
      </div>
    </>
  );
}
