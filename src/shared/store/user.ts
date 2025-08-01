// import { LoginUserInfo } from "@/entities/user/model/user";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// // 상태와 액션의 타입 정의
// export interface LoginedUserState {
//   loginedUser: LoginUserInfo | null; // LoginUserInfo 타입을 사용
//   setLoginedUser: (loginedUserInfo: LoginUserInfo) => void;
// }

// // 초기 상태 정의
// const initialState: LoginedUserState = {
//   loginedUser: {
//     id: 0,
//     email: "",
//     nickname: "",
//     gender: "",
//     age_range: "",
//     birth: "",
//     phone_number: "",
//     latitude: 0,
//     longitude: 0,
//     location: "",
//   },
//   setLoginedUser: () => {},
// };

// // Zustand 스토어 생성
// const useLoginedUserStore = create(
//   persist<LoginedUserState>(
//     (set) => ({
//       ...initialState,
//       setLoginedUser: (loginedUserInfo) =>
//         set({ loginedUser: loginedUserInfo }),
//     }),
//     {
//       name: "loginedUserInfo",
//     },
//   ),
// );

// export default useLoginedUserStore;
