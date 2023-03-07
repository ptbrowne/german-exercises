import { supermemo, SuperMemoGrade } from "supermemo";
import { parseExamples } from "./sentences";

import dataHealthKids from "../data/health-kids";
import dataFood from "../data/food";
import dataRestaurantHotelsBerg from "../data/restaurant-hotels-berg";
import { addDays } from "date-fns";
import { parse, stringify } from "superjson";

const sentencesByTheme = {
  "health-kids": dataHealthKids,
  "restaurant-hotels-berg": dataRestaurantHotelsBerg,
  food: dataFood,
};

const parseCards = parse<Card[]>;
const stringifyCards = stringify;

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

interface Card {
  interval: number;
  repetition: number;
  efactor: number;
  dueDate: Date;
  original: string;
  translation?: string;
}

class Deck {
  theme: Theme | null;
  cards: Card[];
  localStoragePrefix: string;

  constructor() {
    this.theme = null;
    this.cards = [];
    this.localStoragePrefix = "supermemo_";
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

  initializeFromLocalStorage(key: string) {
    const fullKey = `${this.localStoragePrefix}${key}`;
    try {
      const value = localStorage.getItem(fullKey);
      if (!value) {
        console.warn("Nothing in localStorage");
        this.cards = [];
        return;
      }
      this.cards = parseCards(value) || [];
    } catch (e) {
      console.warn(
        "Cards could not be recovered from localStorage, clearing localStorage"
      );
      localStorage.removeItem(fullKey);
      this.cards = [];
    }
  }

  saveToLocalStorage(key: string) {
    localStorage.setItem(
      `${this.localStoragePrefix}${key}`,
      stringifyCards(this.cards)
    );
  }

  initializeFromTheme(theme: Theme) {
    this.theme = theme;
    this.initializeFromSentences(sentencesByTheme[this.theme]);
  }

  grade(index: number, grade: SuperMemoGrade) {
    if (!this.cards[index]) {
      return;
    }
    const oldCard = this.cards[index];
    const newValues = supermemo(this.cards[index], grade);
    this.cards.splice(index, 1, {
      ...oldCard,
      ...newValues,
      dueDate: getDueDate(newValues.interval),
    });
  }

  getNewIndex() {
    const minIndex = minIndexBy(this.cards, (c) => +c.dueDate);
    console.log(minIndex);
    return minIndex;
  }
}

export default Deck;
