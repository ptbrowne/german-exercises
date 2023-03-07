import { create } from "zustand";
import { Theme } from "../models/deck";

import { persist, createJSONStorage } from "zustand/middleware";

export const useCardIndexStore = create<{
  // Card index
  cardIndex: number;
  setCardIndex: (cardIndex: number) => void;
}>()(
  persist(
    (set) => ({
      cardIndex: 0,
      setCardIndex: (cardIndex: number) => set({ cardIndex }),
    }),
    {
      name: "polyglotter-card-index",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useStore = create<{
  // Drawer
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;

  // Debug
  debug: boolean;
  setDebug: (debug: boolean) => void;

  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>((set) => ({
  isDrawerOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),

  debug: false,
  setDebug: (debug) => set({ debug }),

  theme: "health-kids",
  setTheme: (theme) => set({ theme }),
}));
