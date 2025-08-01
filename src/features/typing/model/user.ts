export interface TypingLoginUserInfo {
  accessToken: string;
  refreshToken: string;
}

export interface ITokens {
  accessToken: string;
}

export type BearerAccessTokenHeader = {
  Authorization: ITokens["accessToken"];
};
