type ColorScheme = "dark" | "light";

type Action = {
  type: "THEME_CHANGE_COLOR_SCHEME";
  payload: ColorScheme;
};

type State = ColorScheme;

export type { Action, ColorScheme, State };
