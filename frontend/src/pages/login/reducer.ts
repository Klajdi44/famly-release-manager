import * as GlobalStateTypes from "../../global-state/types";

const reducer: GlobalStateTypes.Reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export { reducer };
