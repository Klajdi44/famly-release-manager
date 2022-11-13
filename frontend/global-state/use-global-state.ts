import { useContext } from "react";

import { Context } from "./context";

const useGlobalState = () => useContext(Context);

export { useGlobalState };
