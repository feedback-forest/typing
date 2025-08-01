import { TypingPercent } from "@/features/typing/model/typing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TypingPercentState {
  typingPercent: TypingPercent | null;
  setTypingPercent: (typingPercent: number) => void;
}

const initialState: TypingPercentState = {
  typingPercent: {
    percent: 0,
  },
  setTypingPercent: () => {},
};

const useTypingPercent = create(
  persist<TypingPercentState>(
    (set) => ({
      ...initialState,
      setTypingPercent: (typingPercent: number) =>
        set({
          typingPercent: {
            percent: typingPercent,
          },
        }),
    }),
    {
      name: "typingPercent",
    },
  ),
);

export default useTypingPercent;
