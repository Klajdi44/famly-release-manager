import * as Types from "./types";

const DEFAULT_STATE: Types.State = {
  user: JSON.parse(localStorage.getItem("user") ?? "null") ?? null,
};

export { DEFAULT_STATE };
