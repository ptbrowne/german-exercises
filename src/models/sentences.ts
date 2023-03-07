import { prepositionToDeclinations } from "./prepositions";

export const exampleRegex = /^(.*)\((.*)\)$/;

export type Example = {
  original: string;
  translation?: string;
};

const parseExample = (example: string): Example => {
  const match = exampleRegex.exec(example);
  if (!match) {
    return { original: example, translation: undefined };
  }
  return {
    original: match[1],
    translation: match[2],
  };
};
const dumpExample = (ex: Example) => {
  return `${ex.original} (${ex.translation})`;
};
export const parseExamples = (examples: string) => {
  return examples
    .split("\n")
    .filter((x: string) => x !== "")
    .map(parseExample);
};
export const dumpExamples = (examples: Example[]) => {
  return examples.map(dumpExample).join("\n");
};

export const makeHoles = (sentence: string) => {
  if (!sentence) {
    return "";
  }
  return sentence
    .replace(
      /\b(zu(r|m)?|ins|im|der|das|nach|die|des|dem|den|eine?n?|m?einem|eine(m|n)?|ins|am)\b/gi,
      " ___ "
    )
    .replace(/\[.*?\]/, "")
    .replace(/\(.*?\)$/, "");
};

export const detectPrepositions = (sentence: string) => {
  return sentence.split(/\s+/).filter((word) => {
    return prepositionToDeclinations[word] !== undefined;
  });
};
