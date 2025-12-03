import { create } from "zustand";
import { errorToast } from "@/utils/toaster";
import apiClient from "@/services/api-client";
import { TModifier } from "@/types/modefier-t";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";

export const useMofiersStore = create<{
  page: number;
  loading: boolean;
  loaded: boolean;
  totalPages: number;
  fetchModifiers: (page: number, search?: string) => void;
  list: TModifier[];
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: true,
    loaded: false,
    list: [],
    fetchModifiers: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/cashier/modifiers?page=${page}&search=${search ?? ""}&limit=20`
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
