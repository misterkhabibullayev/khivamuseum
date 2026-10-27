import { create } from "zustand";

const BASE_URL_PROFILE = import.meta.env.VITE_BASE_URL;

const getHeaders = (isJson = true) => {
  const token = localStorage.getItem("client_token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (isJson) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

export const useProfileStore = create((set, get) => ({
  profile: null,
  loading: false,
  submitting: false,
  error: null,

  orders: [],
  ordersMeta: null,
  ordersLoading: false,

  getProfile: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL_PROFILE}/profile`, {
        headers: getHeaders(true),
        cache: "no-store",
      });
      const result = await res.json();

      if (res.ok) {
        set({ profile: result.user || result.data || null });
      } else {
        set({ error: result.error || "Yuklashda xatolik" });
      }
    } catch (err) {
      set({ error: err.error });
    } finally {
      set({ loading: false });
    }
  },

  getMyOrders: async (page = 1) => {
    set({ ordersLoading: true });
    try {
      const params = new URLSearchParams({
        page: String(page),
      });

      const res = await fetch(
        `${BASE_URL_PROFILE}/tickets/my/orders?${params.toString()}`,
        {
          method: "GET",
          headers: getHeaders(true),
          cache: "no-store",
        },
      );
      const result = await res.json();

      if (res.ok) {
        set({
          orders: result.data || [],
          ordersMeta: result.meta || null,
        });
        return { success: true, data: result.data, meta: result.meta };
      }

      return {
        success: false,
        message: result.message || "Chiptalarni yuklab bo'lmadi",
      };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      set({ ordersLoading: false });
    }
  },

  updateProfileName: async (data) => {
    set({ submitting: true });
    try {
      const res = await fetch(`${BASE_URL_PROFILE}/profile`, {
        method: "PATCH",
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        set((state) => ({
          profile: { ...state.profile, ...data },
        }));
        return {
          success: true,
          message: result.message || "Muvaffaqiyatli saqlandi!",
        };
      }
      return { success: false, message: result.message || "Xatolik yuz berdi" };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  updateAvatar: async (file) => {
    set({ submitting: true });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${BASE_URL_PROFILE}/profile/avatar`, {
        method: "PUT",
        headers: getHeaders(false),
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        await get().getProfile();
        return { success: true, message: "Avatar muvaffaqiyatli yangilandi!" };
      }
      return { success: false, message: result.message || "Avatar yuklanmadi" };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  deleteAvatar: async () => {
    set({ submitting: true });
    try {
      const res = await fetch(`${BASE_URL_PROFILE}/profile/avatar`, {
        method: "DELETE",
        headers: getHeaders(false),
      });
      const result = await res.json();
      if (res.ok) {
        set((state) => ({
          profile: { ...state.profile, images: [] },
        }));
        return { success: true, message: "Avatar o'chirildi!" };
      }
      return { success: false, message: result.message || "Xatolik" };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  updatePassword: async (passwords) => {
    set({ submitting: true });
    try {
      const res = await fetch(`${BASE_URL_PROFILE}/profile/password`, {
        method: "PATCH",
        headers: getHeaders(true),
        body: JSON.stringify(passwords),
      });
      const result = await res.json();
      if (res.ok) {
        return {
          success: true,
          message: result.message || "Parol yangilandi!",
        };
      }
      return {
        success: false,
        message: result.message || "Eski parol noto'g'ri",
      };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  requestEmailChange: async (email) => {
    set({ submitting: true });
    try {
      const res = await fetch(`${BASE_URL_PROFILE}/profile/email/request`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (res.ok) {
        return {
          success: true,
          message: result.message || "Kod pochtangizga yuborildi!",
        };
      }
      return { success: false, message: result.error || "Xatolik yuz berdi" };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  confirmEmailChange: async (data) => {
    set({ submitting: true });
    try {
      const res = await fetch(`${BASE_URL_PROFILE}/profile/email/confirm`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        set((state) => ({
          profile: { ...state.profile, email: data.email },
        }));
        return {
          success: true,
          message: result.message || "Email tasdiqlandi va yangilandi!",
        };
      }
      return {
        success: false,
        message: result.message || "Kod noto'g'ri yoki eskirgan",
      };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      set({ submitting: false });
    }
  },
}));
