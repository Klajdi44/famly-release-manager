import { useMemo, useReducer } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { DEFAULT_STATE } from "./global-state/constants";
import { Context } from "./global-state/context";
import { reducer } from "./global-state/main-reducer";
import Login from "./pages/login/login";
import ReleaseToggles from "./pages/release-toggles/release-toggles";
import PageNotFound from "./components/404/404";
import PersistLogin from "./components/persist-login/persist-login";
import ApplicationShell from "./components/application-shell/application-shell";
import ReleaseToggle from "./pages/release-toggles/release-toggle/release-toggle";
import Segments from "./pages/segments/segments";
import Segment from "./pages/segments/segment/segment";

function App() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const location = useLocation();

  const shouldAppShellRender = useMemo(
    () => location.pathname !== "/login",
    [location]
  );

  return (
    <div>
      <Context.Provider value={[state, dispatch]}>
        <ApplicationShell shouldRender={shouldAppShellRender}>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/" element={<ReleaseToggles />} />
              <Route path="/release-toggle/" element={<ReleaseToggle />} />
              <Route path="/segments" element={<Segments />} />
              <Route path="/segment" element={<Segment />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ApplicationShell>
      </Context.Provider>
    </div>
  );
}

export default App;
{
  /* <img src="/vite.svg" className="logo" alt="Vite logo" /> */
}
