import { createContext, Dispatch } from "react";

import * as Constants from "./constants";
import * as Types from "./types";

const Context = createContext<[Types.State, Dispatch<Types.Action>]>([
  Constants.DEFAULT_STATE,
  () => Constants.DEFAULT_STATE,
]);

export { Context };
