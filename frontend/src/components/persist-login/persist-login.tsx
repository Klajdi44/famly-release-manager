import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../util/auth";

const PersistLogin = () => {
  if (isAuthenticated()) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PersistLogin;
