import { create } from "zustand";
import { errorToast, success } from "@/utils/toaster";
import apiClient from "@/services/api-client";
import { TCategory } from "@/types/category-t";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";

export const useCategoriesStore = create<{
  updateCategory: (localCategory: TCategory) => void;
  createCategory: (localCategory: TCategory) => void;
  focusedCategory?: TCategory;
  setCategoryForEdit: (e: TCategory) => void;
  deleteCategory: (arg0: TCategory) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TCategory[];
  totalPages: number;
  fetchCategories: (page: number, search?: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: true,
    loaded: false,
    list: [],
    updateCategory: async (localCategory: TCategory) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.put(
          `/admin/category/${localCategory._id}`,
          localCategory
        );
        success(`${localCategory.name} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createCategory: async (localCategory: TCategory) => {
      try {
        set((state) => {
          state.loading = true;
        });
        localCategory._id = null;
        await apiClient.post(`/admin/category`, localCategory);
        success(`${localCategory.name} Created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    setCategoryForEdit: (e: TCategory) => {
      set((state) => {
        state.focusedCategory = e;
      });
    },
    deleteCategory: async (arg0: TCategory) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.delete(`/admin/category/${arg0._id}`);
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
    fetchCategories: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/cashier/categories?limit=100&search=${search ?? ""}&page=${page}`
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
