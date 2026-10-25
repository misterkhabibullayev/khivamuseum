import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getAuthHeaders = (isJson = true) => {
  const token =
    localStorage.getItem("token") || localStorage.getItem("client_token");
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (isJson) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

export const useTicketsStore = create((set, get) => ({
  activeTickets: [],
  selectedTicket: null,
  myOrders: [],
  verifiedTicket: null,

  pendingPurchase: null,

  loading: false,
  submitting: false,
  error: null,

  getActiveTickets: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets`, {
        headers: getAuthHeaders(false),
        cache: "no-store",
      });
      const data = await res.json();

      if (res.ok) {
        set({ activeTickets: data.data || data });
        return { ok: true, data: data.data || data };
      } else {
        set({ error: data.message || "Chiptalarni yuklab bo'lmadi" });
        return { ok: false, error: data.message };
      }
    } catch (err) {
      set({ error: err.message });
      return { ok: false, error: err.message };
    } finally {
      set({ loading: false });
    }
  },

  getTicketById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets/${id}`, {
        headers: getAuthHeaders(false),
      });
      const data = await res.json();

      if (res.ok) {
        const item = data.data || data;
        set({ selectedTicket: item });
        return { ok: true, data: item };
      }
      return { ok: false, error: data.message };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      set({ loading: false });
    }
  },

  purchaseTicket: async (payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets/purchase`, {
        method: "POST",
        headers: getAuthHeaders(true),
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        set({ pendingPurchase: data.data || data });
        return { ok: true, data: data.data || data };
      } else {
        set({ error: data.message || "Xarid qilishda xatolik yuz berdi" });
        return { ok: false, error: data.message };
      }
    } catch (err) {
      set({ error: err.message });
      return { ok: false, error: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  verifyTicket: async (payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets/verify`, {
        method: "POST",
        headers: getAuthHeaders(true),
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        set({ pendingPurchase: null });
        return { ok: true, data: data.data || data };
      } else {
        return {
          ok: false,
          error: data.message || "Tasdiqlash kodi noto'g'ri",
        };
      }
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  resendVerificationCode: async (payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets/resend-code`, {
        method: "POST",
        headers: getAuthHeaders(true),
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      return { ok: res.ok, data: data.data || data, error: data.message };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      set({ submitting: false });
    }
  },

  checkTicketByNumber: async (ticketNumber) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets/check/${ticketNumber}`, {
        headers: getAuthHeaders(false),
      });
      const data = await res.json();

      if (res.ok) {
        set({ verifiedTicket: data.data || data });
        return { ok: true, data: data.data || data };
      } else {
        return {
          ok: false,
          error: data.message || "Chipta topilmadi yoki yaroqsiz",
        };
      }
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      set({ loading: false });
    }
  },

  getMyOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/tickets/my/orders`, {
        headers: getAuthHeaders(false),
      });
      const data = await res.json();

      if (res.ok) {
        set({ myOrders: data.data || data });
        return { ok: true, data: data.data || data };
      } else {
        return { ok: false, error: data.message };
      }
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      set({ loading: false });
    }
  },
}));
