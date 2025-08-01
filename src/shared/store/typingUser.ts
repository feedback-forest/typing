import { TypingLoginUserInfo } from "@/features/typing/model/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TypingLoginedUserState {
  typingLoginedUser: TypingLoginUserInfo | null; // LoginUserInfo 타입을 사용
  setTypingLoginedUser: (loginedUserInfo: TypingLoginUserInfo) => void;
}

import { devtools } from "zustand/middleware";

const useTypingLoginedUserStore = create(
  devtools(
    persist<TypingLoginedUserState>(
      (set) => ({
        typingLoginedUser: {
          accessToken: "",
          refreshToken: "",
        },
        setTypingLoginedUser: (loginedUserInfo) =>
          set({ typingLoginedUser: loginedUserInfo }),
      }),
      {
        name: "typingLoginedUserInfo",
      },
    ),
    { name: "TypingLoginedUserStore" },
  ),
);

export default useTypingLoginedUserStore;

export const typingUserStore = useTypingLoginedUserStore;
