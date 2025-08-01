import { TYPING_RANKING_KEYS } from "@/shared/api/typingKeyFactory";
import { useQuery } from "@tanstack/react-query";
import { getMonthlyRanking } from ".";

const useGetMonthlyRanking = () => {
  return useQuery({
    queryKey: TYPING_RANKING_KEYS.monthly(),
    queryFn: () => getMonthlyRanking(),
    select: (response) => response.data,
    meta: {
      errorMessage: "Failed to fetch Monthly Ranking",
    },
  });
};

export default useGetMonthlyRanking;
