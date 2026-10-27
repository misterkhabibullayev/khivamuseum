import {
  ArrowLeft,
  Camera,
  CircleCheck,
  CircleX,
  Eye,
  EyeClosed,
  KeyRound,
  Loader2,
  LogOut,
  Mail,
  Save,
  Settings,
  SquarePen,
  Tickets,
  Trash,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import Loading from "../../components/Loading";
import { useProfileStore } from "../../store/useProfileStore";
import { formatDate } from "../../utils/formatDate";

export default function ProfilePage() {
  const {
    profile,
    loading,
    error,
    submitting,
    getProfile,
    updateProfileName,
    updateAvatar,
    deleteAvatar,
    updatePassword,
    requestEmailChange,
    confirmEmailChange,
    getMyOrders,
    orders,
    ordersLoading,
  } = useProfileStore();

  console.log(orders);

  const [onEmail, setOnEmail] = useState(false);
  const [emailStep, setEmailStep] = useState(1);
  const [targetEmail, setTargetEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [, setSelectedId] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  const navigate = useNavigate();

  useEffect(() => {
    getMyOrders?.();
  }, [getMyOrders]);

  const showNotification = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    reset: resetName,
  } = useForm({
    values: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    reset: resetEmail,
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
  } = useForm();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (profile) {
      resetName({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
      });
    }
  }, [profile, resetName]);

  const onUpdateName = async (data) => {
    const res = await updateProfileName(data);
    if (res.success) {
      await getProfile();
      showNotification(
        "success",
        "Ism Familiyangiz muvaffaqiyatli yangilandi!",
      );
    }
  };

  const onEmailSubmit = async (data) => {
    if (emailStep === 1) {
      const res = await requestEmailChange(data.email);
      if (res.error) {
        setOnEmail(false);
        showNotification(
          "error",
          "Urinishlar soni tugadi 10 daqiqadan keyin qayta urinib ko'ring",
        );
      }
      if (res.success) {
        setTargetEmail(data.email);
        setEmailStep(2);
      } else {
        showNotification("error", res.error);
      }
    } else {
      const res = await confirmEmailChange({
        otp: data.otp,
      });
      if (res.success) {
        closeModal();
        await getProfile();
        showNotification("success", "Emailingiz muvaffaqiyatli yangilandi!");
      } else {
        showNotification("error", res.error || "Kod noto'g'ri kiritildi");
      }
    }
  };

  const closeModal = () => {
    setOnEmail(false);
    setEmailStep(1);
    setTargetEmail("");
    resetEmail();
  };

  const onPasswordSubmit = async (data) => {
    const res = await updatePassword(data);
    if (res.success) {
      showNotification("success", "Parolingiz muvaffaqiyatli yangilandi!");
      resetPassword();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await updateAvatar(file);

      if (res.success) {
        await getProfile();
        showNotification("success", "Avataringiz muvaffaqiyatli yangilandi!");
      }
    } catch (error) {
      showNotification("error", "Avatarni yuklashda xatolik yuz berdi!");
      console.error("Avatar yuklash xatosi:", error);
    }
  };

  const handleAvatarDelete = async () => {
    try {
      const res = await deleteAvatar();

      if (res && res.ok === false) {
        throw new Error("O'chirishda xatolik yuz berdi!");
      }
      await getProfile();
      showNotification("success", "Avataringiz muvaffaqiyatli o'chirildi!");
    } catch (error) {
      showNotification("error", "Avatarni o'chirishda xatolik yuz berdi!");
      console.error("Avatar o'chirish xatosi:", error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!profile) return <div className="p-4">Profile topilmadi</div>;

  return (
    <>
      <div className="">
        {statusMessage && (
          <div
            className={`fixed top-6 right-6 z-60 px-4 py-3 rounded-lg shadow-xl flex gap-3 border border-link-hover transition-all duration-300 bg-light-main dark:bg-dark-main`}
          >
            <div className="pt-1">
              {statusMessage.type === "error" ? (
                <CircleX className="w-4 h-4 text-red-600" />
              ) : (
                <CircleCheck className="w-4 h-4 text-green-600" />
              )}
            </div>
            <span className="text-sm font-medium max-w-50">
              {statusMessage.text}
            </span>
            <div>
              <button
                type="button"
                onClick={() => setStatusMessage(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        <div
          onClick={() => {
            setConfirm(false);
          }}
          className={`absolute top-0 left-0 z-100 w-full h-full bg-black/70 flex items-center justify-center ${confirm ? "block" : "hidden"}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-light-main dark:bg-dark-main p-6 rounded-lg"
          >
            <h2 className="font-medium text-xl max-w-50 text-center text-black dark:text-white">
              Haqiqattan ham o'chirmoqchimisiz?
            </h2>
            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                onClick={() => setConfirm(false)}
                className="border border-black dark:border-white text-black dark:text-white px-3 py-1 rounded-sm"
              >
                Yo'q
              </button>
              <button
                onClick={async () => {
                  handleAvatarDelete();
                  setConfirm(false);
                }}
                className="border border-link-hover text-white bg-link-hover px-3 py-1 rounded-sm"
              >
                Ha
              </button>
            </div>
          </div>
        </div>

        <div className="container1 pb-10">
          <Breadcrumbs />
          <div className="flex flex-col lg:flex-row gap-6 relative">
            <div className="lg:sticky top-30 left-0 self-start w-full lg:w-[320px] shrink-0 bg-light-main dark:bg-dark-main p-6 mt-10 lg:mt-0 rounded-2xl border border-link-hover flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-link-hover border-2 border-link-hover flex items-center justify-center font-bold text-3xl text-white">
                  {profile?.images?.length ? (
                    <img
                      src={profile.images[0].url}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {profile.firstName?.[0]}
                      {profile.lastName?.[0]}
                    </span>
                  )}

                  <div className="absolute z-10 bottom-0 right-0 flex items-center justify-center">
                    {profile?.images?.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedId(profile.id);
                          setConfirm(true);
                        }}
                        className="p-1 rounded-full text-white bg-link-hover border border-light-main dark:border-dark-main"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    ) : (
                      <label className="cursor-pointer p-1 rounded-full text-white bg-link-hover border border-light-main dark:border-dark-main">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <h2 className="mt-4 font-semibold text-lg">
                {profile.firstName} {profile.lastName}
              </h2>
              <span className="mt-1 px-3 py-0.5 text-xs font-semibold rounded-full bg-link-hover text-white uppercase">
                {profile.role}
              </span>

              <div className="w-full mt-6 pt-6 border-t border-link-hover space-y-3 text-sm text-left">
                <div className="w-full flex flex-col gap-2">
                  <a
                    href="#mytickets"
                    className="flex items-center gap-4 bg-light-second dark:bg-dark-second px-3 py-2 rounded-lg hover:bg-link-hover hover:text-white hover:gap-5 font-medium text-base transition-all duration-300"
                  >
                    <Tickets className="w-5 h-5" />
                    {t("profile.myTickets")}
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center gap-4 bg-light-second dark:bg-dark-second px-3 py-2 rounded-lg hover:bg-link-hover hover:text-white hover:gap-5 font-medium text-base transition-all duration-300"
                  >
                    <Settings className="w-5 h-5" />
                    {t("profile.settings")}
                  </a>
                  <button
                    onClick={() => {
                      localStorage.removeItem("client_token");
                      navigate(`/${currentLang}/login`);
                    }}
                    className="flex items-center gap-4 bg-light-second dark:bg-dark-second px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white hover:gap-5 font-medium text-base transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                    {t("profile.logOut")}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full h-full">
              <div
                id="mytickets"
                className="scroll-mt-17.5 lg:scroll-mt-30 bg-light-main dark:bg-dark-main w-full p-6 mb-6 rounded-2xl border border-link-hover"
              >
                {ordersLoading ? (
                  <Loading />
                ) : (
                  orders.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center h-auto bg-link-hover relative text-white"
                    >
                      <div className="w-5 h-5 bg-light-main dark:bg-dark-main absolute -top-2.5 -left-2.5 z-1 rounded-full"></div>
                      <div className="w-5 h-5 bg-light-main dark:bg-dark-main absolute -top-2.5 -right-2.5 z-1 rounded-full"></div>
                      <div className="w-5 h-5 bg-light-main dark:bg-dark-main absolute -bottom-2.5 -left-2.5 z-1 rounded-full"></div>
                      <div className="w-5 h-5 bg-light-main dark:bg-dark-main absolute -bottom-2.5 -right-2.5 z-1 rounded-full"></div>
                      <div className="w-25 h-50 bg-link-hover flex items-center justify-center relative">
                        <p className="-rotate-90 whitespace-nowrap font-bold text-xl">
                          {item.ticketNumber}
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-between h-50">
                        <div className="w-5 h-5 bg-light-main dark:bg-dark-main rounded-full -translate-y-1/2"></div>
                        <div className="w-px flex-1 h-full border border-dashed border-light-main dark:border-dark-main"></div>
                        <div className="w-5 h-5 bg-light-main dark:bg-dark-main rounded-full translate-y-1/2"></div>
                      </div>
                      <div className="w-full h-50 p-6 grid grid-cols-1 grid-rows-3 gap-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm uppercase font-medium">
                              {t("profile.xaridor")}:
                            </span>
                            <h1 className="font-bold text-xl">
                              {item.customerName}
                            </h1>
                          </div>
                          <div className="px-3 py-1 bg-light-main dark:bg-dark-main rounded-2xl text-black dark:text-white">
                            <p className="text-sm">{item.status}</p>
                          </div>
                        </div>
                        <div className="w-full grid grid-cols-3">
                          <div>
                            <p className="text-sm font-medium">
                              {t("profile.visitDay")}
                            </p>
                            <p className="font-bold">
                              {formatDate(item.visitDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{t("profile.persons")}</p>
                            <p className="font-bold">{item.totalPersons}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{t("profile.phone")}</p>
                            <p className="font-bold">{item.customerPhone}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            {t("profile.perDay")} {formatDate(item.validUntil)}
                          </p>
                          <p className="font-mono">
                            ID: {item.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div
                id="settings"
                className="scroll-mt-17.5 lg:scroll-mt-30 w-full bg-light-main dark:bg-dark-main rounded-2xl border border-link-hover flex-1 flex flex-col "
              >
                <form
                  onSubmit={handleSubmitName(onUpdateName)}
                  className="p-4 w-full border-b border-link-hover"
                >
                  <h3 className="font-medium text-base mb-2 flex items-center gap-2">
                    <User className="w-5 h-5 text-link-hover" /> {t("profile.data")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-black dark:text-white block pb-1.5">
                        {t("profile.name")}
                      </label>
                      <input
                        type="text"
                        {...registerName("firstName", { required: true })}
                        className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-lg px-3.5 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-black dark:text-white block pb-1.5">
                        {t("prfoile.lastName")}
                      </label>
                      <input
                        type="text"
                        {...registerName("lastName", { required: true })}
                        className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-lg px-3.5 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-link-hover hover:opacity-90 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
                    >
                      <Save className="w-4 h-4" /> {t("profile.save")}
                    </button>
                  </div>
                </form>

                <form
                  onSubmit={handleSubmitEmail(onEmailSubmit)}
                  className="p-4 border-b border-link-hover"
                >
                  <h3 className="font-medium text-base mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-link-hover" /> {t("profile.email")}
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs text-black dark:text-white block pb-1.5">
                        {t("profile.currentEmail")}
                      </label>
                      <input
                        type="email"
                        disabled
                        value={profile.email}
                        className="w-full outline-none bg-gray-800/40 border border-gray-600/50 text-white rounded-lg px-3.5 py-2 text-sm cursor-not-allowed"
                      />
                    </div>
                    <div className="w-full flex items-center justify-end">
                      <button
                        onClick={() => setOnEmail(true)}
                        className="bg-link-hover hover:opacity-90 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
                      >
                        <SquarePen className="w-4 h-4" /> {t("profile.changeEmail")}
                      </button>
                    </div>
                  </div>
                </form>

                <form
                  onSubmit={handleSubmitPassword(onPasswordSubmit)}
                  className="p-4"
                >
                  <h3 className="font-medium text-base mb-4 flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-link-hover" /> {t("profile.passwordUpdate")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-black dark:text-white block pb-1.5">
                        {t("profile.lastPassword")}
                      </label>
                      <div>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...registerPassword("oldPassword", {
                            required: true,
                          })}
                          className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-xl px-3.5 py-2 text-sm text-black dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-black dark:text-white block pb-1.5">
                        {t("profile.newPassword")}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...registerPassword("newPassword", {
                            required: true,
                          })}
                          className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-xl px-3.5 py-2 text-sm text-black dark:text-white"
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
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="border border-link-hover text-link-hover hover:bg-link-hover hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                    >
                      {t("profile.changePassword")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {onEmail && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <div className="bg-light-main dark:bg-dark-main rounded-2xl shadow-2xl relative">
              <div
                className={`px-4 pt-2 flex items-center ${emailStep === 2 ? "justify-between" : "justify-end"}`}
              >
                {emailStep === 2 && (
                  <button
                    type="button"
                    onClick={() => setEmailStep(1)}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-dark-second transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-center pb-2">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  {emailStep === 1
                    ? "Emailni o'zgartirish"
                    : "Kodni tasdiqlash"}
                </h2>
              </div>

              <form
                onSubmit={handleSubmitEmail(onEmailSubmit)}
                className="pt-2 space-y-4 px-4 pb-4"
              >
                {emailStep === 1 ? (
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-400 pb-3 max-w-65 text-center">
                      Yangi elektron pochtangizni kiriting. Ushbu manzilga
                      tasdiqlash kodi yuboriladi.
                    </p>
                    <input
                      type="email"
                      placeholder="yangi@pochta.uz"
                      {...registerEmail("email", { required: emailStep === 1 })}
                      className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-lg px-3.5 py-2 text-sm text-black dark:text-white"
                    />
                    <div className="w-full flex items-center justify-center gap-2 pt-5">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-link-hover hover:opacity-90 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                      >
                        {submitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          ""
                        )}
                        Kodni yuborish
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-400 pb-3 max-w-65 text-center">
                      <span className="text-link-hover font-medium">
                        {targetEmail}
                      </span>{" "}
                      pochtasiga yuborilgan tasdiqlash kodini kiriting.
                    </p>
                    <label className="text-sm text-black dark:text-white block pb-1.5 text-center">
                      Tasdiqlash kodi
                    </label>
                    <input
                      type="text"
                      placeholder="6 xonali kod"
                      maxLength={6}
                      {...registerEmail("otp", { required: emailStep === 2 })}
                      className="w-full outline-none bg-transparent border border-gray-600 focus:border-link-hover rounded-lg px-3.5 py-2 text-sm text-black dark:text-white tracking-widest text-center"
                    />
                    <div className="w-full flex items-center justify-center pt-5">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                      >
                        Tasdiqlash
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
