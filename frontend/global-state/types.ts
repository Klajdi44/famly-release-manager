import * as UserTypes from "../pages/login/types";

type State = {
  user: UserTypes.State;
};

type Action = UserTypes.Action;

type Reducer = (state: State, action: Action) => State;

export type { State, Reducer };
