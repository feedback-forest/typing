import WORDS_DB from "../db/words.json";
import SENTENCE_DB from "../db/sentences.json";
import { Sentences } from "@/features/typing/model/typing";

export const getRandomWords = (count: number): string[] => {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * WORDS_DB.length);
    words.push(WORDS_DB[randomIndex]);
  }
  return words;
};

export const getRandomPhrase = () => {
  let sentences: Sentences[] = [];
  sentences = SENTENCE_DB.phrase;
  return sentences;
};
