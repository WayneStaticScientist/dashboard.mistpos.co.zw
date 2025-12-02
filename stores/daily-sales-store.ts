import apiClient from "@/services/api-client";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast } from "@/utils/toaster";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useDailySalesReport = create<{
  loading: boolean;
  loaded: boolean;
  loadDailySalesStats: (startDate: string, endDate: string) => void;
  items: {
    productName: string;
    productId: string;
    totalCount: number;
    totalSales: number;
    totalCosts: number;
  }[];
}>()(
  immer((set) => ({
    loading: true,
    loaded: false,
    items: [],
    loadDailySalesStats: async (startDate: string, endDate: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/stats/sales/daily?startDate=${startDate}&date=${endDate}`
        );
        set((state) => {
          state.loading = false;
          state.loaded = true;
          state.items = response.data.list;
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
