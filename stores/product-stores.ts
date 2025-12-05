import { create } from "zustand";
import toast from "react-hot-toast";
import { errorToast } from "@/utils/toaster";
import { TProduct } from "@/types/product-t";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";

export const useProductsStore = create<{
  importList: TProduct[];
  uploadingImportedItems: boolean;
  setList: (list: TProduct[]) => void;
  setImportList: (list: TProduct[]) => void;
  exportProductsToExternal: (data: { fileName: string }) => void;
  focusedProduct?: TProduct;
  page: number;
  loaded: boolean;
  loading: boolean;
  totalPages: number;
  fetchProducts: (
    page: number,
    search?: string,
    {
      limit,
      composite,
    }?: {
      limit?: number;
      composite?: boolean;
    }
  ) => void;
  addImportedProducts: () => void;
  fetchListOfProductsIdsAsAsync: (ids: string[]) => Promise<TProduct[]>;
  fetchProductsAsync: (
    page: number,
    limit: number,
    search?: string
  ) => Promise<TProduct[] | []>;
  setProductForEdit: (product?: TProduct) => void;
  list: TProduct[];
}>()(
  immer((set, get) => ({
    page: 0,
    list: [],
    totalPages: 0,
    loaded: false,
    importList: [],
    loading: false,
    uploadingImportedItems: false,
    addImportedProducts: async () => {
      if (get().importList.length == 0)
        return errorToast("No items selected to import");
      set((state) => {
        state.uploadingImportedItems = true;
      });
      try {
        await apiClient.post("/admin/items/upload", get().importList);
        set((state) => {
          state.importList = [];
          state.uploadingImportedItems = false;
        });
        get().fetchProducts(1);
        toast("Items uploaded successfully");
      } catch (e) {
        set((state) => {
          state.uploadingImportedItems = false;
        });
        errorToast(decodeFromAxios(e).message);
      }
    },
    setImportList: (list: TProduct[]) => {
      set((state) => {
        state.importList = list;
      });
    },
    setList: (list: TProduct[]) => {
      set((state) => {
        state.list = list;
      });
    },
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
    fetchListOfProductsIdsAsAsync: async (
      ids: string[]
    ): Promise<TProduct[]> => {
      try {
        set((state) => {
          state.loading = true;
          state.loaded = false;
        });
        const response = await apiClient.post(`/admin/products/range`, {
          ids,
          filter: "any",
        });
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
    fetchProducts: async (
      page: number,
      search?: string,
      { limit, composite } = {
        limit: undefined,
        composite: undefined,
      }
    ) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/cashier/products?page=${page}&search=${search ?? ""}&limit=${
            limit ?? 10
          }&composite=${composite ? "true" : "false"}`
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
    exportProductsToExternal: (data: { fileName: string }) => {
      try {
        const fileContent = JSON.stringify(get().list);
        const blob = new Blob([fileContent], {
          type: "application/octet-stream",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = data.fileName + ".mist";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast("Filex exported");
      } catch (e) {
        errorToast(`Error : ${e}`);
      }
    },
  }))
);
