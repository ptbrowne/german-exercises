import { makeAutoObservable } from "mobx";
import { autoSave } from "./autosave";
import Deck, { Theme } from "./deck";

class DeckManager {
  theme: Theme | null;
  roundCount: number;

  constructor() {
    makeAutoObservable(this);
    this.theme = "health-kids";
    autoSave(this, "currentTheme");
    this.roundCount = 0;
  }

  get deck() {
    return new Deck(this.theme || "health-kids");
  }
}

export const deckManager = new DeckManager();

export default DeckManager;
