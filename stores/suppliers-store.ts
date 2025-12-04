import { create } from "zustand";
import { errorToast, success } from "@/utils/toaster";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { TSupplier } from "@/types/supplier-t";

export const useSupplierStore = create<{
  supplier?: TSupplier;
  fetchSupplier: (id: string) => void;
  updateSupplier: (localSupplier: TSupplier) => void;
  createSupplier: (localSupplier: TSupplier) => void;
  focusedSupplier?: TSupplier;
  setSupplierForEdit: (e: TSupplier) => void;
  deleteSupplier: (arg0: TSupplier) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TSupplier[];
  totalPages: number;
  fetchSuppliers: (page: number, search?: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: true,
    loaded: false,
    list: [],
    fetchSupplier: async (id: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(`/admin/supplier/${id}`);
        set((state) => {
          state.loading = false;
          state.supplier = response.data.update;
        });
      } catch (e) {
        set((state) => {
          state.loading = false;
        });
        errorToast(decodeFromAxios(e).message);
      }
    },
    updateSupplier: (localSupplier: TSupplier) => {
      try {
        set((state) => {
          state.loading = true;
        });
        apiClient.put(`/admin/Supplier/${localSupplier._id}`, localSupplier);
        success(`${localSupplier.name} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createSupplier: async (localSupplier: TSupplier) => {
      try {
        set((state) => {
          state.loading = true;
        });
        localSupplier._id = null;
        await apiClient.post(`/admin/Supplier`, localSupplier);
        success(`${localSupplier.name} Created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    setSupplierForEdit: (e: TSupplier) => {
      set((state) => {
        state.focusedSupplier = e;
      });
    },
    deleteSupplier: async (arg0: TSupplier) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.delete(`/admin/Supplier/${arg0._id}`);
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
    fetchSuppliers: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/suppliers?limit=100&search=${search ?? ""}&page=${page}`
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
