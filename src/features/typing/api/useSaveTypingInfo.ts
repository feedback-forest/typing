import { useMutation } from "@tanstack/react-query";
import { saveTypingInfo } from ".";
import { SaveTyping } from "../model/typing";

const useSaveTypingInfo = (token: string) => {
  return useMutation({
    mutationFn: (payload: SaveTyping["Request"]["body"]) =>
      saveTypingInfo(token, payload),
    onSuccess: () => {},
  });
};

export default useSaveTypingInfo;
