import { useQuery } from "@tanstack/react-query";
import { getTypingList } from ".";
import { TYPING_KEYS } from "@/shared/api/typingKeyFactory";

const useGetTypingList = () => {
  return useQuery({
    queryKey: TYPING_KEYS.lists(),
    queryFn: () => getTypingList(),
    select: (response) => response.data,
    meta: {
      errorMessage: "Failed to fetch typing list",
    },
  });
};

export default useGetTypingList;
