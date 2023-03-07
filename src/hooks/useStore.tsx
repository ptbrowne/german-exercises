import { create } from "zustand";

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
}>((set) => ({
  isDrawerOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),

  cardIndex: 0,
  setCardIndex: (cardIndex: number) => set({ cardIndex }),

  debug: false,
  setDebug: (debug) => set({ debug }),
}));
