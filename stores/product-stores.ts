import { create } from "zustand";
import { errorToast } from "@/utils/toaster";
import { TProduct } from "@/types/product-t";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";

export const useProductsStore = create<{
  focusedProduct?: TProduct;
  page: number;
  loading: boolean;
  loaded: boolean;
  totalPages: number;
  fetchProducts: (page: number, search?: string) => void;
  fetchProductsAsync: (
    page: number,
    limit: number,
    search?: string
  ) => Promise<TProduct[] | []>;
  setProductForEdit: (product?: TProduct) => void;
  list: TProduct[];
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: true,
    loaded: false,
    list: [],
    fetchProductsAsync: async (
      page: number,
      limit: number,
      search?: string
    ): Promise<TProduct[]> => {
      try {
        set((state) => {
          state.loading = true;
          state.loaded = false;
        });
        const response = await apiClient.get(
          `/cashier/products?page=${page}&search=${search ?? ""}&limit=${limit}`
        );
        set((state) => {
          state.loading = false;
          state.loaded = true;
        });
        return response.data.list;
      } catch (e) {
        set((state) => {
          state.loading = false;
          state.loaded = false;
        });
      }
      return [];
    },
    setProductForEdit: (product?: TProduct) => {
      set((state) => {
        state.focusedProduct = product;
      });
    },
    fetchProducts: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/cashier/products?page=${page}&search=${search ?? ""}&limit=10`
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
