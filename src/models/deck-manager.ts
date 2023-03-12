import { format } from "date-fns";
import { makeAutoObservable } from "mobx";
import { autoSave } from "./autosave";
import Deck, { Theme } from "./deck";

const getTodayDate = () => {
  const date = format(new Date(), "yyyy-MM-dd");
  return date;
};

class DeckManager {
  theme: Theme | null;
  roundCount: Record<string, number>;

  constructor() {
    makeAutoObservable(this);
    this.theme = "health-kids";
    this.roundCount = {};
    autoSave(this, "currentTheme");
  }

  get deck() {
    return new Deck(this.theme || "health-kids");
  }

  increaseTodayRoundCount() {
    const date = getTodayDate();
    this.roundCount[date] = (this.roundCount[date] ?? 0) + 1;
  }

  get todayRoundCount() {
    const date = getTodayDate();
    return this.roundCount[date] || 0;
  }
}

export const deckManager = new DeckManager();

export default DeckManager;
