import { Navigate, Outlet } from "react-router-dom";
import { User } from "../../pages/login/types";

type Props = {
  user: User | null;
};
const ProtectRoute = ({ user }: Props) => {
  if (user !== null) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectRoute;
