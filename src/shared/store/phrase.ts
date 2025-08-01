import { Phrase, Sentences } from "@/features/typing/model/typing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PhraseState {
  phraseInfo: Phrase | null;
  setPhrase: (phrase: Sentences[], resetIndex?: boolean) => void;
  setPhraseIndex: (index: number) => void;
}

const initialState: PhraseState = {
  phraseInfo: {
    phraseIndex: 0,
    phrase: [],
  },
  setPhrase: () => {},
  setPhraseIndex: () => {},
};

const usePhraseStore = create(
  persist<PhraseState>(
    (set, get) => ({
      phraseInfo: {
        phraseIndex: 0,
        phrase: [],
      },
      setPhrase: (phrase, resetIndex = false) => {
        const currentIndex = get().phraseInfo?.phraseIndex ?? 0;
        set({
          phraseInfo: {
            phraseIndex: resetIndex ? 0 : currentIndex,
            phrase,
          },
        });
      },
      setPhraseIndex: (index) => {
        const current = get().phraseInfo;
        if (!current) return;

        set({
          phraseInfo: {
            ...current,
            phraseIndex: index,
          },
        });
      },
    }),
    {
      name: "phraseInfo",
    },
  ),
);

export default usePhraseStore;
