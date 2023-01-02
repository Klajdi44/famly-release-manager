import * as UserTypes from "../pages/login/types";
import * as ColorSchemeTypes from "./colorScheme/types";

type State = {
  user: UserTypes.State;
  colorScheme: ColorSchemeTypes.State;
};

type Action = UserTypes.Action | ColorSchemeTypes.Action;

// eslint-disable-next-line no-unused-vars
type Reducer = (state: State, action: Action) => State;

export type { Action, State, Reducer };
