import axios from "axios";
import jwtDecode from "jwt-decode";
import { getUser } from "../auth";
import { refresh } from "../jwt";

// TODO: put this in a .env
const baseURL = "http://localhost:5000/api/";

const jwtAxios = axios.create({
  baseURL,
});

jwtAxios.interceptors.request.use(async req => {
  const user = getUser();
  // remove TS possibly undefined error
  req.headers = req.headers ?? {};

  if (user !== null) {
    req.headers.authorization = `Bearer ${user.token.access}`;

    const decodedToken = jwtDecode<{
      exp: number;
    }>(user.token.access);

    const hasExpired = Date.now() >= decodedToken.exp * 1000;
    console.log({ hasExpired });

    if (hasExpired && user !== null) {
      const newUser = await refresh(user.token.refresh, user.id);

      if (newUser !== undefined) {
        req.headers["authorization"] = `Bearer ${newUser.token.access}`;
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("user");
      }
    }
  }

  return req;
});

export default jwtAxios;
