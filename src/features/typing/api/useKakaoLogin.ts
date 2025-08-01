import { useQuery } from "@tanstack/react-query";
import { TYPING_USER_KEYS } from "@/shared/api/typingKeyFactory";
import { getKakaoLogin } from ".";

const useKakaoLogin = (token: string) => {
  return useQuery({
    queryKey: TYPING_USER_KEYS.lists(),
    queryFn: () => getKakaoLogin(token),
    select: (response) => response.data,
    meta: {
      errorMessage: "Failed to fetch kakao login",
    },
  });
};

export default useKakaoLogin;
