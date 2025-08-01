export interface Ranking {
  member_id: number;
  ranking: number;
  nickname: string;
  score: number;
}

export interface GetRealtimeRankingRes {
  rankings: Ranking[];
}

export interface GetRealtimeRanking {
  code: number;
  message: string;
  data: GetRealtimeRankingRes;
}

export interface GetMonthlyRankingRes {
  rankings: Ranking[];
}

export interface GetMonthlyRanking {
  code: number;
  message: string;
  data: GetMonthlyRankingRes;
}
