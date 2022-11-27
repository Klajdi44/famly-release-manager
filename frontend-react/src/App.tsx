import { useReducer } from "react";
import { DEFAULT_STATE } from "./global-state/constants";
import { Context } from "./global-state/context";
import { reducer } from "./global-state/main-reducer";
import Login from "./pages/login/login";

function App() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <div>
      <Context.Provider value={[state, dispatch]}>
        <Login />
        <img src="/vite.svg" className="logo" alt="Vite logo" />
      </Context.Provider>
    </div>
  );
}

export default App;
