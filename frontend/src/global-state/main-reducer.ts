import * as UserConstants from "../pages/login/constants";
import { reducer as UserReducer } from "../pages/login/reducer";
import * as Constants from "./constants";
import * as Types from "./types";

const reducer: Types.Reducer = (state, action) => {
  if (action.type.startsWith(UserConstants.DOMAIN)) {
    return UserReducer(state, action);
  }

  return state;
};

export { reducer };
