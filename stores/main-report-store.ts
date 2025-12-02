import apiClient from "@/services/api-client";
import { TProduct } from "@/types/product-t";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast } from "@/utils/toaster";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
export type WeekListType = {
  date: string;
  totalPaid: number;
  totalProfit: number;
  uniqueCustomersCount: number;
};
export const useMainReportStore = create<{
  loaded: boolean;
  loading: boolean;
  totalProducts: number;
  list: WeekListType[];
  items: TProduct[];
  productStats: {
    totalStock: number;
    totalCost: number;
    totalRevenue: number;
  };
  salesStates: {
    totalTaxs: number;
    totalCosts: number;
    totalTotal: number;
    totalAmount: number;
    numberOfCashiers: number;
    totalReceipts: number;
    totalRefunds: number;
    totalDiscounts: number;
    totalSalesValue: number;
    totalLossValue: number;
    listCashiers: {
      name: string;
      id: string;
    }[];
  };
  loadAdminStats: (
    startDate?: string,
    endDate?: string,
    weekEndDate?: string
  ) => void;
}>()(
  immer((set) => ({
    loaded: false,
    loading: true,
    totalProducts: 0,
    productStats: {
      totalStock: 0,
      totalCost: 0,
      totalRevenue: 0,
    },
    items: [],
    salesStates: {
      totalTaxs: 0,
      totalCosts: 0,
      totalTotal: 0,
      totalAmount: 0,
      numberOfCashiers: 0,
      listCashiers: [],
      totalReceipts: 0,
      totalRefunds: 0,
      totalDiscounts: 0,
      totalSalesValue: 0,
      totalLossValue: 0,
    },
    list: [],
    loadAdminStats: async (startDate = "", endDate = "", weekEndDate = "") => {
      try {
        set((state) => {
          state.loading = true;
        });
        const [stats, sevenDayShow, items] = await Promise.all([
          fetchStats(startDate),
          fetchSevenDayData(weekEndDate),
          fetchItems({ limit: 5 }),
        ]);
        set((state) => {
          state.loaded = true;
          state.items = items;
          state.totalProducts = stats.totalProducts;
          state.productStats = stats.productStats;
          state.salesStates = stats.salesStates;
          state.list = stats.list;
          state.loading = false;
        });
        set(sevenDayShow);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
  }))
);
async function fetchStats(startDate = "", endDate = ""): Promise<any> {
  try {
    const response = await apiClient.get(
      `/admin/stats?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

async function fetchSevenDayData(weekEndDate = ""): Promise<any> {
  try {
    const response = await apiClient.get(
      `admin/stats/daily?endDate=${weekEndDate}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

async function fetchItems({
  limit = 5,
  page = 1,
  search = "",
}: {
  limit?: number;
  page?: number;
  search?: string;
}): Promise<any> {
  try {
    const response = await apiClient.get(`/cashier/products?limit=${limit}`);
    return response.data.list;
  } catch (e) {
    throw e;
  }
}
