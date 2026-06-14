import apiClient from "@/services/api-client";
import { TProduct } from "@/types/product-t";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast } from "@/utils/toaster";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Period = "daily" | "weekly" | "monthly" | "yearly" | "all-time" | "custom";

export type GraphDataType = {
  date: string;
  totalPaid: number;
  totalProfit: number;
  totalExpenses: number;
  uniqueCustomersCount: number;
  receiptsCount: number;
};

export const useMainReportStore = create<{
  loaded: boolean;
  loading: boolean;
  period: Period;
  startDate: string;
  endDate: string;
  totalProducts: number;
  graphData: GraphDataType[];
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
    totalExpenses: number;
    expensesCount: number;
    listCashiers: {
      name: string;
      id: string;
    }[];
  };
  monthlySummary: {
    peakSalesTime: string;
    salesRecommendation: string;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    numberOfReceipts: number;
    numberOfItemsSold: number;
    top5SellingDays: { date: string; sales: number }[];
    expensesGraph: { date: string; amount: number }[];
    top5ExpensiveExpenses: { name: string; amount: number; date: string }[];
  };
  setPeriod: (period: Period, customDates?: { start: string; end: string }) => void;
  loadAdminStats: () => void;
}>()(
  immer((set, get) => ({
    loaded: false,
    loading: true,
    period: "monthly", // Default to monthly as requested
    startDate: "",
    endDate: "",
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
      totalExpenses: 0,
      expensesCount: 0,
    },
    monthlySummary: {
      peakSalesTime: "N/A",
      salesRecommendation: "Not enough data.",
      totalProfit: 0,
      totalRevenue: 0,
      totalExpenses: 0,
      numberOfReceipts: 0,
      numberOfItemsSold: 0,
      top5SellingDays: [],
      expensesGraph: [],
      top5ExpensiveExpenses: [],
    },
    graphData: [],
    setPeriod: (period, customDates) => {
      set((state) => {
        state.period = period;
        if (customDates) {
          state.startDate = customDates.start;
          state.endDate = customDates.end;
        } else {
          // Reset dates for predefined periods
          state.startDate = "";
          state.endDate = "";
          
          if (period === "daily") {
            const today = new Date().toISOString().split("T")[0];
            state.startDate = today;
            state.endDate = today;
          } else if (period === "monthly") {
            const date = new Date();
            state.startDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split("T")[0];
            state.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split("T")[0];
          } else if (period === "yearly") {
            const date = new Date();
            state.startDate = new Date(date.getFullYear(), 0, 1).toISOString().split("T")[0];
            state.endDate = new Date(date.getFullYear(), 11, 31).toISOString().split("T")[0];
          }
        }
      });
      get().loadAdminStats();
    },
    loadAdminStats: async () => {
      try {
        set((state) => {
          state.loading = true;
        });
        const { startDate, endDate, period } = get();
        
        // Map period to the backend expected values. all-time/custom default to yearly graph for now.
        const graphPeriod = period === "all-time" || period === "custom" ? "yearly" : period;

        const [stats, graphResponse, monthlyReports] = await Promise.all([
          fetchStats("", ""), // Independent of graph period, fetches default/all-time stats
          fetchGraphData(endDate || new Date().toISOString(), graphPeriod),
          fetchMonthlyReports(),
        ]);

        set((state) => {
          state.loaded = true;
          state.totalProducts = stats.totalProducts;
          state.productStats = stats.productStats;
          
          state.salesStates = {
            ...state.salesStates,
            ...stats.salesStates,
          };
          
          if (monthlyReports) {
            state.monthlySummary = {
              peakSalesTime: monthlyReports.peakSalesTime || "N/A",
              salesRecommendation: monthlyReports.salesRecommendation || "Not enough data.",
              totalProfit: monthlyReports.totalProfit || 0,
              totalRevenue: monthlyReports.totalRevenue || 0,
              totalExpenses: monthlyReports.totalExpenses || 0,
              numberOfReceipts: monthlyReports.numberOfReceipts || 0,
              numberOfItemsSold: monthlyReports.numberOfItemsSold || 0,
              top5SellingDays: monthlyReports.top5SellingDays || [],
              expensesGraph: monthlyReports.expensesGraph || [],
              top5ExpensiveExpenses: monthlyReports.top5ExpensiveExpenses || [],
            };
          }

          state.graphData = graphResponse.list || [];
          state.loading = false;
        });
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

async function fetchGraphData(endDate = "", period = "daily"): Promise<any> {
  try {
    const response = await apiClient.get(
      `/admin/stats/daily?endDate=${endDate}&period=${period}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

async function fetchMonthlyReports(): Promise<any> {
  try {
    const response = await apiClient.get(`/admin/stats/monthly-reports`);
    return response.data;
  } catch (e) {
    throw e;
  }
}
