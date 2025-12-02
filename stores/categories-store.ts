import { create } from "zustand";
import { errorToast } from "@/utils/toaster";
import apiClient from "@/services/api-client";
import { TCategory } from "@/types/category-t";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";

export const useCategoriesStore = create<{
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TCategory[];
  totalPages: number;
  fetchCategories: (page: number, search?: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: true,
    loaded: false,
    list: [],
    fetchCategories: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/cashier/categories?limit=100&search=${search ?? ""}&page=${page}`
        );
        set((state) => {
          state.loading = false;
          state.loaded = true;
          state.list = response.data.list;
          state.page = response.data.currentPage;
          state.totalPages = response.data.totalPages;
        });
      } catch (e) {
        set((state) => {
          state.loading = false;
        });
        errorToast(decodeFromAxios(e).message);
      }
    },
  }))
);
