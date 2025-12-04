import { create } from "zustand";
import apiClient from "@/services/api-client";
import { immer } from "zustand/middleware/immer";
import { decodeFromAxios } from "@/utils/errors";
import { errorToast, success } from "@/utils/toaster";
import { TUser } from "@/types/user-t";

export const useEmployeesStore = create<{
  updateEmployee: (localEmployee: TUser) => void;
  createEmployee: (localEmployee: TUser) => void;
  focusedEmployee?: TUser;
  setEmployeeForEdit: (e: TUser) => void;
  deleteEmployee: (arg0: TUser) => void;
  page: number;
  loading: boolean;
  loaded: boolean;
  list: TUser[];
  totalPages: number;
  fetchEmployees: (page: number, search?: string) => void;
}>()(
  immer((set) => ({
    page: 0,
    totalPages: 0,
    loading: false,
    loaded: false,
    list: [],
    updateEmployee: async (localEmployee: TUser) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.put(`/admin/employee`, { user: localEmployee });
        success(`${localEmployee.fullName} Updated successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    createEmployee: async (localEmployee: TUser) => {
      try {
        set((state) => {
          state.loading = true;
        });
        localEmployee._id = null;
        if (localEmployee.role.trim() == "") {
          return errorToast("role cant be empty");
        }
        if (localEmployee.fullName.trim().split(" ").length < 2) {
          return errorToast("Please enter full Name like John Doe");
        }
        if (localEmployee.email.trim().length < 4) {
          return errorToast("Please enter valid email");
        }
        if (!localEmployee.pin) {
          return errorToast("Please enter valid pin");
        }
        if (localEmployee.pin?.trim().length < 4) {
          return errorToast("Please enter valid pin");
        }
        await apiClient.post(`/admin/employee`, {
          user: localEmployee,
        });
        success(`${localEmployee.fullName} Created successffuly`);
      } catch (e) {
        errorToast(decodeFromAxios(e).message);
      } finally {
        set((state) => {
          state.loading = false;
        });
      }
    },
    setEmployeeForEdit: (e: TUser) => {
      set((state) => {
        state.focusedEmployee = e;
      });
    },
    deleteEmployee: async (arg0: TUser) => {
      try {
        set((state) => {
          state.loading = true;
        });
        await apiClient.delete(`/admin/employee/${arg0._id}`);
        success(`${arg0.fullName} Deleted successffuly`);
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
    fetchEmployees: async (page: number, search?: string) => {
      try {
        set((state) => {
          state.loading = true;
        });
        const response = await apiClient.get(
          `/admin/employees?limit=20&search=${search ?? ""}&page=${page}`
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
