import apiRequest from "@/shared/api";
import { GetSentences, SaveTyping } from "../model/typing";
import { GetMonthlyRanking, GetRealtimeRanking } from "../model/ranking";
import {
  GetTypingRandomNickname,
  PostTypingMemberNickname,
  ValidateTypingNickname,
} from "../model/members";

const MEMBER_BASE_PATH = "/api/v1/members";
const TYPING_BASE_PATH = "/api/v1/typings";
const PHRASE_BASE_PATH = "/api/v1/phrases";
const RANKING_BASE_PATH = "/api/v1/rankings";

export const postTypingMemberNickname = (
  payload: PostTypingMemberNickname["Request"]["body"],
) =>
  apiRequest.post<PostTypingMemberNickname["Response"]>(
    `${MEMBER_BASE_PATH}`,
    payload,
    // {
    //   headers: { Authorization: `` },
    // },
  );

export const getTypingRandomNickname = () =>
  apiRequest.get<GetTypingRandomNickname["Response"]>(
    `${MEMBER_BASE_PATH}/nickname/random`,
    {},
  );

export const validateNickname = (
  payload: ValidateTypingNickname["Request"]["body"],
) =>
  apiRequest.post<ValidateTypingNickname["Response"]>(
    `${MEMBER_BASE_PATH}/nickname/validate`,
    payload,
    {
      // headers: {
      //   Authorization: `Bearer ${getCookie("accessToken")}`,
      // },
    },
  );

// TODO: agreements type 수정
export const postSignUp = (
  payload: { nickname: string; agreements: any },
  tempToken: string,
) =>
  apiRequest.post<{
    code: number;
    message: string;
    data: boolean;
  }>(`${MEMBER_BASE_PATH}`, payload, {
    headers: {
      Authorization: `${tempToken}`,
    },
  });

export const getTypingList = () => {
  return apiRequest.get<GetSentences>(`${PHRASE_BASE_PATH}`, {
    // headers: {
    //   Authorization: ``,
    // },
  });
};

export const saveTypingInfo = (
  token: string,
  payload: SaveTyping["Request"]["body"],
) =>
  apiRequest.post<SaveTyping["Response"]>(`${TYPING_BASE_PATH}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getRealtimeRanking = () =>
  apiRequest.get<GetRealtimeRanking>(`${RANKING_BASE_PATH}/realtime`, {
    // headers: {
    //   Authorization: ``,
    // },
  });

export const getMonthlyRanking = () =>
  apiRequest.get<GetMonthlyRanking>(`${RANKING_BASE_PATH}/monthly`, {
    // headers: {
    //   Authorization: ``,
    // },
  });

export const getKakaoLogin = (tempToken: string) =>
  apiRequest.get<{
    code: number;
    message: string;
    data: boolean;
  }>(`${MEMBER_BASE_PATH}`, {
    headers: {
      Authorization: `${tempToken}`,
    },
  });
