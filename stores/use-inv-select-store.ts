import { immer } from "zustand/middleware/immer";
import { InvItem } from "@/types/purchase-order-t";
import { create } from "zustand";

export const useInvSelect = create<{
  list: InvItem[];
  setList: (list: InvItem[]) => void;
}>()(
  immer((set) => ({
    list: [],
    setList: (list: InvItem[]) => {
      set((state) => {
        state.list = list;
      });
    },
  }))
);
