import { Route, Routes } from "react-router-dom";

import Login from "./pages/login/login";
import ReleaseToggles from "./pages/release-toggles/release-toggles";
import PageNotFound from "./components/404/404";
import ProtectRoute from "./components/protect-route/protect-route";
import ReleaseToggle from "./pages/release-toggle/release-toggle";
import Segments from "./pages/segments/segments";
import Segment from "./pages/segment/segment";
import { useGlobalState } from "./hooks/use-global-state/use-global-state";

function App() {
  const [state] = useGlobalState();
  return (
    <>
      <Routes>
        <Route element={<ProtectRoute user={state.user} />}>
          <Route path="/" element={<ReleaseToggles />} />
          <Route path="/release-toggle/" element={<ReleaseToggle />} />
          <Route path="/segments" element={<Segments />} />
          <Route path="/segment" element={<Segment />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
