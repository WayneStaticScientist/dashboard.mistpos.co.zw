import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import apiClient from "@/services/api-client";
import { errorToast } from "@/utils/toaster";
import { decodeFromAxios } from "@/utils/errors";

export interface SuperAdminStats {
  totalRevenue: number;
  totalUsers: number;
  totalCompanies: number;
  activeSubscriptions: number;
}

export const useSuperAdminStore = create<{
  loading: boolean;
  stats: SuperAdminStats | null;
  salesSummary: any;
  salesChart: any;
  topCompanies: any[];
  userGrowthChart: any;
  fetchStats: () => Promise<void>;
  fetchSalesSummary: () => Promise<void>;
  fetchSalesChart: (period: string) => Promise<void>;
  fetchTopCompanies: (period: string) => Promise<void>;
  fetchUserGrowthChart: () => Promise<void>;
  resetUserPassword: (userId: string) => Promise<void>;
}>()(
  immer((set) => ({
    loading: false,
    stats: null,
    salesSummary: null,
    salesChart: null,
    topCompanies: [],
    userGrowthChart: null,

    fetchStats: async () => {
      try {
        set((state) => { state.loading = true; });
        const response = await apiClient.get("/superadmin/stats");
        set((state) => {
          state.stats = response.data;
          state.loading = false;
        });
      } catch (e) {
        set((state) => { state.loading = false; });
        errorToast(decodeFromAxios(e).message);
      }
    },

    fetchSalesSummary: async () => {
      try {
        set((state) => { state.loading = true; });
        const response = await apiClient.get("/superadmin/sales/summary");
        set((state) => {
          state.salesSummary = response.data;
          state.loading = false;
        });
      } catch (e) {
        set((state) => { state.loading = false; });
        errorToast(decodeFromAxios(e).message);
      }
    },

    fetchSalesChart: async (period = 'daily') => {
      try {
        set((state) => { state.loading = true; });
        const response = await apiClient.get(`/superadmin/sales/chart?period=${period}`);
        set((state) => {
          state.salesChart = response.data;
          state.loading = false;
        });
      } catch (e) {
        set((state) => { state.loading = false; });
        errorToast(decodeFromAxios(e).message);
      }
    },

    fetchTopCompanies: async (period = 'today') => {
      try {
        set((state) => { state.loading = true; });
        const response = await apiClient.get(`/superadmin/sales/top-companies?period=${period}`);
        set((state) => {
          state.topCompanies = response.data.list || response.data;
          state.loading = false;
        });
      } catch (e) {
        set((state) => { state.loading = false; });
        errorToast(decodeFromAxios(e).message);
      }
    },

    fetchUserGrowthChart: async () => {
      try {
        set((state) => { state.loading = true; });
        const response = await apiClient.get("/superadmin/users/chart");
        set((state) => {
          state.userGrowthChart = response.data;
          state.loading = false;
        });
      } catch (e) {
        set((state) => { state.loading = false; });
        errorToast(decodeFromAxios(e).message);
      }
    },

    resetUserPassword: async (userId: string) => {
      try {
        set((state) => { state.loading = true; });
        await apiClient.post(`/superadmin/users/${userId}/reset-password`);
        set((state) => { state.loading = false; });
      } catch (e) {
        set((state) => { state.loading = false; });
        errorToast(decodeFromAxios(e).message);
        throw e;
      }
    }
  }))
);
