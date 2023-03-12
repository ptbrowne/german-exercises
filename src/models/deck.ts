import { supermemo, SuperMemoGrade } from "supermemo";
import { parseExamples } from "./sentences";

import dataHealthKids from "../data/health-kids";
import dataFood from "../data/food";
import dataRestaurantHotelsBerg from "../data/restaurant-hotels-berg";
import { addDays } from "date-fns";
import { parse, stringify } from "superjson";
import { sortBy } from "remeda";
import { makeAutoObservable } from "mobx";
import { autoSave } from "./autosave";

const sentencesByTheme = {
  "health-kids": dataHealthKids,
  "restaurant-hotels-berg": dataRestaurantHotelsBerg,
  food: dataFood,
};

// const parseCards = parse<Card[]>;
// const stringifyCards = stringify;

const getDueDate = (interval: number) => {
  return addDays(new Date(), interval);
};

export type Theme = keyof typeof sentencesByTheme;
export const allThemes = Object.keys(sentencesByTheme) as Theme[];

const minIndexBy = <T>(items: T[], by: (t: T) => number | string) => {
  let index = -1;
  let currentMin = undefined as number | string | undefined;
  for (let i = 0; i < items.length; i++) {
    const v = by(items[i]);
    if (currentMin === undefined || v < currentMin) {
      index = i;
      currentMin = v;
    }
  }
  return index;
};

export interface Card {
  interval: number;
  repetition: number;
  efactor: number;
  dueDate: Date;
  original: string;
  translation?: string;
}

class Deck {
  theme: Theme;
  cards: Card[];
  localStoragePrefix: string;

  constructor(theme: Theme) {
    makeAutoObservable(this);
    this.theme = theme;
    this.cards = [];
    this.localStoragePrefix = "supermemo_";
    autoSave(this, `deck__${theme}`);
    if (this.cards.length === 0) {
      this.initializeFromTheme(this.theme);
    }
  }

  initializeFromSentences(sentences: string) {
    this.cards = parseExamples(sentences).map((ex) => ({
      original: ex.original,
      translation: ex.translation,
      interval: 0,
      repetition: 0,
      efactor: 2.5,
      dueDate: new Date(),
    }));
  }

  reset() {
    this.removeLocalStorage();
    this.initializeFromTheme(this.theme);
  }

  removeLocalStorage() {
    localStorage.removeItem(`deck__${this.theme}`);
  }

  initializeFromTheme(theme: Theme) {
    this.theme = theme;
    // this.initializeFromLocalStorage();
    if (this.cards.length === 0) {
      this.initializeFromSentences(sentencesByTheme[this.theme]);
    }
  }

  grade(index: number, grade: SuperMemoGrade) {
    if (!this.cards[index]) {
      return;
    }
    const oldCard = this.cards[index];
    const newValues = supermemo(this.cards[index], grade);
    const newCard = {
      ...oldCard,
      ...newValues,
      dueDate: getDueDate(newValues.interval),
    };
    this.cards.splice(index, 1, newCard);
    // this.saveToLocalStorage();
    return newCard;
  }

  getNewIndex() {
    const minIndex = minIndexBy(this.cards, (c) => +c.dueDate);
    return minIndex;
  }

  getRound(limit: number = 10): Round {
    return new Round(this, limit, () => undefined);
  }
}

export class Round {
  deck: Deck;
  cards: { index: number; card: Card }[];
  index: number;
  onRoundCompleted: () => void;

  constructor(deck: Deck, limit: number, onRoundCompleted: () => void) {
    makeAutoObservable(this);
    this.deck = deck;
    this.index = 0;
    this.cards = this.getCards(limit);
    this.onRoundCompleted = onRoundCompleted;
  }

  getCards(limit: number) {
    const cards = sortBy(
      this.deck.cards.map((c, i) => ({
        card: c,
        index: i,
      })),
      [(c) => +c.card.dueDate, "asc"]
    );
    return cards.slice(0, limit);
  }

  get currentItem() {
    return this.cards?.[this.index];
  }

  get currentCard() {
    return this.currentItem?.card;
  }

  onGrade(grade: SuperMemoGrade) {
    const currentRoundItem = this.currentItem;
    if (!currentRoundItem) {
      return;
    }
    const newCard = this.deck.grade(currentRoundItem?.index, grade);
    const index = this.index;
    if (grade === 5 && newCard) {
      // Remove card from round
      const newCards = this.cards.filter((c, i) => i !== index);
      this.cards = newCards;
      if (this.cards.length > 0) {
        this.index = index % this.cards.length;
      } else {
        this.onRoundCompleted();
      }
    } else {
      this.index = (index + 1) % this.cards.length;
    }
  }
}

export default Deck;
