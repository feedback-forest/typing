import { Payload } from "@/shared/model/api";
import { BearerAccessTokenHeader } from "./user";

// 회원가입 및 닉네임 검증

export interface ValidateTypingNicknameDto {
  nickname: string;
}

export interface TypingMemberToken {
  access_token: string;
  refresh_token: string;
}

export interface PostTypingNicknameRes {
  code: number;
  message: string;
  data: TypingMemberToken;
}

export type PostTypingMemberNickname = Payload<
  BearerAccessTokenHeader,
  undefined,
  ValidateTypingNicknameDto,
  PostTypingNicknameRes
>;

// 랜덤 닉네임

export interface GetTypingRandomNicknameResData {
  nickname: string;
}

export interface GetTypingRandomNicknameRes {
  code: number;
  message: string;
  data: GetTypingRandomNicknameResData;
}

export type GetTypingRandomNickname = Payload<
  undefined,
  undefined,
  undefined,
  GetTypingRandomNicknameRes
>;

// 닉네임 검증

export interface ValidateTypingNicknameDto {
  nickname: string;
}

export interface ValidateTypingNicknameRes {
  code: number;
  message: string;
  data: null;
}

// TODO: undefined 수정 필요
export type ValidateTypingNickname = Payload<
  undefined,
  undefined,
  ValidateTypingNicknameDto,
  ValidateTypingNicknameRes
>;
