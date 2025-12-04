import { create } from "zustand";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast, success } from "@/utils/toaster";
import { TTransferOrder } from "@/types/transfer-order-t";

export const useTransferOrderStore = create<{
  updateTransferOrder: (localTransferOrder: TTransferOrder) => void;
  createTransferOrder: (localTransferOrder: TTransferOrder) => void;
  focusedTransferOrder?: TTransferOrder;
  setTransferOrderForEdit: (e: TTransferOrder) => void;
  deleteTransferOrder: (arg0: TTransferOrder) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TTransferOrder[];
  totalPages: number;
  fetchTransferOrders: (page: number, search?: string, status?: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    list: [],
    updateTransferOrder: (localTransferOrder: TTransferOrder) => {
      try {
        set((state) => {
          state.loading = true;
        });
        apiClient.put(
          `/admin/inventory/purchase-order/${localTransferOrder._id}`,
          localTransferOrder
        );
        success(`${localTransferOrder.label} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createTransferOrder: async (localTransferOrder: TTransferOrder) => {
      try {
        if (localTransferOrder.inventoryItems.length == 0) {
          return errorToast("No Stock Items found");
        }
        set((state) => {
          state.loading = true;
        });
        localTransferOrder._id = null;
        await apiClient.post(
          `/admin/inventory/transfer-order`,
          localTransferOrder
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
    setTransferOrderForEdit: (e: TTransferOrder) => {
      set((state) => {
        state.focusedTransferOrder = e;
      });
    },
    deleteTransferOrder: async (arg0: TTransferOrder) => {
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
    fetchTransferOrders: async (
      page: number,
      search?: string,
      company?: string
    ) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/inventory/transfer-order?limit=20&search=${
            search ?? ""
          }&page=${page}&company=${company ?? ""}`
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
