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
    sesionLoading: boolean;
    loading: boolean;
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
    loading: false,
    baseCurrence: "",
    permissions: [],
    receitsCount: 0,
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
