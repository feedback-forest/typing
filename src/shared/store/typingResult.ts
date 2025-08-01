import { SaveTypingInfo } from "@/features/typing/model/typing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TypingResultState {
  typingResultInfo: SaveTypingInfo | null;
  setTypingResultInfo: (typingResult: SaveTypingInfo) => void;
}

const initialState: TypingResultState = {
  typingResultInfo: {
    nickname: "",
    role: "GUEST",
    rank: -1,
    luckyMessage: "",
  },
  setTypingResultInfo: () => {},
};

const useTypingResultInfo = create(
  persist<TypingResultState>(
    (set) => ({
      ...initialState,
      setTypingResultInfo: (typingResult) =>
        set({
          typingResultInfo: {
            nickname: typingResult.nickname,
            role: typingResult.role,
            rank: typingResult.rank,
            luckyMessage: typingResult.luckyMessage,
          },
        }),
    }),
    {
      name: "typingResultInfo",
    },
  ),
);

export default useTypingResultInfo;
