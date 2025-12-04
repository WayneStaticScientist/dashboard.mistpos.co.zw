import { create } from "zustand";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast, success } from "@/utils/toaster";
import { TInventoryCounts } from "@/types/inventory-count-t";

export const useInventoryCountsStore = create<{
  updateInventoryCounts: (localInventoryCounts: TInventoryCounts) => void;
  createInventoryCounts: (localInventoryCounts: TInventoryCounts) => void;
  focusedInventoryCounts?: TInventoryCounts;
  setInventoryCountsForEdit: (e: TInventoryCounts) => void;
  deleteInventoryCounts: (arg0: TInventoryCounts) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TInventoryCounts[];
  totalPages: number;
  fetchInventoryCounts: (
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
    updateInventoryCounts: (localInventoryCounts: TInventoryCounts) => {
      try {
        set((state) => {
          state.loading = true;
        });
        apiClient.put(
          `/admin/inventory/counts/${localInventoryCounts._id}`,
          localInventoryCounts
        );
        success(`${localInventoryCounts.label} Completed successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createInventoryCounts: async (localInventoryCounts: TInventoryCounts) => {
      try {
        if (localInventoryCounts.inventoryItems.length == 0) {
          return errorToast("No Stock Items found");
        }
        set((state) => {
          state.loading = true;
        });
        localInventoryCounts._id = null;
        await apiClient.post(
          `/admin/inventory/transfer-order`,
          localInventoryCounts
        );
        success(`Stock Has been transferred succesfully`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    setInventoryCountsForEdit: (e: TInventoryCounts) => {
      set((state) => {
        state.focusedInventoryCounts = e;
      });
    },
    deleteInventoryCounts: async (arg0: TInventoryCounts) => {
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
    fetchInventoryCounts: async (
      page: number,
      search?: string,
      status?: string
    ) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/inventory/counts?limit=20&search=${
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
