import * as UserConstants from "../pages/login/constants";
import * as ColorSchemeConstants from "../global-state/colorScheme/constants";
import { reducer as UserReducer } from "../pages/login/reducer";
import { reducer as ColorSchemeReducer } from "../global-state/colorScheme/recucer";
import * as Types from "./types";

const reducer: Types.Reducer = (state, action) => {
  if (action.type.startsWith(UserConstants.DOMAIN)) {
    return UserReducer(state, action);
  }
  if (action.type.startsWith(ColorSchemeConstants.DOMAIN)) {
    return ColorSchemeReducer(state, action);
  }
  return state;
};

export { reducer };
