import { create } from "zustand";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast, success } from "@/utils/toaster";
import { TProduction } from "@/types/production-t";

export const useProductionStore = create<{
  updateProductions: (localProductions: TProduction) => void;
  createProductions: (localProductions: TProduction) => void;
  focusedProductions?: TProduction;
  setProductionForEdit: (e: TProduction) => void;
  deleteProductions: (arg0: TProduction) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TProduction[];
  totalPages: number;
  fetchProductions: (page: number, search?: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    list: [],
    updateProductions: (localProductions: TProduction) => {
      try {
        set((state) => {
          state.loading = true;
        });
        apiClient.put(
          `/admin/Productions/${localProductions._id}`,
          localProductions
        );
        success(`${localProductions.label} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createProductions: async (localProductions: TProduction) => {
      try {
        set((state) => {
          state.loading = true;
        });
        localProductions._id = null;
        await apiClient.post(`/admin/inventory/production`, localProductions);
        success(`${localProductions.label} Created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    setProductionForEdit: (e: TProduction) => {
      set((state) => {
        state.focusedProductions = e;
      });
    },
    deleteProductions: async (arg0: TProduction) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.delete(`/admin/Productions/${arg0._id}`);
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
    fetchProductions: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/inventory/productions?limit=100&search=${
            search ?? ""
          }&page=${page}`
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
