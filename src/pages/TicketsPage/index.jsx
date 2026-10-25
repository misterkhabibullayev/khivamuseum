import { CheckCircle, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import Loading from "../../components/Loading";
import { useTicketsStore } from "../../store/useTicketsStore";

export default function TicketsPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  const navigate = useNavigate();
  const location = useLocation();

  const {
    activeTickets = [],
    loading,
    error,
    getActiveTickets,
    purchaseTicket,
    verifyTicket,
    submitting,
  } = useTicketsStore();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [step, setStep] = useState(1);
  const [otpCode, setOtpCode] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    quantity: 1,
    visitDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    getActiveTickets?.();
  }, [getActiveTickets]);

  const handleBuyClick = (ticket) => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("client_token");

    if (!token) {
      navigate(`/${currentLang}/login`, { state: { from: location.pathname } });
      return;
    }

    const rawUser =
      localStorage.getItem("user") || localStorage.getItem("client_user");
    const user = rawUser ? JSON.parse(rawUser) : {};

    setFormData({
      customerName: user.fullName || user.name || "",
      customerEmail: user.email || "",
      customerPhone: user.phone || "",
      quantity: 1,
      visitDate: new Date().toISOString().split("T")[0],
    });

    setSelectedTicket(ticket);
    setStep(1);
  };

  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ticketId: selectedTicket?.id || selectedTicket?._id,
      customerName: formData.customerName.trim(),
      customerEmail: formData.customerEmail.trim(),
      customerPhone: formData.customerPhone.trim(),
      quantity: Number(formData.quantity),
      visitDate: formData.visitDate,
    };

    const res = await purchaseTicket(payload);
    if (res.ok) {
      const createdOrderId = res.data?.orderId;

      setOrderId(createdOrderId);
      setStep(2);
    } else {
      alert(
        "Xatolik: " +
          (res.error || res.data?.message || "Xarid amalga oshmadi"),
      );
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const payload = {
      orderId: orderId,
      code: otpCode.trim(),
    };

    const res = await verifyTicket(payload);
    if (res.ok) {
      alert("Chipta muvaffaqiyatli tasdiqlandi!");
      setSelectedTicket(null);
      setStep(1);
      setOtpCode("");
    } else {
      alert("Xatolik: " + (res.error || res.data?.message || "Kod noto'g'ri"));
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <>
      <div className="container1">
        <Breadcrumbs />
        <div>
          <div className="py-8 md:pt-2">
            <h1 className="font-bold text-2xl text-center">
              {t("tickets.title") || "Chipta ta'riflari"}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
            {activeTickets.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col justify-between bg-light-main dark:bg-dark-main rounded-3xl overflow-hidden"
              >
                <div className="p-6 pb-4 border border-link-hover rounded-t-3xl border-b-0">
                  <div className="flex items-start justify-between gap-3 pb-4">
                    <h2 className="font-bold text-xl leading-snug flex-1">
                      {item.title?.[currentLang] || item.title?.uz}
                    </h2>
                    <span className="px-3 py-1 bg-link-hover text-white border border-light-second dark:border-dark-second rounded-full text-xs font-semibold shrink-0 uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-link-hover">
                    <span className="font-medium text-sm text-black/60 dark:text-white/60">
                      {item.ageRestriction}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <p className="font-bold text-2xl text-link-hover">
                        {Number(item.price).toLocaleString()}
                      </p>
                      <span className="text-xs text-black/50 dark:text-white/50">
                        so'm
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-xs font-semibold text-black/80 dark:text-white/80 mb-2 uppercase tracking-wider">
                      Kiritilgan xizmatlar:
                    </p>
                    <ul className="space-y-2">
                      {item.includedServices?.map((service, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70"
                        >
                          <CheckCircle className="w-4 h-4 text-link-hover shrink-0 mt-0.5" />
                          <span className="line-clamp-2 leading-tight">
                            {service}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="w-4 h-7 bg-light-second dark:bg-dark-second rounded-r-full -ml-px border-r border-t border-b border-link-hover"></div>

                  <div className="flex-1 border-b-2 border-dashed border-link-hover mx-2"></div>

                  <div className="w-4 h-7 bg-light-second dark:bg-dark-second rounded-l-full -mr-px border-l border-t border-b border-link-hover"></div>
                </div>

                <div className="p-6 pt-4 flex flex-col justify-between flex-1 bg-light-main dark:bg-dark-main border border-t-0 rounded-b-3xl border-link-hover">
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-black/80 dark:text-white/80 mb-1.5 uppercase tracking-wider">
                      Qoidalar:
                    </p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          item.rules?.[currentLang] || item.rules?.uz || "",
                      }}
                      className="text-xs text-black/60 dark:text-white/60 leading-relaxed line-clamp-3"
                    />
                  </div>

                  <div className="w-full pt-2">
                    <button
                      type="button"
                      onClick={() => handleBuyClick(item)}
                      className="w-full py-2.5 px-4 font-semibold text-base text-white bg-link-hover hover:bg-link-hover/90 active:scale-[0.99] transition-all rounded-xl shadow-md shadow-link-hover/20 cursor-pointer"
                    >
                      Sotib Olish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedTicket && (
        <div className="fixed inset-0 z-1001 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-light-main dark:bg-dark-main w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-link-hover relative">
            <button
              type="button"
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {step === 1 ? (
              <form onSubmit={handlePurchaseSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-center">
                  Chipta xarid qilish
                </h3>
                <p className="text-xl text-center text-link-hover font-medium">
                  {selectedTicket.title?.[currentLang]}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-black/70 dark:text-white/70">
                      Ism va Familiya
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ali Valiyev"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerName: e.target.value,
                        })
                      }
                      className="w-full mt-1 p-2.5 rounded-lg border border-gray-300 bg-gray-50/50 dark:bg-dark-second outline-none focus:border-link-hover"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-black/70 dark:text-white/70">
                      Telefon raqam
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+998 88 299 78 09"
                      value={formData.customerPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerPhone: e.target.value,
                        })
                      }
                      className="w-full mt-1 p-2.5 rounded-lg border border-gray-300 bg-gray-50/50 dark:bg-dark-second outline-none focus:border-link-hover"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-black/70 dark:text-white/70">
                    Email manzilingiz
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alivaliyev@example.com"
                    value={formData.customerEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customerEmail: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-2.5 rounded-lg border border-gray-300 bg-gray-50/50 dark:bg-dark-second outline-none focus:border-link-hover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-black/70 dark:text-white/70">
                      Tashrif sanasi
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.visitDate}
                      onChange={(e) =>
                        setFormData({ ...formData, visitDate: e.target.value })
                      }
                      className="w-full mt-1 p-2.5 rounded-lg border border-gray-300 bg-gray-50/50 dark:bg-dark-second outline-none focus:border-link-hover"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-black/70 dark:text-white/70">
                      Chiptalar soni
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      required
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      className="w-full mt-1 p-2.5 rounded-lg border border-gray-300 bg-gray-50/50 dark:bg-dark-second outline-none focus:border-link-hover"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-zinc-700 flex justify-between items-center">
                  <span className="font-semibold text-sm">Jami to'lov:</span>
                  <span className="font-bold text-xl text-link-hover">
                    {(
                      Number(selectedTicket.price) * Number(formData.quantity)
                    ).toLocaleString()}{" "}
                    so'm
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-link-hover text-white font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-link-hover/90 transition-colors"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Kodni olish
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifySubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-center">
                  Tasdiqlash kodi
                </h3>
                <div className="flex items-center justify-center">
                  <p className="text-sm text-center text-black/60 dark:text-white/60 max-w-100">
                    <strong className="text-link-hover">
                      {formData.customerEmail}
                    </strong>{" "}
                    manziliga 6 xonali tasdiqlash kodi yuborildi.
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="· · · · · ·"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full p-3 text-center text-2xl font-mono tracking-widest outline-none border border-black dark:border-gray-300 rounded-lg focus:border-link-hover hover:border-link-hover text-black dark:text-white bg-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-link-hover text-white font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-link-hover/90 transition-colors"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Tasdiqlash
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
