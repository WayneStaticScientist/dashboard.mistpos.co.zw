import { create } from "zustand";
import { TUser } from "@/types/user-t";
import apiClient, {
  getNewTokensForTransport,
  getUserDeviceId,
} from "@/services/api-client";
import { decodeFromAxios } from "@/utils/errors";
import { immer } from "zustand/middleware/immer";
import { errorToast, success } from "@/utils/toaster";
import axios from "axios";

const useSessionState = create<
  TUser & {
    switchId: string;
    switching: boolean;
    sesionLoading: boolean;
    loading: boolean;
    switchToACompany: (companyId: string) => void;
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
    switchId: "",
    accessToken: "",
    companyName: "",
    refreshToken: "",
    loading: false,
    baseCurrence: "",
    permissions: [],
    receitsCount: 0,
    switching: false,
    subscriptions: [],
    pinnedInput: false,
    sesionLoading: true,
    paynowActivated: false,
    _id: "",
    login: async (email: string, password: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/user/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
              device: getUserDeviceId(),
            },
          }
        );
        const body = response.data;
        localStorage.setItem("accessToken", body.tokens.accessToken);
        localStorage.setItem("refreshToken", body.tokens.refreshToken);
        set(body.user);
        set((state) => {
          state.loading = false;
        });
        localStorage.setItem("user", JSON.stringify(body.user));
        success("login success");
      } catch (error) {
        set((state) => {
          state.loading = false;
        });
        throw error;
      }
    },
    switchToACompany: async (companyId: string) => {
      try {
        if (companyId.trim() == "") {
          return errorToast("invalid company id");
        }
        set((state) => {
          state.switchId = companyId;
          state.switching = true;
        });
        const response = await apiClient.put(`/user/company/${companyId}`);
        const user = response.data.update;
        set(user);
        set((state) => {
          state.switchId = "";
          state.switching = false;
        });
        localStorage.setItem("user", JSON.stringify(user));
        success("Succefully switched stores");
      } catch (error) {
        set((state) => {
          state.loading = false;
        });
        throw error;
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
        const user = await getNewTokensForTransport();
        set(user);
        set((state) => {
          state.sesionLoading = false;
        });
      } catch (e) {
        console.log(e);
        set((state) => {});
        errorToast(decodeFromAxios(e).message);
        // if (window && window.location && window.location.href !== "/login") {
        //   window.location.href = "/login";
        // }
        return;
      }
    },
  }))
);

export default useSessionState;
//
