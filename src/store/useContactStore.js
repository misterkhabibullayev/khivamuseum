import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

export const useQuestionsStore = create((set) => ({
  submitting: false,
  error: null,

  sendQuestion: async (payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        return { ok: true, data };
      }

      return { ok: false, error: data.message || "Xatolik yuz berdi" };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      set({ submitting: false });
    }
  },
}));