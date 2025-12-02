import apiClient from "@/services/api-client";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast } from "@/utils/toaster";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useEmployeeSalesReport = create<{
  loading: boolean;
  loaded: boolean;
  loadEmployeeSalesStats: (startDate: string, endDate: string) => void;
  list: {
    sellerName: string;
    sellerId: string;
    numberOfReceipts: number;
    grossSales: number;
    refunds: number;
    discounts: number;
    averageSales: number;
    uniqueCustomerCount: number;
  }[];
}>()(
  immer((set) => ({
    loading: true,
    loaded: false,
    list: [],
    loadEmployeeSalesStats: async (startDate: string, endDate: string) => {
      console.log(startDate);
      console.log(endDate);
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/stats/sales/employee?startDate=${startDate}&endDate=${endDate}`
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
