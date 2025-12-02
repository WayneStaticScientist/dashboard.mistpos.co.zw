import { create } from "zustand";
import { errorToast } from "@/utils/toaster";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";

export const useShiftsStore = create<{
  loading: boolean;
  loaded: boolean;
  loadEmployeeSalesStats: (startDate: string, endDate: string) => void;
  list: {
    userId: string;
    userName: string;
    totalSales: number;
    numberOfShifts: number;
    totalShiftHours: number;
    totalSalesQuantity: number;
    averageSalePerShift: number;
  }[];
}>()(
  immer((set) => ({
    loading: true,
    loaded: false,
    list: [],
    loadEmployeeSalesStats: async (startDate: string, endDate: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/stats/sales/shifts?startDate=${startDate}&endDate=${endDate}`
        );
        set((state) => {
          state.loading = false;
          state.loaded = true;
          state.list = response.data.list;
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
