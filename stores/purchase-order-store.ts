import { create } from "zustand";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast, success } from "@/utils/toaster";
import { TPurchaseOrder } from "@/types/purchase-order-t";

export const usePurchaseOrderStore = create<{
  updatePurchaseOrder: (localPurchaseOrder: TPurchaseOrder) => void;
  createPurchaseOrder: (localPurchaseOrder: TPurchaseOrder) => void;
  completePurchaseOrder: (localPurchaseOrder: TPurchaseOrder) => void;
  focusedPurchaseOrder?: TPurchaseOrder;
  setPurchaseOrderForEdit: (e: TPurchaseOrder) => void;
  deletePurchaseOrder: (arg0: TPurchaseOrder) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TPurchaseOrder[];
  totalPages: number;
  fetchPurchaseOrders: (page: number, search?: string, status?: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    list: [],
    completePurchaseOrder: async (localPurchaseOrder: TPurchaseOrder) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const result = await apiClient.put(
          `/admin/inventory/purchase-order-receive/${localPurchaseOrder._id}`,
          localPurchaseOrder
        );
        set((state) => {
          state.focusedPurchaseOrder = result.data.update;
        });
        success(`Purchase Order Counted successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    updatePurchaseOrder: (localPurchaseOrder: TPurchaseOrder) => {
      try {
        set((state) => {
          state.loading = true;
        });
        apiClient.put(
          `/admin/inventory/purchase-order/${localPurchaseOrder._id}`,
          localPurchaseOrder
        );
        success(`${localPurchaseOrder.label} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createPurchaseOrder: async (localPurchaseOrder: TPurchaseOrder) => {
      try {
        if (localPurchaseOrder.sellerId.trim() === "") {
          return errorToast("Supplier is required");
        }
        if (localPurchaseOrder.expectedDate.trim() === "") {
          return errorToast("Expected date is required");
        }
        const date = new Date(localPurchaseOrder.expectedDate);
        if (date.getTime() < new Date().getTime()) {
          return errorToast("Expected date must be in the future");
        }
        if (localPurchaseOrder.inventoryItems.length == 0) {
          return errorToast("No purchase Items found");
        }
        set((state) => {
          state.loading = true;
        });
        localPurchaseOrder._id = null;
        await apiClient.post(
          `/admin/inventory/purchase-order`,
          localPurchaseOrder
        );
        success(`Purchase Order Created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    setPurchaseOrderForEdit: (e: TPurchaseOrder) => {
      set((state) => {
        state.focusedPurchaseOrder = e;
      });
    },
    deletePurchaseOrder: async (arg0: TPurchaseOrder) => {
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
    fetchPurchaseOrders: async (
      page: number,
      search?: string,
      status?: string
    ) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/inventory/purchase-orders?limit=20&search=${
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
