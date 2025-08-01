import { useMutation } from "@tanstack/react-query";
import { postSignUp } from ".";

const usePostSignUp = (tempToken: string) => {
  return useMutation({
    mutationFn: (payload: { nickname: string; agreements: any }) =>
      postSignUp(payload, tempToken),
    onSuccess: () => {},
  });
};

export default usePostSignUp;
