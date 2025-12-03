import { create } from "zustand";
import apiClient from "@/services/api-client";
import { decodeFromAxios } from "@/utils/errors";
import { immer } from "zustand/middleware/immer";
import { errorToast, success } from "@/utils/toaster";
import { TDiscount } from "@/types/discount-t";

export const useDiscountsStore = create<{
  updateDiscount: (localDiscount: TDiscount) => void;
  createDiscount: (localDiscount: TDiscount) => void;
  focusedDiscount?: TDiscount;
  setDiscountForEdit: (e: TDiscount) => void;
  deleteDiscount: (arg0: TDiscount) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TDiscount[];
  totalPages: number;
  fetchDiscounts: (page: number, search?: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: true,
    loaded: false,
    list: [],
    updateDiscount: (localDiscount: TDiscount) => {
      try {
        set((state) => {
          state.loading = true;
        });
        apiClient.put(`/admin/discount/${localDiscount._id}`, localDiscount);
        success(`${localDiscount.name} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createDiscount: async (localDiscount: TDiscount) => {
      try {
        set((state) => {
          state.loading = true;
        });
        localDiscount._id = null;
        await apiClient.post(`/admin/discount`, localDiscount);
        success(`${localDiscount.name} Created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    setDiscountForEdit: (e: TDiscount) => {
      set((state) => {
        state.focusedDiscount = e;
      });
    },
    deleteDiscount: async (arg0: TDiscount) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.delete(`/admin/discount/${arg0._id}`);
        success(`${arg0.name} Deleted successffuly`);
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
    fetchDiscounts: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/cashier/discounts?limit=100&search=${search ?? ""}&page=${page}`
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
