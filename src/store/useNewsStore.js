import { create } from "zustand";
import { fetchAPI } from "../services/api";

export const useNewsStore = create((set) => ({
  news: [],
  loading: false,
  error: null,

  getNews: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAPI("/api/news");
      set({ news: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
