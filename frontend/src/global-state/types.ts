import * as UserTypes from "../pages/login/types";

type State = {
  user: UserTypes.State;
  colorScheme: "light" | "dark";
};

type Action = UserTypes.Action;

// eslint-disable-next-line no-unused-vars
type Reducer = (state: State, action: Action) => State;

export type { Action, State, Reducer };
