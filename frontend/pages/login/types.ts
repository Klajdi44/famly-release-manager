type User = {
  name: string;
  surname: string;
  email: string;
};

type State = User | null;

type Action = | {
  type: 'AUTH_ADD_USER';
  payload: User
};

export type { Action, User, State };