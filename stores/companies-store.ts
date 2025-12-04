import { create } from "zustand";
import { TCompany } from "@/types/company-t";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast, success } from "@/utils/toaster";

export const useCompanyStore = create<{
  company?: TCompany;
  fetchCompany: (id: string) => void;
  updatecompany: (localcompany: TCompany) => void;
  createcompany: (localcompany: TCompany) => void;
  focusedCompany?: TCompany;
  seTCompanyForEdit: (e: TCompany) => void;
  deleteCompany: (arg0: TCompany) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TCompany[];
  totalPages: number;
  fetchCompanies: (page: number, search?: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    list: [],
    fetchCompany: async (id: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(`/company/${id}`);
        set((state) => {
          state.loading = false;
          state.company = response.data.update;
        });
      } catch (e) {
        set((state) => {
          state.loading = false;
        });
        errorToast(decodeFromAxios(e).message);
      }
    },
    updatecompany: (localcompany: TCompany) => {
      try {
        set((state) => {
          state.loading = true;
        });
        apiClient.put(`/admin/company/${localcompany._id}`, localcompany);
        success(`${localcompany.name} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createcompany: async (localcompany: TCompany) => {
      try {
        set((state) => {
          state.loading = true;
        });
        localcompany._id = null;
        await apiClient.post(`/admin/company`, localcompany);
        success(`${localcompany.name} Created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    seTCompanyForEdit: (e: TCompany) => {
      set((state) => {
        state.focusedCompany = e;
      });
    },
    deleteCompany: async (arg0: TCompany) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.delete(`/admin/company/${arg0._id}`);
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
    fetchCompanies: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/companies?limit=100&search=${search ?? ""}&page=${page}`
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
