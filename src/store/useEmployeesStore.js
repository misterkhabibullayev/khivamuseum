import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getHeaders = (isJson = true) => {
  const headers = {};

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

export const useEmployeesStore = create((set) => ({
  employees: [],
  totalPages: 1,
  loading: false,
  error: null,

  getEmployees: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      let url = `${BASE_URL}/employees?page=${page}`;
      const res = await fetch(url, {
        headers: getHeaders(true),
      });
      const data = await res.json();
      if (res.ok) {
        set({
          employees: data?.data || [],
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
}));
