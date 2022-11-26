import { useContext } from "react";

import { Context } from "../../global-state/context";

const useGlobalState = () => useContext(Context);

export { useGlobalState };
