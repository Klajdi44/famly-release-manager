import { getUser, getColorScheme } from "../util/auth";
import * as Types from "./types";

const DEFAULT_STATE: Types.State = {
  user: getUser()?.user ?? null,
  colorScheme: getColorScheme(),
};

export { DEFAULT_STATE };
