import { create } from "zustand";
import { fetchAPI } from "../services/api";

export const useGalleryStore = create((set) => ({
  gallery: [],
  loading: false,
  error: null,

  getGallery: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAPI("/api/gallery");
      set({ gallery: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
