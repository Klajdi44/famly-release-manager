import { useReducer } from "react";
import { Route, Routes } from "react-router-dom";

import { DEFAULT_STATE } from "./global-state/constants";
import { Context } from "./global-state/context";
import { reducer } from "./global-state/main-reducer";
import Login from "./pages/login/login";
import ReleaseToggles from "./pages/release-toggles/release-toggles";
import PageNotFound from "./components/404/404";
import PersistLogin from "./components/persist-login/persist-login";

function App() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <div>
      <Context.Provider value={[state, dispatch]}>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<ReleaseToggles />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
{
  /* <img src="/vite.svg" className="logo" alt="Vite logo" /> */
}
