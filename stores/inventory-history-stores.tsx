import { create } from "zustand";
import { errorToast } from "@/utils/toaster";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";

export const useInventoryHistoryStore = create<{
  page: number;
  loading: boolean;
  loaded: boolean;
  list: {
    createdAt: string;
    itemName: string;
    documentType: string;
    quantityChange: number;
  }[];
  totalPages: number;
  fetchInventoryHistory: (startDate: string, endDate: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    list: [],
    fetchInventoryHistory: async (startDate: string, endDate: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/inventory/history?startDate=${startDate}&endDate=${endDate}`
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
