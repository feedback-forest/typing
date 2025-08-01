import { TYPING_RANKING_KEYS } from "@/shared/api/typingKeyFactory";
import { useQuery } from "@tanstack/react-query";
import { getRealtimeRanking } from ".";

const useGetRealtimeRanking = () => {
  return useQuery({
    queryKey: TYPING_RANKING_KEYS.realtime(),
    queryFn: () => getRealtimeRanking(),
    select: (response) => response.data,
    meta: {
      errorMessage: "Failed to fetch Realtime Ranking",
    },
  });
};

export default useGetRealtimeRanking;
