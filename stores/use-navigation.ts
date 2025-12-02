import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useNavigation = create<{
  page: string;
  setPage: (page: string) => void;
}>()(
  immer((set) => ({
    page: "main",
    setPage: (page: string) => {
      set((state) => {
        state.page = page;
      });
    },
  }))
);
