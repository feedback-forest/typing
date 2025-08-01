import { useMutation } from "@tanstack/react-query";
import { getTypingRandomNickname } from ".";

const useGetTypingRandomNickname = () => {
  return useMutation({
    mutationFn: () => getTypingRandomNickname(),
  });
};

export default useGetTypingRandomNickname;
