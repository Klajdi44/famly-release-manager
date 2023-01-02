import { Route, Routes } from "react-router-dom";

import Login from "./pages/login/login";
import ReleaseToggles from "./pages/release-toggles/release-toggles";
import PageNotFound from "./components/404/404";
import PersistLogin from "./components/persist-login/persist-login";
import ReleaseToggle from "./pages/release-toggles/components/release-toggle/release-toggle";
import Segments from "./pages/segments/segments";
import Segment from "./pages/segments/components/segment/segment";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
