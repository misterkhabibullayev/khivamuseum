import { Eye, EyeClosed, Loader2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomLink from "../../components/Header/CustomLink";
import { Helmet } from "react-helmet-async";

export default function RegisterPage() {
  const { t,i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch {
          errorData = { error: "Server bilan aloqa yo'q: " + res.status };
        }
        throw errorData;
      }

      const data = await res.json();

      const token = data.token || data.access_token || data.data?.token;
      if (token) {
        localStorage.setItem("client_token", token);
        if (data.user || data.data?.user) {
          localStorage.setItem(
            "client_user",
            JSON.stringify(data.user || data.data.user),
          );
        }
      }

      navigate(`/${currentLang}/register/verify`, {
        replace: true,
        state: { email: formData.email.trim() },
      });
    } catch (err) {
      setError(err.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>{t("meta.register")}</title>
        <meta name="description" content={t("meta.registerDes")} />
      </Helmet>
      <div className="flex items-center justify-center py-20">
        <div className="p-6 bg-light-main dark:bg-dark-main rounded-lg border border-link-hover">
          <div>
            <h2 className="font-bold text-2xl text-link-hover text-center pb-3">
              Ro'yxatdan o'tish
            </h2>
            <p className="text-red-500 text-center text-sm pb-3">{error}</p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="firstName"
                className="font-medium text-base leading-[130%]"
              >
                Ism
              </label>
              <div className="relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 p-1">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ismingizni kiriting"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="min-w-full outline-none border border-black dark:border-gray-300 rounded-lg px-4 pl-10 py-2 focus:border-link-hover hover:border-link-hover text-black dark:text-white dark:placeholder:text-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lastname"
                className="font-medium text-base leading-[130%]"
              >
                Familiya
              </label>
              <div className="relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 p-1">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Familiyangizni kiriting"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="min-w-full outline-none border border-black dark:border-gray-300 rounded-lg px-4 pl-10 py-2 focus:border-link-hover hover:border-link-hover text-black dark:text-white dark:placeholder:text-gray-300"
                />
              </div>
            </div>
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
              <label
                htmlFor="password"
                className="font-medium text-base leading-[130%]"
              >
                Parol
              </label>
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
            <div className="col-span-1 md:col-span-2 flex items-center justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full py-2 text-base text-center bg-link-hover rounded-lg text-white"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Ro'yxatdan o'tish"
                )}
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center gap-1 pt-4">
            <span className="">Akkountingiz bormi</span>
            <CustomLink to="/login" className="text-link-hover">
              Kirish
            </CustomLink>
          </div>
        </div>
      </div>
    </>
  );
}
