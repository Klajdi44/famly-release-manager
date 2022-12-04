import { Navigate, Outlet } from "react-router-dom";
import { useGlobalState } from "../../hooks/use-global-state/use-global-state";

const PersistLogin = () => {
  const [state] = useGlobalState();

  if (state.user !== null) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default PersistLogin;
