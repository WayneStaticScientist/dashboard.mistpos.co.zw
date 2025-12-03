import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useNavigation = create<{
  page: string;
  history: string[];
  back: () => void;
  setPage: (page: string) => void;
}>()(
  immer((set) => ({
    page: "main",
    history: ["main"],
    back: () => {
      set((state) => {
        state.page =
          history.length > 0 ? state.history.pop() ?? "main" : "main";
      });
    },
    setPage: (page: string) => {
      set((state) => {
        state.history.push(state.page);
        state.page = page;
        if (state.history.length > 5) state.history.shift();
      });
    },
  }))
);
