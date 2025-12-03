import { create } from "zustand";
import { TProduct } from "@/types/product-t";
import { errorToast, success } from "@/utils/toaster";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";

export const useProductState = create<{
  loading: boolean;
  product?: TProduct;
  updateProduct: (product: TProduct) => void;
  createProduct: (product: TProduct) => void;
  deleteProduct: (product: TProduct) => void;
}>()(
  immer((set) => ({
    loading: false,

    updateProduct: async (product: TProduct) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.put(`/admin/product/${product._id}`, product);
        success(`${product.name} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createProduct: async (product: TProduct) => {
      try {
        set((state) => {
          state.loading = true;
        });
        product._id = null;
        await apiClient.post(`/admin/product`, product);
        success(`${product.name} Created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    deleteProduct: async (product: TProduct) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.delete(`/admin/product/${product._id}`);
        success(`${product.name} Deleted successffuly`);
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
  }))
);
