import { create } from "zustand";
import { TUser } from "@/types/user-t";
import apiClient from "@/services/api-client";
import { decodeFromAxios } from "@/utils/errors";
import { immer } from "zustand/middleware/immer";
import { errorToast, success } from "@/utils/toaster";

const useSessionState = create<
  TUser & {
    sesionLoading: boolean;
    login: (email: string, password: string) => void;
    getSessionState: () => void;
  }
>()(
  immer((set) => ({
    till: 0,
    role: "",
    phone: "",
    email: "",
    country: "",
    pincode: "",
    fullName: "",
    company: "",
    password: "",
    companies: [],
    accessToken: "",
    companyName: "",
    refreshToken: "",
    pinnedInput: false,
    baseCurrence: "",
    permissions: [],
    receitsCount: 0,
    subscriptions: [],
    sesionLoading: true,
    paynowActivated: false,
    _id: "",
    login: async (email: string, password: string) => {
      try {
        set((state) => {
          state.sesionLoading = true;
        });
        const response = await apiClient.post(`/user/login`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const body = response.data;
        localStorage.setItem("accessToken", body.tokens.accessToken);
        localStorage.setItem("refreshToken", body.tokens.refreshToken);
        set(body.user);
        set((state) => {
          state.sesionLoading = false;
        });
        localStorage.setItem("user", JSON.stringify(body.user));
        success("login success");
      } catch (error) {
        errorToast(decodeFromAxios(error).message);
        return;
      }
    },
    getSessionState: async () => {
      const user = localStorage.getItem("user");
      if (!user) {
        if (window && window.location && window.location.href !== "/login") {
          window.location.href = "/login";
        }
        return;
      }
      try {
        set((state) => {
          state.sesionLoading = true;
        });
        const response = await apiClient.post(`/user/tokens`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const body = response.data;
        localStorage.setItem("accessToken", body.tokens.accessToken);
        localStorage.setItem("refreshToken", body.tokens.refreshToken);
        set(body.user);
        set((state) => {
          state.sesionLoading = false;
        });
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
        if (window && window.location && window.location.href !== "/login") {
          window.location.href = "/login";
        }
        return;
      }
    },
  }))
);

export default useSessionState;
//
