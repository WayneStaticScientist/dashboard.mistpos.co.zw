import { create } from "zustand";
import { errorToast } from "@/utils/toaster";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";

export const useInventoryEvaluation = create<{
  page: number;
  loading: boolean;
  loaded: boolean;
  evalueation?: {
    totalCost: number;
    totalStock: number;
    totalRevenue: number;
  };
  totalPages: number;
  fetchInventoryEvaluations: (startDate: string, endDate: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    fetchInventoryEvaluations: async (startDate: string, endDate: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/inventory/evalution?startDate=${startDate}&endDate=${endDate}`
        );
        set((state) => {
          state.loading = false;
          state.loaded = true;
          state.evalueation = response.data.update;
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
