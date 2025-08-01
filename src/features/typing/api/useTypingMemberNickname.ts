import { useMutation } from "@tanstack/react-query";
import { PostTypingMemberNickname } from "../model/members";
import { postTypingMemberNickname } from ".";

const useTypingMemberNickname = () => {
  return useMutation({
    mutationFn: (payload: PostTypingMemberNickname["Request"]["body"]) =>
      postTypingMemberNickname(payload),
    onSuccess: () => {},
  });
};

export default useTypingMemberNickname;
