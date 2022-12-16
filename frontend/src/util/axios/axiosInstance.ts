import axios from "axios";
import jwtDecode from "jwt-decode";
import { getUser } from "../auth";
import { refresh } from "../jwt";

// TODO: put this in a .env
const baseURL = "http://localhost:5000/api/";

const jwtAxios = axios.create({
  baseURL,
});

// prevent requests happening twice
let isRefreshingToken = false;

jwtAxios.interceptors.request.use(async request => {
  if (isRefreshingToken) {
    // prevent doing a double request
    return request;
  }

  const user = getUser();
  // remove TS possibly undefined error
  request.headers = request.headers ?? {};

  if (user !== null) {
    request.headers.authorization = `Bearer ${user.token.access}`;

    const decodedToken = jwtDecode<{
      exp: number;
    }>(user.token.access);

    const hasExpired = Date.now() >= decodedToken.exp * 1000;
    console.log({ hasExpired });

    if (hasExpired && user !== null) {
      isRefreshingToken = true;
      const response = await refresh(user.token.refresh, user.user.id);

      if (response !== undefined) {
        request.headers["authorization"] = `Bearer ${response.token.access}`;
        localStorage.setItem("userTokens", JSON.stringify(response.token));
        isRefreshingToken = false;
      } else {
        localStorage.removeItem("userTokens");
        isRefreshingToken = false;
      }
    }
  }

  return request;
});

export default jwtAxios;
