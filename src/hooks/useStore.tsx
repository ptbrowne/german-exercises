import { create, useStore as useZustandStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { persist, createJSONStorage } from "zustand/middleware";

export type DeckStore = {
  // Card index
  currentDeck: string;
  setCurrentDeck: (currentDeck: string) => void;
};

export const currentDeckStore = createStore<DeckStore>()(
  persist(
    (set) => ({
      currentDeck: "health-kids",
      setCurrentDeck: (currentDeck: string) => set({ currentDeck }),
    }),
    {
      name: "polyglotter-current-deck",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useCurrentDeckStore = <V,>(selector: (state: DeckStore) => V): V =>
  useZustandStore(currentDeckStore, selector);

export const getCurrentDeck = () => {
  return currentDeckStore.getState().currentDeck;
};

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

export const useUIStore = create<{
  // Drawer
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;

  // Debug
  debug: boolean;
  setDebug: (debug: boolean) => void;
}>((set) => ({
  isDrawerOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),

  debug: false,
  setDebug: (debug) => set({ debug }),
}));
