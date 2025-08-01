const TYPING_KEY_DOMAINS = {
  authUser: "authUSer",
  logout: "logout",
  typing: "typing",
  ranking: "ranking",
  user: "user",
} as const;

export const TYPING_AUTH_KEYS = {
  user: [TYPING_KEY_DOMAINS.authUser],
  logout: [TYPING_KEY_DOMAINS.logout],
} as const;

export const TYPING_KEYS = {
  all: [TYPING_KEY_DOMAINS.typing],
  lists: () => [...TYPING_KEYS.all, "lists"],
  list: (filters?: { id?: number }) => [...TYPING_KEYS.all, "list", filters],
  details: () => [...TYPING_KEYS.all, "details"],
  detail: (filters: { typingId: number }) => [
    ...TYPING_KEYS.details(),
    filters,
  ],
};

export const TYPING_RANKING_KEYS = {
  all: [TYPING_KEY_DOMAINS.ranking],
  realtime: () => [TYPING_RANKING_KEYS.all, "realtime"],
  monthly: () => [TYPING_RANKING_KEYS.all, "monthly"],
};
export const TYPING_USER_KEYS = {
  all: [TYPING_KEY_DOMAINS.user],
  token: () => [...TYPING_USER_KEYS.all, "token"],
  lists: () => [...TYPING_USER_KEYS.all, "list"],
  details: () => [...TYPING_USER_KEYS.all, "detail"],
  detail: (filters: { userId: number }) => [
    ...TYPING_USER_KEYS.details(),
    filters,
  ],
  loginUser: () => [...TYPING_USER_KEYS.all, "login"],
  random: () => [...TYPING_USER_KEYS.all, "random"],
};
