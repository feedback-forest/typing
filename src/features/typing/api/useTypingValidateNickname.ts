import { useMutation } from "@tanstack/react-query";

import { validateNickname } from ".";
import { ValidateTypingNickname } from "../model/members";

const useTypingValidateNickname = () => {
  return useMutation({
    mutationFn: (payload: ValidateTypingNickname["Request"]["body"]) =>
      validateNickname(payload),
    onSuccess: () => {},
  });
};

export default useTypingValidateNickname;
