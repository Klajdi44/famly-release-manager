import { getUser } from "../util/auth";
import * as Types from "./types";

const DEFAULT_STATE: Types.State = {
  user: getUser()?.user ?? null,
};

export { DEFAULT_STATE };
