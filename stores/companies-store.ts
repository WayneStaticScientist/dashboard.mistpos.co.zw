import { create } from "zustand";
import { TUser } from "@/types/user-t";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { Paynow, TCompany } from "@/types/company-t";
import { errorToast, success } from "@/utils/toaster";
export type CurrencyPair = {
  key: string;
  value: number;
};
export const useCompanyStore = create<{
  page: number;
  loaded: boolean;
  loading: boolean;
  list: TCompany[];
  company?: TCompany;
  totalPages: number;
  subscribing: boolean;
  userCompany?: TCompany;
  paymentSuccess: boolean;
  focusedCompany?: TCompany;
  verificationSent: boolean;
  registeringPaynow: boolean;
  verificationSending: boolean;
  fetchUserCompany: () => void;
  fetchingUserCompany: boolean;
  subscribeToFreePlan: () => void;
  subscribeToFreeTrial: () => void;
  sendVerificationEmail: () => void;
  fetchCompany: (id: string) => void;
  selectedCurrencyPair?: CurrencyPair;
  disableGateway: (arg0: TUser) => void;
  registerPaynow: (data: Paynow) => void;
  deleteCompany: (arg0: TCompany) => void;
  verifySubscription: (id: string) => void;
  seTCompanyForEdit: (e: TCompany) => void;
  deleteCurrency: (arg0: CurrencyPair) => void;
  updateUserCompany: (company: TCompany) => void;
  createcompany: (localcompany: TCompany) => void;
  updatecompany: (localcompany: TCompany) => void;
  updateCurrency: (currency: CurrencyPair) => void;
  fetchCompanies: (page: number, search?: string) => void;
  subscribeToPlan: (data: { amount: number; plan: string }) => void;
  verifyOtp: (otp: string, origin: string, password?: string) => void;
  setSelectedCurrencyPair: (l: { key: string; value: number }) => void;
}>()(
  immer((set, get) => ({
    page: 0,
    list: [],
    loaded: false,
    totalPages: 0,
    loading: false,
    subscribing: false,
    paymentSuccess: false,
    verificationSent: false,
    registeringPaynow: false,
    verificationSending: false,
    fetchingUserCompany: false,
    verifySubscription: async (pollId: string) => {
      try {
        set((state) => {
          state.subscribing = true;
          state.paymentSuccess = false;
        });
        const response = await apiClient.post(
          `/admin/subscribe/paymobile/poll`,
          {
            pollId,
          }
        );
        set((state) => {
          state.subscribing = false;
        });
        console.log(response.data);
        if (!response.data.paid) {
          return errorToast("payment failed reload page and try again");
        }
        set((state) => {
          state.subscribing = false;
          state.paymentSuccess = true;
          state.company = response.data.company;
        });
        get().updateUserCompany(response.data.company);
      } catch (e) {
        set((state) => {
          state.subscribing = false;
        });
        errorToast(decodeFromAxios(e).message);
      }
    },
    subscribeToFreeTrial: async () => {
      try {
        set((state) => {
          state.subscribing = true;
        });
        const response = await apiClient.post(`/admin/subscribe/freeTrial`);

        set((state) => {
          state.subscribing = false;
          state.company = response.data.company;
        });
        success("Free Plan has been activated");
        get().updateUserCompany(response.data.company);
      } catch (e) {
        set((state) => {
          state.subscribing = false;
        });
        errorToast(decodeFromAxios(e).message);
      }
    },
    subscribeToFreePlan: async () => {
      try {
        set((state) => {
          state.subscribing = true;
        });
        const response = await apiClient.post(`/admin/subscribe/freePlan`);

        set((state) => {
          state.subscribing = false;
          state.company = response.data.company;
        });
        success("Free trial has been activated");
        get().updateUserCompany(response.data.company);
      } catch (e) {
        set((state) => {
          state.subscribing = false;
        });
        errorToast(decodeFromAxios(e).message);
      }
    },
    subscribeToPlan: async (data: { amount: number; plan: string }) => {
      try {
        set((state) => {
          state.subscribing = true;
        });
        const response = await apiClient.post(`/admin/subscribe/payweb`, data);
        set((state) => {
          state.subscribing = false;
        });
        window.location.href = response.data.redirectUrl;
      } catch (e) {
        set((state) => {
          state.subscribing = false;
        });
        errorToast(decodeFromAxios(e).message);
      }
    },
    updateUserCompany: (company: TCompany) => {
      const user = localStorage.getItem("user");
      if (!user) return;
      const userObject = JSON.parse(user);
      if (userObject.company === company._id) {
        set((state) => {
          state.userCompany = company;
        });
        return;
      }
    },
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
        get().updateUserCompany(response.data.update);
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
        get().updateUserCompany(localcompany);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    fetchUserCompany: async () => {
      try {
        set((state) => {
          state.fetchingUserCompany = true;
        });
        const user = localStorage.getItem("user");
        if (!user) return;
        const userObject = JSON.parse(user);
        const response = await apiClient.get(`/company/${userObject.company}`);
        set((state) => {
          state.fetchingUserCompany = false;
          state.userCompany = response.data.update;
        });
      } catch (e) {
        set((state) => {
          state.fetchingUserCompany = false;
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
    verifyOtp: async (otp: string, origin: string, newPassword?: string) => {
      try {
        if (otp.trim().length < 6) {
          return errorToast("otp is 6 characters long");
        }
        set((state) => {
          state.verificationSending = true;
        });
        await apiClient.post("/admin/company/verify/otp", {
          otp,
          origin,
          newPassword,
        });
        set((state) => {
          state.verificationSending = false;
          state.userCompany!.verified = true;
        });
        success("otp verified successfully");
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
        set((state) => {
          state.verificationSending = false;
        });
      }
    },
    sendVerificationEmail: async () => {
      try {
        set((state) => {
          state.verificationSent = false;
          state.verificationSending = true;
        });
        await apiClient.post("/admin/company/verify");
        set((state) => {
          state.verificationSent = true;
          state.verificationSending = false;
        });
        success("Verification email sent successfully");
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.verificationSending = false;
        });
      }
    },
  }))
);
