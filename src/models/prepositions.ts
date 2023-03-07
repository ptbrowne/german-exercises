export const helperRules = {
  in: {
    accusative: "motion to a place",
    dative: "location or position in a place"
  },
  neben: {
    accusative: "motion to a place next to something",
    dative: "location or position next to something"
  },
  hinter: {
    accusative: "motion to a place behind something",
    dative: "location or position behind something"
  },
  vor: {
    accusative: "motion to a place in front of something",
    dative: "location or position in front of something"
  },
  an: {
    accusative: "motion to a place at or along the side of something",
    dative: "location or position at or along the side of something"
  },
  auf: {
    accusative: "motion to a place on top of something",
    dative: "location or position on top of something"
  },
  über: {
    accusative: "motion to a place over something",
    dative: "location or position over something"
  },
  unter: {
    accusative: "motion to a place under something",
    dative: "location or position under something"
  },
  zwischen: {
    accusative: "motion to a place between two things",
    dative: "location or position between two things"
  }
};

export type HelperRule = typeof helperRules[keyof typeof helperRules];

const declinationToPrepositions = {
  genitiv: [
    "kraft",
    "seitens",
    "diesseits",
    "jenseits",
    "infolge",
    "zugunsten",
    "aufgrund",
    "oberhalb",
    "unterhalb",
    "innerhalb",
    "außerhalb",
    "anlässlich"
  ],
  "dativ/genitiv": ["trotz", "wegen", "statt", "während", "längs", "mittels"],
  akkusativ: [
    "aus",
    "bei",
    "mit",
    "nach",
    "seit",
    "von",
    "zu",
    "laut",
    "gegenüber"
  ],
  "dativ/akkusativ": [
    "in",
    "neben",
    "hinter",
    "vor",
    "an",
    "auf",
    "neben",
    "über",
    "unter",
    "zwischen"
  ]
};

const flatten = <T>(arrays: T[][]) => {
  const res: T[] = [];
  for (let arr of arrays) {
    for (let item of arr) {
      res.push(item);
    }
  }
  return res;
};

export const prepositionToDeclinations = Object.fromEntries(
  flatten(
    Object.entries(declinationToPrepositions).map(
      ([declination, prepositions]) => {
        return prepositions.map((p) => [p, declination]);
      }
    )
  )
);
