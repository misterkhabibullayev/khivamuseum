import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getHeaders = (isJson = true) => {
  const headers = {};

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

export const useAnnouncementsStore = create((set) => ({
  announcements: [],
  announcement: null,
  totalPages: 1,
  loading: false,
  error: null,

  getAnnouncements: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      let url = `${BASE_URL}/announcement?page=${page}`;
      const res = await fetch(url, {
        headers: getHeaders(true),
      });
      const data = await res.json();
      if (res.ok) {
        set({
          announcements: data?.data || [],
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

  getAnnouncementBySlug: async (slug) => {
    set({ loading: true, error: null });
    try {
      const url = `${BASE_URL}/announcement/${slug}`;
      const res = await fetch(url, {
        headers: getHeaders(true),
      });
      const data = await res.json();
      if (res.ok) {
        set({ announcement: data?.announcement || null });
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
