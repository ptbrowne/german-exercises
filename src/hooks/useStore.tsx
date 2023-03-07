import { create } from "zustand";
import { Theme } from "../models/deck";

export const useStore = create<{
  // Drawer
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;

  // Card index
  cardIndex: number;
  setCardIndex: (cardIndex: number) => void;

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

  cardIndex: 0,
  setCardIndex: (cardIndex: number) => set({ cardIndex }),

  debug: false,
  setDebug: (debug) => set({ debug }),

  theme: "health-kids",
  setTheme: (theme) => set({ theme }),
}));
