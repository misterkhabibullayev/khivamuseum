import { KeyRound, Loader2, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtpPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: code.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Tasdiqlash kodi xato!");
      }

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

      navigate(`/${currentLang}/profile`, { replace: true });
    } catch (err) {
      setError(err.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || resending) return;
    setResending(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Kodni qayta yuborib bo'lmadi");
      }

      setTimer(60);
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md p-6 bg-light-main dark:bg-dark-main rounded-2xl border border-link-hover shadow-xl">
        <div className="text-center pb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-link-hover/10 text-link-hover flex items-center justify-center">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="font-bold text-2xl text-link-hover">
            Emailni tasdiqlash
          </h2>
          <p className="text-base text-black/60 dark:text-white/60 mt-2">
            Biz <span className="font-semibold text-link-hover">{email}</span>{" "}
            manziliga tasdiqlash kodini yubordik.
          </p>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <input
              type="text"
              maxLength={6}
              required
              placeholder="· · · · · ·"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 text-center text-2xl font-mono tracking-widest outline-none border border-black dark:border-gray-300 rounded-lg focus:border-link-hover hover:border-link-hover text-black dark:text-white bg-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading || code.length < 4}
            className="flex items-center justify-center w-full py-2.5 text-base font-semibold bg-link-hover rounded-lg text-white hover:bg-link-hover/90 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Tasdiqlash"
            )}
          </button>
        </form>

        <div className="text-center mt-5">
          {timer > 0 ? (
            <p className="text-sm text-black/50 dark:text-white/50">
              Kodni qayta yuborish:{" "}
              <span className="font-bold">{timer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-xs text-link-hover font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              {resending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <RotateCcw className="w-3 h-3" />
              )}
              Kodni qayta yuborish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
