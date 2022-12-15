type Token = {
  access: string;
  refresh: string;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type UserWithTokens = {
  user: User;
  token: Token;
};

type State = User | null;

type Action = {
  type: "AUTH_ADD_USER";
  payload: User;
};

export type { Action, User, State, Token, UserWithTokens };
