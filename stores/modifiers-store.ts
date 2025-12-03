import { create } from "zustand";
import { errorToast, success } from "@/utils/toaster";
import apiClient from "@/services/api-client";
import { ModifiersOptions, TModifier } from "@/types/modefier-t";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";

export const useMofiersStore = create<{
  createModifier: (localModifier: TModifier) => void;
  updateModifier: (localModifier: TModifier) => void;
  focusedMofier?: TModifier;
  deleteModifier: (arg0: TModifier) => void;
  setModifierForEdit: (e: TModifier) => void;
  updateLocalMofierList: (options: ModifiersOptions[]) => void;
  page: number;
  loaded: boolean;
  loading: boolean;
  list: TModifier[];
  totalPages: number;
  fetchModifiers: (page: number, search?: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    list: [],
    createModifier: async (localModifier: TModifier) => {
      try {
        set((state) => {
          state.loading = true;
        });
        localModifier._id = null;
        await apiClient.post(`/admin/modifier`, localModifier);
        success(`${localModifier.name} created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    updateLocalMofierList: (options: ModifiersOptions[]) => {
      set((state) => {
        if (state.focusedMofier) state.focusedMofier.list = options;
      });
    },
    updateModifier: async (localModifier: TModifier) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.put(
          `/admin/modifier/${localModifier._id}`,
          localModifier
        );
        success(`${localModifier.name} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    deleteModifier: async (arg0: TModifier) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.delete(`/admin/modifier/${arg0._id}`);
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
    setModifierForEdit: (arg0: TModifier) => {
      set((state) => {
        state.focusedMofier = arg0;
      });
    },
    fetchModifiers: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/cashier/modifiers?page=${page}&search=${search ?? ""}&limit=20`
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
