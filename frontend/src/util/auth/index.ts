import jwtDecode from "jwt-decode";
import { LoginResponse, User } from "../../pages/login/types";

type DecodeJwtReturnValue = {
  exp: number;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

// eslint-disable-next-line no-unused-vars
type DecodeJwt = (token: string) => DecodeJwtReturnValue;

const decodeJwt: DecodeJwt = (token: string): DecodeJwtReturnValue =>
  jwtDecode<{
    exp: number;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }>(token);

type GetUserResponse = LoginResponse | null;

const getUser = (): GetUserResponse => {
  // TODO: add type safety to this
  const tokens = JSON.parse(localStorage.getItem("userTokens") ?? "null");

  if (tokens === null) {
    return null;
  }

  const decodedUser = decodeJwt(tokens.access);

  const user: User = {
    id: decodedUser.id,
    email: decodedUser.email,
    firstName: decodedUser.firstName,
    lastName: decodedUser.lastName,
  };

  return {
    user,
    token: {
      access: tokens?.access,
      refresh: tokens?.refresh,
    },
  };
};

const isAuthenticated = () => {
  const { user, token } = getUser() ?? {};

  if (user === null) {
    return false;
  }

  const currentDate = Date.now();

  const decodedToken = decodeJwt(token?.access);

  const hasExpired = currentDate >= decodedToken.exp * 1000;

  return hasExpired === false;
};

export { isAuthenticated, getUser };
