import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getHeaders = (isJson = true) => {
  const headers = {};

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

export const useNewsStore = create((set) => ({
  news: [],
  news1: null,
  totalPages: 1,
  loading: false,
  error: null,

  getNews: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      let url = `${BASE_URL}/news?page=${page}`;
      const res = await fetch(url, {
        headers: getHeaders(true),
      });
      const data = await res.json();
      if (res.ok) {
        set({
          news: data?.data || [],
          totalPages: data?.meta?.lastPage || 1,
        });
      } else {
        set({ error: data.message || "Yuklanishda xatolik" });
      }
    } catch (error) {
      set({ error: error.message || "Tarmoq xatosi" });
    } finally {
      set({ loading: false });
    }
  },

  getNewsBySlug: async (slug) => {
    set({ loading: true, error: null });
    try {
      const url = `${BASE_URL}/news/${slug}`;
      const res = await fetch(url, {
        headers: getHeaders(true),
      });
      const data = await res.json();
      if (res.ok) {
        set({ news1: data?.news || null });
      } else {
        set({ error: data.message || "Yuklashda xatolik" });
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
