import { create } from "zustand";
import apiClient from "@/services/api-client";
import { TCustomer } from "@/types/customer-t";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast, success } from "@/utils/toaster";

export const useCustomerStore = create<{
  updateCustomer: (localCustomer: TCustomer) => void;
  createCustomer: (localCustomer: TCustomer) => void;
  focusedCustomer?: TCustomer;
  setCustomerForEdit: (e: TCustomer) => void;
  deleteCustomer: (arg0: TCustomer) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TCustomer[];
  totalPages: number;
  fetchCustomers: (page: number, search?: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    list: [],
    updateCustomer: async (localCustomer: TCustomer) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.put(
          `/admin/customer/${localCustomer._id}`,
          localCustomer
        );
        success(`${localCustomer.fullName} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createCustomer: async (localCustomer: TCustomer) => {
      try {
        set((state) => {
          state.loading = true;
        });
        localCustomer._id = null;
        await apiClient.post(`/cashier/customer`, {
          user: localCustomer,
        });
        success(`${localCustomer.fullName} Created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    setCustomerForEdit: (e: TCustomer) => {
      set((state) => {
        state.focusedCustomer = e;
      });
    },
    deleteCustomer: async (arg0: TCustomer) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.delete(`/admin/customer/${arg0._id}`);
        success(`${arg0.fullName} Deleted successffuly`);
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
    fetchCustomers: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/cashier/customers?limit=20&search=${search ?? ""}&page=${page}`
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
