import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../util/auth/isAuthenticated";

const PersistLogin = () => {
  if (isAuthenticated()) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PersistLogin;
