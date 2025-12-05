import { create } from "zustand";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast, success } from "@/utils/toaster";
import { TTax } from "@/types/tax-t";
export type CurrencyPair = {
  key: string;
  value: number;
};
export const useTaxesStore = create<{
  taxes?: TTax;
  updatetaxes: (localtaxes: TTax) => void;
  createtaxes: (localtaxes: TTax) => void;
  focusedTaxe?: TTax;
  setTaxForEdit: (e: TTax) => void;
  deletetaxes: (arg0: TTax) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TTax[];
  totalPages: number;
  fetchTaxies: (page: number, search?: string) => void;
}>()(
  immer((set, get) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    list: [],
    updatetaxes: async (localtaxes: TTax) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.put(`/admin/tax/${localtaxes._id}`, localtaxes);
        success(`${localtaxes.label} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },

    createtaxes: async (localtaxes: TTax) => {
      try {
        set((state) => {
          state.loading = true;
        });
        localtaxes._id = null;
        await apiClient.post(`/admin/tax`, localtaxes);
        success(`${localtaxes.label} Created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    setTaxForEdit: (e: TTax) => {
      set((state) => {
        state.focusedTaxe = e;
      });
    },
    deletetaxes: async (arg0: TTax) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.delete(`/admin/tax/${arg0._id}`);
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
    fetchTaxies: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/cashier/taxes?limit=20&search=${search ?? ""}&page=${page}`
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
