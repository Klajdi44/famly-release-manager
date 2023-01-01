import * as GlobalStateTypes from "../../global-state/types";

const reducer: GlobalStateTypes.Reducer = (state, action) => {
  switch (action.type) {
    case "THEME_CHANGE_COLOR_SCHEME":
      localStorage.setItem("colorScheme", action.payload);
      return { ...state, colorScheme: action.payload };
    default:
      return state;
  }
};

export { reducer };
