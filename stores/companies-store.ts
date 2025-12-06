import { create } from "zustand";
import { Paynow, TCompany } from "@/types/company-t";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast, success } from "@/utils/toaster";
import { TUser } from "@/types/user-t";
import toast from "react-hot-toast";
export type CurrencyPair = {
  key: string;
  value: number;
};
export const useCompanyStore = create<{
  disableGateway: (arg0: TUser) => void;
  company?: TCompany;
  fetchCompany: (id: string) => void;
  selectedCurrencyPair?: CurrencyPair;
  setSelectedCurrencyPair: (l: { key: string; value: number }) => void;
  updatecompany: (localcompany: TCompany) => void;
  updateCurrency: (currency: CurrencyPair) => void;
  createcompany: (localcompany: TCompany) => void;
  focusedCompany?: TCompany;
  seTCompanyForEdit: (e: TCompany) => void;
  deleteCompany: (arg0: TCompany) => void;
  deleteCurrency: (arg0: CurrencyPair) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TCompany[];
  totalPages: number;
  registeringPaynow: boolean;
  registerPaynow: (data: Paynow) => void;
  fetchCompanies: (page: number, search?: string) => void;
}>()(
  immer((set, get) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    list: [],
    registeringPaynow: false,
    registerPaynow: async (data: Paynow) => {
      if (
        data.integrationKey.trim().length < 3 ||
        data.integrationId.trim().length < 3
      ) {
        return errorToast("Keys or Ids should be empty");
      }
      try {
        set((state) => {
          state.registeringPaynow = true;
        });
        await apiClient.post(`/admin/paynow/keys`, data);
        set((state) => {
          state.registeringPaynow = false;
        });
        success("paynow registered successfully");
      } catch (e) {
        set((state) => {
          state.registeringPaynow = false;
        });
        errorToast(decodeFromAxios(e).message);
      }
    },
    disableGateway: (arg0: TUser) => {},
    setSelectedCurrencyPair: (data: CurrencyPair) => {
      set((state) => {
        state.selectedCurrencyPair = data;
      });
    },
    fetchCompany: async (id: string) => {
      try {
        set((state) => {
          state.loading = true;
          state.loaded = false;
        });
        const response = await apiClient.get(`/company/${id}`);
        set((state) => {
          state.loaded = true;
          state.loading = false;
          state.company = response.data.update;
        });
      } catch (e) {
        set((state) => {
          state.loaded = false;
          state.loading = false;
        });
        errorToast(decodeFromAxios(e).message);
      }
    },
    updatecompany: async (localcompany: TCompany) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.put(`/admin/company/${localcompany._id}`, localcompany);
        success(`${localcompany.name} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    updateCurrency: async (data: CurrencyPair) => {
      try {
        if (!get().company || !get().company?.exchangeRates) {
          return errorToast("something went wrong , company not found");
        }
        const newRates = {
          ...get().company!.exchangeRates,
          rates: {
            ...(get().company!.exchangeRates?.rates || {}), // Copy existing rates
            [data.key]: data.value, // Apply the new rate
          },
        };
        set((state) => {
          state.loading = true;
        });
        await apiClient.put(`/admin/company/currency`, newRates);
        success(`${data.key} Updated successffuly`);
      } catch (e) {
        console.log(e);
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
    deleteCurrency: async (arg0: CurrencyPair) => {
      try {
        const company = get().company;

        if (
          !company ||
          !company.exchangeRates ||
          !company.exchangeRates.rates
        ) {
          return errorToast("something went wrong, company or rates not found");
        }

        set((state) => {
          state.loading = true;
        });
        const currentRates = company.exchangeRates.rates;
        const { [arg0.key]: removedValue, ...newRatesObject } = currentRates;
        const newExchangeRates = {
          ...company.exchangeRates, // Copy name and other properties
          rates: newRatesObject, // Use the new object without the removed key
        };
        set((state) => {
          state.loading = true;
        });
        await apiClient.put(`/admin/company/currency`, newExchangeRates);
        success(`${arg0.key} Delete successffuly`);
        set((state) => {
          state.loading = false;
        });
      } catch (e) {
        set((state) => {
          state.loading = false;
        });
        console.log(e);
        errorToast(decodeFromAxios(e).message);
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
