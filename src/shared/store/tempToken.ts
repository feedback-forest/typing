import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PhraseState {
  tempToken: string | null;
  setTempToken: (token: string) => void;
}

const initialState: PhraseState = {
  tempToken: "",
  setTempToken: () => {},
};

const useTempTokenStore = create(
  persist<PhraseState>(
    (set) => ({
      ...initialState,
      setTempToken: (tempToken) => set({ tempToken: tempToken }),
    }),
    {
      name: "tempToken",
    },
  ),
);

export default useTempTokenStore;
