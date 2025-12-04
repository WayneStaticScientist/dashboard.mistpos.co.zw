import { create } from "zustand";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast, success } from "@/utils/toaster";
import { TStockAdjustment } from "@/types/stock-ajustement-t";

export const useStockAdjustmentStore = create<{
  updateStockAdjustment: (localStockAdjustment: TStockAdjustment) => void;
  createStockAdjustment: (localStockAdjustment: TStockAdjustment) => void;
  focusedStockAdjustment?: TStockAdjustment;
  setStockAdjustmentForEdit: (e: TStockAdjustment) => void;
  deleteStockAdjustment: (arg0: TStockAdjustment) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TStockAdjustment[];
  totalPages: number;
  fetchStockAdjustments: (
    page: number,
    search?: string,
    status?: string
  ) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    list: [],
    updateStockAdjustment: (localStockAdjustment: TStockAdjustment) => {
      try {
        set((state) => {
          state.loading = true;
        });
        apiClient.put(
          `/admin/inventory/purchase-order/${localStockAdjustment._id}`,
          localStockAdjustment
        );
        success(`${localStockAdjustment.label} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createStockAdjustment: async (localStockAdjustment: TStockAdjustment) => {
      try {
        if (localStockAdjustment.reason.trim().length == 0) {
          return errorToast("Reason is required");
        }
        if (localStockAdjustment.inventoryItems.length == 0) {
          return errorToast("No Stock Items found");
        }
        set((state) => {
          state.loading = true;
        });
        localStockAdjustment._id = null;
        await apiClient.post(
          `/admin/inventory/stock-adjust`,
          localStockAdjustment
        );
        success(`Stock Adjustment Created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    setStockAdjustmentForEdit: (e: TStockAdjustment) => {
      set((state) => {
        state.focusedStockAdjustment = e;
      });
    },
    deleteStockAdjustment: async (arg0: TStockAdjustment) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.delete(`/admin/category/${arg0._id}`);
        success(`${arg0.label} Deleted successffuly`);
        set((state) => {
          state.loading = false;
        });
      } catch (e) {
        set((state) => {
          state.loading = false;
        });
        throw e;
      }
    },
    fetchStockAdjustments: async (
      page: number,
      search?: string,
      status?: string
    ) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/inventory/stock-adjusts?limit=20&search=${
            search ?? ""
          }&page=${page}&status=${status ?? ""}`
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
