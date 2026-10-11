import { create } from "zustand";
import { fetchAPI } from "../services/api";

export const useCollectionsSt = create((set) => ({
  collections: [],
  loading: false,
  error: null,

  getCollections: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAPI("/api/collection");
      set({ collections: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
