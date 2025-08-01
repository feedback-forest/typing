import { Payload } from "@/shared/model/api";

export interface TypingInfo {
  username: string;
  title: string;
  content: string;
  writer: string;
  cpm: number;
  wpm: number;
  maxCpm: number;
  acc: number;
  time: string;
}

export interface Sentences {
  id: number;
  sentence: string;
  title: string;
  author: string;
  nickname: string;
  lang: string;
  types: string;
  user_id: number;
}

export interface Phrase {
  phraseIndex: number;
  phrase: Sentences[];
}

export interface GetSentencesInfo {
  phrases: Sentences[];
}

export interface GetSentences {
  code: number;
  message: string;
  data: GetSentencesInfo;
}

export interface Typing {
  phraseId: number;
  cpm: number;
  maxCpm: number;
  wpm: number;
  acc: number;
}

export interface SaveTypingDto {
  // lang: "ko" | "en";
  typing: Typing;
}

export interface SaveTypingInfo {
  rank: number;
  luckyMessage: string;
  role: "GUEST" | "USER";
  nickname: string;
}

export interface SaveTypingResData {
  typing: SaveTypingInfo;
}

export interface SaveTypingRes {
  code: number;
  message: string;
  data: SaveTypingResData;
}

export type SaveTyping = Payload<undefined, undefined, Typing, SaveTypingRes>;

export interface TypingPercent {
  percent: number;
}
