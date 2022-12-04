import jwtDecode from "jwt-decode";
import { User } from "../../pages/login/types";

const getUser = (): User | null => {
  return JSON.parse(localStorage.getItem("user") ?? "null");
};

const isAuthenticated = () => {
  const user = getUser();

  if (user === null) {
    return false;
  }

  const currentDate = Date.now();

  const decodedToken = jwtDecode<{
    exp: number;
  }>(user.token.access);

  const hasExpired = currentDate >= decodedToken.exp * 1000;

  return hasExpired === false;
};

export { isAuthenticated, getUser };
